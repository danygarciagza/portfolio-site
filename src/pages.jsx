/* pages.jsx — About, Category, ProjectDetail, Contact. Exports to window. */
const { tx, ProductViewer } = window;

const LINKS = {
  email: "danygarciagza+work@gmail.com",
  linkedin: "https://www.linkedin.com/in/dgg27",
  dribbble: "https://dribbble.com/danygarciagza"
};

/* ------------------------------- ABOUT -------------------------------- */
function About({ lang, go }) {
  const T = window.T;
  return (
    <div className="page-wrap view-enter">
      <div className="crumbs"><span>{tx(T.nav, lang) && T.nav[lang][1]}</span></div>
      <div className="about-stage">
        <div className="idcard">
          <div className="id-head">
            <div className="id-org">{tx(T.idOrg, lang)}<small>{tx(T.idSub, lang)}</small></div>
            <div className="id-no">ID No. 001<br />{tx(T.idValid, lang)}: 2026 — ∞</div>
          </div>
          <div className="id-body">
            <div>
              <div className="idfield"><div className="k">{tx(T.idName, lang)}</div><div className="v">Daniela García</div></div>
              <div className="idfield"><div className="k">{tx(T.idSpec, lang)}</div><div className="v">{tx(T.idSpecV, lang)}</div></div>
              <div className="idfield"><div className="k">{tx(T.idBelief, lang)}</div><div className="v">{tx(T.idBeliefV, lang)}</div></div>
              <div className="idfield" style={{ marginBottom: 0 }}><div className="k">{tx(T.idPlace, lang)}</div><div className="v">{tx(T.idPlaceV, lang)}</div></div>
            </div>
            <div>
              <div className="idphoto">
                <image-slot id="about-id-photo" shape="rect" placeholder="grad cap photo"></image-slot>
              </div>
            </div>
          </div>
          <div className="idstamp" style={{ color: "rgb(178, 70, 47)", transform: "rotate(12deg)", borderWidth: "2px", borderRadius: "50px" }}><span style={{ color: "#3B3C68" }}>{tx(T.stamp, lang)}</span></div>
        </div>

        <div className="about-extras">
          <p className="bio" dangerouslySetInnerHTML={{ __html: tx(T.bio, lang) }} />
          <div className="scrap-row">
            <a className="sticker" href={`mailto:${LINKS.email}`} style={{ backgroundColor: "rgb(200, 214, 152)" }}>✉ {LINKS.email}</a>
            <a className="sticker" href={LINKS.linkedin} target="_blank" rel="noreferrer" style={{ borderColor: "rgb(200, 188, 160)", backgroundColor: "rgb(184, 230, 234)" }}>in / dgg27</a>
            <a className="sticker" href={LINKS.dribbble} target="_blank" rel="noreferrer" style={{ backgroundColor: "rgb(241, 198, 239)" }}>dribbble / danygarciagza</a>
          </div>
        </div>
      </div>
    </div>);

}

