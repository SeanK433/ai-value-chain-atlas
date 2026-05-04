export type LayerId =
  | "lithography"
  | "foundry"
  | "accelerators"
  | "networking"
  | "power"
  | "cloud"
  | "models"
  | "data"
  | "apps";

export type Company = {
  name: string;
  ticker: string;
  layer: LayerId;
  role: string;
  signal: string;
  evidence: string;
  pressure: string;
  metric: string;
  moat: number;
  capexPull: number;
  marginPower: number;
  sourceIds: string[];
};

export type Source = {
  id: string;
  name: string;
  publisher: string;
  date: string;
  url: string;
};

export const layers: { id: LayerId; label: string; thesis: string; color: string }[] = [
  {
    id: "lithography",
    label: "Lithography & equipment",
    thesis: "The choke point before the choke point: EUV capacity and process control govern how fast leading-edge AI silicon can be added.",
    color: "#d89a2b",
  },
  {
    id: "foundry",
    label: "Foundry & advanced packaging",
    thesis: "AI demand is monetized through leading-edge wafers, CoWoS-like packaging, and node transitions that keep accelerators power-efficient.",
    color: "#5a9c7c",
  },
  {
    id: "accelerators",
    label: "Accelerators & custom silicon",
    thesis: "Training and inference economics still orbit GPUs, but custom ASICs and memory bandwidth are becoming the negotiating wedge.",
    color: "#b6554d",
  },
  {
    id: "networking",
    label: "Networking fabric",
    thesis: "As clusters scale from thousands to hundreds of thousands of accelerators, Ethernet, optics, and switching become performance assets.",
    color: "#5f82c2",
  },
  {
    id: "power",
    label: "Power, cooling & data centers",
    thesis: "The visible capex wave turns into electrical gear, liquid cooling, grid interconnects, and fast construction capability.",
    color: "#7c6a4a",
  },
  {
    id: "cloud",
    label: "Hyperscale & neocloud",
    thesis: "Clouds package scarce compute into contracts; the investment question is utilization, funding cost, and customer concentration.",
    color: "#7a63ad",
  },
  {
    id: "models",
    label: "Model labs",
    thesis: "Labs convert compute into frontier capability, but capture depends on distribution, API pricing, enterprise adoption, and partner leverage.",
    color: "#c36d8a",
  },
  {
    id: "data",
    label: "Data platforms",
    thesis: "Enterprise AI workloads require governed data, observability, vector retrieval, orchestration, and clean integration paths.",
    color: "#3f8f9d",
  },
  {
    id: "apps",
    label: "Application winners",
    thesis: "The durable application layer is where AI changes workflow, pricing power, and account expansion rather than just adding features.",
    color: "#8f8756",
  },
];

