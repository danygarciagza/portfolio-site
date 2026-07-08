/* home.jsx — the two home scenes: Wall (editorial scatter) and Tabbed Book. */
const { tx, FunFrame } = window;

/* ============================ WALL — editorial scatter ============================ */
function HomeWall({ lang, go, categories }) {
  const T = window.T;
  const c = categories;

  const items = [
  {
    key: "about", num: "01", label: T.nav[lang][1], action: () => go("about"),
    pos: { left: "1%", top: "3%", width: "clamp(174px,16vw,246px)", "--rot": "-3deg" },
    node:
    <FunFrame slotId="home-about-photo" placeholder="you, grad cap" variant="stars" caption="me" src="uploads/home-about-photo.webp" position="50% 50%" scale="1.08" />

  },
  ...c.map((cat, i) => ({
    key: cat.id, num: String(i + 2).padStart(2, "0"), label: tx(cat.name, lang),
    action: () => go("work", { focus: cat.id }),
    pos: [
    { left: "23%", top: "48%", width: "clamp(210px,18vw,278px)", "--rot": "2.4deg" },
    { left: "43%", top: "2%", width: "clamp(210px,18vw,278px)", "--rot": "-2deg" },
    { left: "64%", top: "42%", width: "clamp(210px,18vw,278px)", "--rot": "3deg" }][
    i],
    node:
    <div className="scard" style={{ borderColor: "rgba(0, 0, 0, 0.05)", color: "rgb(244, 224, 175)", backgroundColor: "rgb(250, 239, 198)" }}>
          <image-slot
            id={`home-cat-${cat.id}`}
            shape="rect"
            placeholder={tx(cat.name, lang)}
            src={`uploads/home-cat-${cat.id}.webp`}
            position={cat.id === "product" ? "calc(50% + 0.7175505089137786%) calc(50% + -6.388416193946114%)" : "50% 50%"}
            scale={cat.id === "product" ? "1.0226681642402349" : "1"}
            loading="eager">
          </image-slot>
          <div className="scard-foot"><span className="dot" style={{ background: cat.color, backgroundColor: "rgb(115, 172, 208)" }} /><span className="scard-name">{tx(cat.name, lang)}</span></div>
        </div>

  })),
  {
    key: "contact", num: "05", label: T.nav[lang][3], action: () => go("contact"),
    pos: { right: "2%", top: "6%", width: "clamp(230px,18vw,292px)", "--rot": "-4deg" },
    node:
    <div className="note2">
          <span className="n-h">{lang === "es" ? "hola!" : "hi!"}</span>
          <a onClick={(e) => e.preventDefault()}>danygarciagza@gmail.com</a>
          <a onClick={(e) => e.preventDefault()}>linkedin · dribbble</a>
        </div>

  }];


  return (
    <div className="wall2">
      <h1 className="bigname">Daniela García</h1>
      <div className="role">{tx(T.tagline, lang)}</div>

      <div className="scatter">
        {items.map((it) =>
        <div key={it.key} className="obj2" style={it.pos} onClick={it.action}>
            {it.node}
            <div className="cap2"><span className="num">({it.num})</span></div>
          </div>
        )}
      </div>

      <div className="legend">
        {items.map((it, i) =>
        <span key={it.key} className="leg-item">
            <span className="leg-num">({it.num})</span> {it.label}{i < items.length - 1 ? <span className="leg-sep"> / </span> : ""}
          </span>
        )}
      </div>
    </div>);

}

/* ============================== TABBED BOOK ============================== */
function HomeBook({ lang, go, categories }) {
  const T = window.T;
  const tabs = [
  { label: lang === "es" ? "SOBRE\nMÍ" : "ABOUT", color: "var(--tab-1)", action: () => go("about") },
  ...categories.map((c) => ({ label: tx(c.spine, lang), color: c.color, action: () => go("work", { focus: c.id }) })),
  { label: lang === "es" ? "CON-\nTACTO" : "CON-\nTACT", color: "var(--accent)", action: () => go("contact") }];


  const tocItems = [
  { n: "01", t: tx(T.nav[lang][1] || "About", lang), action: () => go("about") },
  ...categories.map((c, i) => ({ n: String(i + 2).padStart(2, "0"), t: tx(c.name, lang), action: () => go("work", { focus: c.id }) }))];


  return (
    <div className="stage-wrap">
      <div className="stage">
        <div className="bookstage">
          <div className="openbook">
            <div className="page-edge-l" />
            <div className="page-edge-r" />

            {/* left page — intro */}
            <div className="page left">
              <span className="type-label" style={{ fontSize: "1.4cqw" }}>{lang === "es" ? "PORTAFOLIO · 2026" : "PORTFOLIO · 2026"}</span>
              <h1 className="display" style={{ marginTop: "2cqh" }}>Daniela<br />Garc<span className="amp">í</span>a</h1>
              <p className="intro">{tx(T.intro, lang)}</p>
              <div style={{ marginTop: "3cqh" }}>
                <span className="sig hand">{tx(T.sig, lang)}</span>
              </div>
              {/* taped photo corner */}
              <div style={{ position: "absolute", right: "3cqw", bottom: "4cqh", width: "11cqw", transform: "rotate(4deg)" }}>
                <div className="tape" style={{ left: "30%", top: "-2.2cqh", width: "40%", transform: "rotate(-4deg)" }} />
                <div style={{ background: "#fff", padding: "0.8cqw 0.8cqw 2.6cqw", boxShadow: "var(--shadow-cut)" }}>
                  <image-slot id="book-cover-photo" shape="rect" placeholder="a snapshot" style={{ display: "block", width: "100%", aspectRatio: "1/1" }}></image-slot>
                </div>
              </div>
            </div>

            <div className="book-gutter" />

            {/* right page — contents */}
            <div className="page right">
              <div className="toc-label">{tx(T.tocLabel, lang)}</div>
              <div className="toc">
                {tocItems.map((it) =>
                <div key={it.n} className="toc-item" onClick={it.action}>
                    <span className="num">{it.n}</span>
                    <span className="t display">{it.t}</span>
                    <span className="dots" />
                  </div>
                )}
              </div>
              <div style={{ position: "absolute", left: "4cqw", bottom: "4cqh" }}>
                <span className="hand" style={{ fontSize: "2.8cqw", color: "var(--ink-faint)" }}>
                  {lang === "es" ? "usa las pestañas →" : "use the tabs →"}
                </span>
              </div>
            </div>

            {/* tabs */}
            <div className="tabs">
              {tabs.map((tb, i) =>
              <div key={i} className="tab" style={{ background: tb.color, whiteSpace: "pre-line" }} onClick={tb.action}>
                  {tb.label}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>);

}

Object.assign(window, { HomeWall, HomeBook });
