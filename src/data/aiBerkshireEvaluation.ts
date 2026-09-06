export const sourceMap = {
  META: [
    ['10-Q', 'https://www.sec.gov/Archives/edgar/data/1326801/000162828026050705/meta-20260630.htm'],
    ['Q2 results', 'https://investor.atmeta.com/investor-news/press-release-details/2026/Meta-Reports-Second-Quarter-2026-Results/default.aspx'],
  ],
  MU: [
    ['10-Q', 'https://www.sec.gov/Archives/edgar/data/723125/000072312526000015/mu-20260528.htm'],
    ['Q3 results', 'https://investors.micron.com/news/press-release/2026/Micron-Technology-Inc--Reports-Record-Results-for-the-Third-Quarter-of-Fiscal-2026/default.aspx'],
  ],
  GOOGL: [
    ['10-Q', 'https://www.sec.gov/Archives/edgar/data/1652044/000165204426000071/goog-20260630.htm'],
    ['Q2 results', 'https://www.sec.gov/Archives/edgar/data/1652044/000165204426000066/googexhibit991q22026.htm'],
    ['DOJ remedies', 'https://www.justice.gov/atr/case/us-and-plaintiff-states-v-google-llc'],
  ],
  AMZN: [
    ['10-Q', 'https://www.sec.gov/Archives/edgar/data/1018724/000101872426000026/amzn-20260630.htm'],
    ['Q2 results', 'https://www.sec.gov/Archives/edgar/data/1018724/000101872426000024/amzn-20260630xex991.htm'],
  ],
  NVDA: [
    ['10-Q', 'https://www.sec.gov/Archives/edgar/data/1045810/000104581026000075/nvda-20260726.htm'],
    ['Q2 results', 'https://investor.nvidia.com/news/press-release-details/2026/NVIDIA-Announces-Financial-Results-for-Second-Quarter-Fiscal-2027/default.aspx'],
    ['Guarantees', 'https://www.sec.gov/Archives/edgar/data/1045810/000104581026000069/nvda-20260817.htm'],
  ],
  QCOM: [
    ['10-Q', 'https://www.sec.gov/Archives/edgar/data/804328/000080432826000086/qcom-20260628.htm'],
    ['Q3 results', 'https://www.sec.gov/Archives/edgar/data/804328/000080432826000085/qcom062826erex991.htm'],
  ],
  MSFT: [
    ['10-K', 'https://www.sec.gov/Archives/edgar/data/789019/000119312526323660/msft-20260630.htm'],
    ['FY26 results', 'https://www.microsoft.com/en-us/investor/earnings/fy-2026-q4/press-release-webcast'],
    ['FY27 segments', 'https://www.sec.gov/Archives/edgar/data/789019/000119312526380280/d291965d8k.htm'],
  ],
  PLTR: [
    ['10-Q', 'https://www.sec.gov/Archives/edgar/data/1321655/000132165526000041/pltr-20260630.htm'],
    ['Q2 results', 'https://www.sec.gov/Archives/edgar/data/1321655/000132165526000039/a2026q2ex991pressrelease.htm'],
  ],
  TSLA: [
    ['10-Q', 'https://www.sec.gov/Archives/edgar/data/1318605/000162828026049270/tsla-20260630.htm'],
    ['Q2 update', 'https://ir.tesla.com/_flysystem/s3/sec/000162828026049213/tsla-20260722-gen.pdf'],
  ],
  AMD: [
    ['10-Q', 'https://www.sec.gov/Archives/edgar/data/2488/000000248826000123/amd-20260627.htm'],
    ['Q2 results', 'https://www.sec.gov/Archives/edgar/data/2488/000000248826000121/q22026991.htm'],
  ],
} as const;

const shared = {
  META: { name: 'Meta Platforms', priority: 'A', status: 'WAIT FOR PROOF' },
  MU: { name: 'Micron Technology', priority: 'A', status: 'RE-UNDERWRITE AFTER FQ4' },
  GOOGL: { name: 'Alphabet', priority: 'A', status: 'WAIT FOR CASH-CONVERSION PROOF' },
  AMZN: { name: 'Amazon', priority: 'A', status: 'WAIT FOR PROOF' },
  NVDA: { name: 'NVIDIA', priority: 'A', status: 'WAIT FOR FINANCED-DEMAND PROOF' },
  QCOM: { name: 'Qualcomm', priority: 'B', status: 'WAIT FOR PROOF' },
  MSFT: { name: 'Microsoft', priority: 'B', status: 'WAIT FOR PROOF' },
  PLTR: { name: 'Palantir', priority: 'B', status: 'WAIT FOR PER-SHARE EARNINGS PROOF' },
  TSLA: { name: 'Tesla', priority: 'C', status: 'WAIT FOR UNIT-ECONOMICS PROOF' },
  AMD: { name: 'AMD', priority: 'A', status: 'WAIT FOR WARRANT-ADJUSTED RETURN PROOF' },
} as const;

type Ticker = keyof typeof shared;
type CompanyCopyInput = {
  ticker: Ticker;
  summary: string;
  case: string;
  normalization: string;
  gate: string;
};

const enrich = (companies: CompanyCopyInput[]) =>
  companies.map((company) => ({ ...shared[company.ticker], ...company, sources: sourceMap[company.ticker] }));

