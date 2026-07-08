/* app.jsx — router, language, tweaks, mount. */
const { useState, useEffect } = React;
const { tx, TopNav, HomeWall, HomeBook, About, Category, ProjectDetail, Contact } = window;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "homeStyle": "wall",
  "titleFont": "Asimov Print C",
  "accent": "#5f7bd8",
  "paper": "#f3f2ef",
  "personality": 5,
  "coverTitle": "Top",
  "editCovers": false,
}/*EDITMODE-END*/;

const TITLE_FONTS = {
  "Asimov Print C": "'Asimov Print C', 'Bricolage Grotesque', system-ui, sans-serif",
  "PP Editorial New": "'PP Editorial New', Georgia, serif",
  "Acid Grotesk": "'Acid Grotesk', system-ui, sans-serif",
  "Pexel Grotesk": "'Pexel Grotesk', system-ui, sans-serif",
  "PP Mondwest": "'PP Mondwest', 'Courier New', monospace",
  "Bricolage": "'Bricolage Grotesque', system-ui, sans-serif",
};

/* ---- hash routing ---- */
function parseHash() {
  const h = (window.location.hash || "#/").replace(/^#\/?/, "");
  const parts = h.split("/").filter(Boolean);
  if (parts.length === 0) return { view: "home" };
  if (parts[0] === "about") return { view: "about" };
  if (parts[0] === "contact") return { view: "contact" };
  if (parts[0] === "work") {
    if (parts[2]) return { view: "project", cat: parts[1], slug: parts[2] };
    if (parts[1]) return { view: "work", focus: parts[1] };
    return { view: "work" };
  }
  return { view: "home" };
}
function buildHash(view, params = {}) {
  switch (view) {
    case "about": return "#/about";
    case "contact": return "#/contact";
    case "work": return params.focus ? `#/work/${params.focus}` : "#/work";
    case "category": return `#/work/${params.cat}`;
    case "project": return `#/work/${params.cat}/${params.slug}`;
    default: return "#/";
  }
}

/* ---- custom accent control: a colour wheel + a typed hex code ---- */
function AccentControl({ label, value, onChange }) {
  const [draft, setDraft] = React.useState(value);
  React.useEffect(() => { setDraft(value); }, [value]);
  const commit = (raw) => {
    let h = String(raw).trim().toLowerCase();
    if (h && h[0] !== "#") h = "#" + h;
    const m3 = h.match(/^#([0-9a-f]{3})$/);
    if (m3) h = "#" + m3[1].split("").map((c) => c + c).join("");
    if (/^#[0-9a-f]{6}$/.test(h)) onChange(h); else setDraft(value);
  };
  return (
    <div className="twk-row twk-row-h">
      <div className="twk-lbl"><span>{label}</span></div>
      <div className="acc-ctl">
        <input type="color" className="acc-wheel" value={value} aria-label={label}
          onChange={(e) => onChange(e.target.value)} />
        <input className="twk-field acc-hex" type="text" value={draft} spellCheck={false}
          maxLength={7} placeholder="#e2583e"
          onChange={(e) => setDraft(e.target.value)}
          onBlur={() => commit(draft)}
          onKeyDown={(e) => { if (e.key === "Enter") { commit(draft); e.target.blur(); } }} />
      </div>
    </div>
  );
}

/* ---- decorative shelf objects (bonsai on books, lava lamp, moss ball) ---- */
function Trinket({ kind, floating }) {
  if (kind === "bonsai") {
    return (
      <div className="ledge-trinket bonsai" aria-hidden="true">
        <img className="bonsai-img" src="uploads/-Pngtree-bonsai asem saraf_8626233.png" alt="" />
        <div className="bonsai-books">
          <div className="bonsai-book top"><span className="bb-frame" /></div>
          <div className="bonsai-book bot" />
        </div>
      </div>
    );
  }

  if (kind === "cat") {
    return (
      <div className={"ledge-trinket cat" + (floating ? " floating" : "")} aria-hidden="true">
        <img className="trinket-img" src="uploads/lucky-cat.png" alt="" />
      </div>
    );
  }
  return null;
}

/* ---- Work index — projects as front-facing books on three wall ledges ---- */
function WorkIndex({ lang, go, coverTitle = "Top", editCovers = false, onToggleEdit, focus }) {
  const { CATEGORIES, PROJECTS } = window.PF;
  const T = window.T;

  const [glow, setGlow] = useState(null);
  // When arriving from a home polaroid (or category breadcrumb), scroll to that
  // shelf and highlight its title for 3s so the shelf is never missed.
  useEffect(() => {
    if (!focus) return;
    setGlow(focus);
    const sid = setTimeout(() => {
      const row = document.querySelector(`.ledge-row.row-${focus}`);
      if (row) {
        const rect = row.getBoundingClientRect();
        const rowTop = rect.top + window.scrollY;
        // center the shelf vertically, clamped so we never scroll past the top
        const y = Math.max(0, rowTop - (window.innerHeight - rect.height) / 2);
        window.scrollTo({ top: y, behavior: "auto" });
      }
    }, 180);
    const cid = setTimeout(() => setGlow(null), 3200);
    return () => { clearTimeout(sid); clearTimeout(cid); };
  }, [focus]);
  // product (4) · brand (2) · space (2). Lighter shelves carry props,
  // arranged so the books shift to one side and the objects fill the other.
  const SHELVES = [
    { catId: "product", props: [], booksSide: "center" },
    { catId: "graphic", props: ["bonsai"], booksSide: "left" },
    { catId: "furniture", props: [], booksSide: "right" },
  ];
  // varied cover proportions so the row reads like a real magazine ledge
  const SIZES = [
    { bw: "150px", ar: "3 / 4.15" },
    { bw: "170px", ar: "3 / 3.7" },
    { bw: "142px", ar: "3 / 4.4" },
    { bw: "162px", ar: "3 / 3.95" },
  ];
  const titlePos = String(coverTitle).toLowerCase(); // "top" | "bottom" | "off"
  return (
    <div className="page-wrap view-enter">
      <div className="crumbs"><span>{T.nav[lang][2]}</span></div>
      <div className="cat-head">
        <div className="eyebrow">{lang === "es" ? "Portafolio" : "Portfolio"}</div>
        <h1>{lang === "es" ? "Proyectos" : "Work"}</h1>
        <p style={{ minHeight: "1.4em" }}></p>
      </div>

      <div className={"shelf-wall" + (editCovers ? " editing" : "")}>
        {SHELVES.map(({ catId, props, booksSide }) => {
          const cat = CATEGORIES.find((c) => c.id === catId);
          const items = PROJECTS.filter((p) => p.category === catId);
          const bookNodes = items.map((p, i) => {
                const sz = SIZES[(i + (catId === "product" ? 1 : 0)) % SIZES.length];
                return (
                  <div
                    key={p.slug}
                    className="ledge-book"
                    style={{ "--bw": sz.bw, "--ar": sz.ar, "--tint": `color-mix(in srgb, ${cat.color} 26%, var(--card))` }}
                    onClick={editCovers ? undefined : () => go("project", { cat: cat.id, slug: p.slug })}
                  >
                    <div className="lb-cover">
                      <image-slot
                        id={`card-${p.slug}`}
                        shape="rect"
                        fit="cover"
                        placeholder={tx(p.title, lang)}
                        src={p.coverSrc || ""}
                        position={p.coverPosition || "50% 50%"}
                        scale={p.coverScale || "1"}>
                      </image-slot>
                      {titlePos !== "off" && (
                        <div className={"lb-mast " + titlePos}>
                          <div className="lb-title display">{tx(p.title, lang)}</div>
                          <div className="lb-meta">
                            <span>{p.year}</span>
                            {p.has3d && <span className="badge-360">{tx(T.threeD, lang)}</span>}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              });
          const bookTiers = [];
          for (let i = 0; i < bookNodes.length; i += 2) {
            bookTiers.push(
              <div className="mobile-shelf-tier" key={`tier-${i}`}>
                {bookNodes.slice(i, i + 2)}
              </div>
            );
          }
          const booksEl = (
            <div className="lb-cluster books" key="books">
              {bookTiers}
            </div>
          );
          const propsEl = props.length ? (
            <div className="lb-cluster props" key="props">
              {props.map((k) => <Trinket key={k} kind={k} />)}
            </div>
          ) : null;
          return (
            <div key={catId} className={"ledge-row row-" + catId + (glow === catId ? " ledge-focus" : "")}>
              <div className="ledge-eyebrow">{tx(cat.spine, lang)}</div>
              <div className="ledge-books">
                {catId === "furniture"
                  ? [<div className="lb-cluster props" key="props"><Trinket kind="cat" /></div>, booksEl]
                  : (booksSide === "right" ? [propsEl, booksEl] : [booksEl, propsEl])}
              </div>
              <div className="ledge-rail" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function App() {
  const [t] = useState(TWEAK_DEFAULTS);
  const [route, setRoute] = useState(parseHash());
  const [lang, setLang] = useState(() => localStorage.getItem("pf-lang2") || "en");
  const { CATEGORIES } = window.PF;

  useEffect(() => {
    const onHash = () => setRoute(parseHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => { localStorage.setItem("pf-lang2", lang); }, [lang]);

  // scroll to top on view change
  useEffect(() => { window.scrollTo(0, 0); }, [route.view, route.slug, route.cat]);

  // apply tweaks → CSS vars
  useEffect(() => {
    const r = document.documentElement;
    r.style.setProperty("--accent", t.accent);
    r.style.setProperty("--paper", t.paper);
    r.style.setProperty("--font-display", TITLE_FONTS[t.titleFont] || TITLE_FONTS["Asimov Print C"]);
    const level = t.personality <= 3 ? "low" : t.personality >= 8 ? "high" : "mid";
    r.setAttribute("data-clutter", level);
  }, [t.accent, t.paper, t.personality, t.titleFont]);

  const go = (view, params = {}) => { window.location.hash = buildHash(view, params); };

  let content;
  if (route.view === "home") {
    content = t.homeStyle === "book"
      ? <HomeBook lang={lang} go={go} categories={CATEGORIES} />
      : <HomeWall lang={lang} go={go} categories={CATEGORIES} />;
  } else if (route.view === "about") {
    content = <About lang={lang} go={go} />;
  } else if (route.view === "work") {
    content = <WorkIndex lang={lang} go={go} coverTitle={t.coverTitle} editCovers={false} focus={route.focus} />;
  } else if (route.view === "category") {
    content = <Category lang={lang} go={go} catId={route.cat} />;
  } else if (route.view === "project") {
    content = <ProjectDetail lang={lang} go={go} catId={route.cat} slug={route.slug} />;
  } else if (route.view === "contact") {
    content = <Contact lang={lang} go={go} />;
  }

  return (
    <React.Fragment>
      <TopNav route={route} lang={lang} setLang={setLang} go={go} />
      {content}
      <Credits lang={lang} />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
