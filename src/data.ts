export type ExposureMode = "revenue" | "opIncome";
export type Risk = "low" | "medium" | "high";
export type Category = "silicon" | "physical infra" | "power" | "cloud" | "other";

export type Layer = {
  id: string;
  order: number;
  name: string;
  subtitle: string;
  category: Category;
};

export type ExposureCompany = {
  name: string;
  ticker?: string;
  layerId: string;
  share: number;
  revenueMix: number;
  opIncomeMix?: number;
  note: string;
  category: Category;
};

export type CoverageCompany = {
  name: string;
  ticker?: string;
  coverage: number;
  risk: Risk;
  category: Category;
};

export type Source = {
  name: string;
  publisher: string;
  url: string;
};

export const layers: Layer[] = [
  { id: "commodities", order: 1, name: "Commodities", subtitle: "cement / steel / copper", category: "physical infra" },
  { id: "construction", order: 2, name: "Construction / EPC", subtitle: "site work / electrical", category: "physical infra" },
  { id: "generation", order: 3, name: "Power Generation", subtitle: "gas turbines / fuel cells", category: "power" },
  { id: "ipps", order: 4, name: "Power IPPs", subtitle: "PPA providers", category: "power" },
  { id: "grid", order: 5, name: "Grid / Transformers / Switchgear", subtitle: "electrical equipment", category: "power" },
  { id: "cooling", order: 6, name: "Cooling", subtitle: "liquid / CDUs", category: "physical infra" },
  { id: "lithography", order: 7, name: "Lithography / Fab Equipment", subtitle: "wafer fab tools", category: "silicon" },
  { id: "foundry", order: 8, name: "Foundry", subtitle: "leading-edge wafers", category: "silicon" },
  { id: "memory", order: 9, name: "HBM Memory", subtitle: "high-bandwidth memory", category: "silicon" },
  { id: "packaging", order: 10, name: "Advanced Packaging", subtitle: "CoWoS / 2.5D / 3D", category: "silicon" },
  { id: "accelerators", order: 11, name: "AI Accelerators", subtitle: "GPUs / ASICs", category: "silicon" },
  {
    id: "optics",
    order: 12,
    name: "Optical Interconnect & Fiber",
    subtitle: "transceivers / AECs / fiber",
    category: "silicon",
  },
  { id: "systems", order: 13, name: "System Integration / Racks / EMS", subtitle: "AI factories", category: "physical infra" },
  { id: "hyperscalers", order: 14, name: "Hyperscalers", subtitle: "diversified clouds", category: "cloud" },
  { id: "neoclouds", order: 15, name: "Neoclouds", subtitle: "pure-play AI clouds", category: "cloud" },
];