/* ------------------------------ CATEGORY ------------------------------ */
function Category({ lang, go, catId }) {
  const T = window.T;
  const { CATEGORIES, PROJECTS } = window.PF;
  const cat = CATEGORIES.find((c) => c.id === catId) || CATEGORIES[0];
  const items = PROJECTS.filter((p) => p.category === cat.id);
  return (
    <div className="page-wrap view-enter">
      <div className="crumbs">
        <a onClick={() => go("work")}>{T.nav[lang][2]}</a><span>/</span><span>{tx(cat.name, lang)}</span>
      </div>
      <div className="cat-head">
        <div className="eyebrow">{tx(cat.name, lang)}</div>
        <h1>{tx(cat.name, lang)}</h1>
        <p>{tx(cat.blurb, lang)}</p>
      </div>
      <div className="proj-grid">
        {items.map((p) =>
        <div key={p.slug} className={`proj-card${p.coverAspect ? " portrait-card" : ""}`} style={{ "--rot": p.rot, "--cover-aspect": p.coverAspect || "4/3.4" }} onClick={() => go("project", { cat: cat.id, slug: p.slug })}>
            <div className="polaroid">
              <div className="cover-edit-wrap" onClick={(e) => e.stopPropagation()}>
                <image-slot
                  id={`card-${p.slug}`}
                  shape="rect"
                  placeholder={tx(p.title, lang)}
                  src={p.coverSrc || ""}
                  position={p.coverPosition || "50% 50%"}
                  scale={p.coverScale || "1"}
                  style={p.coverAspect ? { aspectRatio: p.coverAspect } : {}}>
                </image-slot>
              </div>
              <div className="pol-cap">
                <div className="t">{tx(p.title, lang)}</div>
                <div className="s">{tx(p.oneLine, lang)}</div>
                <div className="meta">
                  <span>{p.year}</span>
                  {p.has3d && <span className="badge-360">{tx(T.threeD, lang)}</span>}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>);

}

/* --------------------------- PROJECT DETAIL --------------------------- */
function ProjectDetail({ lang, go, catId, slug }) {
  const T = window.T;
  const { CATEGORIES, PROJECTS } = window.PF;
  const cat = CATEGORIES.find((c) => c.id === catId) || CATEGORIES[0];
  const siblings = PROJECTS.filter((p) => p.category === cat.id);
  const idx = siblings.findIndex((p) => p.slug === slug);
  const project = siblings[idx] || PROJECTS.find((p) => p.slug === slug);
  if (!project) return null;
  const prev = siblings[(idx - 1 + siblings.length) % siblings.length];
  const next = siblings[(idx + 1) % siblings.length];
  const catIdx = CATEGORIES.findIndex((c) => c.id === cat.id);
  const nextCat = CATEGORIES[(catIdx + 1) % CATEGORIES.length];

  return (
    <div className="page-wrap view-enter" key={project.slug}>
      <div className="crumbs">
        <a onClick={() => go("work")}>{T.nav[lang][2]}</a><span>/</span>
        <a onClick={() => go("category", { cat: cat.id })}>{tx(cat.name, lang)}</a><span>/</span>
        <span>{tx(project.title, lang)}</span>
      </div>
      <div className="project-pager" aria-label={lang === "es" ? "Navegación de proyectos" : "Project navigation"}>
        <button className="pager-link" onClick={() => go("project", { cat: cat.id, slug: prev.slug })}>
          <span className="pager-dir"><span className="pager-arrow">←</span> {tx(T.prev, lang)}</span>
          <span className="pager-name display"><span className="pager-name-arrow">←</span>{tx(prev.title, lang)}</span>
        </button>
        <button className="pager-link next" onClick={() => go("project", { cat: cat.id, slug: next.slug })}>
          <span className="pager-dir">{tx(T.next, lang)} <span className="pager-arrow">→</span></span>
          <span className="pager-name display">{tx(next.title, lang)}<span className="pager-name-arrow">→</span></span>
        </button>
      </div>
      <div className="detail">
        <ProductViewer project={project} lang={lang} />
        <div className="detail-info">
          <div className="eyebrow">{tx(cat.name, lang)} · {project.year}</div>
          <h1 className="display">{tx(project.title, lang)}</h1>
          <p className="sub">{tx(project.oneLine, lang)}</p>

          <div className="spec-table">
            <div className="spec-row"><div className="k">{tx(T.year, lang)}</div><div className="v">{project.year}</div></div>
            <div className="spec-row"><div className="k">{tx(T.type, lang)}</div><div className="v">{tx(project.tag, lang)}</div></div>
            {!project.hideMaterials && <div className="spec-row"><div className="k">{tx(T.made, lang)}</div><div className="v">{tx(project.materials, lang)}</div></div>}
          </div>

          <div className="tag-chips">
            {tx(project.chips, lang).map((c, i) => <span key={i} className="chip">{c}</span>)}
          </div>

          <p className="detail-body">{tx(project.body, lang)}</p>
        </div>
      </div>
      <div className="shelf-nav shelf-nav-bottom">
        <button className="shelf-jump" onClick={() => go("work", { focus: cat.id })}>
          <span className="sj-txt">
            <span className="sj-lbl">{lang === "es" ? "Volver al estante" : "Back to shelf"}</span>
            <span className="sj-nm">{tx(cat.name, lang)}</span>
          </span>
        </button>
        {nextCat && nextCat.id !== cat.id &&
        <button className="shelf-jump alt" onClick={() => go("work", { focus: nextCat.id })}>
            <span className="sj-txt" style={{ textAlign: "right" }}>
              <span className="sj-lbl">{lang === "es" ? "Siguiente estante" : "Next shelf"}</span>
              <span className="sj-nm">{tx(nextCat.name, lang)}</span>
            </span>
          </button>
        }
      </div>
    </div>);

}

/* ------------------------------ CONTACT ------------------------------- */
function Contact({ lang, go }) {
  const T = window.T;
  return (
    <div className="page-wrap view-enter">
      <div className="crumbs"><span>{T.nav[lang][3]}</span></div>
      <div className="contact-panel">
        <h1 className="display contact-title">
          {lang === "es" ? "Hablemos" : "Let's talk"}<span style={{ color: "var(--accent)" }}>.</span>
        </h1>
        <p className="contact-copy">
          {lang === "es" ?
          "¿Un proyecto, una colaboración o sólo saludar? Me encantaría saber de ti." :
          "A project, a collaboration, or just to say hi? I'd love to hear from you."}
        </p>
        <div className="scrap-row" style={{ justifyContent: "center" }}>
          <a className="sticker" style={{ transform: "rotate(-2deg)", fontSize: 14, backgroundColor: "rgb(200, 214, 152)" }} href={`mailto:${LINKS.email}`}>✉ {LINKS.email}</a>
          <a className="sticker" style={{ transform: "rotate(1.5deg)", fontSize: 14, backgroundColor: "rgb(184, 230, 234)" }} href={LINKS.linkedin} target="_blank" rel="noreferrer">LinkedIn · dgg27</a>
          <a className="sticker" style={{ transform: "rotate(-1deg)", fontSize: 14, backgroundColor: "rgb(241, 198, 239)" }} href={LINKS.dribbble} target="_blank" rel="noreferrer">Dribbble · danygarciagza</a>
        </div>
      </div>
    </div>);

}

/* ------------------------------ CREDITS ------------------------------- */
/* Image attributions. Stock licenses (Freepik / Magnific / PNG Tree) require
   a visible, accessible credit; a dedicated section satisfies that. */
const IMAGE_CREDITS = [
{ what: { en: "Bonsai", es: "Bonsái" }, by: "silvesterdiazland", source: "PNG Tree",
  url: "https://pngtree.com/freepng/bonsai-asem-saraf_8626233.html?sol=downref&id=bef" },
{ what: { en: "Lucky cat", es: "Gato de la suerte" }, by: "freepik", source: "Magnific",
  url: "https://www.magnific.com/free-psd/lucky-cat-still-life_54999857.htm" }];


function Credits({ lang }) {
  return (
    <footer className="site-credits">
      <div className="credits-inner">
        <div className="credits-head">{lang === "es" ? "Créditos de imágenes" : "Image credits"}</div>
        <ul className="credits-list">
          {IMAGE_CREDITS.map((c) =>
          <li key={c.url}>
              <span className="cr-what">{c.what[lang] || c.what.en}</span>
              <span className="cr-by">
                {lang === "es" ? "por" : "by"} {c.by} · <a href={c.url} target="_blank" rel="noreferrer">{c.source}</a>
              </span>
            </li>
          )}
        </ul>
      </div>
    </footer>);

}

Object.assign(window, { About, Category, ProjectDetail, Contact, Credits });
