import {
  ArrowUpRight,
  BarChart3,
  Boxes,
  CircuitBoard,
  Database,
  Factory,
  Flame,
  Gauge,
  Layers3,
  Library,
  Network,
  ServerCog,
  Zap,
} from "lucide-react";
import type { CSSProperties } from "react";
import { companies, debates, layers, LayerId, sources, timeline } from "./data";

const layerIcons: Record<LayerId, typeof CircuitBoard> = {
  lithography: Factory,
  foundry: Layers3,
  accelerators: CircuitBoard,
  networking: Network,
  power: Zap,
  cloud: ServerCog,
  models: Boxes,
  data: Database,
  apps: Gauge,
};

const getSources = (ids: string[]) => sources.filter((source) => ids.includes(source.id));

function ScoreBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="score-row">
      <span>{label}</span>
      <div className="score-track" aria-label={`${label} ${value} out of 100`}>
        <i style={{ width: `${value}%` }} />
      </div>
      <b>{value}</b>
    </div>
  );
}

function LayerRail() {
  return (
    <nav className="layer-rail" aria-label="AI value chain layers">
      <a className="brand-chip" href="#top">
        AI Atlas
      </a>
      {layers.map((layer) => {
        const Icon = layerIcons[layer.id];
        return (
          <a href={`#${layer.id}`} key={layer.id} style={{ "--accent": layer.color } as CSSProperties}>
            <Icon size={17} />
            <span>{layer.label}</span>
          </a>
        );
      })}
    </nav>
  );
}

function Hero() {
  return (
    <header className="hero" id="top">
      <div className="hero-copy">
        <p className="eyebrow">Investment Artifact 01 / Public-source atlas</p>
        <h1>AI Value Chain Atlas</h1>
        <p>
          A research interface for the investable AI stack: lithography, foundry, accelerators, networking,
          power, cloud, model labs, data systems, and application-layer capture.
        </p>
      </div>
      <div className="hero-grid" aria-label="AI value chain artifact board">
        {layers.map((layer, index) => {
          const Icon = layerIcons[layer.id];
          const layerCompanies = companies.filter((company) => company.layer === layer.id);
          return (
            <a
              href={`#${layer.id}`}
              className="hero-tile"
              key={layer.id}
              style={{ "--accent": layer.color, "--delay": `${index * 30}ms` } as CSSProperties}
            >
              <Icon size={22} />
              <span>{layer.label}</span>
              <strong>{layerCompanies.length || 1}</strong>
            </a>
          );
        })}
      </div>
    </header>
  );
}

function ChainMap() {
  return (
    <section className="artifact wide" id="map">
      <div className="artifact-heading">
        <p>Artifact A</p>
        <h2>Capital Flow Map</h2>
      </div>
      <div className="chain-map">
        {layers.map((layer, index) => (
          <a
            href={`#${layer.id}`}
            className="chain-node"
            key={layer.id}
            style={{ "--accent": layer.color, "--index": index } as CSSProperties}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{layer.label}</strong>
            <small>{layer.thesis}</small>
          </a>
        ))}
      </div>
    </section>
  );
}

function CompanyCard({ company }: { company: (typeof companies)[number] }) {
  const layer = layers.find((item) => item.id === company.layer)!;
  return (
    <article className="company-card" style={{ "--accent": layer.color } as CSSProperties}>
      <div className="company-topline">
        <div>
          <p>{company.ticker}</p>
          <h3>{company.name}</h3>
        </div>
        <span>{company.metric}</span>
      </div>
      <p className="role">{company.role}</p>
      <div className="claim-block">
        <b>Signal</b>
        <p>{company.signal}</p>
      </div>
      <div className="claim-block">
        <b>Investor read</b>
        <p>{company.evidence}</p>
      </div>
      <div className="scores">
        <ScoreBar label="Moat" value={company.moat} />
        <ScoreBar label="Capex pull" value={company.capexPull} />
        <ScoreBar label="Margin power" value={company.marginPower} />
      </div>
      <p className="pressure">
        <Flame size={15} />
        {company.pressure}
      </p>
      <div className="source-links">
        {getSources(company.sourceIds).map((source) => (
          <a href={source.url} target="_blank" rel="noreferrer" key={source.id}>
            {source.publisher}
            <ArrowUpRight size={13} />
          </a>
        ))}
      </div>
    </article>
  );
}

