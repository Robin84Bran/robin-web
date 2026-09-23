import receipts from '../data/daily-special-receipts.json';
import type { ActionFlow, ActionFlowSignal } from './actionFlows';
import { resolveActionOutcome } from './resolveActionOutcome';

export function actionOutcome(flow: ActionFlow, action: ActionFlowSignal) {
  return resolveActionOutcome(flow, action, receipts);
}
