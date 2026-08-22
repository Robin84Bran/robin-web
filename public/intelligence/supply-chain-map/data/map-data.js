/* Frozen, source-backed research data. See docs/METHODOLOGY.md. */
(function (root) {
  const ndxRows = [
    ["ADBE","Adobe",0.49],["AMD","Advanced Micro Devices",2.83],
    ["ABNB","Airbnb",0.29],["ALNY","Alnylam Pharmaceuticals",0.19],
    ["GOOG/GOOGL","Alphabet",7.56],["AMZN","Amazon",5.03],
    ["AEP","American Electric Power",0.36],["AMGN","Amgen",0.86],
    ["ADI","Analog Devices",0.94],["AAPL","Apple",7.18],
    ["AMAT","Applied Materials",1.49],["APP","AppLovin",0.68],
    ["ARM","Arm Holdings",0.14],["ASML","ASML Holding",0.60],
    ["ADSK","Autodesk",0.25],["ADP","Automatic Data Processing",0.42],
    ["AXON","Axon Enterprise",0.16],["BKR","Baker Hughes",0.33],
    ["BKNG","Booking Holdings",0.65],["AVGO","Broadcom",3.49],
    ["CDNS","Cadence Design Systems",0.45],["CHTR","Charter Communications",0.10],
    ["CTAS","Cintas",0.33],["CSCO","Cisco Systems",1.75],
    ["CCEP","Coca-Cola Europacific Partners",0.21],["CTSH","Cognizant",0.12],
    ["CMCSA","Comcast",0.47],["CEG","Constellation Energy",0.54],
    ["CPRT","Copart",0.16],["CSGP","CoStar Group",0.07],
    ["COST","Costco Wholesale",2.16],["CRWD","CrowdStrike",0.55],
    ["CSX","CSX",0.40],["DDOG","Datadog",0.22],
    ["DXCM","DexCom",0.11],["FANG","Diamondback Energy",0.28],
    ["DASH","DoorDash",0.35],["EA","Electronic Arts",0.24],
    ["EXC","Exelon",0.23],["FAST","Fastenal",0.25],
    ["FER","Ferrovial",0.24],["FTNT","Fortinet",0.31],
    ["GEHC","GE HealthCare",0.13],["GILD","Gilead Sciences",0.79],
    ["HON","Honeywell",0.65],["IDXX","IDEXX Laboratories",0.22],
    ["INSM","Insmed",0.14],["INTC","Intel",2.40],
    ["INTU","Intuit",0.53],["ISRG","Intuitive Surgical",0.78],
    ["KDP","Keurig Dr Pepper",0.19],["KLAC","KLA",1.09],
    ["KHC","Kraft Heinz",0.13],["LRCX","Lam Research",1.55],
    ["LIN","Linde",1.13],["MAR","Marriott International",0.45],
    ["MRVL","Marvell Technology",0.69],["MELI","MercadoLibre",0.45],
    ["META","Meta Platforms",3.13],["MCHP","Microchip Technology",0.25],
    ["MU","Micron Technology",2.94],["MSFT","Microsoft",5.37],
    ["MDLZ","Mondelez International",0.38],["MPWR","Monolithic Power Systems",0.37],
    ["MNST","Monster Beverage",0.36],["NFLX","Netflix",1.87],
    ["NVDA","NVIDIA",8.42],["NXPI","NXP Semiconductors",0.36],
    ["ORLY","O'Reilly Automotive",0.39],["ODFL","Old Dominion Freight Line",0.21],
    ["PCAR","PACCAR",0.29],["PLTR","Palantir Technologies",1.59],
    ["PANW","Palo Alto Networks",0.71],["PAYX","Paychex",0.16],
    ["PYPL","PayPal",0.22],["PDD","PDD Holdings",0.32],
    ["PEP","PepsiCo",1.04],["QCOM","Qualcomm",0.91],
    ["REGN","Regeneron Pharmaceuticals",0.35],["ROP","Roper Technologies",0.18],
    ["ROST","Ross Stores",0.36],["SNDK","Sandisk",0.84],
    ["STX","Seagate Technology",0.76],["SHOP","Shopify",0.75],
    ["SBUX","Starbucks",0.58],["MSTR","Strategy",0.27],
    ["SNPS","Synopsys",0.45],["TMUS","T-Mobile US",1.04],
    ["TTWO","Take-Two Interactive",0.19],["TSLA","Tesla",3.41],
    ["TXN","Texas Instruments",1.23],["TRI","Thomson Reuters",0.20],
    ["VRSK","Verisk Analytics",0.12],["VRTX","Vertex Pharmaceuticals",0.52],
    ["WMT","Walmart",3.10],["WDC","Western Digital",0.71],
    ["WDAY","Workday",0.13],["WBD","Warner Bros. Discovery",0.32],
    ["XEL","Xcel Energy",0.25],["ZS","Zscaler",0.11]
  ];

  const hkRows = [
    ["0020","SenseTime",null],["0135","Kunlun Energy",null],
    ["0144","China Merchants Port",null],["0175","Geely Automobile",0.87],
    ["0241","Alibaba Health",null],["0267","CITIC",0.49],
    ["0268","Kingdee International",null],["0285","BYD Electronic",null],
    ["0291","China Resources Beer",null],["0300","Midea Group",null],
    ["0322","Tingyi",null],["0384","China Gas Holdings",null],
    ["0386","Sinopec",0.72],["0688","China Overseas Land",null],
    ["0700","Tencent",10.36],["0728","China Telecom",0.45],
    ["0762","China Unicom",null],["0780","Tongcheng Travel",null],
    ["0788","China Tower",null],["0836","China Resources Power",null],
    ["0857","PetroChina",1.43],["0883","CNOOC",2.53],
    ["0939","China Construction Bank",6.20],["0941","China Mobile",3.79],
    ["0960","Longfor Group",null],["0981","SMIC",3.00],
    ["0992","Lenovo Group",1.26],["0998","CITIC Bank",0.44],
    ["1024","Kuaishou",1.01],["1088","China Shenhua Energy",1.03],
    ["1093","CSPC Pharmaceutical",0.45],["1109","China Resources Land",0.77],
    ["1171","Yankuang Energy",null],["1177","Sino Biopharmaceutical",null],
    ["1179","H World Group",null],["1193","China Resources Gas",null],
    ["1209","China Resources Mixc Lifestyle",null],["1211","BYD",2.13],
    ["1288","Agricultural Bank of China",1.25],["1336","New China Life",null],
    ["1339","PICC Group",null],["1347","Hua Hong Semiconductor",1.37],
    ["1378","China Hongqiao",0.56],["1398","ICBC",4.24],
    ["1519","J&T Global Express",null],["1530","3SBio",null],
    ["1658","Postal Savings Bank of China",null],["1801","Innovent Biologics",1.05],
    ["1810","Xiaomi",3.14],["1818","Zhaojin Mining",null],
    ["1919","COSCO Shipping Holdings",null],["1929","Chow Tai Fook Jewellery",null],
    ["2015","Li Auto",0.52],["2020","ANTA Sports",0.79],
    ["2057","ZTO Express",0.53],["2313","Shenzhou International",null],
    ["2318","Ping An Insurance",2.74],["2319","China Mengniu Dairy",null],
    ["2328","PICC Property and Casualty",0.79],["2331","Li Ning",null],
    ["2359","WuXi AppTec",0.60],["2367","Giant Biogene",null],
    ["2382","Sunny Optical",null],["2423","KE Holdings",0.64],
    ["2601","China Pacific Insurance",0.51],["2611","Guotai Haitong Securities",null],
    ["2618","JD Logistics",null],["2628","China Life Insurance",1.59],
    ["2688","ENN Energy",null],["2899","Zijin Mining",1.31],
    ["3311","China State Construction International",null],["3328","Bank of Communications",0.47],
    ["3690","Meituan",3.04],["3692","Hansoh Pharmaceutical",null],
    ["3750","CATL",1.16],["3888","Kingsoft",null],
    ["3968","China Merchants Bank",1.40],["3988","Bank of China",2.84],
    ["3993","CMOC",0.45],["6030","CITIC Securities",null],
    ["6160","BeOne Medicines",1.65],["6181","Laopu Gold",null],
    ["6618","JD Health",null],["6690","Haier Smart Home",null],
    ["6862","Haidilao",null],["9618","JD.com",1.26],
    ["9626","Bilibili",null],["9633","Nongfu Spring",0.64],
    ["9660","Horizon Robotics",null],["9863","Leapmotor",null],
    ["9866","NIO",null],["9868","XPeng",0.66],
    ["9888","Baidu",1.33],["9901","New Oriental Education",null],
    ["9926","Akeso",0.52],["9961","Trip.com Group",0.69],
    ["9987","Yum China",0.90],["9988","Alibaba",8.23],
    ["9992","Pop Mart",0.91],["9999","NetEase",2.56]
  ];

  const sources = [
    {id:"S_NDX",type:"index",date:"2026-05-01",title:"Nasdaq-100 Index component and weight snapshot",publisher:"Nasdaq",url:"https://www.nasdaq.com/docs/2026/05/04/NDX.pdf"},
    {id:"S_HK_FACT",type:"index",date:"2026-06-30",title:"Hang Seng China (Hong Kong-listed) 100 Index factsheet",publisher:"Hang Seng Indexes",url:"https://www.hsi.com.hk/static/uploads/contents/en/dl_centre/factsheets/hschk100e.pdf"},
    {id:"S_HK_METH",type:"index",date:"2026-06",title:"Hang Seng China (Hong Kong-listed) 100 Index methodology",publisher:"Hang Seng Indexes",url:"https://www.hsi.com.hk/static/uploads/contents/en/dl_centre/methodologies/IM_hschk100e.pdf"},
    {id:"S_HK_LIVE",type:"index",date:"2026-07-25",title:"HSCHK100 constituent endpoint",publisher:"Hang Seng Indexes",url:"https://www.hsi.com.hk/data/eng/rt/index-series/hschk100/constituents.do?1"},

    {id:"S_NVDA_AUTO_26",type:"company",date:"2026",title:"BYD, Geely, Isuzu and Nissan adopt NVIDIA DRIVE Hyperion",publisher:"NVIDIA",url:"https://investor.nvidia.com/news/press-release-details/2026/BYD-Geely-Isuzu-and-Nissan-Adopt-NVIDIA-DRIVE-Hyperion-for-Level-4-Vehicles/default.aspx"},
    {id:"S_NVDA_AUTO_24",type:"company",date:"2024-04-25",title:"AI drives future of transportation at Auto China",publisher:"NVIDIA",url:"https://blogs.nvidia.com/blog/nvidia-partners-auto-china/"},
    {id:"S_NVDA_LENOVO",type:"company",date:"2024-10-15",title:"NVIDIA and Lenovo bring hybrid AI to every enterprise",publisher:"NVIDIA",url:"https://blogs.nvidia.com/blog/nvidia-lenovo-tech-world/"},
    {id:"S_NVDA_CLOUD",type:"product",date:"2026",title:"NVIDIA AI Enterprise cloud deployment guide",publisher:"NVIDIA",url:"https://docs.nvidia.com/ai-enterprise/deployment/cloud/latest/overview.html"},
    {id:"S_NVDA_BAIDU",type:"company",date:"2017-07-05",title:"NVIDIA and Baidu announce broad AI partnership",publisher:"NVIDIA",url:"https://nvidianews.nvidia.com/news/nvidia-baidu-announce-partnership-to-accelerate-ai"},
    {id:"S_NVDA_NIO",type:"product",date:"2026",title:"NIO automotive partner profile",publisher:"NVIDIA",url:"https://www.nvidia.com/en-us/solutions/autonomous-vehicles/partners/nio/"},
    {id:"S_NVDA_CMCC",type:"company",date:"2022-07-25",title:"Accelerating cloud-native applications at China Mobile Bigcloud",publisher:"NVIDIA",url:"https://developer.nvidia.com/blog/accelerating-cloud-native-applications-at-china-mobile-bigcloud/"},

    {id:"S_QCOM_XIAOMI",type:"company",date:"2025-05-20",title:"Qualcomm and Xiaomi expand collaboration with multi-year agreement",publisher:"Qualcomm",url:"https://www.qualcomm.com/news/releases/2025/05/qualcomm-and-xiaomi-expand-collaboration-with-multi-year-agreeme"},
    {id:"S_QCOM_AUTO",type:"company",date:"2026-01",title:"Snapdragon Digital Chassis momentum with major automakers",publisher:"Qualcomm",url:"https://www.qualcomm.com/news/releases/2026/01/qualcomm-drives-the-future-of-mobility-with-strong-snapdragon-di"},
    {id:"S_QCOM_LEAP",type:"company",date:"2026-01-05",title:"Leapmotor and Qualcomm debut dual-Snapdragon automotive central computer",publisher:"Qualcomm",url:"https://www.qualcomm.com/news/releases/2026/01/leapmotor-and-qualcomm-debuts-world-s-first-automotive-central-c"},

    {id:"S_WAYMO_GEELY_21",type:"company",date:"2021-12-28",title:"Expanding Waymo One fleet with Geely's Zeekr",publisher:"Waymo",url:"https://waymo.com/intl/fil/blog/2021/12/expanding-our-waymo-one-fleet-with/"},
    {id:"S_WAYMO_GEELY_25",type:"company",date:"2025-05-05",title:"Scaling the Waymo fleet through U.S. manufacturing",publisher:"Waymo",url:"https://waymo.com/blog/2025/05/scaling-our-fleet-through-us-manufacturing/"},
    {id:"S_MSFT_LENOVO",type:"company",date:"2026-05-25",title:"Lenovo and Microsoft build for the AI PC era",publisher:"Microsoft",url:"https://news.microsoft.com/source/asia/2026/05/25/%E9%87%8D%E5%A1%91%E4%B8%AA%E4%BA%BA%E7%94%B5%E8%84%91%EF%BC%9A%E8%81%94%E6%83%B3%E6%90%BA%E6%89%8B%E5%BE%AE%E8%BD%AF%EF%BC%8C%E4%B8%BA-ai-pc-%E6%97%B6%E4%BB%A3%E6%89%93%E9%80%A0/?lang=zh-hans"},
    {id:"S_AMD_EPYC",type:"company",date:"2024-10-10",title:"AMD launches 5th Gen EPYC CPUs with Lenovo systems",publisher:"AMD",url:"https://www.amd.com/en/newsroom/press-releases/2024-10-10-amd-launches-5th-gen-amd-epyc-cpus-maintaining-le.html"},
    {id:"S_AMD_Q1_26",type:"filing",date:"2026-05-05",title:"AMD Q1 2026 earnings slides",publisher:"AMD",url:"https://ir.amd.com/financial-information/sec-filings/content/0000002488-26-000072/attachments/AMD%20Q1%2726%20Earnings%20Slides%20Final.pdf"},
    {id:"S_AMD_ALIBABA",type:"company",date:"undated",title:"Alibaba delivers AI acceleration solutions for e-commerce",publisher:"AMD",url:"https://www.amd.com/en/resources/case-studies/alibaba-cloud.html"},

    {id:"S_INTC_BAIDU",type:"company",date:"2020-12-15",title:"Baidu intelligent infrastructure transformation with Intel",publisher:"Intel",url:"https://www.intel.com/content/www/us/en/newsroom/news/baidu-intelligent-infrastructure-transformation.html"},
    {id:"S_INTC_ALIBABA",type:"company",date:"2026",title:"Intel and Alibaba Cloud partner overview",publisher:"Intel",url:"https://www.intel.com/content/www/us/en/partner/showcase/alibaba/overview.html"},
    {id:"S_INTC_LENOVO",type:"company",date:"2024-09-03",title:"Intel and Lenovo set a new standard for AI-powered PC experiences",publisher:"Intel",url:"https://newsroom.intel.com/client-computing/intel-lenovo-set-new-standard-ai-powered-pc-experiences"},
    {id:"S_INTC_UNICOM",type:"company",date:"2022-10",title:"China Unicom drives data-center energy savings",publisher:"Intel",url:"https://www.intel.com/content/www/us/en/customer-spotlight/stories/china-unicom-customer-story.html"},

    {id:"S_ARM_F1",type:"filing",date:"2023-08-21",title:"Arm Holdings F-1 registration statement",publisher:"Arm / SEC filing exhibit",url:"https://investors.arm.com/static-files/7c8dbdc5-414a-4092-8ca3-69858726618e"},
    {id:"S_ARM_LENOVO",type:"company",date:"2026",title:"Lenovo scales Level 4 autonomous robotaxis on Arm",publisher:"Arm",url:"https://newsroom.arm.com/blog/how-lenovo-scales-level-4-autonomous-robotaxis-on-arm"},
    {id:"S_ARM_GEELY",type:"company",date:"2025-10-23",title:"Arm brings software-driven intelligence to Geely EX5",publisher:"Arm",url:"https://newsroom.arm.com/news/arm-geely-ex5-software-defined-intelligence"},

    {id:"S_APPLE_SUPPLIERS",type:"company",date:"FY2022",title:"Apple supplier list",publisher:"Apple",url:"https://www.apple.com.cn/supplier-responsibility/pdf/Apple-Supplier-List.pdf"},
    {id:"S_TESLA_10K",type:"filing",date:"2026-01-29",title:"Tesla 2025 Form 10-K",publisher:"U.S. SEC",url:"https://www.sec.gov/Archives/edgar/data/1318605/000162828026003952/tsla-20251231.htm"},
    {id:"S_SNPS_SMIC",type:"product",date:"2026",title:"SMIC foundry-sponsored Synopsys DesignWare IP",publisher:"Synopsys",url:"https://www.synopsys.com/designware-ip/download-foundry-sponsored-smic.html"},
    {id:"S_SNPS_HUAHONG",type:"company",date:"2011-04-25",title:"Synopsys and HHNEC announce low-power reference flow",publisher:"Synopsys",url:"https://news.synopsys.com/home?item=123276"},
    {id:"S_CDNS_SMIC",type:"product",date:"2026-06-27",title:"SMIC DFM solution",publisher:"Cadence",url:"https://www.cadence.com/en_US/home/resources/videos/tools/digital-design-signoff/smic-dfm-solution.html"},
    {id:"S_AMAT_SMIC",type:"company",date:"2004-11-09",title:"Applied Materials ships 250th copper CMP system to SMIC",publisher:"Applied Materials",url:"https://ir.appliedmaterials.com/news-releases/news-release-details/applied-materials-ships-milestone-250th-copper-cmp-system-chinas"},
    {id:"S_LRCX_SMIC",type:"company",date:"2002-04-17",title:"Lam Research agreement with SMIC for equipment exceeding $100 million",publisher:"Lam Research",url:"https://newsroom.lamresearch.com/2002-04-17-Lam-Research-Corporation-Concludes-Agreement-with-SMIC-for-the-Purchase-of-Equipment-Exceeding-100M"},
    {id:"S_ASML_SMIC",type:"company",date:"2021-03-03",title:"Clarification on SMIC volume purchasing agreement",publisher:"ASML",url:"https://www.asml.com/en/news/press-releases/2021/clarification-on-smic-volume-purchasing-agreement"},
    {id:"S_NXP_GEELY",type:"company",date:"2017-01-06",title:"NXP and Geely strategic automotive R&D partnership",publisher:"NXP",url:"https://www.nxp.com/company/about-nxp/newsroom/NW-GEELY-AUTOMOTIVE-RESEARCH"},
    {id:"S_NXP_NIO",type:"company",date:"2023-05",title:"NIO and NXP collaborate on 4D imaging radar",publisher:"NXP",url:"https://www.nxp.com/docs/en/supporting-information/PR_GER_NIO-IR.pdf"},
    {id:"S_NXP_XIAOMI",type:"company",date:"2025-07-16",title:"NXP enables Xiaomi with ultra-wideband technology",publisher:"NXP",url:"https://www.nxp.com/company/about-nxp/smarter-world-blog/BL-NXP-ENABLES-XIAOMI-WITH-ULTRA-WIDEBAND-TECH"},
    {id:"S_ADI_BYD",type:"company",date:"2019-02-04",title:"BYD selects Analog Devices audio bus and processor technologies",publisher:"Analog Devices",url:"https://investor.analog.com/node/22136/pdf"},
    {id:"S_ADI_BAIDU",type:"company",date:"2018-07-10",title:"Analog Devices collaborates with Baidu on Project Apollo",publisher:"Analog Devices",url:"https://investor.analog.com/news-releases/news-release-details/analog-devices-collaborates-baidu-project-apollo-advance/"},

    {id:"S_BIS_ADV",type:"policy",date:"2025-01-15",title:"U.S. advanced-computing semiconductor controls and foundry due diligence",publisher:"U.S. Bureau of Industry and Security",url:"https://www.bis.gov/press-release/commerce-strengthens-restrictions-advanced-computing-semiconductors-enhance-foundry-due-diligence-prevent"},
    {id:"S_BIS_SEMI",type:"policy",date:"2024-12-02",title:"U.S. controls on advanced semiconductors, equipment, HBM and ECAD/TCAD",publisher:"U.S. Bureau of Industry and Security",url:"https://www.bis.gov/press-release/commerce-strengthens-export-controls-restrict-chinas-capability-produce-advanced-semiconductors-military"},
    {id:"S_BIS_CADENCE",type:"policy",date:"2025-07-28",title:"Cadence export-enforcement settlement",publisher:"U.S. Bureau of Industry and Security",url:"https://media.bis.gov/press-release/cadence-design-systems-pay-95-million-penalty-bis-unauthorized-exports-chinese-entities-tied-development"},
    {id:"S_BIS_CONNECTED",type:"policy",date:"2025-01-14",title:"Connected vehicle supply-chain final rule",publisher:"U.S. Bureau of Industry and Security",url:"https://www.bis.gov/press-release/commerce-finalizes-rule-secure-connected-vehicle-supply-chains-foreign-adversary-threats"},
    {id:"S_NL_EXPORT",type:"policy",date:"2025-01-15",title:"Netherlands tightens export controls on advanced semiconductor equipment",publisher:"Government of the Netherlands",url:"https://www.government.nl/latest/news/2025/01/15/klever-export-controls-on-advanced-semiconductor-manufacturing-equipment-to-be-tightened"},
    {id:"S_CN_DATA",type:"policy",date:"2024-03-23",title:"China regulations on cross-border data flows",publisher:"State Council of the PRC",url:"https://english.www.gov.cn/news/202403/23/content_WS65fe0f84c6d0868f4e8e5612.html"},
    {id:"S_CN_MATERIALS",type:"policy",date:"2023-11-30",title:"China export controls on graphite, gallium and germanium",publisher:"Ministry of Commerce of the PRC",url:"https://english.mofcom.gov.cn/News/PressConference/art/2023/art_cd46d6e56bb6486a928ea2f16182ae90.html"},
    {id:"S_CN_COUNTER",type:"policy",date:"2026-04-13",title:"China rules countering unlawful extraterritorial jurisdiction",publisher:"State Council of the PRC",url:"https://english.www.gov.cn/policies/latestreleases/202604/13/content_WS69dcc947c6d00ca5f9a0a5b9.html"},

    {id:"S_BIS_ADV_GUIDANCE_26",type:"policy",date:"2026-05-31",title:"BIS guidance on advanced-computing items and D:5 / Macau-headquartered entities",publisher:"U.S. Bureau of Industry and Security",url:"https://www.bis.gov/media/documents/bis-guidance-may-31-2026.pdf"},
    {id:"S_BIS_ADV_H200_26",type:"policy",date:"2026-01-15",title:"Revised license review policy for H200-equivalent and less-advanced chips",publisher:"U.S. Bureau of Industry and Security / Federal Register",url:"https://www.federalregister.gov/d/2026-00789"},
    {id:"S_BIS_CV_GUIDE_26",type:"policy",date:"2026-05",title:"Connected vehicles final rule small-entity compliance guide",publisher:"U.S. Bureau of Industry and Security",url:"https://media.bis.gov/media/documents/cv-secg.pdf"},
    {id:"S_CN_MATERIALS_US_24",type:"policy",date:"2024-12-03",title:"China strengthens dual-use export controls for the United States",publisher:"Ministry of Commerce of the PRC",url:"https://exportcontrol.mofcom.gov.cn/article/zcfg/gnzcfg/zcfggzqd/202412/1072.html"},
    {id:"S_CN_DATA_CERT_26",type:"policy",date:"2025-10-18",title:"China rules for certification of personal-information exports",publisher:"State Council of the PRC",url:"https://english.www.gov.cn/english.www.gov.cn/news/202510/18/content_WS68f33d41c6d00ca5f9a06e13.html"},
    {id:"S_USGS_MCS_26",type:"government",date:"2026",title:"Mineral Commodity Summaries 2026",publisher:"U.S. Geological Survey",url:"https://pubs.usgs.gov/periodicals/mcs2026/mcs2026.pdf"},
    {id:"S_DOE_GALLIUM_25",type:"government",date:"2025-09-10",title:"U.S. funding intent for domestic gallium recovery",publisher:"U.S. Department of Energy",url:"https://www.energy.gov/hgeo/articles/us-department-energy-announces-intent-fund-projects-advance-domestic-gallium"},
    {id:"S_HUAWEI_ASCEND_25",type:"company",date:"2025-09-20",title:"Huawei opens Ascend hardware and CANN ecosystem",publisher:"Huawei",url:"https://www.huawei.com/en/news/2025/9/hc-shengten-opensource"},
    {id:"S_BAIDU_KUNLUN_26",type:"filing",date:"2026-01-01",title:"Baidu proposed spin-off and separate listing of Kunlunxin",publisher:"Baidu",url:"https://ir.baidu.com/news-releases/news-release-details/baidu-announces-proposed-spin-and-separate-listing-kunlunxin/"},
    {id:"S_ALIBABA_AIACC_26",type:"product",date:"2026-04-15",title:"Alibaba Cloud AIACC training and inference acceleration",publisher:"Alibaba Cloud",url:"https://www.alibabacloud.com/help/en/pai/ai-acceleration-1/"},
    {id:"S_HORIZON_J6_26",type:"product",date:"2026",title:"Horizon Journey 6 automotive intelligence platform",publisher:"Horizon Robotics",url:"https://www.horizon.auto/en/solutions/horizon-journey/horizon-journey6?tp=1"},
    {id:"S_EMPYREAN_FOUNDRY",type:"product",date:"2026",title:"Empyrean foundry EDA tool portfolio",publisher:"Empyrean Technology",url:"https://www.empyrean-tech.com/products/eda/foundry.html"},

    {id:"S_TSMC_APPLE_26",type:"company",date:"2026-02-24",title:"Apple accelerates U.S. manufacturing with Mac mini production",publisher:"Apple",url:"https://www.apple.com/newsroom/2026/02/apple-accelerates-us-manufacturing-with-mac-mini-production/"},
    {id:"S_TSMC_NVDA_25",type:"company",date:"2025-10-17",title:"NVIDIA and TSMC celebrate first U.S.-made Blackwell wafer",publisher:"NVIDIA",url:"https://blogs.nvidia.com/blog/tsmc-blackwell-manufacturing/"},
    {id:"S_AMD_FOUNDRIES_25",type:"filing",date:"2026-02-04",title:"AMD 2025 Form 10-K",publisher:"AMD / U.S. SEC",url:"https://ir.amd.com/financial-information/sec-filings/content/0001193125-26-129106/0001193125-26-129106.pdf"},
    {id:"S_SAMSUNG_APPLE_25",type:"company",date:"2025-08-06",title:"Apple expands U.S. manufacturing program with Samsung Austin",publisher:"Apple",url:"https://www.apple.com/newsroom/2025/08/apple-increases-us-commitment-to-600-billion-usd-announces-ambitious-program/"},
    {id:"S_SKHYNIX_NVDA_26",type:"company",date:"2026-06-08",title:"SK hynix and NVIDIA establish multi-year technology partnership",publisher:"SK hynix",url:"https://news.skhynix.com/multi-year-tech-partnership-with-nvidia/"},
    {id:"S_ASE_NVDA_25",type:"company",date:"2025-01-16",title:"SPIL hosts NVIDIA at new assembly and test factory site",publisher:"ASE Technology",url:"https://www.aseglobal.com/press-room/spil-hosts-nvidia-founder-and-ceo-at-new-factory-site/"},
    {id:"S_FOXCONN_NVDA_26",type:"company",date:"2026-06-01",title:"Foxconn demonstrates NVIDIA Vera Rubin manufacturing and AI-factory capabilities at COMPUTEX 2026",publisher:"Hon Hai Technology Group",url:"https://www.honhai.com/en-us/press-center/press-releases/latest-news/2044"},
    {id:"S_TEL_TSMC_24",type:"company",date:"2024-12-23",title:"Tokyo Electron receives TSMC technology collaboration and production support awards",publisher:"Tokyo Electron",url:"https://www.tel.com/news/topics/2024/20241223_001.html"},
    {id:"S_INFINEON_NVDA_26",type:"company",date:"2026-05-29",title:"Infineon joins NVIDIA 800 VDC data-center architecture",publisher:"Infineon",url:"https://www.infineon.com/press-release/2026/infxx202605-092"},
    {id:"S_BOSCH_QCOM_26",type:"company",date:"2026-04-10",title:"Bosch and Qualcomm expand collaboration on ADAS",publisher:"Qualcomm",url:"https://www.qualcomm.com/news/releases/2026/04/bosch-and-qualcomm-expand-collaboration-to-strategic-adas-soluti"},
    {id:"S_APPLE_BOSCH_TSMC_26",type:"company",date:"2026-03-26",title:"Apple adds Bosch and TSMC to its American Manufacturing Program",publisher:"Apple",url:"https://www.apple.com/newsroom/2026/03/apple-adds-new-partners-to-its-american-manufacturing-program/"},
    {id:"S_SONY_TSMC_26",type:"company",date:"2026-05-08",title:"Sony Semiconductor Solutions and TSMC announce next-generation image-sensor MOU",publisher:"Sony Semiconductor Solutions",url:"https://www.sony-semicon.com/en/news/2026/2026050801.html"},
    {id:"S_SKHYNIX_TSMC_24",type:"company",date:"2024-04-19",title:"SK hynix and TSMC partner on HBM4 and advanced packaging",publisher:"SK hynix",url:"https://news.skhynix.com/sk-hynix-partners-with-tsmc-to-strengthen-hbm-technological-leadership/"},

    {id:"S_OPENAI_MSFT_26",type:"company",date:"2026-04-27",title:"The next phase of the Microsoft–OpenAI partnership",publisher:"OpenAI",url:"https://openai.com/index/next-phase-of-microsoft-partnership/"},
    {id:"S_OPENAI_AMD_25",type:"company",date:"2025-10-06",title:"OpenAI and AMD announce 6-gigawatt strategic compute partnership",publisher:"OpenAI",url:"https://openai.com/index/openai-amd-strategic-partnership/"},
    {id:"S_OPENAI_AVGO_25",type:"company",date:"2025-10-13",title:"OpenAI and Broadcom announce 10-gigawatt custom accelerator collaboration",publisher:"OpenAI",url:"https://openai.com/index/openai-and-broadcom-announce-strategic-collaboration/"},
    {id:"S_OPENAI_INFRA_26",type:"company",date:"2026-02-27",title:"Scaling AI infrastructure for everyone",publisher:"OpenAI",url:"https://openai.com/index/scaling-ai-for-everyone/"},
    {id:"S_ANTHROPIC_AMZN_26",type:"company",date:"2026-04-20",title:"Anthropic and Amazon expand Trainium compute partnership",publisher:"Anthropic",url:"https://www.anthropic.com/news/anthropic-amazon-compute"},
    {id:"S_ANTHROPIC_GOOG_25",type:"company",date:"2025-10-23",title:"Anthropic expands use of Google Cloud TPUs and services",publisher:"Anthropic",url:"https://www.anthropic.com/news/expanding-our-use-of-google-cloud-tpus-and-services"},
    {id:"S_XAI_ANTHROPIC_26",type:"company",date:"2026-05-06",title:"xAI and Anthropic announce compute partnership",publisher:"xAI",url:"https://x.ai/news/anthropic-compute-partnership"},
    {id:"S_DEEPSEEK_MSFT_25",type:"company",date:"2025-01-29",title:"DeepSeek R1 becomes available on Azure AI Foundry and GitHub",publisher:"Microsoft Azure",url:"https://azure.microsoft.com/en-us/blog/deepseek-r1-is-now-available-on-azure-ai-foundry-and-github/"},
    {id:"S_DEEPSEEK_AWS_25",type:"company",date:"2025-03-10",title:"DeepSeek R1 becomes fully managed in Amazon Bedrock",publisher:"Amazon Web Services",url:"https://aws.amazon.com/about-aws/whats-new/2025/03/deepseek-r1-fully-managed-amazon-bedrock/"},
    {id:"S_ALIBABA_DEEPSEEK_26",type:"product",date:"2026-07-06",title:"DeepSeek models in Alibaba Cloud Model Studio",publisher:"Alibaba Cloud",url:"https://www.alibabacloud.com/help/en/model-studio/deepseek-api"},
    {id:"S_ALIBABA_KIMI_26",type:"product",date:"2026-07-06",title:"Kimi models in Alibaba Cloud Model Studio",publisher:"Alibaba Cloud",url:"https://www.alibabacloud.com/help/en/model-studio/kimi-api"},

    {id:"S_NVDA_FIGURE_25",type:"company",date:"2025-10-28",title:"NVIDIA and U.S. robotics leaders expand physical AI manufacturing",publisher:"NVIDIA",url:"https://nvidianews.nvidia.com/news/nvidia-us-manufacturing-robotics-physical-ai"},
    {id:"S_GOOG_APPTRONIK_25",type:"company",date:"2025-03-12",title:"Gemini Robotics brings AI into the physical world with Apptronik",publisher:"Google DeepMind",url:"https://deepmind.google/blog/gemini-robotics-brings-ai-into-the-physical-world/"},
    {id:"S_NVDA_AGILITY_26",type:"company",date:"2026-06-22",title:"Agility Robotics becomes first NVIDIA Halos integration partner",publisher:"NVIDIA",url:"https://nvidianews.nvidia.com/news/nvidia-announces-halos-for-robotics-the-industrys-first-full-stack-safety-system-for-physical-ai"},
    {id:"S_AMZN_AGILITY",type:"company",date:"2023",title:"Agility Robotics broadens relationship with Amazon",publisher:"Agility Robotics",url:"https://www.agilityrobotics.com/content/agility-robotics-broadens-relationship-with-amazon"},
    {id:"S_GOOG_BOSTON_26",type:"company",date:"2026-01-05",title:"Boston Dynamics and Google DeepMind form AI partnership",publisher:"Boston Dynamics",url:"https://bostondynamics.com/blog/boston-dynamics-google-deepmind-form-new-ai-partnership/"},
    {id:"S_NVDA_UNITREE_26",type:"company",date:"2026-05-31",title:"NVIDIA open humanoid robot reference design includes Unitree H2",publisher:"NVIDIA",url:"https://nvidianews.nvidia.com/news/nvidia-open-humanoid-robot-reference-design"}
  ];

  const pilot = [
    {id:"N_NVDA",side:"nasdaq",symbol:"NVDA",name:"NVIDIA",sector:"Compute",role:"Accelerators + autonomous compute",summary:"GPU/AI software platform and vehicle compute."},
    {id:"N_QCOM",side:"nasdaq",symbol:"QCOM",name:"Qualcomm",sector:"Compute",role:"Edge/mobile/vehicle SoCs",summary:"Snapdragon compute for devices and vehicles."},
    {id:"N_TSLA",side:"nasdaq",symbol:"TSLA",name:"Tesla",sector:"Autonomy",role:"EV + physical AI platform",summary:"EV manufacturer, autonomy stack and battery buyer."},
    {id:"N_AAPL",side:"nasdaq",symbol:"AAPL",name:"Apple",sector:"Devices",role:"Device platform + buyer",summary:"Global device platform with Asian manufacturing depth."},
    {id:"N_MSFT",side:"nasdaq",symbol:"MSFT",name:"Microsoft",sector:"Cloud/software",role:"OS, cloud + AI services",summary:"Windows, Azure and AI software ecosystem."},
    {id:"N_AMZN",side:"nasdaq",symbol:"AMZN",name:"Amazon",sector:"Cloud/software",role:"Cloud + robotics operator",summary:"AWS infrastructure and large-scale warehouse robotics."},
    {id:"N_GOOG",side:"nasdaq",symbol:"GOOG/GOOGL",name:"Alphabet",sector:"Cloud/software",role:"Cloud, models + autonomy",summary:"Google AI/cloud plus Waymo autonomous driving."},
    {id:"N_META",side:"nasdaq",symbol:"META",name:"Meta Platforms",sector:"Cloud/software",role:"Models + consumer AI",summary:"Open-model and large AI-infrastructure buyer."},
    {id:"N_AMD",side:"nasdaq",symbol:"AMD",name:"AMD",sector:"Compute",role:"CPU + GPU supplier",summary:"Data-center CPU/GPU and client AI compute."},
    {id:"N_AVGO",side:"nasdaq",symbol:"AVGO",name:"Broadcom",sector:"Compute",role:"Networking + custom silicon",summary:"AI-networking, connectivity and custom accelerator silicon."},
    {id:"N_MU",side:"nasdaq",symbol:"MU",name:"Micron",sector:"Compute",role:"Memory supplier",summary:"DRAM, NAND and high-bandwidth memory."},
    {id:"N_AMAT",side:"nasdaq",symbol:"AMAT",name:"Applied Materials",sector:"Chipmaking",role:"Wafer-fab equipment",summary:"Deposition, materials engineering and process equipment."},
    {id:"N_LRCX",side:"nasdaq",symbol:"LRCX",name:"Lam Research",sector:"Chipmaking",role:"Wafer-fab equipment",summary:"Etch, deposition and clean equipment."},
    {id:"N_KLAC",side:"nasdaq",symbol:"KLAC",name:"KLA",sector:"Chipmaking",role:"Process control",summary:"Inspection and metrology for semiconductor manufacturing."},
    {id:"N_SNPS",side:"nasdaq",symbol:"SNPS",name:"Synopsys",sector:"EDA/IP",role:"EDA + semiconductor IP",summary:"Chip-design software and reusable design IP."},
    {id:"N_CDNS",side:"nasdaq",symbol:"CDNS",name:"Cadence",sector:"EDA/IP",role:"EDA + design IP",summary:"Chip/system design software and semiconductor IP."},
    {id:"N_ASML",side:"nasdaq",symbol:"ASML",name:"ASML",sector:"Chipmaking",role:"Lithography",summary:"Critical lithography equipment; Netherlands-headquartered."},
    {id:"N_ARM",side:"nasdaq",symbol:"ARM",name:"Arm",sector:"EDA/IP",role:"CPU architecture/IP",summary:"Licensable compute architecture across edge, cloud and vehicles."},
    {id:"N_INTC",side:"nasdaq",symbol:"INTC",name:"Intel",sector:"Compute",role:"CPU, accelerator + platform",summary:"Compute hardware and platform software."},
    {id:"N_NXPI",side:"nasdaq",symbol:"NXPI",name:"NXP",sector:"Components",role:"Automotive semiconductors",summary:"MCUs, connectivity, secure access and vehicle networks."},
    {id:"N_ADI",side:"nasdaq",symbol:"ADI",name:"Analog Devices",sector:"Components",role:"Sensors, signal chain + vehicle connectivity",summary:"Analog, mixed-signal and sensing components used to turn physical signals into machine-readable data.",phase:"2A"},

    {id:"H_TENCENT",side:"hkex",symbol:"0700",name:"Tencent",sector:"Cloud/software",role:"Cloud, models + distribution",summary:"Cloud/AI services and large consumer distribution."},
    {id:"H_ALIBABA",side:"hkex",symbol:"9988",name:"Alibaba",sector:"Cloud/software",role:"Cloud, models + commerce",summary:"Alibaba Cloud, model platform and commerce distribution."},
    {id:"H_XIAOMI",side:"hkex",symbol:"1810",name:"Xiaomi",sector:"Devices",role:"Phones, IoT + EV platform",summary:"Device ecosystem extending into intelligent vehicles."},
    {id:"H_SMIC",side:"hkex",symbol:"0981",name:"SMIC",sector:"Chipmaking",role:"Semiconductor foundry",summary:"Mainland China's largest pure-play foundry."},
    {id:"H_BYD",side:"hkex",symbol:"1211",name:"BYD",sector:"Autonomy",role:"EV + battery manufacturer",summary:"Vertically integrated EV, battery and electronics platform."},
    {id:"H_HUAHONG",side:"hkex",symbol:"1347",name:"Hua Hong Semiconductor",sector:"Chipmaking",role:"Specialty foundry",summary:"Specialty process foundry for embedded and power chips."},
    {id:"H_BAIDU",side:"hkex",symbol:"9888",name:"Baidu",sector:"Cloud/software",role:"Cloud, models + autonomy",summary:"AI cloud, foundation models and Apollo autonomy."},
    {id:"H_JD",side:"hkex",symbol:"9618",name:"JD.com",sector:"Cloud/software",role:"Commerce + logistics automation",summary:"E-commerce, logistics and automation demand platform."},
    {id:"H_LENOVO",side:"hkex",symbol:"0992",name:"Lenovo",sector:"Devices",role:"Systems integration",summary:"PC, server, edge and hybrid-AI systems integrator."},
    {id:"H_CATL",side:"hkex",symbol:"3750",name:"CATL",sector:"Energy",role:"Battery cells + systems",summary:"EV and stationary battery-cell supplier."},
    {id:"H_GEELY",side:"hkex",symbol:"0175",name:"Geely",sector:"Autonomy",role:"EV + vehicle platform",summary:"Automotive group spanning EV brands and vehicle engineering."},
    {id:"H_XPENG",side:"hkex",symbol:"9868",name:"XPeng",sector:"Autonomy",role:"Smart EV + autonomy",summary:"Software-defined EV and driver-assistance developer."},
    {id:"H_LIAUTO",side:"hkex",symbol:"2015",name:"Li Auto",sector:"Autonomy",role:"Smart EV + autonomy",summary:"Intelligent EV platform using multi-vendor compute."},
    {id:"H_SUNNY",side:"hkex",symbol:"2382",name:"Sunny Optical",sector:"Components",role:"Optics + imaging",summary:"Optical components and imaging modules."},
    {id:"H_SENSETIME",side:"hkex",symbol:"0020",name:"SenseTime",sector:"Cloud/software",role:"Computer vision + models",summary:"AI model and vision software platform."},
    {id:"H_KINGDEE",side:"hkex",symbol:"0268",name:"Kingdee",sector:"Cloud/software",role:"Enterprise software",summary:"Enterprise-management software and cloud services."},
    {id:"H_BYDE",side:"hkex",symbol:"0285",name:"BYD Electronic",sector:"Devices",role:"Contract manufacturing",summary:"Electronics manufacturing and device integration."},
    {id:"H_HORIZON",side:"hkex",symbol:"9660",name:"Horizon Robotics",sector:"Compute",role:"Vehicle AI compute",summary:"Automotive compute chips and driving software."},
    {id:"H_KUAISHOU",side:"hkex",symbol:"1024",name:"Kuaishou",sector:"Cloud/software",role:"Consumer AI + video",summary:"Video platform and model-driven content distribution."},
    {id:"H_CHINAMOBILE",side:"hkex",symbol:"0941",name:"China Mobile",sector:"Connectivity",role:"Network + compute infrastructure",summary:"Telecom network, data centers and cloud distribution."},
    {id:"H_NIO",side:"hkex",symbol:"9866",name:"NIO",sector:"Autonomy",role:"Smart EV + autonomy platform",summary:"Premium smart-EV manufacturer with centralized vehicle compute and sensor stacks.",phase:"2A"},
    {id:"H_LEAPMOTOR",side:"hkex",symbol:"9863",name:"Leapmotor",sector:"Autonomy",role:"Smart EV + centralized compute",summary:"EV manufacturer developing highly integrated vehicle electronics and autonomy systems.",phase:"2A"},
    {id:"H_CHINAUNICOM",side:"hkex",symbol:"0762",name:"China Unicom",sector:"Connectivity",role:"Network, cloud + data centers",summary:"Telecom and cloud operator deploying data-center compute and energy-management systems.",phase:"2A"}
  ];

  const policies = [
    {id:"P_US_ADV",name:"U.S. advanced-compute controls",severity:"high",jurisdiction:"United States",source_ids:["S_BIS_ADV","S_BIS_ADV_GUIDANCE_26","S_BIS_ADV_H200_26"],summary:"Licenses remain required for covered advanced-computing items to Macau and D:5-headquartered entities globally; some H200-equivalent and less-advanced items moved to case-by-case review in January 2026.",mechanism:"License requirement, performance thresholds, end-user review and certification."},
    {id:"P_US_SEMI",name:"U.S. semiconductor-tool and EDA controls",severity:"high",jurisdiction:"United States",source_ids:["S_BIS_SEMI","S_BIS_CADENCE"],summary:"Controls cover advanced-node manufacturing equipment, HBM and specified ECAD/TCAD tools; enforcement history is material.",mechanism:"Export licensing, end-use restrictions, Entity List exposure and enforcement."},
    {id:"P_NL_SEMI",name:"Dutch semiconductor-equipment licensing",severity:"high",jurisdiction:"Netherlands",source_ids:["S_NL_EXPORT"],summary:"Advanced lithography plus selected measurement/inspection equipment require export authorization outside the EU.",mechanism:"Case-by-case national export authorization; not a blanket ban."},
    {id:"P_US_CV",name:"U.S. connected-vehicle rule",severity:"medium",jurisdiction:"United States",source_ids:["S_BIS_CONNECTED","S_BIS_CV_GUIDE_26"],summary:"The final rule restricts covered VCS/ADS hardware and software with a sufficient PRC or Russia nexus, with prohibitions phased by model year.",mechanism:"Import/sale prohibitions phased by model year and component category."},
    {id:"P_CN_DATA",name:"China cross-border data governance",severity:"medium",jurisdiction:"China",source_ids:["S_CN_DATA","S_CN_DATA_CERT_26"],summary:"Important or large-scale personal-data exports can require assessment or certification; exemptions, consent and thresholds apply.",mechanism:"Security assessment, certification and data-transfer compliance."},
    {id:"P_CN_MATERIALS",name:"China critical-material export controls",severity:"medium",jurisdiction:"China",source_ids:["S_CN_MATERIALS","S_CN_MATERIALS_US_24"],summary:"Graphite, gallium and germanium exports are controlled; 2024 measures tightened destination-specific treatment for the United States.",mechanism:"Dual-use export permit review and destination-specific restriction."},
    {id:"P_CN_COUNTER",name:"China counter-extraterritorial rules",severity:"medium",jurisdiction:"China",source_ids:["S_CN_COUNTER"],summary:"2026 rules create countermeasure and litigation exposure for organizations implementing unlawful foreign extraterritorial measures.",mechanism:"Countermeasures, malicious-entity listing and private claims."}
  ];

  const relationships = [
    {id:"R01",from:"N_NVDA",to:"H_BYD",class:"Compute/IP",label:"DRIVE Hyperion vehicle compute",detail:"BYD adopted NVIDIA DRIVE Hyperion for Level-4-ready vehicle programs.",status:"current",evidence:"A",date:"2026",source_ids:["S_NVDA_AUTO_26"],amount:"UNKNOWN",cash_model:"DERIVED_DIRECTION",risk:"medium",policy_ids:["P_US_ADV","P_US_CV"],limits:"Announcement does not disclose unit volume, price or exact export-license treatment."},
    {id:"R02",from:"N_NVDA",to:"H_GEELY",class:"Compute/IP",label:"DRIVE Hyperion vehicle compute",detail:"Geely adopted NVIDIA DRIVE Hyperion for Level-4-ready vehicles.",status:"current",evidence:"A",date:"2026",source_ids:["S_NVDA_AUTO_26"],amount:"UNKNOWN",cash_model:"DERIVED_DIRECTION",risk:"medium",policy_ids:["P_US_ADV","P_US_CV"],limits:"Announcement does not disclose unit volume, price or configuration-by-market."},
    {id:"R03",from:"N_NVDA",to:"H_XPENG",class:"Compute/IP",label:"DRIVE Thor + Omniverse",detail:"XPeng announced use of DRIVE Thor for its next EV platform and uses Omniverse for development workflows.",status:"current",evidence:"A",date:"2024-04-25",source_ids:["S_NVDA_AUTO_24"],amount:"UNKNOWN",cash_model:"DERIVED_DIRECTION",risk:"medium",policy_ids:["P_US_ADV","P_US_CV"],limits:"Design announcement does not prove shipped volume."},
    {id:"R04",from:"N_NVDA",to:"H_LIAUTO",class:"Compute/IP",label:"DRIVE Orin vehicle compute",detail:"Li Auto vehicles use dual NVIDIA DRIVE Orin processors for assisted-driving compute.",status:"current",evidence:"A",date:"2024-04-25",source_ids:["S_NVDA_AUTO_24"],amount:"UNKNOWN",cash_model:"DERIVED_DIRECTION",risk:"medium",policy_ids:["P_US_ADV","P_US_CV"],limits:"Public source does not disclose commercial terms."},
    {id:"R05",from:"N_NVDA",to:"H_LENOVO",class:"Co-development",label:"Hybrid AI systems + reference designs",detail:"NVIDIA and Lenovo announced enterprise hybrid-AI systems, services and reference architectures.",status:"current",evidence:"A",date:"2024-10-15",source_ids:["S_NVDA_LENOVO"],amount:"UNKNOWN",cash_model:"TERMS_UNDISCLOSED",risk:"medium",policy_ids:["P_US_ADV","P_CN_COUNTER"],limits:"Joint offer; buyer/seller economics vary by product and are not disclosed."},
    {id:"R06",from:"N_NVDA",to:"H_ALIBABA",class:"Cloud/software",label:"NVIDIA AI Enterprise availability",detail:"NVIDIA documents Alibaba Cloud as a supported deployment environment for NVIDIA AI Enterprise.",status:"current",evidence:"A",date:"2026",source_ids:["S_NVDA_CLOUD"],amount:"UNKNOWN",cash_model:"TERMS_UNDISCLOSED",risk:"medium",policy_ids:["P_US_ADV","P_CN_DATA"],limits:"Technical availability is not evidence of Alibaba customer spend or deployment scale."},
    {id:"R07",from:"N_NVDA",to:"H_TENCENT",class:"Cloud/software",label:"NVIDIA AI Enterprise availability",detail:"NVIDIA documents Tencent Cloud as a supported deployment environment for NVIDIA AI Enterprise.",status:"current",evidence:"A",date:"2026",source_ids:["S_NVDA_CLOUD"],amount:"UNKNOWN",cash_model:"TERMS_UNDISCLOSED",risk:"medium",policy_ids:["P_US_ADV","P_CN_DATA"],limits:"Technical availability is not evidence of Tencent customer spend or deployment scale."},
    {id:"R08",from:"N_NVDA",to:"H_BAIDU",class:"Co-development",label:"AI cloud + Apollo collaboration",detail:"NVIDIA and Baidu announced collaboration across cloud AI, autonomous driving and platforms.",status:"historical",evidence:"B",date:"2017-07-05",source_ids:["S_NVDA_BAIDU"],amount:"UNKNOWN",cash_model:"TERMS_UNDISCLOSED",risk:"high",policy_ids:["P_US_ADV","P_CN_DATA"],limits:"Historical baseline only; current continuity and scale are not established."},

    {id:"R09",from:"N_QCOM",to:"H_XIAOMI",class:"Compute/IP",label:"Multi-year Snapdragon supply",detail:"Qualcomm and Xiaomi expanded a multi-year agreement for premium Snapdragon platforms across devices, with broader automotive/IoT collaboration.",status:"current",evidence:"A",date:"2025-05-20",source_ids:["S_QCOM_XIAOMI"],amount:"UNKNOWN",cash_model:"DERIVED_DIRECTION",risk:"low",policy_ids:["P_CN_COUNTER"],limits:"Contract pricing and exact unit commitments are not public."},
    {id:"R10",from:"N_QCOM",to:"H_LIAUTO",class:"Compute/IP",label:"Snapdragon Digital Chassis",detail:"Qualcomm identifies Li Auto design wins across Snapdragon Cockpit and Ride platforms.",status:"current",evidence:"A",date:"2026-01",source_ids:["S_QCOM_AUTO"],amount:"UNKNOWN",cash_model:"DERIVED_DIRECTION",risk:"medium",policy_ids:["P_US_CV"],limits:"Design-win disclosure does not quantify shipment or vehicle-model exposure."},

    {id:"R11",from:"N_GOOG",to:"H_GEELY",class:"Co-development",label:"Waymo Driver + Zeekr RT integration",detail:"Waymo integrates its autonomous-driving system with a Geely/Zeekr vehicle platform and is scaling U.S. fleet integration.",status:"current",evidence:"A",date:"2025-05-05",source_ids:["S_WAYMO_GEELY_21","S_WAYMO_GEELY_25"],amount:"UNKNOWN",cash_model:"TERMS_UNDISCLOSED",risk:"medium",policy_ids:["P_US_CV"],limits:"The sources do not disclose vehicle pricing, ownership economics or final rule treatment."},
    {id:"R12",from:"N_MSFT",to:"H_LENOVO",class:"Co-development",label:"Windows/Azure AI PC integration",detail:"Lenovo and Microsoft describe co-engineering across Windows, Azure and Lenovo's AI PC software.",status:"current",evidence:"A",date:"2026-05-25",source_ids:["S_MSFT_LENOVO"],amount:"UNKNOWN",cash_model:"TERMS_UNDISCLOSED",risk:"medium",policy_ids:["P_CN_DATA","P_CN_COUNTER"],limits:"Joint engineering does not establish net payment direction or contract value."},
    {id:"R13",from:"N_AMD",to:"H_LENOVO",class:"Compute/IP",label:"EPYC server platforms",detail:"Lenovo announced systems using AMD's 5th Gen EPYC server CPUs.",status:"current",evidence:"A",date:"2024-10-10",source_ids:["S_AMD_EPYC"],amount:"UNKNOWN",cash_model:"DERIVED_DIRECTION",risk:"low",policy_ids:["P_CN_COUNTER"],limits:"No supplier concentration or revenue amount disclosed."},
    {id:"R14",from:"N_AMD",to:"H_TENCENT",class:"Compute/IP",label:"EPYC cloud instances",detail:"AMD reported new and expanded Tencent cloud instances powered by 5th Gen EPYC.",status:"current",evidence:"A",date:"2026-05-05",source_ids:["S_AMD_Q1_26"],amount:"UNKNOWN",cash_model:"DERIVED_DIRECTION",risk:"medium",policy_ids:["P_US_ADV","P_CN_DATA"],limits:"Earnings slides do not disclose Tencent purchase volume or revenue."},

    {id:"R15",from:"N_INTC",to:"H_BAIDU",class:"Co-development",label:"Cloud/AI infrastructure collaboration",detail:"Intel and Baidu described co-optimization across Xeon, FPGA, Ethernet and PaddlePaddle infrastructure.",status:"historical",evidence:"B",date:"2020-12-15",source_ids:["S_INTC_BAIDU"],amount:"UNKNOWN",cash_model:"TERMS_UNDISCLOSED",risk:"medium",policy_ids:["P_US_ADV","P_CN_DATA"],limits:"Historical primary evidence; current product mix and scale are not established."},
    {id:"R16",from:"N_INTC",to:"H_ALIBABA",class:"Compute/IP",label:"Alibaba Cloud infrastructure stack",detail:"Intel's partner overview documents Alibaba Cloud use of Intel compute, security and acceleration technologies.",status:"current",evidence:"A",date:"2026",source_ids:["S_INTC_ALIBABA"],amount:"UNKNOWN",cash_model:"DERIVED_DIRECTION",risk:"medium",policy_ids:["P_US_ADV","P_CN_DATA"],limits:"Partner page does not quantify present purchasing or architecture share."},
    {id:"R17",from:"N_INTC",to:"H_LENOVO",class:"Co-development",label:"Aura Edition AI PCs",detail:"Intel and Lenovo describe multi-year co-design of AI-powered PC experiences.",status:"current",evidence:"A",date:"2024-09-03",source_ids:["S_INTC_LENOVO"],amount:"UNKNOWN",cash_model:"TERMS_UNDISCLOSED",risk:"low",policy_ids:["P_CN_COUNTER"],limits:"Co-development terms and payment direction are not disclosed."},

    {id:"R18",from:"N_ARM",to:"H_XIAOMI",class:"Compute/IP",label:"Arm architecture licensing ecosystem",detail:"Arm's registration statement names Xiaomi among important mobile ecosystem partners/customers using Arm technology.",status:"current",evidence:"B",date:"2023-08-21",source_ids:["S_ARM_F1"],amount:"UNKNOWN",cash_model:"DERIVED_DIRECTION",risk:"low",policy_ids:["P_CN_COUNTER"],limits:"The filing establishes ecosystem/customer dependence but not current royalty amount."},
    {id:"R19",from:"N_ARM",to:"H_ALIBABA",class:"Compute/IP",label:"Arm cloud architecture",detail:"Arm's registration statement identifies Alibaba as a cloud partner/customer using Arm-based technology.",status:"current",evidence:"B",date:"2023-08-21",source_ids:["S_ARM_F1"],amount:"UNKNOWN",cash_model:"DERIVED_DIRECTION",risk:"medium",policy_ids:["P_CN_COUNTER"],limits:"The filing does not disclose current cloud-instance volume or royalty share."},
    {id:"R20",from:"N_ARM",to:"H_LENOVO",class:"Compute/IP",label:"Arm-based robotaxi compute platform",detail:"Arm describes Lenovo's AD1 autonomous-driving platform built around Arm-based NVIDIA DRIVE AGX Thor.",status:"current",evidence:"A",date:"2026",source_ids:["S_ARM_LENOVO"],amount:"UNKNOWN",cash_model:"TERMS_UNDISCLOSED",risk:"medium",policy_ids:["P_US_CV"],limits:"Arm IP may be monetized through chip licensees; direct Lenovo-to-Arm payment is not established."},
    {id:"R21",from:"N_ARM",to:"H_GEELY",class:"Compute/IP",label:"Arm Automotive Enhanced platform",detail:"Geely EX5 uses an Arm-based automotive SoC for cockpit, safety and ADAS workloads.",status:"current",evidence:"A",date:"2025-10-23",source_ids:["S_ARM_GEELY"],amount:"UNKNOWN",cash_model:"TERMS_UNDISCLOSED",risk:"medium",policy_ids:["P_US_CV"],limits:"The architecture path is documented; direct commercial payment to Arm is not established."},

    {id:"R22",from:"H_BYDE",to:"N_AAPL",class:"Manufacturing",label:"Apple supplier manufacturing",detail:"Apple's supplier list identifies BYD Electronic within its manufacturing supply chain.",status:"historical",evidence:"B",date:"FY2022",source_ids:["S_APPLE_SUPPLIERS"],amount:"UNKNOWN",cash_model:"DERIVED_DIRECTION",risk:"medium",policy_ids:["P_CN_COUNTER"],limits:"FY2022 supplier disclosure does not prove current scope, product or revenue."},
    {id:"R23",from:"H_SUNNY",to:"N_AAPL",class:"Component",label:"Apple optical supply chain",detail:"Apple's supplier list identifies Sunny Optical within its manufacturing supply chain.",status:"historical",evidence:"B",date:"FY2022",source_ids:["S_APPLE_SUPPLIERS"],amount:"UNKNOWN",cash_model:"DERIVED_DIRECTION",risk:"medium",policy_ids:["P_CN_COUNTER"],limits:"FY2022 supplier disclosure does not prove current product, volume or continuity."},
    {id:"R24",from:"H_CATL",to:"N_TSLA",class:"Component",label:"Battery-cell supply",detail:"Tesla's 2025 Form 10-K identifies CATL as a battery-cell supplier on which Tesla relies.",status:"current",evidence:"A",date:"2026-01-29",source_ids:["S_TESLA_10K"],amount:"UNKNOWN",cash_model:"DERIVED_DIRECTION",risk:"medium",policy_ids:["P_CN_MATERIALS","P_CN_COUNTER"],limits:"Tesla discloses reliance but not CATL-specific volume, price or margin."},

    {id:"R25",from:"N_SNPS",to:"H_SMIC",class:"EDA/tooling",label:"Foundry-sponsored design IP",detail:"Synopsys publishes DesignWare IP availability for SMIC processes.",status:"current",evidence:"A",date:"2026",source_ids:["S_SNPS_SMIC"],amount:"UNKNOWN",cash_model:"TERMS_UNDISCLOSED",risk:"high",policy_ids:["P_US_SEMI","P_CN_COUNTER"],limits:"IP availability does not disclose licensee count, current revenue or advanced-node applicability."},
    {id:"R26",from:"N_CDNS",to:"H_SMIC",class:"EDA/tooling",label:"DFM/DDR design enablement",detail:"Cadence publishes SMIC design-for-manufacturing and process-specific IP materials.",status:"current",evidence:"A",date:"2026-06-27",source_ids:["S_CDNS_SMIC"],amount:"UNKNOWN",cash_model:"TERMS_UNDISCLOSED",risk:"high",policy_ids:["P_US_SEMI","P_CN_COUNTER"],limits:"Public technical material does not establish transaction value or restricted-node use."},
    {id:"R27",from:"N_AMAT",to:"H_SMIC",class:"EDA/tooling",label:"Copper CMP installed-base milestone",detail:"Applied Materials documented shipment of its 250th copper CMP system to SMIC.",status:"historical",evidence:"B",date:"2004-11-09",source_ids:["S_AMAT_SMIC"],amount:"UNKNOWN",cash_model:"DERIVED_DIRECTION",risk:"high",policy_ids:["P_US_SEMI","P_CN_COUNTER"],limits:"Historical installed-base evidence; it does not prove current tool sales or service access."},
    {id:"R28",from:"N_LRCX",to:"H_SMIC",class:"EDA/tooling",label:"Etch-equipment purchase agreement",detail:"Lam Research announced an SMIC equipment agreement exceeding $100 million in 2002.",status:"historical",evidence:"B",date:"2002-04-17",source_ids:["S_LRCX_SMIC"],amount:"DISCLOSED_HISTORICAL_GT_100M_USD",cash_model:"SOURCE_DISCLOSED_HISTORICAL",risk:"high",policy_ids:["P_US_SEMI","P_CN_COUNTER"],limits:"Historical contract only; no claim about current sales, outstanding payments or installed service."},
    {id:"R29",from:"N_NXPI",to:"H_GEELY",class:"Co-development",label:"Automotive semiconductor R&D",detail:"NXP and Geely announced a long-term R&D partnership spanning infotainment, telematics, MCUs, radio and secure access.",status:"historical",evidence:"B",date:"2017-01-06",source_ids:["S_NXP_GEELY"],amount:"UNKNOWN",cash_model:"TERMS_UNDISCLOSED",risk:"medium",policy_ids:["P_US_CV"],limits:"Historical announcement; current project scope and continuity are not established."},

    {id:"R30",from:"N_ASML",to:"H_SMIC",class:"EDA/tooling",label:"DUV lithography purchase agreement",detail:"ASML disclosed an extended DUV lithography volume-purchase agreement with SMIC and US$1.2 billion of purchase orders in the twelve months ended March 2, 2021.",status:"historical",evidence:"B",date:"2021-03-03",source_ids:["S_ASML_SMIC"],amount:"DISCLOSED_HISTORICAL_1_2B_USD",cash_model:"SOURCE_DISCLOSED_HISTORICAL",risk:"high",policy_ids:["P_NL_SEMI","P_US_SEMI","P_CN_COUNTER"],limits:"The disclosed amount is historical. It does not establish current shipments, service access, tool mix or export-license outcomes.",phase:"2A",lane:"fab equipment → foundries"},
    {id:"R31",from:"N_SNPS",to:"H_HUAHONG",class:"EDA/tooling",label:"130 nm low-power reference flow",detail:"Synopsys and Hua Hong NEC validated a low-power implementation and verification flow against Hua Hong's 130 nm libraries and test chip.",status:"historical",evidence:"B",date:"2011-04-25",source_ids:["S_SNPS_HUAHONG"],amount:"UNKNOWN",cash_model:"TERMS_UNDISCLOSED",risk:"high",policy_ids:["P_US_SEMI","P_CN_COUNTER"],limits:"Historical design enablement only; current tool licensing, revenue and process coverage are not established.",phase:"2A",lane:"EDA/IP → foundries"},
    {id:"R32",from:"N_NVDA",to:"H_CHINAMOBILE",class:"Cloud/software",label:"Bigcloud accelerated networking",detail:"China Mobile Bigcloud deployed a software-defined networking solution using NVIDIA ConnectX SmartNICs and BlueField DPUs with Nuage Networks.",status:"historical",evidence:"B",date:"2022-07-25",source_ids:["S_NVDA_CMCC"],amount:"UNKNOWN",cash_model:"DERIVED_DIRECTION",risk:"high",policy_ids:["P_US_ADV","P_CN_DATA"],limits:"The case study proves deployment and performance results in 2022, not the current fleet size, refresh cycle or commercial value.",phase:"2A",lane:"compute → cloud platforms"},
    {id:"R33",from:"N_INTC",to:"H_CHINAUNICOM",class:"Cloud/software",label:"Data-center energy-management stack",detail:"China Unicom adopted Intel Intelligent Energy Management, including Xeon platform controls and AI software, for trials and deployment in 5G-core and big-data workloads.",status:"historical",evidence:"B",date:"2022-10",source_ids:["S_INTC_UNICOM"],amount:"UNKNOWN",cash_model:"TERMS_UNDISCLOSED",risk:"medium",policy_ids:["P_CN_DATA","P_CN_COUNTER"],limits:"The source reports tests and expansion plans using 2022 data; current deployment scale and payment direction are not disclosed.",phase:"2A",lane:"compute → cloud platforms"},
    {id:"R34",from:"N_AMD",to:"H_ALIBABA",class:"Compute/IP",label:"FPGA AI acceleration for Alibaba FaaS",detail:"AMD's Alibaba Cloud case study documents Virtex UltraScale+ FPGA and Vitis AI use in Alibaba's function-as-a-service AI acceleration stack.",status:"historical",evidence:"B",date:"undated",source_ids:["S_AMD_ALIBABA"],amount:"UNKNOWN",cash_model:"DERIVED_DIRECTION",risk:"medium",policy_ids:["P_US_ADV","P_CN_DATA"],limits:"The current AMD page preserves the case study, but it does not date the deployment or establish current hardware volume.",phase:"2A",lane:"compute → cloud platforms"},
    {id:"R35",from:"N_NVDA",to:"H_NIO",class:"Compute/IP",label:"DRIVE Orin autonomy compute",detail:"NVIDIA's current partner profile documents DRIVE Orin across NIO and ONVO vehicles and a collaboration that began in 2014.",status:"current",evidence:"A",date:"2026",source_ids:["S_NVDA_NIO"],amount:"UNKNOWN",cash_model:"DERIVED_DIRECTION",risk:"medium",policy_ids:["P_US_ADV","P_US_CV"],limits:"The source establishes platform use but not NIO's current purchasing volume, unit economics or supplier concentration.",phase:"2A",lane:"compute → vehicle manufacturers"},
    {id:"R36",from:"N_QCOM",to:"H_NIO",class:"Compute/IP",label:"Snapdragon Cockpit and Ride Elite design wins",detail:"Qualcomm identified NIO among automakers with new or expanded Snapdragon Cockpit Elite and Ride Elite collaborations in 2026.",status:"current",evidence:"A",date:"2026-01-05",source_ids:["S_QCOM_AUTO"],amount:"UNKNOWN",cash_model:"DERIVED_DIRECTION",risk:"medium",policy_ids:["P_US_CV"],limits:"The announcement aggregates ten programs and does not disclose NIO model timing, volumes or commercial terms.",phase:"2A",lane:"compute → vehicle manufacturers"},
    {id:"R37",from:"N_QCOM",to:"H_LEAPMOTOR",class:"Compute/IP",label:"Dual-Snapdragon centralized vehicle computer",detail:"Leapmotor's D19 entered mass production with a central controller built on dual Snapdragon Cockpit Elite and Ride Elite platforms.",status:"current",evidence:"A",date:"2026-01-05",source_ids:["S_QCOM_LEAP"],amount:"UNKNOWN",cash_model:"DERIVED_DIRECTION",risk:"medium",policy_ids:["P_US_CV"],limits:"The release establishes the design and production intent but not vehicle shipments, pricing or Qualcomm revenue.",phase:"2A",lane:"compute → vehicle manufacturers"},
    {id:"R38",from:"N_NXPI",to:"H_NIO",class:"Component",label:"4D imaging-radar collaboration",detail:"NXP and NIO announced collaboration around NXP's 4D imaging-radar technology for automated-driving perception.",status:"historical",evidence:"B",date:"2023-05",source_ids:["S_NXP_NIO"],amount:"UNKNOWN",cash_model:"TERMS_UNDISCLOSED",risk:"medium",policy_ids:["P_US_CV"],limits:"The 2023 collaboration announcement does not establish present vehicle programs, shipment volume or direct payment terms.",phase:"2A",lane:"optics/sensors → devices and robots"},
    {id:"R39",from:"N_NXPI",to:"H_XIAOMI",class:"Component",label:"UWB ranging for phone, transit and EV access",detail:"Xiaomi's 15S Pro and YU7 use NXP Trimension UWB devices for precise ranging, hands-free transit and digital vehicle keys.",status:"current",evidence:"A",date:"2025-07-16",source_ids:["S_NXP_XIAOMI"],amount:"UNKNOWN",cash_model:"DERIVED_DIRECTION",risk:"low",policy_ids:["P_CN_COUNTER"],limits:"The source establishes named product integration but not unit volumes, exclusivity or commercial value.",phase:"2A",lane:"optics/sensors → devices and robots"},
    {id:"R40",from:"N_ADI",to:"H_BYD",class:"Component",label:"A2B audio bus + SHARC signal processor",detail:"BYD selected Analog Devices' Automotive Audio Bus and SHARC DSP technologies for vehicle infotainment and lower-complexity wiring.",status:"historical",evidence:"B",date:"2019-02-04",source_ids:["S_ADI_BYD"],amount:"UNKNOWN",cash_model:"DERIVED_DIRECTION",risk:"medium",policy_ids:["P_US_CV"],limits:"Historical selection; the source does not establish current model coverage, shipment volume or continuity.",phase:"2A",lane:"optics/sensors → devices and robots"},
    {id:"R41",from:"N_ADI",to:"H_BAIDU",class:"Co-development",label:"Project Apollo sensing and navigation",detail:"Analog Devices and Baidu signed an MOU covering radar, lidar, inertial sensing, sensor fusion and signal processing for Apollo autonomous driving.",status:"historical",evidence:"B",date:"2018-07-10",source_ids:["S_ADI_BAIDU"],amount:"UNKNOWN",cash_model:"TERMS_UNDISCLOSED",risk:"medium",policy_ids:["P_US_CV","P_CN_DATA"],limits:"The MOU is historical and forward-looking; it does not prove current product use, procurement or program continuity.",phase:"2A",lane:"optics/sensors → devices and robots"}
  ];

  const policyLinks = [
    {id:"PL2",from:"N_KLAC",to:"H_SMIC",policy_ids:["P_US_SEMI"],label:"Inspection/metrology licensing chokepoint",note:"Policy-only link. Covered equipment access may require authorization; no active KLA→SMIC sale is asserted."},
    {id:"PL3",from:"N_MU",to:"H_TENCENT",policy_ids:["P_US_SEMI"],label:"HBM access boundary",note:"Policy-only link. HBM controls affect PRC AI-infrastructure options; no direct Micron→Tencent sale is asserted."},
    {id:"PL4",from:"N_MU",to:"H_ALIBABA",policy_ids:["P_US_SEMI"],label:"HBM access boundary",note:"Policy-only link. HBM controls affect PRC AI-infrastructure options; no direct Micron→Alibaba sale is asserted."}
  ];

  const shockScenarios = [
    {
      id:"gpu-access",
      title:"Remove licensable advanced U.S. accelerator access",
      short:"Advanced compute",
      jurisdiction:"United States",
      posture:"Hypothetical full denial beyond the 2026 baseline, which still allows case-by-case review for some H200-equivalent and less-advanced products.",
      policy_ids:["P_US_ADV"],
      edge_ids:[],
      policy_source_ids:["S_BIS_ADV_GUIDANCE_26","S_BIS_ADV_H200_26"],
      caveat:"Policy tags identify advanced-compute exposure in the evidence ledger; they do not prove that every named product is classified under a controlled ECCN.",
      delay:{range:"12–36+ months",confidence:"Analyst scenario estimate",reason:"Alternative hardware procurement, software-porting, model validation and production requalification would overlap."},
      substitutes:[
        {name:"Huawei Ascend + CANN",kind:"External ecosystem",readiness:"Commercial, partial substitute",coverage:"Domestic accelerator hardware and software stack for training and inference.",limits:"Not a drop-in replacement for CUDA or guaranteed performance parity across workloads.",source_ids:["S_HUAWEI_ASCEND_25"]},
        {name:"Baidu / Kunlunxin",kind:"In-universe parent",readiness:"Commercial, narrower path",coverage:"Domestic AI-computing products and services through Baidu's non-wholly-owned Kunlunxin subsidiary.",limits:"Product breadth, scale and workload portability are not established as equivalent to leading U.S. accelerators.",source_ids:["S_BAIDU_KUNLUN_26"]},
        {name:"Heterogeneous scheduling + software efficiency",kind:"Architecture",readiness:"Available, workload-dependent",coverage:"Training and inference optimization can stretch a mixed accelerator fleet.",limits:"Efficiency reduces compute demand per task but does not replace unavailable peak hardware capacity.",source_ids:["S_ALIBABA_AIACC_26"]}
      ],
      gainers:[
        {node_id:null,name:"Huawei Ascend",confidence:"Candidate",reason:"Denied U.S. supply could increase demand for an established domestic accelerator and software ecosystem.",source_ids:["S_HUAWEI_ASCEND_25"]},
        {node_id:"H_BAIDU",name:"Baidu / Kunlunxin",confidence:"Candidate",reason:"A domestic AI-computing subsidiary could gain negotiating leverage if customers seek non-U.S. capacity.",source_ids:["S_BAIDU_KUNLUN_26"]},
        {node_id:"H_ALIBABA",name:"Alibaba Cloud",confidence:"Candidate",reason:"Fleet-level optimization and access to heterogeneous capacity become more valuable when frontier accelerators are scarce.",source_ids:["S_ALIBABA_AIACC_26"]}
      ]
    },
    {
      id:"eda-support",
      title:"Restrict EDA updates and technical support",
      short:"EDA + support",
      jurisdiction:"United States",
      posture:"Hypothetical tightening of software updates, process-design kits and technical support on top of existing tool, ECAD/TCAD and end-user controls.",
      policy_ids:["P_US_SEMI"],
      edge_ids:["R25","R26","R31"],
      policy_source_ids:["S_BIS_SEMI","S_BIS_CADENCE"],
      caveat:"Only verified EDA/IP relationships are immediate. Historical or current equipment links become second-order through the affected foundries.",
      delay:{range:"18–48+ months",confidence:"Analyst scenario estimate",reason:"Replacing a qualified design flow requires tool migration, library conversion, regression testing, foundry validation and designer retraining."},
      substitutes:[
        {name:"Empyrean Technology foundry tool suite",kind:"External ecosystem",readiness:"Commercial, partial substitute",coverage:"Domestic analog, mixed-signal, verification and foundry-oriented EDA products.",limits:"The reviewed source establishes tool categories, not full-flow parity, interoperability or migration time.",source_ids:["S_EMPYREAN_FOUNDRY"]},
        {name:"Remain on validated legacy releases",kind:"Operational bridge",readiness:"Immediate, degrading",coverage:"Existing licensed versions may preserve mature-node design continuity for a period.",limits:"Security fixes, new process support and vendor assistance may decay; license terms and availability are case-specific.",source_ids:["S_BIS_SEMI"]}
      ],
      gainers:[
        {node_id:null,name:"Empyrean Technology",confidence:"Candidate",reason:"Domestic EDA demand and foundry bargaining power could rise if U.S. updates and support are unavailable.",source_ids:["S_EMPYREAN_FOUNDRY"]},
        {node_id:"H_HUAHONG",name:"Hua Hong Semiconductor",confidence:"Conditional candidate",reason:"Mature-node specialization may gain relative value if advanced-flow migration is slower than mature-node continuity.",source_ids:["S_SNPS_HUAHONG"]}
      ]
    },
    {
      id:"connected-vehicle",
      title:"Restrict connected-vehicle software",
      short:"Connected vehicles",
      jurisdiction:"United States",
      posture:"Hypothetical extension from today's U.S. import-and-sale rule to broader cross-border software delivery, updates and support.",
      policy_ids:["P_US_CV"],
      edge_ids:[],
      policy_source_ids:["S_BIS_CONNECTED","S_BIS_CV_GUIDE_26"],
      caveat:"The current rule primarily governs U.S. imports and sales of covered VCS/ADS systems. This simulator intentionally tests a broader software-support fracture.",
      delay:{range:"18–48+ months",confidence:"Analyst scenario estimate",reason:"Automotive compute, perception, safety cases and over-the-air update systems require vehicle-level validation and model-year planning."},
      substitutes:[
        {name:"Horizon Journey 6",kind:"In-universe",readiness:"Commercial, scaling",coverage:"Integrated automotive computing hardware, development tools and driving software for multiple OEMs.",limits:"Each vehicle platform still needs functional-safety, sensor, software and production validation.",source_ids:["S_HORIZON_J6_26"]},
        {name:"In-house vehicle software stacks",kind:"Architecture",readiness:"Varies by automaker",coverage:"Large OEMs can internalize selected middleware, perception and integration work.",limits:"In-house ownership does not remove dependence on chips, IP, toolchains or safety-certification cycles.",source_ids:["S_BIS_CV_GUIDE_26"]}
      ],
      gainers:[
        {node_id:"H_HORIZON",name:"Horizon Robotics",confidence:"Candidate",reason:"A domestic full-stack vehicle-compute platform may gain bargaining power when cross-border software support becomes uncertain.",source_ids:["S_HORIZON_J6_26"]},
        {node_id:"H_BYD",name:"BYD",confidence:"Conditional candidate",reason:"Vertical integration may improve negotiating leverage relative to OEMs that depend on more external software layers.",source_ids:["S_NVDA_AUTO_26"]}
      ]
    },
    {
      id:"critical-materials",
      title:"Restrict graphite and gallium exports",
      short:"Critical materials",
      jurisdiction:"China",
      posture:"Stress case combining tighter graphite licensing with a hard gallium constraint. China already applies U.S.-specific restrictions to selected dual-use exports.",
      policy_ids:["P_CN_MATERIALS"],
      edge_ids:[],
      policy_source_ids:["S_CN_MATERIALS_US_24","S_USGS_MCS_26"],
      caveat:"The 41-edge ledger directly observes CATL → Tesla only. It does not yet contain verified gallium-material edges, so semiconductor exposure is an explicit observability gap.",
      delay:{range:"12–36+ months",confidence:"Analyst scenario estimate",reason:"Qualification of alternate mines, refiners, synthetic graphite, recycled feedstock and recovered gallium is capital- and validation-intensive."},
      substitutes:[
        {name:"Synthetic graphite, non-China supply and recycling",kind:"Materials portfolio",readiness:"Available, capacity-constrained",coverage:"Diversifies battery-anode feedstock and can reduce reliance on one source geography.",limits:"Purity, cost, qualification and near-term volume vary; no frozen-universe company winner is established.",source_ids:["S_USGS_MCS_26"]},
        {name:"Domestic gallium recovery from existing streams",kind:"Emerging supply",readiness:"Emerging",coverage:"Recovery projects can add non-China supply from domestic mineral-processing streams.",limits:"Funding intent is not commercial capacity and cannot absorb an immediate shock.",source_ids:["S_DOE_GALLIUM_25"]}
      ],
      gainers:[],
      gainer_gap:"No company-level bargaining-power gainer is established inside the two frozen universes. Phase 2D needs external miners, refiners and recyclers."
    },
    {
      id:"cross-border-data",
      title:"Tighten cross-border data rules",
      short:"Data governance",
      jurisdiction:"China",
      posture:"Hypothetical tightening of security assessment, certification, consent and localization requirements beyond the current threshold-and-exemption framework.",
      policy_ids:["P_CN_DATA"],
      edge_ids:[],
      policy_source_ids:["S_CN_DATA","S_CN_DATA_CERT_26"],
      caveat:"A policy tag marks a relationship that may depend on data, cloud or cross-border engineering. It does not establish that a specific transfer is regulated personal or important data.",
      delay:{range:"3–18 months",confidence:"Analyst scenario estimate",reason:"Data inventory, localization, contract changes, consent flows, certification and architecture separation can proceed in parallel but not instantly."},
      substitutes:[
        {name:"China-local cloud, data and model operations",kind:"Architecture",readiness:"Commercial",coverage:"Keep regulated datasets, logs and model operations inside a domestic legal and technical perimeter.",limits:"Localization can fragment global workflows and does not automatically resolve model-weight, telemetry or support access.",source_ids:["S_CN_DATA","S_CN_DATA_CERT_26"]},
        {name:"Minimize, anonymize and certify transfers",kind:"Compliance path",readiness:"Available, case-specific",coverage:"Reduce the transferred dataset and use the applicable assessment or certification channel.",limits:"Anonymization quality, consent and important-data classification remain fact-specific.",source_ids:["S_CN_DATA_CERT_26"]}
      ],
      gainers:[
        {node_id:"H_ALIBABA",name:"Alibaba Cloud",confidence:"Candidate",reason:"Localized cloud and model operations become more valuable as cross-border data movement becomes costlier.",source_ids:["S_CN_DATA"]},
        {node_id:"H_TENCENT",name:"Tencent Cloud",confidence:"Candidate",reason:"Domestic cloud and data-processing capacity can gain negotiating leverage from localization demand.",source_ids:["S_CN_DATA"]},
        {node_id:"H_CHINAMOBILE",name:"China Mobile",confidence:"Candidate",reason:"Domestic network, cloud and data-center capacity can become a compliance-controlled operating perimeter.",source_ids:["S_CN_DATA"]},
        {node_id:"H_CHINAUNICOM",name:"China Unicom",confidence:"Candidate",reason:"Localized network and cloud services may gain value when regulated workloads cannot move freely.",source_ids:["S_CN_DATA"]}
      ]
    }
  ];

  const externalNodes = [
    {id:"X_TSMC",symbol:"2330.TW",name:"TSMC",kind:"industrial",geography:"Taiwan",sector:"Foundry",role:"Leading-edge foundry",summary:"Manufactures advanced logic for public chip designers and anchors multiple memory, sensor and equipment collaborations."},
    {id:"X_SAMSUNG",symbol:"005930.KS",name:"Samsung Electronics",kind:"industrial",geography:"South Korea",sector:"Foundry + memory",role:"Integrated semiconductor manufacturer",summary:"Combines foundry, memory and device manufacturing across the AI and electronics supply chain."},
    {id:"X_SKHYNIX",symbol:"000660.KS",name:"SK hynix",kind:"industrial",geography:"South Korea",sector:"Memory",role:"HBM supplier",summary:"Supplies and co-develops high-bandwidth memory for accelerator platforms."},
    {id:"X_ASE",symbol:"3711.TW",name:"ASE Technology",kind:"industrial",geography:"Taiwan",sector:"Packaging",role:"Assembly, test + advanced packaging",summary:"Turns fabricated wafers into qualified packaged devices through ASE and SPIL operations."},
    {id:"X_FOXCONN",symbol:"2317.TW",name:"Hon Hai / Foxconn",kind:"industrial",geography:"Taiwan",sector:"Manufacturing",role:"AI systems contract manufacturer",summary:"Builds AI server systems and develops manufacturing and robotics deployments with platform vendors."},
    {id:"X_SONY",symbol:"SONY",name:"Sony Semiconductor Solutions",kind:"industrial",geography:"Japan",sector:"Sensors",role:"Image-sensor specialist",summary:"Develops image sensors that turn light and spatial signals into machine-readable perception."},
    {id:"X_BOSCH",symbol:"Private",name:"Bosch",kind:"industrial",geography:"Germany",sector:"Automotive systems",role:"Sensors + vehicle systems integrator",summary:"Combines sensing hardware, automotive compute and safety-system integration."},
    {id:"X_INFINEON",symbol:"IFX.DE",name:"Infineon",kind:"industrial",geography:"Germany",sector:"Power semiconductors",role:"Power conversion + control",summary:"Supplies power semiconductors and controllers spanning data centers, vehicles and industrial systems."},
    {id:"X_TEL",symbol:"8035.T",name:"Tokyo Electron",kind:"industrial",geography:"Japan",sector:"Fab equipment",role:"Wafer-fab equipment",summary:"Supplies process equipment and production support to semiconductor foundries."},

    {id:"X_OPENAI",symbol:"Private",name:"OpenAI",kind:"private-ai",geography:"United States",sector:"Foundation models",role:"Model lab + infrastructure buyer",summary:"Sources compute across multiple public cloud, accelerator and custom-silicon partners."},
    {id:"X_ANTHROPIC",symbol:"Private",name:"Anthropic",kind:"private-ai",geography:"United States",sector:"Foundation models",role:"Model lab + compute buyer",summary:"Uses multiple cloud and accelerator stacks while expanding into external compute partnerships."},
    {id:"X_XAI",symbol:"Private",name:"xAI",kind:"private-ai",geography:"United States",sector:"Foundation models",role:"Model lab + compute operator",summary:"Operates a large NVIDIA-based compute estate and has begun supplying compute to another model developer."},
    {id:"X_DEEPSEEK",symbol:"Private",name:"DeepSeek",kind:"private-ai",geography:"China",sector:"Foundation models",role:"Open-weight model developer",summary:"Distributes models through U.S. and Chinese public cloud catalogs."},
    {id:"X_MOONSHOT",symbol:"Private",name:"Moonshot AI",kind:"private-ai",geography:"China",sector:"Foundation models",role:"Kimi model developer",summary:"Distributes Kimi models through a major Chinese cloud platform."},
    {id:"X_FIGURE",symbol:"Private",name:"Figure AI",kind:"private-ai",geography:"United States",sector:"Robotics",role:"Humanoid robotics developer",summary:"Develops general-purpose humanoid robots and embodied models using external simulation and compute infrastructure."},
    {id:"X_APPTRONIK",symbol:"Private",name:"Apptronik",kind:"private-ai",geography:"United States",sector:"Robotics",role:"Humanoid robotics developer",summary:"Builds Apollo humanoids and works with Google DeepMind on embodied intelligence."},
    {id:"X_AGILITY",symbol:"Private",name:"Agility Robotics",kind:"private-ai",geography:"United States",sector:"Robotics",role:"Warehouse humanoid developer",summary:"Develops Digit for logistics and participates in customer trials and robotics-safety platform integrations."},
    {id:"X_BOSTON",symbol:"Private",name:"Boston Dynamics",kind:"private-ai",geography:"United States",sector:"Robotics",role:"Mobile and humanoid robotics developer",summary:"Develops Atlas and other robots while partnering for foundation-model intelligence."},
    {id:"X_UNITREE",symbol:"Private",name:"Unitree Robotics",kind:"private-ai",geography:"China",sector:"Robotics",role:"Humanoid + quadruped developer",summary:"Builds robots used as reference platforms for public compute and robotics-software stacks."}
  ];

  const bridgeRelationships = [
    {id:"B01",from:"X_TSMC",to:"N_AAPL",class:"Manufacturing",label:"Advanced Apple silicon fabrication",detail:"Apple said it was on track to purchase more than 100 million advanced chips produced at TSMC's Arizona facility in 2026.",status:"current",evidence:"A",date:"2026-02-24",source_ids:["S_TSMC_APPLE_26"],amount:"UNKNOWN",cash_model:"DERIVED_DIRECTION",risk:"low",policy_ids:[],limits:"The source discloses an expected chip count but not unit prices, node mix, total TSMC share or product-level concentration.",phase:"2D",lane:"semiconductor bridge"},
    {id:"B02",from:"X_TSMC",to:"N_NVDA",class:"Manufacturing",label:"Blackwell wafer fabrication",detail:"NVIDIA and TSMC reported Blackwell wafer production in Arizona, extending an established advanced-node manufacturing relationship.",status:"current",evidence:"A",date:"2025-10-17",source_ids:["S_TSMC_NVDA_25"],amount:"UNKNOWN",cash_model:"DERIVED_DIRECTION",risk:"medium",policy_ids:["P_US_SEMI"],limits:"The source does not establish wafer allocation, pricing, geographic concentration or the scope of other foundry and packaging dependencies.",phase:"2D",lane:"semiconductor bridge"},
    {id:"B03",from:"X_TSMC",to:"N_AMD",class:"Manufacturing",label:"Leading-edge CPU and GPU foundry",detail:"AMD's annual filing identifies TSMC as the foundry for its leading-edge CPU and GPU products.",status:"current",evidence:"A",date:"2026-02-04",source_ids:["S_AMD_FOUNDRIES_25"],amount:"UNKNOWN",cash_model:"DERIVED_DIRECTION",risk:"medium",policy_ids:["P_US_SEMI"],limits:"The filing establishes manufacturing dependence but not present wafer volumes, pricing, capacity reservations or node-by-node concentration.",phase:"2D",lane:"semiconductor bridge"},
    {id:"B04",from:"X_SAMSUNG",to:"N_AAPL",class:"Manufacturing",label:"Austin chip-manufacturing collaboration",detail:"Apple said Samsung's Austin facility would supply chips using an innovative manufacturing technology optimized for Apple products.",status:"announced",evidence:"A",date:"2025-08-06",source_ids:["S_SAMSUNG_APPLE_25"],amount:"UNKNOWN",cash_model:"DERIVED_DIRECTION",risk:"low",policy_ids:[],limits:"The announcement does not identify the chip, process, launch timing, volume or commercial value.",phase:"2D",lane:"semiconductor bridge"},
    {id:"B05",from:"X_SAMSUNG",to:"N_AMD",class:"Manufacturing",label:"Programmable-logic foundry capacity",detail:"AMD's annual filing identifies Samsung among foundries used for programmable-logic products.",status:"current",evidence:"A",date:"2026-02-04",source_ids:["S_AMD_FOUNDRIES_25"],amount:"UNKNOWN",cash_model:"DERIVED_DIRECTION",risk:"low",policy_ids:[],limits:"The filing does not establish current Samsung share, nodes, products, volumes or pricing.",phase:"2D",lane:"semiconductor bridge"},
    {id:"B06",from:"X_SKHYNIX",to:"N_NVDA",class:"Component",label:"Multi-year next-generation memory partnership",detail:"SK hynix and NVIDIA announced a multi-year partnership aligning HBM and other next-generation memory development and supply with NVIDIA's platform roadmap.",status:"current",evidence:"A",date:"2026-06-08",source_ids:["S_SKHYNIX_NVDA_26"],amount:"UNKNOWN",cash_model:"DERIVED_DIRECTION",risk:"low",policy_ids:[],limits:"The companies did not disclose volume, price, product allocation, exclusivity or supplier share.",phase:"2D",lane:"semiconductor bridge"},
    {id:"B07",from:"X_ASE",to:"N_NVDA",class:"Manufacturing",label:"Assembly and test capacity through SPIL",detail:"ASE subsidiary SPIL described close collaboration with NVIDIA while expanding semiconductor assembly and test capacity.",status:"current",evidence:"A",date:"2025-01-16",source_ids:["S_ASE_NVDA_25"],amount:"UNKNOWN",cash_model:"DERIVED_DIRECTION",risk:"low",policy_ids:[],limits:"The source does not disclose NVIDIA product mix, packaging technology, volumes, revenue or supplier concentration.",phase:"2D",lane:"semiconductor bridge"},
    {id:"B08",from:"X_FOXCONN",to:"N_NVDA",class:"Co-development",label:"AI server racks + manufacturing robotics",detail:"Foxconn showed manufacturing and system-integration support for NVIDIA Vera Rubin platforms, DSX AI-factory deployment and Isaac-based physical-AI systems.",status:"current",evidence:"A",date:"2026-06-01",source_ids:["S_FOXCONN_NVDA_26"],amount:"UNKNOWN",cash_model:"TERMS_UNDISCLOSED",risk:"low",policy_ids:[],limits:"The collaboration spans supplier, customer and co-development roles; the source does not support one net payment direction or disclosed economics.",phase:"2D",lane:"semiconductor bridge"},
    {id:"B09",from:"X_TEL",to:"X_TSMC",class:"EDA/tooling",label:"Fab equipment + production support",detail:"Tokyo Electron received TSMC awards for technology collaboration and production support, documenting an active equipment-and-service relationship.",status:"current",evidence:"A",date:"2024-12-23",source_ids:["S_TEL_TSMC_24"],amount:"UNKNOWN",cash_model:"DERIVED_DIRECTION",risk:"medium",policy_ids:["P_US_SEMI"],limits:"The award does not identify tools, fab sites, purchase amounts, installed base or export-control outcomes.",phase:"2D",lane:"semiconductor bridge"},
    {id:"B10",from:"X_INFINEON",to:"N_NVDA",class:"Component",label:"800 VDC AI data-center power stack",detail:"Infineon joined NVIDIA's 800 VDC architecture to provide power-semiconductor and control solutions for next-generation AI data centers.",status:"announced",evidence:"A",date:"2026-05-29",source_ids:["S_INFINEON_NVDA_26"],amount:"UNKNOWN",cash_model:"TERMS_UNDISCLOSED",risk:"low",policy_ids:[],limits:"Participation in an architecture does not establish production purchase orders, design-win volume, exclusivity or revenue.",phase:"2D",lane:"semiconductor bridge"},
    {id:"B11",from:"N_QCOM",to:"X_BOSCH",class:"Compute/IP",label:"Snapdragon vehicle compute for ADAS",detail:"Bosch and Qualcomm expanded collaboration around Snapdragon Ride for advanced driver-assistance and centralized vehicle computing.",status:"current",evidence:"A",date:"2026-04-10",source_ids:["S_BOSCH_QCOM_26"],amount:"UNKNOWN",cash_model:"TERMS_UNDISCLOSED",risk:"low",policy_ids:[],limits:"The announcement does not disclose named vehicle programs, chip volumes, pricing or the parties' net commercial flows.",phase:"2D",lane:"semiconductor bridge"},
    {id:"B12",from:"X_BOSCH",to:"N_AAPL",class:"Component",label:"U.S.-made sensing hardware ICs",detail:"Apple announced that Bosch would produce integrated circuits for sensing hardware used across Apple products.",status:"announced",evidence:"A",date:"2026-03-26",source_ids:["S_APPLE_BOSCH_TSMC_26"],amount:"UNKNOWN",cash_model:"DERIVED_DIRECTION",risk:"low",policy_ids:[],limits:"The announcement does not identify devices, sensor functions, chip volumes, qualification milestones or contract economics.",phase:"2D",lane:"semiconductor bridge"},
    {id:"B13",from:"X_TSMC",to:"X_BOSCH",class:"Manufacturing",label:"Foundry support for Bosch sensing ICs",detail:"Apple's manufacturing announcement says TSMC will provide foundry services for Bosch sensing integrated circuits made in the United States.",status:"announced",evidence:"A",date:"2026-03-26",source_ids:["S_APPLE_BOSCH_TSMC_26"],amount:"UNKNOWN",cash_model:"DERIVED_DIRECTION",risk:"low",policy_ids:[],limits:"The source does not disclose process node, production schedule, yield, volume or foundry economics.",phase:"2D",lane:"semiconductor bridge"},
    {id:"B14",from:"X_SONY",to:"X_TSMC",class:"Co-development",label:"Next-generation image-sensor joint venture",detail:"Sony Semiconductor Solutions and TSMC signed a non-binding MOU to explore a joint venture for next-generation image sensors aimed at physical AI and other uses.",status:"announced",evidence:"A",date:"2026-05-08",source_ids:["S_SONY_TSMC_26"],amount:"UNKNOWN",cash_model:"TERMS_UNDISCLOSED",risk:"low",policy_ids:[],limits:"A non-binding MOU does not prove final investment, ownership, fab location, production, capacity or economics.",phase:"2D",lane:"semiconductor bridge"},
    {id:"B15",from:"X_SKHYNIX",to:"X_TSMC",class:"Co-development",label:"HBM4 base die + advanced packaging",detail:"SK hynix and TSMC agreed to collaborate on HBM4 base-die design and advanced packaging technologies.",status:"current",evidence:"A",date:"2024-04-19",source_ids:["S_SKHYNIX_TSMC_24"],amount:"UNKNOWN",cash_model:"TERMS_UNDISCLOSED",risk:"low",policy_ids:[],limits:"The MOU does not establish production volumes, allocation, commercial terms or continued exclusivity.",phase:"2D",lane:"semiconductor bridge"},

    {id:"B16",from:"N_MSFT",to:"X_OPENAI",class:"Cloud/software",label:"Primary cloud, model IP + commercialization",detail:"OpenAI described Microsoft as its primary cloud partner under a renewed structure that also covers model IP, revenue sharing and product commercialization.",status:"current",evidence:"A",date:"2026-04-27",source_ids:["S_OPENAI_MSFT_26"],amount:"UNKNOWN",cash_model:"TERMS_UNDISCLOSED",risk:"low",policy_ids:[],limits:"The public summary does not disclose workload allocation, unit economics, full cash flows or infrastructure concentration.",phase:"2D",lane:"model + cloud bridge"},
    {id:"B17",from:"N_AMD",to:"X_OPENAI",class:"Compute/IP",label:"6 GW accelerator deployment agreement",detail:"OpenAI and AMD announced a multi-year agreement to deploy 6 GW of AMD GPUs, starting with 1 GW in the second half of 2026.",status:"announced",evidence:"A",date:"2025-10-06",source_ids:["S_OPENAI_AMD_25"],amount:"UNKNOWN",cash_model:"DERIVED_DIRECTION",risk:"low",policy_ids:[],limits:"The announced power-equivalent scale is not a disclosed purchase price, completed deployment or guaranteed utilization level.",phase:"2D",lane:"model + cloud bridge"},
    {id:"B18",from:"N_AVGO",to:"X_OPENAI",class:"Co-development",label:"10 GW custom accelerator + networking collaboration",detail:"OpenAI and Broadcom announced joint development and deployment of 10 GW of custom accelerators and networking systems.",status:"announced",evidence:"A",date:"2025-10-13",source_ids:["S_OPENAI_AVGO_25"],amount:"UNKNOWN",cash_model:"TERMS_UNDISCLOSED",risk:"low",policy_ids:[],limits:"The agreement does not disclose silicon ownership, pricing, deployment completion, manufacturing allocation or net cash direction.",phase:"2D",lane:"model + cloud bridge"},
    {id:"B19",from:"N_NVDA",to:"X_OPENAI",class:"Compute/IP",label:"5 GW training + inference infrastructure plan",detail:"OpenAI's infrastructure update described 3 GW of NVIDIA inference capacity and 2 GW of training capacity.",status:"announced",evidence:"A",date:"2026-02-27",source_ids:["S_OPENAI_INFRA_26"],amount:"UNKNOWN",cash_model:"DERIVED_DIRECTION",risk:"low",policy_ids:[],limits:"The source describes planned capacity rather than installed and accepted systems, utilization, purchase price or supplier share.",phase:"2D",lane:"model + cloud bridge"},
    {id:"B20",from:"N_AMZN",to:"X_OPENAI",class:"Cloud/software",label:"AWS infrastructure partnership",detail:"OpenAI's February 2026 infrastructure update identified Amazon among the cloud and infrastructure partners used to scale capacity.",status:"current",evidence:"A",date:"2026-02-27",source_ids:["S_OPENAI_INFRA_26"],amount:"UNKNOWN",cash_model:"TERMS_UNDISCLOSED",risk:"low",policy_ids:[],limits:"The public update does not disclose AWS workload share, services, duration, pricing or net economics.",phase:"2D",lane:"model + cloud bridge"},
    {id:"B21",from:"N_AMZN",to:"X_ANTHROPIC",class:"Cloud/software",label:"Trainium compute campus up to 5 GW",detail:"Anthropic and Amazon announced an expanded compute partnership targeting up to 5 GW and more than one million Trainium2 chips.",status:"announced",evidence:"A",date:"2026-04-20",source_ids:["S_ANTHROPIC_AMZN_26"],amount:"UNKNOWN",cash_model:"TERMS_UNDISCLOSED",risk:"low",policy_ids:[],limits:"Commitment and chip-count language does not establish completed capacity, utilization, timing, pricing or net cash flows.",phase:"2D",lane:"model + cloud bridge"},
    {id:"B22",from:"N_GOOG",to:"X_ANTHROPIC",class:"Cloud/software",label:"Google Cloud TPU capacity expansion",detail:"Anthropic announced a major expansion of Google Cloud TPU usage and services, with more than one gigawatt expected online in 2026.",status:"current",evidence:"A",date:"2025-10-23",source_ids:["S_ANTHROPIC_GOOG_25"],amount:"UNKNOWN",cash_model:"TERMS_UNDISCLOSED",risk:"low",policy_ids:[],limits:"The source does not disclose model-by-model placement, delivered capacity, utilization or net economic terms.",phase:"2D",lane:"model + cloud bridge"},
    {id:"B23",from:"N_NVDA",to:"X_XAI",class:"Compute/IP",label:"Colossus accelerator infrastructure",detail:"xAI reported that its Colossus compute estate uses more than 220,000 NVIDIA GPUs.",status:"current",evidence:"A",date:"2026-05-06",source_ids:["S_XAI_ANTHROPIC_26"],amount:"UNKNOWN",cash_model:"DERIVED_DIRECTION",risk:"low",policy_ids:[],limits:"The source gives a fleet count but not model mix, ownership, financing, refresh cycle or total spend.",phase:"2D",lane:"model + cloud bridge"},
    {id:"B24",from:"X_XAI",to:"X_ANTHROPIC",class:"Cloud/software",label:"External compute capacity partnership",detail:"xAI and Anthropic announced that xAI would provide compute capacity to Anthropic from Colossus.",status:"current",evidence:"A",date:"2026-05-06",source_ids:["S_XAI_ANTHROPIC_26"],amount:"UNKNOWN",cash_model:"TERMS_UNDISCLOSED",risk:"low",policy_ids:[],limits:"The agreement does not disclose capacity share, workloads, duration, price, service levels or data-handling terms.",phase:"2D",lane:"model + cloud bridge"},
    {id:"B25",from:"N_MSFT",to:"X_DEEPSEEK",class:"Cloud/software",label:"Azure AI Foundry model distribution",detail:"Microsoft made DeepSeek R1 available through Azure AI Foundry and GitHub Models.",status:"current",evidence:"A",date:"2025-01-29",source_ids:["S_DEEPSEEK_MSFT_25"],amount:"UNKNOWN",cash_model:"TERMS_UNDISCLOSED",risk:"high",policy_ids:["P_CN_DATA","P_CN_COUNTER"],limits:"Catalog availability does not establish usage, revenue share, model-origin infrastructure, data transfers or permanence under changing policy.",phase:"2D",lane:"model + cloud bridge"},
    {id:"B26",from:"N_AMZN",to:"X_DEEPSEEK",class:"Cloud/software",label:"Amazon Bedrock managed model distribution",detail:"AWS made DeepSeek R1 available as a fully managed model through Amazon Bedrock.",status:"current",evidence:"A",date:"2025-03-10",source_ids:["S_DEEPSEEK_AWS_25"],amount:"UNKNOWN",cash_model:"TERMS_UNDISCLOSED",risk:"high",policy_ids:["P_CN_DATA","P_CN_COUNTER"],limits:"Service availability does not disclose model usage, economics, training supply chain, data jurisdiction or policy durability.",phase:"2D",lane:"model + cloud bridge"},
    {id:"B27",from:"H_ALIBABA",to:"X_DEEPSEEK",class:"Cloud/software",label:"Model Studio API distribution",detail:"Alibaba Cloud lists DeepSeek models as managed API offerings in Model Studio.",status:"current",evidence:"A",date:"2026-07-06",source_ids:["S_ALIBABA_DEEPSEEK_26"],amount:"UNKNOWN",cash_model:"TERMS_UNDISCLOSED",risk:"medium",policy_ids:["P_CN_DATA"],limits:"The product documentation establishes availability, not model usage, commercial split, inference margin or exclusive hosting.",phase:"2D",lane:"model + cloud bridge"},
    {id:"B28",from:"H_ALIBABA",to:"X_MOONSHOT",class:"Cloud/software",label:"Kimi Model Studio distribution",detail:"Alibaba Cloud lists Moonshot AI's Kimi models as managed API offerings in Model Studio.",status:"current",evidence:"A",date:"2026-07-06",source_ids:["S_ALIBABA_KIMI_26"],amount:"UNKNOWN",cash_model:"TERMS_UNDISCLOSED",risk:"medium",policy_ids:["P_CN_DATA"],limits:"The documentation establishes API availability, not usage, economics, exclusivity or model-hosting architecture.",phase:"2D",lane:"model + cloud bridge"},

    {id:"B29",from:"N_NVDA",to:"X_FIGURE",class:"Co-development",label:"Isaac simulation + physical-AI compute",detail:"NVIDIA described collaboration with Figure on robotics models, simulation and compute for U.S. humanoid manufacturing.",status:"current",evidence:"A",date:"2025-10-28",source_ids:["S_NVDA_FIGURE_25"],amount:"UNKNOWN",cash_model:"TERMS_UNDISCLOSED",risk:"low",policy_ids:[],limits:"The collaboration does not disclose product volumes, deployed robots, commercial terms or platform exclusivity.",phase:"2D",lane:"physical AI bridge"},
    {id:"B30",from:"N_GOOG",to:"X_APPTRONIK",class:"Co-development",label:"Gemini Robotics embodied intelligence",detail:"Google DeepMind developed and tested Gemini Robotics models with Apptronik's Apollo humanoid platform.",status:"current",evidence:"A",date:"2025-03-12",source_ids:["S_GOOG_APPTRONIK_25"],amount:"UNKNOWN",cash_model:"TERMS_UNDISCLOSED",risk:"low",policy_ids:[],limits:"The source does not establish commercial robot deployments, exclusivity, revenue or a production-scale compute contract.",phase:"2D",lane:"physical AI bridge"},
    {id:"B31",from:"N_NVDA",to:"X_AGILITY",class:"Compute/IP",label:"Halos safety stack + IGX Thor integration",detail:"Agility Robotics became the first robotics developer announced for NVIDIA Halos integration with Digit.",status:"announced",evidence:"A",date:"2026-06-22",source_ids:["S_NVDA_AGILITY_26"],amount:"UNKNOWN",cash_model:"TERMS_UNDISCLOSED",risk:"low",policy_ids:[],limits:"An integration announcement does not prove shipment volumes, deployment timing, safety certification or commercial economics.",phase:"2D",lane:"physical AI bridge"},
    {id:"B32",from:"N_AMZN",to:"X_AGILITY",class:"Co-development",label:"Digit warehouse testing",detail:"Agility Robotics reported that Amazon was testing Digit for warehouse tote-recycling work.",status:"historical",evidence:"B",date:"2023",source_ids:["S_AMZN_AGILITY"],amount:"UNKNOWN",cash_model:"TERMS_UNDISCLOSED",risk:"low",policy_ids:[],limits:"A historical pilot does not establish current deployment, purchase orders, productivity economics or program continuation.",phase:"2D",lane:"physical AI bridge"},
    {id:"B33",from:"N_GOOG",to:"X_BOSTON",class:"Co-development",label:"Foundation-model intelligence for Atlas",detail:"Boston Dynamics and Google DeepMind formed a partnership to bring advanced AI models into Boston Dynamics robots, including Atlas.",status:"current",evidence:"A",date:"2026-01-05",source_ids:["S_GOOG_BOSTON_26"],amount:"UNKNOWN",cash_model:"TERMS_UNDISCLOSED",risk:"low",policy_ids:[],limits:"The partnership does not disclose model deployment scope, hardware, production timing, revenue or exclusivity.",phase:"2D",lane:"physical AI bridge"},
    {id:"B34",from:"N_NVDA",to:"X_UNITREE",class:"Compute/IP",label:"Jetson Thor + GR00T humanoid reference platform",detail:"NVIDIA's open humanoid reference design identifies Unitree H2 as a platform using Jetson Thor and GR00T software.",status:"announced",evidence:"A",date:"2026-05-31",source_ids:["S_NVDA_UNITREE_26"],amount:"UNKNOWN",cash_model:"TERMS_UNDISCLOSED",risk:"high",policy_ids:["P_US_ADV","P_CN_COUNTER"],limits:"Reference-design inclusion does not prove export classification, production shipments, unit volume, commercial terms or continuing access.",phase:"2D",lane:"physical AI bridge"}
  ];

  const data = {
    meta:{
      title:"U.S.–HK AI / Robotics Supply-Chain Entanglement",
      subtitle:"Frozen 20 × 20 core, Phase 2A expansion, Phase 2B navigation, Phase 2C policy shocks and a separate Phase 2D external bridge layer",
      frozen_at:"2026-07-25",
      generated_at:"2026-07-25",
      amount_rule:"UNKNOWN unless explicitly disclosed by a cited source",
      cash_rule:"Reverse direction is a structural commercial model, not bank-record evidence"
    },
    universes:{
      nasdaq:{
        id:"nasdaq",name:"Nasdaq-100 issuers",as_of:"2026-05-01",
        source_ids:["S_NDX"],
        note:"101 securities collapsed to 100 issuers by combining GOOG and GOOGL.",
        companies:ndxRows.map(([symbol,name,weight])=>({symbol,name,weight}))
      },
      hkex:{
        id:"hkex",name:"HKEX Core-100 (HSCHK100)",as_of:"2026-07-25",
        source_ids:["S_HK_FACT","S_HK_METH","S_HK_LIVE"],
        note:"Official Hang Seng China (Hong Kong-listed) 100 Index. Null weights were not published in the June factsheet.",
        companies:hkRows.map(([symbol,name,weight])=>({symbol,name,weight}))
      }
    },
    pilot,relationships,policies,policyLinks,shockScenarios,externalNodes,bridgeRelationships,sources
  };

  root.MAP_DATA = data;
  if (typeof module !== "undefined" && module.exports) module.exports = data;
})(typeof window !== "undefined" ? window : globalThis);
