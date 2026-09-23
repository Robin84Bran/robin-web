import type { ActionFlow, ActionFlowSignal } from './actionFlows';
export interface SpecialReceipt { date: string; signal: number; url: string; commit: string; artifactSha256: string; verifiedAt: string; scope: string; }

export function resolveActionOutcome(flow: ActionFlow, action: ActionFlowSignal, receipts: SpecialReceipt[]) {
  const special = receipts.find((r) => r.date === flow.date && r.signal === action.signal
    && r.scope === 'RESEARCH_ARTIFACT_ONLY' && /^[a-f0-9]{40}$/.test(r.commit)
    && /^[a-f0-9]{64}$/.test(r.artifactSha256) && Number.isFinite(Date.parse(r.verifiedAt)));
  if (special) return { status: 'completed', artifact: special.url, researchOnly: true };
  if (action.status === 'COMPLETE') {
    const proof = action.execution;
    const artifact = action.signal === 5 ? flow.actionItemPath
      : proof?.evidenceStatus === 'CONFIRMED' && /^[a-f0-9]{40}$/.test(proof?.sourceCommit?.sha ?? '') && proof?.verificationReceipt?.href ? proof.artifact.href : undefined;
    if (artifact) return { status: 'completed', artifact, researchOnly: false };
  }
  return { status: action.status === 'READY' ? 'queued' : 'watch only', artifact: undefined, researchOnly: false };
}
