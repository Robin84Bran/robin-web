export interface ActionSource {
  label: string;
  url: string;
}

export interface ActionFlowSignal {
  signal: number;
  priority: 'NOW' | 'NEXT' | 'WATCH';
  status: 'COMPLETE' | 'WATCHING' | 'BLOCKED' | 'SUPERSEDED';
  visualValue: string;
  visualLabel: string;
  sources: ActionSource[];
  execution: {
    id: string;
    workstream: string;
    evidenceStatus: 'CONFIRMED' | 'UNKNOWN';
    reason: string;
    supersededBy: string | null;
    artifact: { label: string; href: string };
    sourceCommit: { sha: string; href: string };
    verificationReceipt: { label: string; href: string; commit: string };
  };
}

export interface ActionFlowChapter {
  domain: string;
  title: string;
  why: string;
  steps: string[];
  done: string;
  deepDiveTitle?: string;
}

export interface ActionFlowEdition {
  inLanguage: 'en' | 'zh-Hans' | 'zh-Hant' | 'ja';
  languageSlug: '' | 'zh-hans' | 'zh-hant' | 'ja';
  title: string;
  description: string;
  centralJudgment: string;
  fieldLine: string;
  actions: ActionFlowChapter[];
}

export interface ActionFlow {
  schemaVersion: number;
  date: string;
  updated: string;
  signalCount: number;
  hero: string;
  ogImage: string;
  actionHero: string;
  briefingPath: string;
  actionItemPath: string;
  actions: ActionFlowSignal[];
  editions: Record<'en' | 'zh-Hans' | 'zh-Hant' | 'ja', ActionFlowEdition>;
}

const modules = import.meta.glob<ActionFlow>('../data/action-flows/*.json', {
  eager: true,
  import: 'default',
});

export const actionFlows = Object.values(modules).sort((a, b) =>
  b.date.localeCompare(a.date),
);

export function actionFlowPath(flow: ActionFlow, edition: ActionFlowEdition) {
  const compact = flow.date.replaceAll('-', '');
  const base = `/ouroboros/${compact.slice(0, 6)}/${compact}/actions/`;
  return edition.languageSlug ? `${base}${edition.languageSlug}/` : base;
}

export function actionFlowLanguages(flow: ActionFlow) {
  const labels = {
    en: 'English',
    'zh-Hans': '简体中文',
    'zh-Hant': '繁體中文',
    ja: '日本語',
  } as const;
  return (Object.keys(flow.editions) as Array<keyof typeof flow.editions>).map((key) => ({
    hreflang: flow.editions[key].inLanguage,
    label: labels[key],
    path: actionFlowPath(flow, flow.editions[key]),
  }));
}