export const sources: Source[] = [
  {
    id: "nvda-fy26",
    name: "NVIDIA Announces Financial Results for Fourth Quarter and Fiscal 2026",
    publisher: "NVIDIA Investor Relations",
    date: "2026-02",
    url: "https://investor.nvidia.com/news/press-release-details/2026/NVIDIA-Announces-Financial-Results-for-Fourth-Quarter-and-Fiscal-2026/",
  },
  {
    id: "tsmc-2025",
    name: "TSMC 2025 Annual Report",
    publisher: "TSMC Investor Relations",
    date: "2026",
    url: "https://investor.tsmc.com/static/annualReports/2025/english/index.html",
  },
  {
    id: "avgo-fy25",
    name: "Broadcom Announces Fourth Quarter and Fiscal Year 2025 Financial Results",
    publisher: "Broadcom Investor Relations",
    date: "2025-12-11",
    url: "https://investors.broadcom.com/news-releases/news-release-details/broadcom-inc-announces-fourth-quarter-and-fiscal-year-2025",
  },
  {
    id: "asml-2025",
    name: "ASML 2025 Annual Report",
    publisher: "ASML",
    date: "2026",
    url: "https://www.asml.com/investors/annual-report/2025",
  },
  {
    id: "anet-fy25",
    name: "Arista Networks Reports Fourth Quarter and Year End 2025 Financial Results",
    publisher: "Arista Investor Relations",
    date: "2026-02-12",
    url: "https://investors.arista.com/Communications/Press-Releases-and-Events/Press-Release-Detail/2026/Arista-Networks-Inc--Reports-Fourth-Quarter-and-Year-End-2025-Financial-Results/default.aspx",
  },
  {
    id: "orcl-q3fy26",
    name: "Oracle Announces Fiscal Year 2026 Third Quarter Financial Results",
    publisher: "Oracle Investor Relations",
    date: "2026-03-10",
    url: "https://investor.oracle.com/investor-news/news-details/2026/Oracle-Announces-Fiscal-Year-2026-Third-Quarter-Financial-Results/default.aspx",
  },
  {
    id: "msft-q3fy26",
    name: "Microsoft Cloud and AI Strength Fuels Third Quarter Results",
    publisher: "Microsoft Investor Relations",
    date: "2026-04-29",
    url: "https://www.microsoft.com/en-us/investor/earnings/fy-2026-q3/press-release-webcast",
  },
  {
    id: "meta-q126",
    name: "Meta Reports First Quarter 2026 Results",
    publisher: "Meta Investor Relations",
    date: "2026-04-29",
    url: "https://investor.atmeta.com/investor-news/press-release-details/2026/Meta-Reports-First-Quarter-2026-Results/default.aspx",
  },
  {
    id: "snow-fy26",
    name: "Snowflake Reports Fourth Quarter and Full-Year Fiscal 2026 Results",
    publisher: "Snowflake",
    date: "2026",
    url: "https://www.snowflake.com/en/news/press-releases/snowflake-reports-financial-results-for-the-fourth-quarter-and-full-year-of-fiscal-2026/",
  },
  {
    id: "now-q126",
    name: "ServiceNow Reports First Quarter 2026 Financial Results",
    publisher: "ServiceNow Investor Relations",
    date: "2026-04-22",
    url: "https://investor.servicenow.com/news/news-details/2026/ServiceNow-Reports-First-Quarter-2026-Financial-Results/default.aspx",
  },
  {
    id: "cw-q125",
    name: "CoreWeave Reports Strong First Quarter 2025 Results",
    publisher: "CoreWeave Investor Relations",
    date: "2025",
    url: "https://investors.coreweave.com/news/news-details/2025/CoreWeave-Reports-Strong-First-Quarter-2025-Results/default.aspx",
  },
  {
    id: "vrt-q425",
    name: "Vertiv Reports Strong Fourth Quarter with Organic Orders Growth",
    publisher: "PR Newswire via ChartMill",
    date: "2026-02-11",
    url: "https://www.chartmill.com/news/VRT/prnews-2026-2-11-vertiv-reports-strong-fourth-quarter-with-organic-orders-growth-of-252-and-diluted-eps-growth-of-200-adjusted-diluted-eps-37",
  },
  {
    id: "goog-q126",
    name: "Alphabet Announces First Quarter 2026 Results",
    publisher: "Alphabet via Benton Institute",
    date: "2026-05-01",
    url: "https://www.benton.org/headlines/alphabet-announces-first-quarter-2026-results",
  },
  {
    id: "amzn-ai-q126",
    name: "CEO Andy Jassy on Why Customers Are Choosing AWS for AI",
    publisher: "Amazon",
    date: "2026",
    url: "https://www.aboutamazon.com/news/company-news/amazon-ceo-andy-jassy-aws-ai-q1-2026-earnings",
  },
];