export const exposureCompanies: ExposureCompany[] = [
  { name: "Cemex / Eagle", layerId: "commodities", share: 30, revenueMix: 8, opIncomeMix: 8, note: "~30% rest", category: "physical infra" },
  { name: "Freeport-McMoRan", ticker: "FCX", layerId: "commodities", share: 22, revenueMix: 8, opIncomeMix: 8, note: "~22% copper share", category: "physical infra" },
  { name: "Nucor", ticker: "NUE", layerId: "commodities", share: 18, revenueMix: 8, opIncomeMix: 8, note: "~18% steel", category: "physical infra" },
  { name: "Cleveland-Cliffs", ticker: "CLF", layerId: "commodities", share: 15, revenueMix: 4, opIncomeMix: 7, note: "~15% steel", category: "physical infra" },
  { name: "Vulcan Materials", ticker: "VMC", layerId: "commodities", share: 14, revenueMix: 8, opIncomeMix: 8, note: "~14% aggregates", category: "physical infra" },

  { name: "MYR / Granite", layerId: "construction", share: 35, revenueMix: 8, opIncomeMix: 8, note: "~35% share", category: "physical infra" },
  { name: "Quanta Services", ticker: "PWR", layerId: "construction", share: 25, revenueMix: 25, opIncomeMix: 25, note: "rev 25% DC", category: "physical infra" },
  { name: "EMCOR", ticker: "EME", layerId: "construction", share: 15, revenueMix: 15, opIncomeMix: 15, note: "~15% share", category: "physical infra" },
  { name: "MasTec", ticker: "MTZ", layerId: "construction", share: 14, revenueMix: 12, opIncomeMix: 12, note: "~14% share", category: "physical infra" },
  { name: "Fluor", ticker: "FLR", layerId: "construction", share: 11, revenueMix: 10, opIncomeMix: 10, note: "~11% share", category: "physical infra" },

  { name: "GE Vernova", ticker: "GEV", layerId: "generation", share: 35, revenueMix: 35, opIncomeMix: 40, note: "turbines · 100GW backlog", category: "power" },
  { name: "Siemens Energy", layerId: "generation", share: 28, revenueMix: 25, opIncomeMix: 30, note: "~28% share", category: "power" },
  { name: "Mitsubishi Pwr", layerId: "generation", share: 22, revenueMix: 20, opIncomeMix: 25, note: "~22% share", category: "power" },
  { name: "Bloom Energy", ticker: "BE", layerId: "generation", share: 8, revenueMix: 65, opIncomeMix: 65, note: "gen · $20B backlog", category: "power" },
  { name: "Oklo", ticker: "OKLO", layerId: "generation", share: 1, revenueMix: 100, note: "pre-revenue nuclear optionality", category: "power" },

  { name: "Constellation Energy", ticker: "CEG", layerId: "ipps", share: 40, revenueMix: 10, opIncomeMix: 15, note: "post-Calpine", category: "power" },
  { name: "Vistra Corp", ticker: "VST", layerId: "ipps", share: 28, revenueMix: 15, opIncomeMix: 20, note: "~28% share", category: "power" },
  { name: "NRG / others", layerId: "ipps", share: 18, revenueMix: 9, opIncomeMix: 9, note: "~18% share", category: "power" },
  { name: "Talen Energy", ticker: "TLN", layerId: "ipps", share: 14, revenueMix: 50, opIncomeMix: 60, note: "AWS data-center deal", category: "power" },

  { name: "Hitachi Energy", layerId: "grid", share: 22, revenueMix: 30, opIncomeMix: 35, note: "transformers", category: "power" },
  { name: "Eaton", ticker: "ETN", layerId: "grid", share: 17, revenueMix: 18, opIncomeMix: 24, note: "~17% share", category: "power" },
  { name: "Schneider Electric", layerId: "grid", share: 16, revenueMix: 30, opIncomeMix: 30, note: "DC orders", category: "power" },
  { name: "ABB", ticker: "ABB", layerId: "grid", share: 14, revenueMix: 12, opIncomeMix: 15, note: "~14% share", category: "power" },
  { name: "Hubbell", ticker: "HUBB", layerId: "grid", share: 11, revenueMix: 10, opIncomeMix: 12, note: "~11% share", category: "power" },

  { name: "Vertiv Holdings", ticker: "VRT", layerId: "cooling", share: 32, revenueMix: 80, opIncomeMix: 85, note: "cooling / UPS", category: "physical infra" },
  { name: "Schneider (cool)", layerId: "cooling", share: 20, revenueMix: 30, opIncomeMix: 30, note: "DC orders", category: "physical infra" },
  { name: "Modine", ticker: "MOD", layerId: "cooling", share: 17, revenueMix: 36, opIncomeMix: 40, note: "FY26 AI exposure", category: "physical infra" },
  { name: "CoolIT / Asetek", layerId: "cooling", share: 17, revenueMix: 85, opIncomeMix: 85, note: "liquid cooling", category: "physical infra" },
  { name: "Delta Electronics", layerId: "cooling", share: 14, revenueMix: 25, opIncomeMix: 30, note: "~14% share", category: "physical infra" },

  { name: "ASML", ticker: "ASML", layerId: "lithography", share: 100, revenueMix: 55, opIncomeMix: 55, note: "EUV monopoly", category: "silicon" },
  { name: "Applied Materials", ticker: "AMAT", layerId: "lithography", share: 22, revenueMix: 40, opIncomeMix: 45, note: "~22% share", category: "silicon" },
  { name: "Lam Research", ticker: "LRCX", layerId: "lithography", share: 18, revenueMix: 45, opIncomeMix: 50, note: "~18% share", category: "silicon" },
  { name: "KLA", ticker: "KLAC", layerId: "lithography", share: 15, revenueMix: 35, opIncomeMix: 40, note: "~15% share", category: "silicon" },

  { name: "TSMC", ticker: "TSM", layerId: "foundry", share: 70, revenueMix: 47, opIncomeMix: 55, note: "leading-edge", category: "silicon" },
  { name: "Samsung Foundry", layerId: "foundry", share: 17, revenueMix: 25, opIncomeMix: 30, note: "~17% share", category: "silicon" },
  { name: "Intel Foundry", ticker: "INTC", layerId: "foundry", share: 8, revenueMix: 9, note: "~8% share", category: "silicon" },

  { name: "SK Hynix", layerId: "memory", share: 57, revenueMix: 55, opIncomeMix: 90, note: "HBM leader", category: "silicon" },
  { name: "Micron", ticker: "MU", layerId: "memory", share: 21, revenueMix: 56, opIncomeMix: 75, note: "data center", category: "silicon" },
  { name: "Samsung Memory", layerId: "memory", share: 17, revenueMix: 50, opIncomeMix: 85, note: "HBM challenger", category: "silicon" },

  { name: "TSMC CoWoS", ticker: "TSM", layerId: "packaging", share: 80, revenueMix: 10, opIncomeMix: 18, note: "CoWoS capacity", category: "silicon" },
  { name: "Amkor", ticker: "AMKR", layerId: "packaging", share: 10, revenueMix: 12, opIncomeMix: 12, note: "~10% share", category: "silicon" },
  { name: "ASE Technology", ticker: "ASX", layerId: "packaging", share: 10, revenueMix: 20, opIncomeMix: 20, note: "~10% share", category: "silicon" },

  { name: "Nvidia", ticker: "NVDA", layerId: "accelerators", share: 85, revenueMix: 90, opIncomeMix: 92, note: "AI accelerator", category: "silicon" },
  { name: "AMD", ticker: "AMD", layerId: "accelerators", share: 5, revenueMix: 48, opIncomeMix: 57, note: "data center", category: "silicon" },
  { name: "Broadcom", ticker: "AVGO", layerId: "accelerators", share: 5, revenueMix: 50, opIncomeMix: 55, note: "custom ASIC", category: "silicon" },
  { name: "Marvell", ticker: "MRVL", layerId: "accelerators", share: 5, revenueMix: 50, opIncomeMix: 55, note: "custom ASIC", category: "silicon" },

  { name: "Coherent", ticker: "COHR", layerId: "optics", share: 22, revenueMix: 59, opIncomeMix: 65, note: "transceivers", category: "silicon" },
  { name: "Fabrinet", ticker: "FN", layerId: "optics", share: 17, revenueMix: 77, opIncomeMix: 75, note: "optical manufacturing", category: "silicon" },
  { name: "Credo", ticker: "CRDO", layerId: "optics", share: 14, revenueMix: 95, opIncomeMix: 95, note: "AECs", category: "silicon" },
  { name: "Astera Labs", ticker: "ALAB", layerId: "optics", share: 14, revenueMix: 100, opIncomeMix: 100, note: "connectivity silicon", category: "silicon" },
  { name: "Lumentum", ticker: "LITE", layerId: "optics", share: 14, revenueMix: 50, opIncomeMix: 55, note: "datacom", category: "silicon" },
  { name: "Corning", ticker: "GLW", layerId: "optics", share: 14, revenueMix: 25, opIncomeMix: 30, note: "fiber", category: "silicon" },

  { name: "Foxconn", layerId: "systems", share: 28, revenueMix: 30, opIncomeMix: 35, note: "AI servers", category: "physical infra" },
  { name: "Super Micro", ticker: "SMCI", layerId: "systems", share: 17, revenueMix: 70, opIncomeMix: 70, note: "AI servers", category: "physical infra" },
  { name: "Dell", ticker: "DELL", layerId: "systems", share: 14, revenueMix: 25, opIncomeMix: 25, note: "AI server exposure", category: "physical infra" },
  { name: "HPE", ticker: "HPE", layerId: "systems", share: 10, revenueMix: 20, opIncomeMix: 20, note: "AI systems", category: "physical infra" },
  { name: "Jabil", ticker: "JBL", layerId: "systems", share: 10, revenueMix: 36, opIncomeMix: 40, note: "$12.1B FY26 AI", category: "physical infra" },
  { name: "Celestica", ticker: "CLS", layerId: "systems", share: 9, revenueMix: 30, opIncomeMix: 35, note: "AI hardware", category: "physical infra" },

  { name: "AWS", ticker: "AMZN", layerId: "hyperscalers", share: 30, revenueMix: 25, opIncomeMix: 35, note: "IaaS leader", category: "cloud" },
  { name: "Azure", ticker: "MSFT", layerId: "hyperscalers", share: 22, revenueMix: 40, opIncomeMix: 45, note: "AI cloud", category: "cloud" },
  { name: "GCP", ticker: "GOOGL", layerId: "hyperscalers", share: 13, revenueMix: 40, note: "AI infrastructure", category: "cloud" },
  { name: "Oracle", ticker: "ORCL", layerId: "hyperscalers", share: 5, revenueMix: 70, note: "OCI AI contracts", category: "cloud" },

  { name: "CoreWeave", ticker: "CRWV", layerId: "neoclouds", share: 50, revenueMix: 100, note: "$66.8B backlog", category: "cloud" },
  { name: "Nebius", ticker: "NBIS", layerId: "neoclouds", share: 25, revenueMix: 100, opIncomeMix: 24, note: "$50B backlog", category: "cloud" },
  { name: "IREN", ticker: "IREN", layerId: "neoclouds", share: 15, revenueMix: 100, note: "$9.7B Microsoft", category: "cloud" },
  { name: "Crusoe / others", layerId: "neoclouds", share: 10, revenueMix: 100, note: "GPU cloud capacity", category: "cloud" },
];

