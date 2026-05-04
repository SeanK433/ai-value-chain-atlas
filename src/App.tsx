import { ArrowUpRight, BarChart3, Grid3X3, Layers3, LineChart, Rows3, ScatterChart } from "lucide-react";
import { useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { coverageCompanies, ExposureMode, exposureCompanies, layers, sources } from "./data";

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
  other: "#a3a3a3",
};

const riskY = {
  low: 78,
  medium: 48,
  high: 18,
};

function mixValue(company: (typeof exposureCompanies)[number], mode: ExposureMode) {
  return mode === "revenue" ? company.revenueMix : company.opIncomeMix ?? company.revenueMix;
}

function mixColor(value: number) {
  return mixBuckets.find((bucket) => value >= bucket.min && value < bucket.max)?.color ?? mixBuckets[0].color;
}

function displayPct(value: number) {
  return value >= 100 ? `${value}%` : `~${value}%`;
}

function Header() {
  return (
    <header className="page-header" id="top">
      <div className="kicker">Public-market AI supply chain / artifact rebuild</div>
      <h1>The AI Value Chain Thesis</h1>
      <p>
        A compact investment worksheet for short AI timelines: exposure by layer, capacity coverage, and substitution
        risk. The structure mirrors the reference artifact system; the copy, styling, and presentation are original.
      </p>
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
        Exposure map
      </a>
      <a href="#coverage">
        <BarChart3 size={15} />
        Coverage
      </a>
      <a href="#risk">
        <ScatterChart size={15} />
        Risk map
      </a>
    </nav>
  );
}

function MixLegend({ mode, setMode }: { mode: ExposureMode; setMode: (mode: ExposureMode) => void }) {
  return (
    <div className="legend-strip">
      <div className="mix-legend" aria-label="AI exposure legend">
        <span>AI {mode === "revenue" ? "Revenue" : "Operating Income"} %</span>
        {mixBuckets.map((bucket) => (
          <i key={bucket.label} style={{ "--swatch": bucket.color } as CSSProperties}>
            {bucket.label}
          </i>
        ))}
      </div>
      <div className="segmented" aria-label="Color by">
        <span>Color by</span>
        <button className={mode === "revenue" ? "active" : ""} onClick={() => setMode("revenue")} type="button">
          Revenue %
        </button>
        <button className={mode === "opIncome" ? "active" : ""} onClick={() => setMode("opIncome")} type="button">
          Op income %
        </button>
      </div>
    </div>
  );
}

function ExposureMap() {
  const [mode, setMode] = useState<ExposureMode>("revenue");

  return (
    <section className="artifact-panel exposure-panel" id="exposure">
      <div className="artifact-title">
        <p>1 / AI beta</p>
        <h2>Fifteen-layer supply-chain exposure map</h2>
        <small>
          Block width approximates share within each layer. Color represents AI revenue or operating-income mix.
        </small>
      </div>
      <MixLegend mode={mode} setMode={setMode} />
      <div className="layer-map" role="list">
        {layers.map((layer) => {
          const companies = exposureCompanies.filter((company) => company.layerId === layer.id);
          return (
            <article className="map-layer" id={layer.id} key={layer.id} role="listitem">
              <div className="map-layer-label">
                <b>{layer.order}</b>
                <div>
                  <h3>{layer.name}</h3>
                  <p>{layer.subtitle}</p>
                </div>
              </div>
              <div className="company-strip">
                {companies.map((company) => {
                  const value = mixValue(company, mode);
                  return (
                    <div
                      className="exposure-block"
                      key={`${layer.id}-${company.name}`}
                      style={
                        {
                          "--basis": `${Math.max(company.share, 7)}%`,
                          "--mix": mixColor(value),
                          "--category": categoryColors[company.category],
                        } as CSSProperties
                      }
                    >
                      <strong>{company.name}</strong>
                      <span>{displayPct(company.share)}</span>
                      <em>{company.note}</em>
                      <small>
                        rev {company.revenueMix}% · op {company.opIncomeMix ?? company.revenueMix}%
                      </small>
                    </div>
                  );
                })}
              </div>
            </article>
          );
        })}
      </div>
      <p className="caption">
        Use this as the exposure screen: high AI beta only matters if the company also sits in a layer where demand can
        surprise faster than the market has already priced.
      </p>
    </section>
  );
}