function LayerSection({ layer }: { layer: (typeof layers)[number] }) {
  const layerCompanies = companies.filter((company) => company.layer === layer.id);
  const Icon = layerIcons[layer.id];
  return (
    <section className="layer-section" id={layer.id} style={{ "--accent": layer.color } as CSSProperties}>
      <div className="layer-title">
        <Icon size={24} />
        <div>
          <p>{layer.label}</p>
          <h2>{layer.thesis}</h2>
        </div>
      </div>
      <div className="company-grid">
        {layerCompanies.length ? (
          layerCompanies.map((company) => <CompanyCard company={company} key={company.name} />)
        ) : (
          <article className="company-card placeholder">
            <p className="role">Watchlist placeholder</p>
            <h3>Additional private or emerging names</h3>
            <p>
              This layer is structurally important, but public-company evidence is still developing. Future passes can
              add private comps, transaction artifacts, and customer references.
            </p>
          </article>
        )}
      </div>
    </section>
  );
}

function DebatePanel() {
  return (
    <section className="artifact debate-panel">
      <div className="artifact-heading">
        <p>Artifact B</p>
        <h2>Bull / Bear Ledger</h2>
      </div>
      <div className="debate-list">
        {debates.map((debate) => (
          <article key={debate.title}>
            <h3>{debate.title}</h3>
            <div>
              <b>Bull</b>
              <p>{debate.bull}</p>
            </div>
            <div>
              <b>Bear</b>
              <p>{debate.bear}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function EvidenceTable() {
  return (
    <section className="artifact wide">
      <div className="artifact-heading">
        <p>Artifact C</p>
        <h2>Evidence Matrix</h2>
      </div>
      <div className="matrix-wrap">
        <table>
          <thead>
            <tr>
              <th>Company</th>
              <th>Layer</th>
              <th>Primary signal</th>
              <th>Pressure point</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company) => {
              const layer = layers.find((item) => item.id === company.layer)!;
              return (
                <tr key={company.name}>
                  <td>
                    <b>{company.name}</b>
                    <span>{company.ticker}</span>
                  </td>
                  <td>{layer.label}</td>
                  <td>{company.signal}</td>
                  <td>{company.pressure}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function Timeline() {
  return (
    <section className="artifact">
      <div className="artifact-heading">
        <p>Artifact D</p>
        <h2>Thesis Clock</h2>
      </div>
      <ol className="timeline">
        {timeline.map(([date, event]) => (
          <li key={date}>
            <time>{date}</time>
            <p>{event}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function SourceLibrary() {
  return (
    <section className="source-library" id="sources">
      <div className="artifact-heading">
        <p>Artifact E</p>
        <h2>
          <Library size={22} />
          Source Library
        </h2>
      </div>
      <div className="sources-grid">
        {sources.map((source) => (
          <a href={source.url} target="_blank" rel="noreferrer" key={source.id}>
            <span>{source.date}</span>
            <b>{source.name}</b>
            <small>{source.publisher}</small>
          </a>
        ))}
      </div>
    </section>
  );
}

export function App() {
  return (
    <>
      <LayerRail />
      <main>
        <Hero />
        <div className="artifact-grid">
          <ChainMap />
          <DebatePanel />
          <Timeline />
          <EvidenceTable />
        </div>
        {layers.map((layer) => (
          <LayerSection layer={layer} key={layer.id} />
        ))}
        <SourceLibrary />
      </main>
      <footer>
        <BarChart3 size={18} />
        <span>Built from public-source research. This is not investment advice.</span>
      </footer>
    </>
  );
}
