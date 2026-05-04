import {
  ArrowUpRight,
  BarChart3,
  BookOpen,
  CheckCircle2,
  Filter,
  Grid3X3,
  Layers3,
  LineChart,
  Rows3,
  ScatterChart,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import type { CSSProperties } from "react";
import {
  companies,
  Company,
  Confidence,
  coverageCompanies,
  ExposureMode,
  lastUpdated,
  layers,
  methodology,
  sources,
} from "./data";

const mixBuckets = [
  { label: "<15%", min: 0, max: 15, color: "#364354" },
  { label: "15-30%", min: 15, max: 30, color: "#3c6c78" },
  { label: "30-50%", min: 30, max: 50, color: "#5f9a73" },
  { label: "50-75%", min: 50, max: 75, color: "#d59a45" },
  { label: "75%+", min: 75, max: 101, color: "#d9534f" },
];

const categoryColors = {
  silicon: "#6da7ff",
  "physical infra": "#d7a657",
  power: "#7bd389",
  cloud: "#c98ad9",
  apps: "#f08f76",
  other: "#a3a3a3",
};

const confidenceRank: Record<Confidence, number> = {
  reported: 4,
  derived: 3,
  proxy: 2,
  speculative: 1,
};

const riskY = {
  low: 78,
  medium: 48,
  high: 18,
};

function mixValue(company: Company, mode: ExposureMode) {
  return mode === "revenue" ? company.aiRevenueMix : company.aiOpIncomeMix;
}

function mixColor(value: number) {
  return mixBuckets.find((bucket) => value >= bucket.min && value < bucket.max)?.color ?? mixBuckets[0].color;
}

function displayPct(value: number) {
  return value >= 100 ? `${Math.round(value)}%` : `~${Math.round(value)}%`;
}

function getCoverage(company: Company, demandGw: number) {
  if (company.capacityGw) {
    return (company.capacityGw / demandGw) * 100;
  }
  return company.coverageAt15Gw === 0 ? 0 : company.coverageAt15Gw * (15 / demandGw);
}

function getSources(ids: string[]) {
  return sources.filter((source) => ids.includes(source.id));
}

function ConfidenceBadge({ value }: { value: Confidence }) {
  return <span className={`confidence ${value}`}>{value}</span>;
}

function Header() {
  return (
    <header className="page-header" id="top">
      <div className="kicker">Independent data audit / public-source worksheet</div>
      <h1>The AI Value Chain Thesis</h1>
      <p>
        A rebuilt investment map using first-principles estimates from company disclosures, earnings releases, and
        explicit proxy logic. Every number now carries a confidence label, source note, and audit trail.
      </p>
      <div className="version-row">
        <span>Last updated {lastUpdated}</span>
        <span>Data status: v1 audited scaffold</span>
        <span>Scenario base: 15GW incremental AI demand</span>
      </div>
    </header>
  );
}

function StickyNav() {
  return (
    <nav className="sticky-nav" aria-label="Artifact navigation">
      <a href="#top">
        <Grid3X3 size={15} />
        Atlas
      </a>
      <a href="#exposure">
        <Rows3 size={15} />
        Exposure
      </a>
      <a href="#coverage">
        <BarChart3 size={15} />
        Coverage
      </a>
      <a href="#risk">
        <ScatterChart size={15} />
        Risk
      </a>
      <a href="#lens">
        <Filter size={15} />
        Equity lens
      </a>
      <a href="#method">
        <BookOpen size={15} />
        Method
      </a>
    </nav>
  );
}

function Controls({
  mode,
  setMode,
  demandGw,
  setDemandGw,
  query,
  setQuery,
  confidence,
  setConfidence,
}: {
  mode: ExposureMode;
  setMode: (mode: ExposureMode) => void;
  demandGw: number;
  setDemandGw: (value: number) => void;
  query: string;
  setQuery: (value: string) => void;
  confidence: Confidence | "all";
  setConfidence: (value: Confidence | "all") => void;
}) {
  return (
    <section className="control-panel">
      <label className="search-box">
        <Search size={16} />
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search company or ticker" />
      </label>
      <div className="segmented" aria-label="Color by">
        <span>Color by</span>
        <button className={mode === "revenue" ? "active" : ""} onClick={() => setMode("revenue")} type="button">
          Revenue %
        </button>
        <button className={mode === "opIncome" ? "active" : ""} onClick={() => setMode("opIncome")} type="button">
          Op income %
        </button>
      </div>
      <label className="range-control">
        <SlidersHorizontal size={16} />
        <span>{demandGw}GW demand case</span>
        <input
          type="range"
          min="5"
          max="30"
          step="1"
          value={demandGw}
          onChange={(event) => setDemandGw(Number(event.target.value))}
        />
      </label>
      <label className="select-control">
        <span>Confidence</span>
        <select value={confidence} onChange={(event) => setConfidence(event.target.value as Confidence | "all")}>
          <option value="all">All</option>
          <option value="reported">Reported</option>
          <option value="derived">Derived</option>
          <option value="proxy">Proxy</option>
          <option value="speculative">Speculative</option>
        </select>
      </label>
    </section>
  );
}

function MixLegend({ mode }: { mode: ExposureMode }) {
  return (
    <div className="mix-legend" aria-label="AI exposure legend">
      <span>AI {mode === "revenue" ? "Revenue" : "Operating Income"} %</span>
      {mixBuckets.map((bucket) => (
        <i key={bucket.label} style={{ "--swatch": bucket.color } as CSSProperties}>
          {bucket.label}
        </i>
      ))}
    </div>
  );
}

function ExposureMap({
  mode,
  query,
  confidence,
  onSelect,
}: {
  mode: ExposureMode;
  query: string;
  confidence: Confidence | "all";
  onSelect: (company: Company) => void;
}) {
  const normalizedQuery = query.trim().toLowerCase();

  return (
    <section className="artifact-panel exposure-panel" id="exposure">
      <div className="artifact-title">
        <p>1 / AI beta</p>
        <h2>Fifteen-layer supply-chain exposure map</h2>
        <small>
          Block width approximates share within the investable layer. Color shows audited AI revenue or operating-income
          exposure. Badges mark how hard the number is.
        </small>
      </div>
      <MixLegend mode={mode} />
      <div className="layer-map" role="list">
        {layers.map((layer) => {
          const layerCompanies = companies
            .filter((company) => company.layerId === layer.id)
            .filter((company) => confidence === "all" || company.confidence === confidence)
            .filter((company) => {
              if (!normalizedQuery) return true;
              return `${company.name} ${company.ticker ?? ""}`.toLowerCase().includes(normalizedQuery);
            });

          return (
            <article className="map-layer" id={layer.id} key={layer.id} role="listitem">
              <div className="map-layer-label">
                <b>{layer.order}</b>
                <div>
                  <h3>{layer.name}</h3>
                  <p>{layer.subtitle}</p>
                  <small>{layer.method}</small>
                </div>
              </div>
              <div className="company-strip">
                {layerCompanies.length ? (
                  layerCompanies.map((company) => {
                    const value = mixValue(company, mode);
                    return (
                      <button
                        className="exposure-block"
                        key={`${layer.id}-${company.id}`}
                        onClick={() => onSelect(company)}
                        style={
                          {
                            "--basis": `${Math.max(company.layerShare, 7)}%`,
                            "--mix": mixColor(value),
                            "--category": categoryColors[company.category],
                          } as CSSProperties
                        }
                        type="button"
                      >
                        <strong>{company.name}</strong>
                        <span>{displayPct(company.layerShare)}</span>
                        <em>AI rev {company.aiRevenueMix}%</em>
                        <small>
                          {company.ticker ?? "private"} · {company.confidence}
                        </small>
                      </button>
                    );
                  })
                ) : (
                  <p className="empty-layer">No companies match the active filters.</p>
                )}
              </div>
            </article>
          );
        })}
      </div>
      <p className="caption">
        This pass deliberately lowers confidence where disclosure is weak. The point is not false precision; it is to
        expose where the investment thesis is standing on filings versus estimates.
      </p>
    </section>
  );
}

function CoverageChart({
  demandGw,
  query,
  confidence,
  onSelect,
}: {
  demandGw: number;
  query: string;
  confidence: Confidence | "all";
  onSelect: (company: Company) => void;
}) {
  const normalizedQuery = query.trim().toLowerCase();
  const sorted = useMemo(
    () =>
      coverageCompanies(demandGw)
        .filter((company) => company.coverage > 0)
        .filter((company) => confidence === "all" || company.confidence === confidence)
        .filter((company) => {
          if (!normalizedQuery) return true;
          return `${company.name} ${company.ticker ?? ""}`.toLowerCase().includes(normalizedQuery);
        })
        .sort((a, b) => a.coverage - b.coverage),
    [confidence, demandGw, normalizedQuery],
  );

  return (
    <section className="artifact-panel" id="coverage">
      <div className="artifact-title">
        <p>2 / Priced-in status</p>
        <h2>Coverage of the selected incremental AI-buildout case</h2>
        <small>
          The chart recalculates as you move the GW assumption. For power and neocloud names, coverage can use disclosed
          contracted GW. For other layers, it remains an audited backlog/order proxy.
        </small>
      </div>
      <div className="coverage-scale" aria-hidden="true">
        <span>&lt;60% upside</span>
        <span>60-100% moderate</span>
        <span>100%+ saturated</span>
      </div>
      <div className="coverage-bars">
        {sorted.map((company) => {
          const capped = Math.min(company.coverage, 250);
          return (
            <button className="coverage-row" key={company.id} onClick={() => onSelect(company)} type="button">
              <span>{company.name}</span>
              <div className="coverage-track">
                <i
                  style={
                    {
                      "--bar": `${(capped / 250) * 100}%`,
                      "--category": categoryColors[company.category],
                    } as CSSProperties
                  }
                />
                <b style={{ left: `${(100 / 250) * 100}%` }} />
              </div>
              <strong>{Math.round(company.coverage)}%</strong>
              <ConfidenceBadge value={company.confidence} />
            </button>
          );
        })}
      </div>
      <p className="caption">
        Vertical marker = 100% coverage. Values above 100% often mean the company is exposed to broader electricity,
        industrial, or cloud demand, not that the AI opportunity is exhausted.
      </p>
    </section>
  );
}

function RiskScatter({
  demandGw,
  query,
  confidence,
  onSelect,
}: {
  demandGw: number;
  query: string;
  confidence: Confidence | "all";
  onSelect: (company: Company) => void;
}) {
  const normalizedQuery = query.trim().toLowerCase();
  const points = coverageCompanies(demandGw)
    .filter((company) => company.coverage > 0)
    .filter((company) => confidence === "all" || company.confidence === confidence)
    .filter((company) => {
      if (!normalizedQuery) return true;
      return `${company.name} ${company.ticker ?? ""}`.toLowerCase().includes(normalizedQuery);
    });

  return (
    <section className="artifact-panel" id="risk">
      <div className="artifact-title">
        <p>3 / Idiosyncratic risk</p>
        <h2>Coverage versus substitution risk</h2>
        <small>
          The best quadrant is still bottom-left: low coverage plus low substitution risk. The difference now is that
          weak evidence is labeled before it can infect the conclusion.
        </small>
      </div>
      <div className="quadrant-labels" aria-hidden="true">
        <span>speculative contested</span>
        <span>saturated</span>
        <span>sweet spot</span>
        <span>priced in but safer</span>
      </div>
      <div className="scatter">
        <div className="x-axis">Coverage of {demandGw}GW additional demand →</div>
        <div className="y-axis">← Substitution risk</div>
        <div className="hundred-line" />
        {[0, 25, 50, 75, 100, 125, 150, 175, 200].map((tick) => (
          <span className="x-tick" style={{ left: `${(tick / 200) * 100}%` }} key={tick}>
            {tick}%
          </span>
        ))}
        {points.map((company) => {
          const x = Math.min(company.coverage, 200) / 200;
          return (
            <button
              className={`scatter-point ${company.confidence}`}
              key={company.id}
              onClick={() => onSelect(company)}
              style={
                {
                  left: `${x * 100}%`,
                  top: `${riskY[company.substitutionRisk]}%`,
                  "--category": categoryColors[company.category],
                } as CSSProperties
              }
              type="button"
            >
              <i />
              <span>{company.name}</span>
            </button>
          );
        })}
      </div>
      <div className="category-legend">
        {Object.entries(categoryColors).map(([category, color]) => (
          <span key={category} style={{ "--category": color } as CSSProperties}>
            {category}
          </span>
        ))}
      </div>
    </section>
  );
}

function EquityLens({ onSelect }: { onSelect: (company: Company) => void }) {
  const ranked = [...companies]
    .filter((company) => company.ticker)
    .sort((a, b) => {
      const aScore =
        mixValue(a, "revenue") * 0.42 +
        (100 - Math.min(a.coverageAt15Gw, 120)) * 0.18 +
        confidenceRank[a.confidence] * 9 -
        (a.substitutionRisk === "high" ? 16 : a.substitutionRisk === "medium" ? 7 : 0);
      const bScore =
        mixValue(b, "revenue") * 0.42 +
        (100 - Math.min(b.coverageAt15Gw, 120)) * 0.18 +
        confidenceRank[b.confidence] * 9 -
        (b.substitutionRisk === "high" ? 16 : b.substitutionRisk === "medium" ? 7 : 0);
      return bScore - aScore;
    })
    .slice(0, 18);

  return (
    <section className="artifact-panel" id="lens">
      <div className="artifact-title">
        <p>4 / Public equity lens</p>
        <h2>Names worth deeper underwriting</h2>
        <small>
          This is not a buy list. It is a triage queue combining AI mix, confidence, priced-in status, and substitution
          risk so diligence time goes where it matters.
        </small>
      </div>
      <div className="equity-table">
        {ranked.map((company) => (
          <button key={company.id} onClick={() => onSelect(company)} type="button">
            <b>{company.ticker}</b>
            <span>{company.name}</span>
            <i>AI rev {company.aiRevenueMix}%</i>
            <i>coverage {Math.round(getCoverage(company, 15))}%</i>
            <ConfidenceBadge value={company.confidence} />
          </button>
        ))}
      </div>
    </section>
  );
}

function Methodology() {
  return (
    <section className="artifact-panel" id="method">
      <div className="artifact-title">
        <p>5 / Methodology</p>
        <h2>How the audit treats uncertainty</h2>
        <small>
          This page is designed to be improved. The most important feature is that weak assumptions are visible instead
          of being hidden behind polished charts.
        </small>
      </div>
      <div className="method-grid">
        {methodology.map((item) => (
          <article key={item.title}>
            <CheckCircle2 size={18} />
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function SourceLibrary() {
  return (
    <section className="source-panel">
      <div className="artifact-title">
        <p>Source library</p>
        <h2>Primary-source anchors</h2>
        <small>
          Company blocks link back to these source IDs in the detail drawer. More sources should be added as each proxy
          estimate graduates into derived or reported status.
        </small>
      </div>
      <div className="source-grid">
        {sources.map((source) => (
          <a href={source.url} target="_blank" rel="noreferrer" key={source.id}>
            <span>{source.publisher}</span>
            <b>{source.name}</b>
            <ArrowUpRight size={14} />
          </a>
        ))}
      </div>
    </section>
  );
}

function DetailDrawer({ company, onClose, demandGw }: { company: Company | null; onClose: () => void; demandGw: number }) {
  if (!company) return null;
  const layer = layers.find((item) => item.id === company.layerId);
  const companySources = getSources(company.sourceIds);
  const coverage = getCoverage(company, demandGw);

  return (
    <aside className="drawer" aria-label={`${company.name} detail`}>
      <button className="drawer-close" onClick={onClose} type="button" aria-label="Close detail drawer">
        <X size={18} />
      </button>
      <p className="kicker">{layer?.name ?? "Application layer"}</p>
      <h2>{company.name}</h2>
      <div className="drawer-meta">
        <span>{company.ticker ?? "private / mixed"}</span>
        <span>{company.category}</span>
        <ConfidenceBadge value={company.confidence} />
      </div>
      <div className="metric-grid">
        <div>
          <span>Layer share</span>
          <b>{displayPct(company.layerShare)}</b>
        </div>
        <div>
          <span>AI revenue mix</span>
          <b>{company.aiRevenueMix}%</b>
        </div>
        <div>
          <span>AI op-income mix</span>
          <b>{company.aiOpIncomeMix}%</b>
        </div>
        <div>
          <span>{demandGw}GW coverage</span>
          <b>{Math.round(coverage)}%</b>
        </div>
      </div>
      <section>
        <h3>Thesis</h3>
        <p>{company.thesis}</p>
      </section>
      <section>
        <h3>Audit note</h3>
        <p>{company.audit}</p>
      </section>
      <section>
        <h3>Source logic</h3>
        <p>{company.sourceNote}</p>
      </section>
      <section>
        <h3>Public equity lens</h3>
        <p>{company.valuationLens}</p>
      </section>
      <section>
        <h3>Sources</h3>
        <div className="drawer-sources">
          {companySources.length ? (
            companySources.map((source) => (
              <a href={source.url} target="_blank" rel="noreferrer" key={source.id}>
                {source.publisher}
                <ArrowUpRight size={13} />
              </a>
            ))
          ) : (
            <span>No primary-source anchor yet. This should be upgraded before relying on the estimate.</span>
          )}
        </div>
      </section>
    </aside>
  );
}

export function App() {
  const [mode, setMode] = useState<ExposureMode>("revenue");
  const [demandGw, setDemandGw] = useState(15);
  const [query, setQuery] = useState("");
  const [confidence, setConfidence] = useState<Confidence | "all">("all");
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  return (
    <>
      <StickyNav />
      <main>
        <Header />
        <section className="artifact-index">
          <a href="#exposure">
            <Layers3 size={20} />
            <span>Artifact 1</span>
            <b>Audited AI beta map</b>
          </a>
          <a href="#coverage">
            <LineChart size={20} />
            <span>Artifact 2</span>
            <b>Scenario coverage screen</b>
          </a>
          <a href="#risk">
            <ScatterChart size={20} />
            <span>Artifact 3</span>
            <b>Coverage vs substitution risk</b>
          </a>
        </section>
        <Controls
          mode={mode}
          setMode={setMode}
          demandGw={demandGw}
          setDemandGw={setDemandGw}
          query={query}
          setQuery={setQuery}
          confidence={confidence}
          setConfidence={setConfidence}
        />
        <ExposureMap mode={mode} query={query} confidence={confidence} onSelect={setSelectedCompany} />
        <CoverageChart demandGw={demandGw} query={query} confidence={confidence} onSelect={setSelectedCompany} />
        <RiskScatter demandGw={demandGw} query={query} confidence={confidence} onSelect={setSelectedCompany} />
        <EquityLens onSelect={setSelectedCompany} />
        <Methodology />
        <SourceLibrary />
      </main>
      <DetailDrawer company={selectedCompany} demandGw={demandGw} onClose={() => setSelectedCompany(null)} />
      <footer>
        <BarChart3 size={17} />
        <span>Independent public-source worksheet. Directional estimates only. Not investment advice.</span>
      </footer>
    </>
  );
}