function CoverageChart() {
  const sorted = useMemo(() => [...coverageCompanies].sort((a, b) => a.coverage - b.coverage), []);

  return (
    <section className="artifact-panel" id="coverage">
      <div className="artifact-title">
        <p>2 / Priced-in status</p>
        <h2>Coverage of a 15GW incremental AI-buildout case</h2>
        <small>
          Current orders or stated capacity as a rough share of the next twelve months of additional demand. Sub-60%
          suggests room for upside; 100%+ screens as saturated.
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
            <div className="coverage-row" key={company.name}>
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
              <strong>{company.coverage > 250 ? `${company.coverage}%` : `${company.coverage}%`}</strong>
            </div>
          );
        })}
      </div>
      <p className="caption">
        Vertical marker = 100% coverage. GE Vernova and Cleveland-Cliffs are intentionally allowed to read off-scale
        because their broader end-market exposure makes the AI-specific read less clean.
      </p>
    </section>
  );
}

function RiskScatter() {
  return (
    <section className="artifact-panel" id="risk">
      <div className="artifact-title">
        <p>3 / Idiosyncratic risk</p>
        <h2>Coverage versus substitution risk</h2>
        <small>
          The sweet spot is low coverage plus low substitution risk: enough room for upside, without needing to pick the
          only winner in a crowded layer.
        </small>
      </div>
      <div className="quadrant-labels" aria-hidden="true">
        <span>speculative contested</span>
        <span>saturated</span>
        <span>sweet spot</span>
        <span>priced in but safer</span>
      </div>
      <div className="scatter">
        <div className="x-axis">Coverage of 15GW additional demand →</div>
        <div className="y-axis">← Substitution risk</div>
        <div className="hundred-line" />
        {[0, 25, 50, 75, 100, 125, 150, 175, 200].map((tick) => (
          <span className="x-tick" style={{ left: `${(tick / 200) * 100}%` }} key={tick}>
            {tick}%
          </span>
        ))}
        {coverageCompanies.map((company) => {
          const x = Math.min(company.coverage, 200) / 200;
          return (
            <div
              className="scatter-point"
              key={company.name}
              style={
                {
                  left: `${x * 100}%`,
                  top: `${riskY[company.risk]}%`,
                  "--category": categoryColors[company.category],
                } as CSSProperties
              }
            >
              <i />
              <span>{company.name}</span>
            </div>
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
      <div className="risk-table">
        <h3>Company coverage / substitution risk</h3>
        <div>
          {coverageCompanies.map((company) => (
            <span key={company.name}>
              <b>{company.name}</b> {company.coverage}% / {company.risk}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function SourceLibrary() {
  return (
    <section className="source-panel">
      <div className="artifact-title">
        <p>Method note</p>
        <h2>Source library</h2>
        <small>
          Values marked with approximations are directional estimates intended to recreate the artifact mechanics, not
          finished investment recommendations.
        </small>
      </div>
      <div className="source-grid">
        {sources.map((source) => (
          <a href={source.url} target="_blank" rel="noreferrer" key={source.url}>
            <span>{source.publisher}</span>
            <b>{source.name}</b>
            <ArrowUpRight size={14} />
          </a>
        ))}
      </div>
    </section>
  );
}

export function App() {
  return (
    <>
      <StickyNav />
      <main>
        <Header />
        <section className="artifact-index">
          <a href="#exposure">
            <Layers3 size={20} />
            <span>Artifact 1</span>
            <b>15-layer AI beta map</b>
          </a>
          <a href="#coverage">
            <LineChart size={20} />
            <span>Artifact 2</span>
            <b>Priced-in capacity screen</b>
          </a>
          <a href="#risk">
            <ScatterChart size={20} />
            <span>Artifact 3</span>
            <b>Coverage vs substitution risk</b>
          </a>
        </section>
        <ExposureMap />
        <CoverageChart />
        <RiskScatter />
        <SourceLibrary />
      </main>
      <footer>
        <BarChart3 size={17} />
        <span>Public-source worksheet. Directional estimates only. Not investment advice.</span>
      </footer>
    </>
  );
}