export const companies: Company[] = [
  {
    name: "ASML",
    ticker: "ASML",
    layer: "lithography",
    role: "EUV lithography systems",
    signal: "2025 net sales of EUR32.7B, 48 EUV systems, and backlog of EUR38.8B.",
    evidence: "EUV revenue is expected to rise significantly in 2026 as advanced logic and DRAM demand improves.",
    pressure: "Order cyclicality and customer concentration sit behind almost every leading-edge capacity plan.",
    metric: "EUV units: 48",
    moat: 96,
    capexPull: 89,
    marginPower: 88,
    sourceIds: ["asml-2025"],
  },
  {
    name: "TSMC",
    ticker: "TSM",
    layer: "foundry",
    role: "Leading-edge foundry and packaging",
    signal: "2025 revenue rose 35.9% in USD terms; 3nm reached 24% of wafer revenue.",
    evidence: "Management cited robust AI-related demand and a 2nm high-volume manufacturing start in 4Q25.",
    pressure: "Geopolitics, packaging capacity, and power availability define how much demand becomes shipped silicon.",
    metric: "Revenue: $122.4B",
    moat: 94,
    capexPull: 93,
    marginPower: 87,
    sourceIds: ["tsmc-2025"],
  },
  {
    name: "NVIDIA",
    ticker: "NVDA",
    layer: "accelerators",
    role: "GPU systems, networking, CUDA platform",
    signal: "FY26 revenue was $215.9B; Data Center revenue reached $193.7B.",
    evidence: "Q4 Data Center revenue was $62.3B, up 75% year over year, and next-gen Rubin instances are planned across major clouds.",
    pressure: "Export controls, hyperscaler bargaining power, custom ASIC substitution, and inference price compression.",
    metric: "DC revenue: $193.7B",
    moat: 98,
    capexPull: 100,
    marginPower: 92,
    sourceIds: ["nvda-fy26"],
  },
  {
    name: "Broadcom",
    ticker: "AVGO",
    layer: "accelerators",
    role: "Custom AI accelerators and Ethernet switches",
    signal: "Q4 FY25 revenue grew 28%; AI semiconductor revenue grew 74% year over year.",
    evidence: "Management expected Q1 FY26 AI semiconductor revenue to double year over year to $8.2B.",
    pressure: "Custom silicon wins are lumpy, customer-specific, and likely margin-dilutive versus legacy franchises.",
    metric: "AI semi guide: $8.2B",
    moat: 89,
    capexPull: 91,
    marginPower: 84,
    sourceIds: ["avgo-fy25"],
  },
  {
    name: "Arista",
    ticker: "ANET",
    layer: "networking",
    role: "Ethernet switching for cloud and AI clusters",
    signal: "Full-year 2025 revenue reached $9B after exceeding AI networking and campus expansion goals.",
    evidence: "The company reported 150M cumulative ports shipped and Q4 revenue up 28.9% year over year.",
    pressure: "Cloud titan concentration and white-box competition can turn strong architecture cycles into pricing fights.",
    metric: "FY revenue: $9.0B",
    moat: 82,
    capexPull: 88,
    marginPower: 79,
    sourceIds: ["anet-fy25"],
  },
  {
    name: "Vertiv",
    ticker: "VRT",
    layer: "power",
    role: "Power, cooling, and critical infrastructure",
    signal: "Q4 organic orders reportedly rose 252% and backlog reached about $15B.",
    evidence: "Hyperscale and colocation demand, especially AI infrastructure, drove broad order strength.",
    pressure: "Execution risk rises as customers ask for faster, larger, hotter facilities with constrained grids.",
    metric: "Backlog: $15B",
    moat: 76,
    capexPull: 95,
    marginPower: 73,
    sourceIds: ["vrt-q425"],
  },
  {
    name: "Microsoft",
    ticker: "MSFT",
    layer: "cloud",
    role: "Azure, OpenAI distribution, enterprise copilot",
    signal: "FY26 Q3 revenue was $82.9B; Microsoft Cloud revenue grew 29%.",
    evidence: "Management framed the quarter around cloud and AI infrastructure and solutions for the agentic computing era.",
    pressure: "Investor focus is shifting to capex intensity, OpenAI economics, and whether AI seats expand margins.",
    metric: "Revenue: $82.9B",
    moat: 92,
    capexPull: 96,
    marginPower: 86,
    sourceIds: ["msft-q3fy26"],
  },
  {
    name: "Amazon AWS",
    ticker: "AMZN",
    layer: "cloud",
    role: "Cloud AI platform and custom Trainium silicon",
    signal: "AWS AI revenue run rate is over $15B, according to Amazon's Q1 commentary.",
    evidence: "Bedrock customer spend grew 170% quarter over quarter, and Q1 token processing exceeded all prior years combined.",
    pressure: "AWS must convert AI demand into durable utilization while absorbing high infrastructure spend.",
    metric: "AI run-rate: $15B+",
    moat: 90,
    capexPull: 94,
    marginPower: 83,
    sourceIds: ["amzn-ai-q126"],
  },
  {
    name: "Google Cloud",
    ticker: "GOOGL",
    layer: "cloud",
    role: "TPUs, Gemini, cloud AI infrastructure",
    signal: "Q1 2026 Google Cloud revenue rose 63% to $20B.",
    evidence: "Alphabet cited enterprise AI infrastructure and solutions as drivers and raised visibility around cloud demand.",
    pressure: "Compute constraints and capex guidance are now central to the Google Cloud investment case.",
    metric: "Cloud: $20B/qtr",
    moat: 88,
    capexPull: 96,
    marginPower: 82,
    sourceIds: ["goog-q126"],
  },
  {
    name: "Oracle",
    ticker: "ORCL",
    layer: "cloud",
    role: "OCI capacity for large AI contracts",
    signal: "Q3 FY26 RPO reached $553B, up 325% year over year.",
    evidence: "Oracle said most RPO growth related to large-scale AI contracts, with customer prepayments or customer-supplied GPUs funding equipment.",
    pressure: "Backlog quality, funding structure, and customer concentration matter more than headline contract size.",
    metric: "RPO: $553B",
    moat: 75,
    capexPull: 99,
    marginPower: 70,
    sourceIds: ["orcl-q3fy26"],
  },
  {
    name: "CoreWeave",
    ticker: "CRWV",
    layer: "cloud",
    role: "GPU neocloud",
    signal: "Q1 2025 revenue backlog was $25.9B, including an OpenAI strategic deal.",
    evidence: "CoreWeave reported about 420 MW of active power and 1.6 GW of contracted power at quarter end.",
    pressure: "Debt, supplier dependence, and customer concentration can magnify both upside and drawdown risk.",
    metric: "Backlog: $25.9B",
    moat: 67,
    capexPull: 97,
    marginPower: 62,
    sourceIds: ["cw-q125"],
  },
  {
    name: "Meta",
    ticker: "META",
    layer: "models",
    role: "Open models, social distribution, AI ads",
    signal: "Q1 2026 revenue rose 33% to $56.3B; 2026 capex guidance rose to $125B-$145B.",
    evidence: "Meta tied higher capex to component pricing and future data center capacity.",
    pressure: "The market is watching whether massive model and infrastructure spend improves ads, engagement, and assistant products.",
    metric: "Capex guide: $125B-$145B",
    moat: 83,
    capexPull: 98,
    marginPower: 81,
    sourceIds: ["meta-q126"],
  },
  {
    name: "Snowflake",
    ticker: "SNOW",
    layer: "data",
    role: "AI data cloud and governed enterprise data",
    signal: "Q4 FY26 revenue was $1.28B, up 30%; RPO reached $9.77B.",
    evidence: "More than 9,100 accounts were using Snowflake AI features and Snowflake Intelligence reached about 2,500 accounts in three months.",
    pressure: "Consumption models can wobble if AI workloads do not expand faster than optimization pressure.",
    metric: "RPO: $9.77B",
    moat: 78,
    capexPull: 55,
    marginPower: 77,
    sourceIds: ["snow-fy26"],
  },
  {
    name: "ServiceNow",
    ticker: "NOW",
    layer: "apps",
    role: "AI workflow control tower",
    signal: "Q1 2026 subscription revenue grew 22% to $3.67B.",
    evidence: "Now Assist customers spending over $1M in ACV grew more than 130% year over year.",
    pressure: "AI must translate into larger workflow contracts, not just feature packaging inside the base platform.",
    metric: "Sub rev: $3.67B",
    moat: 84,
    capexPull: 39,
    marginPower: 86,
    sourceIds: ["now-q126"],
  },
];