export const coverageCompanies: CoverageCompany[] = [
  { name: "Oklo", ticker: "OKLO", coverage: 5, risk: "high", category: "power" },
  { name: "Micron", ticker: "MU", coverage: 30, risk: "low", category: "silicon" },
  { name: "Modine Manufacturing", ticker: "MOD", coverage: 40, risk: "medium", category: "physical infra" },
  { name: "Amkor Technology", ticker: "AMKR", coverage: 40, risk: "medium", category: "silicon" },
  { name: "SK Hynix", coverage: 45, risk: "low", category: "silicon" },
  { name: "Vertiv Holdings", ticker: "VRT", coverage: 50, risk: "low", category: "physical infra" },
  { name: "Fabrinet", ticker: "FN", coverage: 55, risk: "low", category: "silicon" },
  { name: "Constellation Energy", ticker: "CEG", coverage: 60, risk: "low", category: "power" },
  { name: "Astera Labs", ticker: "ALAB", coverage: 65, risk: "medium", category: "silicon" },
  { name: "Bloom Energy", ticker: "BE", coverage: 70, risk: "medium", category: "power" },
  { name: "Jabil", ticker: "JBL", coverage: 70, risk: "medium", category: "physical infra" },
  { name: "Nvidia", ticker: "NVDA", coverage: 75, risk: "medium", category: "silicon" },
  { name: "Eaton", ticker: "ETN", coverage: 80, risk: "low", category: "power" },
  { name: "Credo Technology", ticker: "CRDO", coverage: 80, risk: "medium", category: "silicon" },
  { name: "Talen Energy", ticker: "TLN", coverage: 80, risk: "low", category: "power" },
  { name: "Quanta Services", ticker: "PWR", coverage: 80, risk: "medium", category: "physical infra" },
  { name: "Super Micro Computer", ticker: "SMCI", coverage: 85, risk: "high", category: "physical infra" },
  { name: "Broadcom", ticker: "AVGO", coverage: 90, risk: "low", category: "silicon" },
  { name: "Vistra Corp", ticker: "VST", coverage: 95, risk: "low", category: "power" },
  { name: "GE Vernova", ticker: "GEV", coverage: 450, risk: "low", category: "power" },
  { name: "Cleveland-Cliffs", ticker: "CLF", coverage: 500, risk: "low", category: "physical infra" },
];