export const evaluationCopy = {
  en: {
    lang: 'en',
    languageLabel: 'Language',
    eyebrow: 'RobinOS · Research Observatory',
    title: 'AI Berkshire field test.',
    deck: 'Ten companies. Four useful lenses. No simulated masters.',
    frozen: 'Research cut-off: 6 September 2026 · market snapshot: 4 September 2026, 12:40 ET · not a live feed',
    researchOnly: 'Research only',
    ownerSentences: [
      'We tested ten famous technology companies with the useful parts of AI Berkshire, including NVIDIA.',
      'The method improved the questions we ask, but it did not produce a trustworthy buy signal for any company.',
      'Keep the source code as reference, use four small reasoning lenses, and wait for company-specific proof before considering active ownership.',
    ],
    judgmentTitle: 'One judgment',
    judgment: 'ADOPT WITH MODIFICATIONS',
    nextAction: 'Follow the proof gates below; QQQ remains the default technology exposure until a single company earns the right to concentration.',
    methodTitle: 'Method verdict',
    methodDeck: 'The useful signal survives only when primary evidence outranks personalities and valuation remains conditional.',
    verdicts: [
      { tone: 'adopt', tag: 'Adopt', title: 'Four compact lenses', body: 'Separate information richness from confidence; compress the business and moat; invert to the first rejection; normalize owner earnings.' },
      { tone: 'modify', tag: 'Modify', title: 'Long-horizon assumptions', body: 'Use five-to-ten-year hurdles only when the starting cash economics are defensible, and make every model sector-aware.' },
      { tone: 'reject', tag: 'Reject', title: 'False authority', body: 'Reject simulated-master voting, forced targets, fixed terminal multiples, secondary-source equivalence, and the overlapping 22-skill installation.' },
      { tone: 'signal', tag: 'Observed', title: 'Incremental signal', body: 'Material for MU, META, AMD, and NVDA; partial for TSLA. NVDA expands the test from an asset-light platform story to financed-ecosystem economics.' },
    ],
    sequenceTitle: 'Research sequence',
    sequenceDeck: 'A, B, and C rank the value of the next research unit—not expected return, quality, or a buy recommendation.',
    expand: 'Open each company for the causal case, normalized evidence, and decision gate.',
    labels: { case: 'Business and moat', normalization: 'Normalized evidence', gate: 'First rejection and proof gate', sources: 'Primary evidence' },
    companies: enrich([
      { ticker: 'META', summary: 'The ad engine is excellent; the AI obligation stack must earn its keep.', case: 'Meta turns attention across its family of apps into high-margin advertising cash. The network and advertiser moat remains wide, but its direction is mixed because the model is becoming much more infrastructure-heavy.', normalization: 'Q2 revenue was $60.8B, yet company-defined FCF was only $0.8B. Uncommenced leases were $279.0B and other commitments $349.3B; overlap is unknown, so they are not added.', gate: 'Reject first if ad profit slows while fixed AI costs keep rising. Proof requires recovering Family-of-Apps profit and rolling lease-inclusive, per-share cash earnings.' },
      { ticker: 'MU', summary: 'AI memory scarcity is real; the next trough decides whether it is structural.', case: 'Micron supplies DRAM, NAND, and HBM. Product position is widening, but an 84.6% gross margin proves scarcity—not that the memory cycle is dead.', normalization: 'LTM gross-capex FCF was about $26.2B, while annualized peak-quarter adjusted FCF was $73.2B. The huge gap makes a single normal earnings base irresponsible.', gate: 'Reject first if capacity, substitution, or efficiency breaks pricing before the valuation earns through. Re-underwrite after 30 September FQ4 results and require contracted trough economics.' },
      { ticker: 'GOOGL', summary: 'Search and Cloud are strong; cash conversion and live remedies now govern the stock.', case: 'Alphabet monetizes intent through Search and YouTube while Cloud becomes a larger profit engine. The moat is bifurcating: Cloud strengthens as Search faces generative interfaces and court-ordered distribution and data remedies.', normalization: 'Q2 net income was dominated by $99.0B of equity gains. H1 OCF of $84.9B minus $80.6B capex left only $4.3B simple FCF, while Alphabet raised $49.6B of equity.', gate: 'Reject first if Search weakens while capex and issuance remain elevated. Proof requires resilient paid-click economics, growing Services and Cloud profit, and per-share FCF recovery without repeated financing.' },
      { ticker: 'AMZN', summary: 'AWS is exceptional; the consolidated owner-cash bridge is still missing.', case: 'Amazon combines commerce, fulfillment, advertising, subscriptions, and cloud. AWS is the highest-margin incremental engine and its operational moat is widening.', normalization: 'TTM OCF was $161.4B but net PP&E purchases were $169.0B, so company-defined FCF was negative $7.6B. Q2 net income also included about $53.4B of mainly Anthropic investment gains.', gate: 'Reject first if AWS slows before the buildout converts to cash. Proof requires positive after-financing owner earnings and capacity returns that outrun debt, leases, and SBC.' },
      { ticker: 'NVDA', summary: 'The AI platform is dominant; financed demand must justify a $5.58T derived scale.', case: 'NVIDIA sells the accelerated-computing platform spanning chips, networking, systems, and software. Its technology moat is strengthening, while customer concentration, China constraints, and ecosystem financing change the economic architecture.', normalization: 'LTM FCF after a full SBC charge was about $119.6B, but filings disclose $366B of contractual commitments and up to $108.5B of guarantees. Large equity gains, receivables, inventory, and extended terms remain separate.', gate: 'Reject first if vendor investment, payment terms, cloud commitments, leases, and guarantees make apparent demand circular. Proof requires independent customer cash returns, OCF keeping pace with operations, and falling contingent exposure.' },
      { ticker: 'QCOM', summary: 'The cash hurdle is reachable; Apple runoff can still turn low valuation into a trap.', case: 'Qualcomm pairs high-margin cellular licensing with chips for handsets, cars, IoT, and data centers. QTL remains strong, while the diversification moat is still being built.', normalization: 'LTM reported FCF was $10.4B and the fully SBC-charged floor about $7.2B, against roughly $7.0B net debt. Tax accounting and 17.8M Modular acquisition shares complicate the per-share picture.', gate: 'Reject first if handset profit disappears faster than new profit arrives. Proof requires non-handset profit growth, stable QCT margins, and FCF-per-share growth after SBC, acquisitions, and buybacks.' },
      { ticker: 'MSFT', summary: 'The strongest enterprise moat faces a demanding cash-conversion hurdle.', case: 'Microsoft monetizes enterprise identity, productivity, developer, security, data, and cloud workflows. Distribution is widening, but physical AI capacity introduces a large capital-efficiency caveat.', normalization: 'FY2026 adjusted net income was $128.8B, while lease-adjusted cash owner earnings were about $63.9B. Uncommenced data-center leases were $329.1B.', gate: 'Reject first if Azure and non-OpenAI demand slow while capacity claims expand. Proof requires FCF growth faster than capex and leases, plus clearer return evidence under the new FY2027 segments.' },
      { ticker: 'PLTR', summary: 'Execution is exceptional; the valuation leaves little room for ordinary deceleration.', case: 'Palantir sells operating software for high-consequence data and AI workflows. Its deployment and customer-learning loop is strengthening, but durability must survive a very high starting valuation.', normalization: 'Q2 revenue was $1.94B and operating income $0.91B; SBC was $0.27B and the tax rate only 1.4%. The frozen market value was about 52 times guided 2026 revenue.', gate: 'Reject first if growth decelerates faster than per-share cash compounds. Proof requires durable recurring growth, normal-tax margins, contract conversion, and declining SBC burden.' },
      { ticker: 'TSLA', summary: 'Autonomy and robotics optionality still lacks inspectable segment economics.', case: 'Tesla combines vehicles, energy, software, and autonomy ambitions. Energy can widen the platform, but autonomy remains supervised and the core vehicle profit engine is thin.', normalization: 'Q2 operating margin was 1.4% and FCF negative $1.1B; reported income included a $1.0B unrealized SpaceX gain and OCF included $1.15B SBC.', gate: 'Reject first if core margins stay thin while autonomy economics remain undisclosed. Proof requires paid autonomy revenue, safety, utilization, insurance, contribution margin, and positive cash after AI and fleet capex.' },
      { ticker: 'AMD', summary: 'Data-center growth is real; customer-linked warrants raise the per-share proof burden.', case: 'AMD is a fabless compute challenger across CPUs, accelerators, systems, and software. Data-center position is strengthening, but the software and ecosystem moat remains behind the incumbent.', normalization: 'Q2 Data Center revenue was $6.7B and FCF $1.6B. OpenAI and Meta warrants together cover up to 320M shares at $0.01—19.6% of the Q2 basic share count if fully earned.', gate: 'Reject first if accelerator economics disappoint while demand is partly purchased with dilution. Proof requires broad deployments and cash growth that substantially outruns warrants, SBC, and commitments.' },
    ]),
    auditTitle: 'How to audit this work',
    auditBody: 'Every company has a dated local initiation memo with calculations, exact evidence links, confidence, unknowns, and reproduction notes. Reported results, model-derived calculations, management claims, and market snapshots remain distinct.',
    auditPoints: ['Primary SEC and issuer sources are canonical.', 'The market snapshot is frozen and will become stale.', 'Ten-year tables are reverse hurdles, not forecasts or price targets.', 'QQQ is the default technology benchmark; no forward QQQ return is assumed.'],
    disclaimer: 'Public research, not personalized investment advice. No brokerage connection, order, position size, target price, or capital action is authorized by this page.',
  },
  'zh-Hans': {
    lang: 'zh-Hans', languageLabel: '语言', eyebrow: 'RobinOS · 研究观察站', title: 'AI Berkshire 实地测试。', deck: '十家公司。四个有用视角。没有模拟大师。',
    frozen: '研究截止：2026年9月6日 · 市场快照：2026年9月4日 12:40 ET · 非实时数据', researchOnly: '仅供研究',
    ownerSentences: ['我们用 AI Berkshire 中有价值的部分测试了十家著名科技公司，并加入了 NVIDIA。','这个方法改善了我们提出的问题，但没有为任何公司产生可信的买入信号。','保留源码作为参考，只采用四个小型推理视角；在考虑主动持有前，等待每家公司自己的证据。'],
    judgmentTitle: '一个判断', judgment: '修改后采用', nextAction: '沿着下面的证据门槛继续跟踪；在单一公司证明值得集中持有之前，QQQ 仍是默认科技敞口。',
    methodTitle: '方法判断', methodDeck: '只有当一手证据高于人物权威、估值保持条件化时，有用信号才成立。',
    verdicts: [
      { tone:'adopt',tag:'采用',title:'四个紧凑视角',body:'区分信息丰富度与信心；压缩业务与护城河；反向寻找第一否决点；标准化 owner earnings。' },
      { tone:'modify',tag:'修改',title:'长期假设',body:'只有起始现金经济可辩护时，才使用五至十年门槛；模型必须依行业调整。' },
      { tone:'reject',tag:'拒绝',title:'虚假权威',body:'拒绝模拟大师投票、强制目标价、固定终值倍数、二手来源等价和重叠的 22-skill 安装。' },
      { tone:'signal',tag:'观察到',title:'增量信号',body:'对 MU、META、AMD、NVDA 有实质帮助，对 TSLA 有部分帮助。NVDA 把检验从轻资产平台扩展到生态融资经济。' },
    ],
    sequenceTitle:'研究顺序', sequenceDeck:'A、B、C 排的是下一单位研究的价值，不是预期收益、公司质量或买入建议。', expand:'展开每家公司，查看因果逻辑、标准化证据和决策门槛。',
    labels:{case:'业务与护城河',normalization:'标准化证据',gate:'第一否决点与证明门槛',sources:'一手证据'},
    companies: enrich([
      {ticker:'META',summary:'广告引擎优秀；AI 义务栈必须证明回报。',case:'Meta 把应用家族的注意力变成高利润广告现金。网络和广告主护城河仍宽，但随着业务大幅增加基础设施，方向变得混合。',normalization:'Q2 收入 $60.8B，但公司定义 FCF 仅 $0.8B。未开始租赁 $279.0B、其他承诺 $349.3B；重叠未知，不能相加。',gate:'若广告利润放缓而固定 AI 成本继续上升，先否决。证明需要 FoA 利润恢复，以及包含租赁、按每股计算的现金收益恢复。'},
      {ticker:'MU',summary:'AI 内存稀缺真实；下一个低谷决定它是否结构化。',case:'Micron 供应 DRAM、NAND 和 HBM。产品位置在增强，但 84.6% 毛利率只能证明稀缺，不能证明周期消失。',normalization:'LTM 扣除总资本开支的 FCF 约 $26.2B，而峰值季度年化调整 FCF 为 $73.2B。巨大差距使单一正常利润基准不负责任。',gate:'若产能、替代或效率在估值兑现前破坏价格，先否决。9月30日 FQ4 后重做研究，并要求合同化的低谷经济。'},
      {ticker:'GOOGL',summary:'Search 与 Cloud 强劲；现金转化和生效中的补救措施主导股票判断。',case:'Alphabet 通过 Search 与 YouTube 变现意图，Cloud 成为更大利润引擎。护城河正在分叉：Cloud 增强，Search 面临生成式界面与法院要求的分发/数据补救。',normalization:'Q2 净利润主要来自 $99.0B 股权收益。H1 OCF $84.9B 减去 $80.6B capex，只剩 $4.3B simple FCF，同时公司融资 $49.6B 股权。',gate:'若 Search 变弱而 capex 与发行仍高，先否决。证明需要点击经济、Services/Cloud 利润和无需反复融资的每股 FCF 同时恢复。'},
      {ticker:'AMZN',summary:'AWS 卓越；合并层面的 owner cash 桥仍缺失。',case:'Amazon 结合电商、履约、广告、订阅与云。AWS 是最高利润的增量引擎，经营护城河仍在扩大。',normalization:'TTM OCF $161.4B，但净 PP&E 购买 $169.0B，公司定义 FCF 为负 $7.6B。Q2 净利润还包含约 $53.4B、主要来自 Anthropic 的投资收益。',gate:'若 AWS 在建设转化为现金前减速，先否决。证明需要扣除融资后的 owner earnings 转正，并超过债务、租赁与 SBC 的增长。'},
      {ticker:'NVDA',summary:'AI 平台占主导；融资支持的需求必须支撑推导的 $5.58T 规模。',case:'NVIDIA 提供芯片、网络、系统与软件组成的加速计算平台。技术护城河增强，但客户集中、中国限制和生态融资改变了经济结构。',normalization:'LTM 全额扣除 SBC 后 FCF 约 $119.6B，但文件披露 $366B 合同承诺和最高 $108.5B 担保。股权收益、应收、库存与延长账期保持分开。',gate:'若供应商投资、账期、云承诺、租赁与担保造成循环需求，先否决。证明需要独立客户现金回报、OCF 跟上经营利润且或有敞口下降。'},
      {ticker:'QCOM',summary:'现金门槛可达到；Apple 流失仍可能把低估值变成陷阱。',case:'Qualcomm 把高利润蜂窝授权与手机、汽车、IoT 和数据中心芯片结合。QTL 仍强，多元化护城河还在建设。',normalization:'LTM 报告 FCF $10.4B，全额扣除 SBC 的下限约 $7.2B，净债务约 $7.0B。税务会计和 17.8M Modular 收购股份使每股图景更复杂。',gate:'若手机利润流失快于新利润到来，先否决。证明需要非手机利润增长、QCT 利润率稳定，以及扣除 SBC、收购与回购后的每股 FCF 增长。'},
      {ticker:'MSFT',summary:'最强企业护城河面对要求很高的现金转化门槛。',case:'Microsoft 变现企业身份、生产力、开发、安全、数据与云工作流。分发护城河扩大，但物理 AI 容量带来大型资本效率限制。',normalization:'FY2026 调整净利润 $128.8B，而包含租赁调整的现金 owner earnings 约 $63.9B。未开始的数据中心租赁为 $329.1B。',gate:'若 Azure 和非 OpenAI 需求放缓、容量承诺却扩大，先否决。证明需要 FCF 增速超过 capex/租赁，并在 FY2027 新分部下提供更清楚回报。'},
      {ticker:'PLTR',summary:'执行出色；估值几乎不给普通减速留空间。',case:'Palantir 销售用于高重要性数据与 AI 工作流的操作软件。部署与客户学习循环增强，但耐久性必须跨越极高起始估值。',normalization:'Q2 收入 $1.94B、经营利润 $0.91B；SBC $0.27B，税率仅 1.4%。冻结市值约为 2026 指引收入的 52 倍。',gate:'若增长减速快于每股现金复利，先否决。证明需要持续收入增长、正常税率下利润、合同转化与下降的 SBC 负担。'},
      {ticker:'TSLA',summary:'自动驾驶与机器人选择权仍缺少可审计的分部经济。',case:'Tesla 结合汽车、能源、软件与自动驾驶愿景。能源可能扩大平台，但自动驾驶仍需监督，核心汽车利润引擎很薄。',normalization:'Q2 经营利润率 1.4%，FCF 为负 $1.1B；报告利润含 $1.0B SpaceX 未实现收益，OCF 含 $1.15B SBC。',gate:'若核心利润率持续低、自动驾驶经济仍不披露，先否决。证明需要付费收入、安全、利用率、保险、贡献利润率以及扣除 AI/车队 capex 后的正现金。'},
      {ticker:'AMD',summary:'数据中心增长真实；与客户绑定的 warrants 提高每股证明门槛。',case:'AMD 是覆盖 CPU、加速器、系统与软件的无晶圆厂计算挑战者。数据中心位置增强，但软件与生态护城河仍落后领先者。',normalization:'Q2 Data Center 收入 $6.7B、FCF $1.6B。OpenAI 与 Meta warrants 合计最多 320M 股、行权价 $0.01，若全数满足相当于 Q2 基本股数的 19.6%。',gate:'若加速器经济不及预期且需求部分靠稀释换来，先否决。证明需要广泛部署，以及现金增长显著超过 warrants、SBC 与承诺。'},
    ]),
    auditTitle:'如何审计', auditBody:'每家公司都有带日期的本地 initiation memo，包含计算、精确证据链接、信心、未知项和复现说明。报告事实、模型计算、管理层说法和市场快照保持分离。',
    auditPoints:['SEC 与公司一手来源为 canonical。','市场快照已冻结，会随时间过期。','十年表格是反向门槛，不是预测或目标价。','QQQ 是默认科技基准；未假设 QQQ 未来收益。'],
    disclaimer:'公开研究，不是个性化投资建议。本页不授权连接券商、下单、仓位、目标价或任何资本动作。',
  },
  'zh-Hant': {
    lang:'zh-Hant',languageLabel:'語言',eyebrow:'RobinOS · 研究觀察站',title:'AI Berkshire 實地測試。',deck:'十家公司。四個有用視角。沒有模擬大師。',frozen:'研究截止：2026年9月6日 · 市場快照：2026年9月4日 12:40 ET · 非即時資料',researchOnly:'僅供研究',
    ownerSentences:['我們用 AI Berkshire 中有價值的部分測試了十家著名科技公司，並加入 NVIDIA。','這個方法改善了我們提出的問題，但沒有為任何公司產生可信的買入訊號。','保留原始碼作參考，只採用四個小型推理視角；考慮主動持有前，等待每家公司自己的證據。'],
    judgmentTitle:'一個判斷',judgment:'修改後採用',nextAction:'沿著下方證據門檻繼續跟進；在單一公司證明值得集中持有前，QQQ 仍是預設科技曝險。',
    methodTitle:'方法判斷',methodDeck:'只有當一手證據高於人物權威、估值保持條件化時，有用訊號才成立。',
    verdicts:[{tone:'adopt',tag:'採用',title:'四個緊湊視角',body:'區分資訊豐富度與信心；壓縮業務與護城河；反向尋找第一否決點；標準化 owner earnings。'},{tone:'modify',tag:'修改',title:'長期假設',body:'只有起始現金經濟可辯護時，才使用五至十年門檻；模型必須依產業調整。'},{tone:'reject',tag:'拒絕',title:'虛假權威',body:'拒絕模擬大師投票、強制目標價、固定終值倍數、二手來源等價和重疊的 22-skill 安裝。'},{tone:'signal',tag:'觀察到',title:'增量訊號',body:'對 MU、META、AMD、NVDA 有實質幫助，對 TSLA 有部分幫助。NVDA 把檢驗從輕資產平台擴展到生態融資經濟。'}],
    sequenceTitle:'研究順序',sequenceDeck:'A、B、C 排的是下一單位研究價值，不是預期報酬、公司品質或買入建議。',expand:'展開每家公司，查看因果邏輯、標準化證據和決策門檻。',labels:{case:'業務與護城河',normalization:'標準化證據',gate:'第一否決點與證明門檻',sources:'一手證據'},
    companies: enrich([
      {ticker:'META',summary:'廣告引擎優秀；AI 義務堆疊必須證明回報。',case:'Meta 把應用家族的注意力轉為高利潤廣告現金。網路與廣告主護城河仍寬，但隨業務大幅增加基礎設施，方向變得混合。',normalization:'Q2 收入 $60.8B，但公司定義 FCF 僅 $0.8B。未開始租賃 $279.0B、其他承諾 $349.3B；重疊未知，不能相加。',gate:'若廣告利潤放緩而固定 AI 成本繼續上升，先否決。證明需要 FoA 利潤恢復，以及含租賃、按每股計算的現金收益恢復。'},
      {ticker:'MU',summary:'AI 記憶體稀缺真實；下一個低谷決定它是否結構化。',case:'Micron 供應 DRAM、NAND 與 HBM。產品位置在增強，但 84.6% 毛利率只能證明稀缺，不能證明週期消失。',normalization:'LTM 扣除總資本開支的 FCF 約 $26.2B，而峰值季度年化調整 FCF 為 $73.2B。巨大差距使單一正常利潤基準不負責任。',gate:'若產能、替代或效率在估值兌現前破壞價格，先否決。9月30日 FQ4 後重做研究，並要求合約化的低谷經濟。'},
      {ticker:'GOOGL',summary:'Search 與 Cloud 強勁；現金轉化和生效中的補救措施主導股票判斷。',case:'Alphabet 透過 Search 與 YouTube 變現意圖，Cloud 成為更大利潤引擎。護城河分叉：Cloud 增強，Search 面臨生成式介面與法院要求的分發/資料補救。',normalization:'Q2 淨利主要來自 $99.0B 股權收益。H1 OCF $84.9B 減去 $80.6B capex，只剩 $4.3B simple FCF，同時公司融資 $49.6B 股權。',gate:'若 Search 變弱而 capex 與發行仍高，先否決。證明需要點擊經濟、Services/Cloud 利潤和無需反覆融資的每股 FCF 同時恢復。'},
      {ticker:'AMZN',summary:'AWS 卓越；合併層面的 owner cash 橋仍缺失。',case:'Amazon 結合電商、履約、廣告、訂閱與雲。AWS 是最高利潤的增量引擎，營運護城河仍在擴大。',normalization:'TTM OCF $161.4B，但淨 PP&E 購買 $169.0B，公司定義 FCF 為負 $7.6B。Q2 淨利亦含約 $53.4B、主要來自 Anthropic 的投資收益。',gate:'若 AWS 在建設轉化為現金前減速，先否決。證明需要扣除融資後的 owner earnings 轉正，並超過債務、租賃與 SBC 的增長。'},
      {ticker:'NVDA',summary:'AI 平台佔主導；融資支持的需求必須支撐推導的 $5.58T 規模。',case:'NVIDIA 提供晶片、網路、系統與軟體組成的加速運算平台。技術護城河增強，但客戶集中、中國限制與生態融資改變了經濟結構。',normalization:'LTM 全額扣除 SBC 後 FCF 約 $119.6B，但文件披露 $366B 合約承諾與最高 $108.5B 擔保。股權收益、應收、庫存與延長帳期保持分開。',gate:'若供應商投資、帳期、雲承諾、租賃與擔保造成循環需求，先否決。證明需要獨立客戶現金回報、OCF 跟上營業利益且或有曝險下降。'},
      {ticker:'QCOM',summary:'現金門檻可達到；Apple 流失仍可能把低估值變成陷阱。',case:'Qualcomm 把高利潤蜂巢式授權與手機、汽車、IoT 和資料中心晶片結合。QTL 仍強，多元化護城河仍在建設。',normalization:'LTM 報告 FCF $10.4B，全額扣除 SBC 的下限約 $7.2B，淨債務約 $7.0B。稅務會計和 17.8M Modular 收購股份使每股圖景更複雜。',gate:'若手機利潤流失快於新利潤到來，先否決。證明需要非手機利潤增長、QCT 利潤率穩定，以及扣除 SBC、收購與回購後的每股 FCF 增長。'},
      {ticker:'MSFT',summary:'最強企業護城河面對要求很高的現金轉化門檻。',case:'Microsoft 變現企業身分、生產力、開發、安全、資料與雲工作流。分發護城河擴大，但實體 AI 容量帶來大型資本效率限制。',normalization:'FY2026 調整淨利 $128.8B，而含租賃調整的現金 owner earnings 約 $63.9B。未開始的資料中心租賃為 $329.1B。',gate:'若 Azure 和非 OpenAI 需求放緩、容量承諾卻擴大，先否決。證明需要 FCF 增速超過 capex/租賃，並在 FY2027 新分部下提供更清楚回報。'},
      {ticker:'PLTR',summary:'執行出色；估值幾乎不給普通減速留空間。',case:'Palantir 銷售用於高重要性資料與 AI 工作流的操作軟體。部署與客戶學習循環增強，但耐久性必須跨越極高起始估值。',normalization:'Q2 收入 $1.94B、營業利益 $0.91B；SBC $0.27B，稅率僅 1.4%。凍結市值約為 2026 指引收入的 52 倍。',gate:'若增長減速快於每股現金複利，先否決。證明需要持續收入增長、正常稅率下利潤、合約轉化與下降的 SBC 負擔。'},
      {ticker:'TSLA',summary:'自動駕駛與機器人選擇權仍缺少可稽核的分部經濟。',case:'Tesla 結合汽車、能源、軟體與自動駕駛願景。能源可能擴大平台，但自動駕駛仍需監督，核心汽車利潤引擎很薄。',normalization:'Q2 營業利益率 1.4%，FCF 為負 $1.1B；報告利潤含 $1.0B SpaceX 未實現收益，OCF 含 $1.15B SBC。',gate:'若核心利潤率持續低、自動駕駛經濟仍不披露，先否決。證明需要付費收入、安全、利用率、保險、貢獻利潤率以及扣除 AI/車隊 capex 後的正現金。'},
      {ticker:'AMD',summary:'資料中心增長真實；與客戶綁定的 warrants 提高每股證明門檻。',case:'AMD 是涵蓋 CPU、加速器、系統與軟體的無晶圓廠運算挑戰者。資料中心位置增強，但軟體與生態護城河仍落後領先者。',normalization:'Q2 Data Center 收入 $6.7B、FCF $1.6B。OpenAI 與 Meta warrants 合計最多 320M 股、行使價 $0.01，若全數滿足相當於 Q2 基本股數的 19.6%。',gate:'若加速器經濟不及預期且需求部分靠稀釋換來，先否決。證明需要廣泛部署，以及現金增長顯著超過 warrants、SBC 與承諾。'},
    ]),
    auditTitle:'如何稽核',auditBody:'每家公司都有帶日期的本地 initiation memo，包含計算、精確證據連結、信心、未知項和重現說明。報告事實、模型計算、管理層說法與市場快照保持分離。',auditPoints:['SEC 與公司一手來源為 canonical。','市場快照已凍結，會隨時間過期。','十年表格是反向門檻，不是預測或目標價。','QQQ 是預設科技基準；未假設 QQQ 未來報酬。'],disclaimer:'公開研究，不是個人化投資建議。本頁不授權連接券商、下單、部位、目標價或任何資本動作。',
  },
  ja: {
    lang:'ja',languageLabel:'言語',eyebrow:'RobinOS · リサーチ観測所',title:'AI Berkshire 実地検証。',deck:'10社。4つの有用な視点。模擬の大家は不要。',frozen:'調査基準日：2026年9月6日 · 市場スナップショット：2026年9月4日 12:40 ET · ライブ配信ではありません',researchOnly:'調査目的のみ',
    ownerSentences:['AI Berkshire の有用な部分を、NVIDIA を含む有名テクノロジー企業10社で検証しました。','この方法は問いを良くしましたが、どの企業についても信頼できる買いシグナルは生みませんでした。','ソースコードは参照資料として残し、4つの小さな思考レンズだけを使い、個別株を積極保有する前に企業ごとの証拠を待ちます。'],
    judgmentTitle:'一つの判断',judgment:'修正して採用',nextAction:'下記の証拠ゲートを追跡します。単一企業が集中保有に値することを示すまでは、QQQ をテクノロジー投資の既定値とします。',
    methodTitle:'手法の判定',methodDeck:'一次証拠を人物の権威より上に置き、評価を条件付きにする場合にだけ、有用なシグナルが残ります。',
    verdicts:[{tone:'adopt',tag:'採用',title:'4つの簡潔なレンズ',body:'情報量と確信度を分ける。事業とモートを圧縮する。最初の棄却理由から逆算する。オーナー利益を正規化する。'},{tone:'modify',tag:'修正',title:'長期前提',body:'出発点の現金経済が擁護できる時だけ5～10年のハードルを使い、業種に合わせてモデルを変えます。'},{tone:'reject',tag:'棄却',title:'偽の権威',body:'模擬の大家による投票、強制目標株価、固定終価倍率、二次情報の同格扱い、重複する22スキルの一括導入を棄却します。'},{tone:'signal',tag:'観測',title:'追加シグナル',body:'MU、META、AMD、NVDA では重要、TSLA では部分的でした。NVDA は検証を資産軽量型プラットフォームから生態系金融へ広げました。'}],
    sequenceTitle:'調査順序',sequenceDeck:'A・B・C は次の調査1単位の価値を示すもので、期待リターン、企業品質、買い推奨の順位ではありません。',expand:'各社を開くと、因果関係、正規化した証拠、判断ゲートを確認できます。',labels:{case:'事業とモート',normalization:'正規化した証拠',gate:'最初の棄却理由と証明ゲート',sources:'一次証拠'},
    companies: enrich([
      {ticker:'META',summary:'広告エンジンは優秀。AIの債務的負担はリターンを証明する必要があります。',case:'Meta はアプリ群の注目を高収益の広告キャッシュに変えます。ネットワークと広告主のモートは広い一方、巨額インフラ化で方向性は混在しています。',normalization:'Q2 売上は $60.8B でしたが、会社定義 FCF は $0.8B。未開始リース $279.0B と他の契約 $349.3B は重複不明のため合算しません。',gate:'広告利益が鈍化し固定AIコストが増え続ければ、まず棄却します。FoA 利益と、リース込み一株当たり現金利益の回復が証明です。'},
      {ticker:'MU',summary:'AIメモリ不足は現実。次の谷が構造変化かを決めます。',case:'Micron は DRAM、NAND、HBM を供給します。製品地位は向上していますが、84.6%の粗利率は不足を示すだけで、サイクル消滅の証明ではありません。',normalization:'LTM の総設備投資控除後 FCF は約 $26.2B、ピーク四半期の年率調整 FCF は $73.2B。差が大きく、単一の正常利益は置けません。',gate:'供給増、代替、効率化が価格を崩せば先に棄却します。9月30日の FQ4 後に再評価し、契約で守られた谷の経済性を求めます。'},
      {ticker:'GOOGL',summary:'Search と Cloud は強い。現金転換と進行中の是正措置が判断を支配します。',case:'Alphabet は Search と YouTube で意図を収益化し、Cloud を第二の利益源にしています。Cloud は強化する一方、Search は生成AIと裁判所の配信・データ是正に直面します。',normalization:'Q2 純利益は $99.0B の株式評価益が中心。H1 OCF $84.9B から設備投資 $80.6B を引くと単純 FCF は $4.3B、同時に $49.6B の株式調達を行いました。',gate:'Search が弱まり設備投資と発行が高止まりすれば棄却します。クリック経済、Services/Cloud 利益、追加調達なしの一株FCF回復が証明です。'},
      {ticker:'AMZN',summary:'AWS は卓越。連結ベースのオーナーキャッシュ橋渡しは未完成です。',case:'Amazon は商取引、物流、広告、会員、クラウドを組み合わせます。AWS は最大の増分利益源で、運用モートは広がっています。',normalization:'TTM OCF $161.4B に対し純 PP&E 購入は $169.0B、会社定義 FCF はマイナス $7.6B。Q2 純利益には主に Anthropic の投資益約 $53.4B も含まれます。',gate:'AWS が投資の現金化前に減速すれば棄却します。資金調達後のオーナー利益がプラスとなり、債務・リース・SBC より速く増えることが証明です。'},
      {ticker:'NVDA',summary:'AI基盤は支配的。資金支援された需要が推定 $5.58T の規模を正当化する必要があります。',case:'NVIDIA は半導体、ネットワーク、システム、ソフトの加速計算基盤を販売します。技術モートは強化中ですが、顧客集中、中国規制、生態系金融が経済構造を変えています。',normalization:'LTM の SBC 全額控除後 FCF は約 $119.6B。一方、開示契約は $366B、保証上限は $108.5B です。株式益、売掛金、在庫、延長条件を分離します。',gate:'投資、支払条件、クラウド契約、リース、保証が循環需要を作るなら棄却します。独立した顧客現金、営業利益に追随するOCF、偶発債務の減少が証明です。'},
      {ticker:'QCOM',summary:'現金ハードルは届く。Apple離れで低評価が罠になる可能性があります。',case:'Qualcomm は高収益の通信ライセンスと、端末・自動車・IoT・データセンター向け半導体を組み合わせます。QTL は強い一方、多角化モートは構築中です。',normalization:'LTM 報告 FCF は $10.4B、SBC 全額控除の下限は約 $7.2B、純負債は約 $7.0B。税務と Modular 買収の 17.8M 株が一株経済を複雑にします。',gate:'端末利益の減少が新利益を上回れば棄却します。非端末利益、安定したQCTマージン、SBC・買収・買戻し後の一株FCF成長が証明です。'},
      {ticker:'MSFT',summary:'最強の企業モートに対し、現金転換ハードルは厳しい。',case:'Microsoft は企業ID、生産性、開発、安全、データ、クラウドを収益化します。配信モートは拡大中ですが、物理AI容量が大きな資本効率制約になります。',normalization:'FY2026 調整純利益 $128.8B に対し、リース調整後の現金オーナー利益は約 $63.9B。未開始データセンターリースは $329.1B でした。',gate:'Azure と OpenAI 以外の需要が鈍化し容量負担だけ増えれば棄却します。FCF が設備投資・リースより速く伸び、新 FY2027 セグメントでリターンが明確になることが証明です。'},
      {ticker:'PLTR',summary:'実行力は卓越。評価は通常の減速をほとんど許しません。',case:'Palantir は重要度の高いデータ・AI業務向け運用ソフトを販売します。導入と顧客学習の循環は強化中ですが、持続性は非常に高い初期評価を超える必要があります。',normalization:'Q2 売上 $1.94B、営業利益 $0.91B、SBC $0.27B、税率は1.4%。凍結時価総額は2026年売上ガイダンスの約52倍でした。',gate:'成長鈍化が一株現金の複利を上回れば棄却します。持続収益、通常税率の利益、契約転換、SBC負担低下が証明です。'},
      {ticker:'TSLA',summary:'自動運転とロボットの選択肢には、監査可能なセグメント経済がまだありません。',case:'Tesla は車両、エネルギー、ソフト、自動運転の構想を組み合わせます。エネルギーは基盤を広げ得ますが、自動運転は監督付きで、車両利益は薄い状態です。',normalization:'Q2 営業利益率は1.4%、FCF はマイナス $1.1B。報告利益に SpaceX 未実現益 $1.0B、OCF に SBC $1.15B が含まれます。',gate:'中核利益率が低いまま自動運転経済が非開示なら棄却します。有料売上、安全性、稼働率、保険、貢献利益、AI/車隊投資後のプラス現金が証明です。'},
      {ticker:'AMD',summary:'データセンター成長は実在。顧客連動ワラントが一株当たりの証明負担を高めます。',case:'AMD は CPU、アクセラレータ、システム、ソフトを持つファブレスの挑戦者です。データセンター地位は上昇中ですが、ソフトとエコシステムは先行者に劣ります。',normalization:'Q2 Data Center 売上 $6.7B、FCF $1.6B。OpenAI と Meta のワラントは合計最大 320M 株、行使価格 $0.01で、全条件達成ならQ2基本株数の19.6%です。',gate:'アクセラレータ経済が弱く、需要を希薄化で買っていれば棄却します。幅広い導入と、ワラント・SBC・契約負担を大きく上回る現金成長が証明です。'},
    ]),
    auditTitle:'監査方法',auditBody:'各社について、日付、計算、正確な証拠リンク、確信度、未知事項、再現手順を含むローカル initiation memo があります。報告値、モデル計算、経営陣の主張、市場スナップショットを分離しています。',auditPoints:['SEC と発行体の一次資料を正本とします。','市場スナップショットは凍結され、時間とともに古くなります。','10年表は逆算ハードルであり、予測や目標株価ではありません。','QQQ は既定の技術ベンチマークで、将来リターンは仮定しません。'],disclaimer:'公開調査であり、個別投資助言ではありません。このページは証券口座接続、注文、ポジションサイズ、目標株価、資本行動を許可しません。',
  },
} as const;

export type EvaluationLocale = keyof typeof evaluationCopy;