export const debates = [
  {
    title: "Scarcity moves downstream",
    bull: "The bottleneck starts in EUV and advanced packaging, but the cash signal shows up in GPUs, networking, power gear, and cloud backlogs.",
    bear: "The same scarcity invites customer-funded capacity, custom chips, and margin bargaining once supply normalizes.",
  },
  {
    title: "Compute is becoming financed infrastructure",
    bull: "Oracle, CoreWeave, and hyperscalers are turning AI compute into contracted utility-like revenue streams.",
    bear: "Duration mismatch, customer concentration, and GPU depreciation can make the utility comparison too flattering.",
  },
  {
    title: "Application capture remains unsettled",
    bull: "ServiceNow and Snowflake show AI can attach to trusted enterprise systems where data, identity, and workflow already live.",
    bear: "If foundation models commoditize features faster than vendors monetize them, the app layer may face price compression.",
  },
];

export const timeline = [
  ["2024", "GPU supply scarcity becomes the dominant AI investment lens."],
  ["2025", "Custom accelerators, Ethernet fabrics, and AI data center power constraints become investable themes."],
  ["2026", "Cloud RPO, capex guidance, and enterprise AI attach rates become the scoreboard."],
  ["2027+", "Inference economics and application-level ROI decide which capex streams earn attractive returns."],
];