export const sources: Source[] = [
  {
    name: "NVIDIA FY2026 results",
    publisher: "NVIDIA Investor Relations",
    url: "https://investor.nvidia.com/news/press-release-details/2026/NVIDIA-Announces-Financial-Results-for-Fourth-Quarter-and-Fiscal-2026/",
  },
  {
    name: "TSMC 2025 Annual Report",
    publisher: "TSMC Investor Relations",
    url: "https://investor.tsmc.com/static/annualReports/2025/english/index.html",
  },
  {
    name: "Broadcom FY2025 results",
    publisher: "Broadcom Investor Relations",
    url: "https://investors.broadcom.com/news-releases/news-release-details/broadcom-inc-announces-fourth-quarter-and-fiscal-year-2025",
  },
  {
    name: "ASML 2025 Annual Report",
    publisher: "ASML",
    url: "https://www.asml.com/investors/annual-report/2025",
  },
  {
    name: "Microsoft FY2026 Q3 results",
    publisher: "Microsoft Investor Relations",
    url: "https://www.microsoft.com/en-us/investor/earnings/fy-2026-q3/press-release-webcast",
  },
  {
    name: "Oracle FY2026 Q3 results",
    publisher: "Oracle Investor Relations",
    url: "https://investor.oracle.com/investor-news/news-details/2026/Oracle-Announces-Fiscal-Year-2026-Third-Quarter-Financial-Results/default.aspx",
  },
  {
    name: "CoreWeave Q1 2025 results",
    publisher: "CoreWeave Investor Relations",
    url: "https://investors.coreweave.com/news/news-details/2025/CoreWeave-Reports-Strong-First-Quarter-2025-Results/default.aspx",
  },
  {
    name: "ServiceNow Q1 2026 results",
    publisher: "ServiceNow Investor Relations",
    url: "https://investor.servicenow.com/news/news-details/2026/ServiceNow-Reports-First-Quarter-2026-Financial-Results/default.aspx",
  },
];
