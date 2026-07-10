/* ui.jsx — shared components + helpers. Exports to window. */
const { useState, useEffect, useRef } = React;

/* pick a language string from an {en,es} object (or pass-through plain string) */
function tx(v, lang) {
  if (v == null) return "";
  if (typeof v === "object" && ("en" in v || "es" in v)) return v[lang] ?? v.en;
  return v;
}

/* ----- Top navigation bar ----- */
function TopNav({ route, lang, setLang, go }) {
  const T = window.T;
  const labels = T.nav[lang];
  const targets = ["home", "about", "work", "contact"];
  const isActive = (t) =>
  t === "home" && route.view === "home" ||
  t === "about" && route.view === "about" ||
  t === "work" && (route.view === "work" || route.view === "category" || route.view === "project") ||
  t === "contact" && route.view === "contact";

  return (
    <nav className="nav">
      <div className="nav-brand" onClick={() => go("home")}>
        <span className="mark">Daniela<b>.</b></span>
        <span className="role" style={{ fontFamily: "Hanken Grotesk" }}>{tx(T.role, lang)}</span>
      </div>
      <div className="nav-links">
        {targets.map((t, i) =>
        <span
          key={t}
          className={"nav-link" + (isActive(t) ? " active" : "")}
          onClick={() => go(t === "work" ? "work" : t)}>
          
            {labels[i]}
          </span>
        )}
        <div className="lang-toggle" role="group" aria-label="language">
          <button className={lang === "es" ? "on" : ""} onClick={() => setLang("es")}>ES</button>
          <button className={lang === "en" ? "on" : ""} onClick={() => setLang("en")}>EN</button>
        </div>
      </div>
    </nav>);

}

/* ----- Rubber stamp seal ----- */
function Stamp({ text, style }) {
  return <div className="idstamp" style={style}>{text}</div>;
}

/* ----- 3D model viewer (model-viewer web component) ----- */
function Model3DViewer({ project, lang }) {
  const T = window.T;
  const mvRef = useRef(null);
  const SAMPLE = window.PF && window.PF.DEFAULT_MODEL;
  const localModel = project.model && !/^https?:/i.test(project.model) ? project.model : null;
  const initialSrc = project.model && /^https?:/i.test(project.model) ? project.model : SAMPLE;
  const [src, setSrc] = useState(initialSrc);
  const [hasLocal, setHasLocal] = useState(false);
  const [viewerReady, setViewerReady] = useState(() => !!customElements.get("model-viewer"));
  const [modelVisible, setModelVisible] = useState(false);
  const posterSrc = project.show3dPoster === false ? "" : (project.coverSrc || project.mainSrc || project.thumbSrcs && project.thumbSrcs[1] || "");

  useEffect(() => {
    if (customElements.get("model-viewer")) {
      setViewerReady(true);
      return;
    }
    let script = document.querySelector('script[data-model-viewer]');
    if (!script) {
      script = document.createElement("script");
      script.type = "module";
      script.src = "https://unpkg.com/@google/model-viewer@3.5.0/dist/model-viewer.min.js";
      script.dataset.modelViewer = "true";
      document.head.appendChild(script);
    }
    customElements.whenDefined("model-viewer").then(() => setViewerReady(true)).catch(() => {});
  }, []);

  // Use the project's real .glb only if it's actually present; otherwise keep the sample.
  useEffect(() => {
    if (!localModel) return;
    let alive = true;
    fetch(localModel, { method: "HEAD" }).
    then((r) => {if (alive && r.ok) {setHasLocal(true);setSrc(localModel);}}).
    catch(() => {});
    return () => {alive = false;};
  }, [localModel]);

  // Safety net: if a present model fails to parse, fall back to the sample.
  useEffect(() => {
    const mv = mvRef.current;
    if (!mv) return;
    const onErr = () => {if (src !== SAMPLE) setSrc(SAMPLE);};
    mv.addEventListener("error", onErr);
    return () => mv.removeEventListener("error", onErr);
  }, [src, SAMPLE]);

  useEffect(() => {
    const mv = mvRef.current;
    if (!mv) return;
    const onLoad = () => setModelVisible(true);
    const onErr = () => setModelVisible(false);
    mv.addEventListener("load", onLoad);
    mv.addEventListener("error", onErr);
    return () => {
      mv.removeEventListener("load", onLoad);
      mv.removeEventListener("error", onErr);
    };
  }, [viewerReady, src]);
  const resetView = () => {
    const mv = mvRef.current;
    if (!mv) return;
    if (mv.resetTurntableRotation) mv.resetTurntableRotation();
    mv.cameraOrbit = project.cameraOrbit || "0deg 75deg 40%";
    mv.cameraTarget = "auto auto auto";
  };

  return (
    <div
      className={"mv3d-wrap" + (modelVisible ? " model-loaded" : "")}
      style={{ "--model-height": project.modelHeight || "440px", aspectRatio: "auto" }}>
      <span className="viewer-badge">{tx(T.threeD, lang)}</span>
      {posterSrc && <img className="mv3d-poster" src={posterSrc} alt="" aria-hidden="true" />}
      {viewerReady ? <model-viewer
        ref={mvRef}
        src={src}
        alt={tx(project.title, lang)}
        loading="eager"
        reveal="auto"
        camera-controls=""
        auto-rotate=""
        auto-rotate-delay="200"
        rotation-per-second="22deg"
        interaction-prompt="none"
        touch-action="pan-y"
        shadow-intensity="1"
        shadow-softness="1"
        exposure="1.05"
        environment-image="neutral"
        camera-orbit={project.cameraOrbit || "0deg 75deg 40%"}
        min-camera-orbit="auto auto 20%"
        max-camera-orbit="auto auto 200%">
      </model-viewer> : <div className="mv3d-loading" aria-hidden="true" />}

      <div className="mv3d-bar">
        <div className="mv3d-bar-r">
          <button className="mv3d-btn ghost" onClick={resetView}>{lang === "es" ? "centrar" : "reset"}</button>
        </div>
      </div>
    </div>);

}

/* ----- Read the current image url out of an <image-slot> (shadow DOM) ----- */
function slotSrc(id) {
  const el = document.getElementById(id);
  if (!el || !el.hasAttribute("data-filled")) return null;
  const img = el.shadowRoot && el.shadowRoot.querySelector('img[part="image"]');
  return img && img.getAttribute("src") ? img.src : null;
}

/* ----- An image-slot that opens the lightbox when its image is clicked ----- */
function ZoomableSlot({ id, shape, placeholder, onZoom, src, position, scale }) {
  const ref = useRef(null);
  const [filled, setFilled] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setFilled(el.hasAttribute("data-filled"));
    update();
    const mo = new MutationObserver(update);
    mo.observe(el, { attributes: true, attributeFilter: ["data-filled"] });
    return () => mo.disconnect();
  }, []);
  // Open the lightbox on a plain click of the image.
  const onClick = (e) => {
    if (!filled) return;
    onZoom(id);
  };
  return (
    <div className={"zslot" + (filled ? " is-filled" : "")} onClick={onClick}>
      <image-slot ref={ref} id={id} shape={shape} placeholder={placeholder} src={src} position={position} scale={scale}></image-slot>
      {filled && <span className="zoom-hint" aria-hidden="true">⤢</span>}
    </div>);

}

/* ----- Fullscreen image lightbox with slide navigation ----- */
function Lightbox({ items, index, lang, onClose, onIndex }) {
  const [dir, setDir] = useState(0);
  const touch = useRef(null);
  const has = items.length > 1;
  const go = (delta) => {
    if (!has) return;
    setDir(delta);
    onIndex((index + delta + items.length) % items.length);
  };
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();else
      if (e.key === "ArrowRight") go(1);else
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });
  const onTouchStart = (e) => {touch.current = e.touches[0].clientX;};
  const onTouchEnd = (e) => {
    if (touch.current == null) return;
    const dx = e.changedTouches[0].clientX - touch.current;
    if (Math.abs(dx) > 45) go(dx < 0 ? 1 : -1);
    touch.current = null;
  };
  const cur = items[index];
  return ReactDOM.createPortal(
    <div className="lb" onClick={onClose}>
      <button className="lb-close" onClick={onClose} aria-label="Close">✕</button>
      {has &&
      <button className="lb-arrow lb-prev" onClick={(e) => {e.stopPropagation();go(-1);}} aria-label="Previous">‹</button>
      }
      <figure className="lb-stage" onClick={(e) => e.stopPropagation()} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <img
          key={index}
          className={"lb-img " + (dir >= 0 ? "from-right" : "from-left")}
          src={cur && cur.src}
          alt={cur && cur.label || ""} />
        <figcaption className="lb-meta">
          <span className="lb-cap">{cur && cur.label}</span>
          {has && <span className="lb-count">{index + 1} / {items.length}</span>}
        </figcaption>
      </figure>
      {has &&
      <button className="lb-arrow lb-next" onClick={(e) => {e.stopPropagation();go(1);}} aria-label="Next">›</button>
      }
    </div>,
    document.body);

}

/* ----- Product viewer (e-commerce style gallery) ----- */
function ProductViewer({ project, lang, section = "all" }) {
  const T = window.T;
  const [lb, setLb] = useState(null); // { items:[{id,src,label}], index }

  const isGrid4 = project.galleryLayout === "grid4";
  const isSlides = project.galleryLayout === "slides";
  const isMainGrid = project.galleryLayout === "main-grid";
  const slideCount = project.slideCount || 4;
  const gridCount = project.gridCount || 4;

  // All IDs used for lightbox navigation (always the full set)
  const allGalleryIds = isMainGrid ?
  [`pv-${project.slug}-main`].concat(Array.from({ length: gridCount }, (_, i) => `pv-${project.slug}-t${i + 1}`)) :
  isGrid4 ?
  [1, 2, 3, 4].map((n) => `pv-${project.slug}-g${n}`) :
  isSlides ?
  Array.from({ length: slideCount }, (_, i) => `pv-${project.slug}-s${i + 1}`) :
  (project.has3d ? [] : [`pv-${project.slug}-main`]).
  concat(Array.from({ length: project.thumbCount || 3 }, (_, i) => `pv-${project.slug}-a${i + 1}`)).
  concat(project.wideSrc ? [`pv-${project.slug}-wide`] : []);

  const galleryIds = allGalleryIds;

  const labelFor = (id) => tx(project.title, lang);

  const openZoom = (clickedId) => {
    const items = allGalleryIds.
    map((id) => ({ id, src: slotSrc(id), label: labelFor(id) })).
    filter((x) => x.src);
    if (!items.length) return;
    let index = items.findIndex((x) => x.id === clickedId);
    if (index < 0) index = 0;
    setLb({ items, index });
  };

  const lbEl = lb && <Lightbox items={lb.items} index={lb.index} lang={lang} onClose={() => setLb(null)} onIndex={(i) => setLb((s) => ({ ...s, index: i }))} />;

  // ── main-grid: "main" section — just the big top image ──
  if (isMainGrid && section === "main") {
    return (
      <div className="viewer">
        <div className="viewer-main" style={{ position: "relative" }}>
          <ZoomableSlot id={`pv-${project.slug}-main`} shape="rect" placeholder="main image" onZoom={openZoom} />
        </div>
        {lbEl}
      </div>);
  }

  // ── main-grid: "thumbs" section — 2-col landscape grid below ──
  if (isMainGrid && section === "thumbs") {
    return (
      <>
        <div className="viewer-main-grid-thumbs">
          {Array.from({ length: gridCount }, (_, i) => i + 1).map((n) =>
          <ZoomableSlot key={n} id={`pv-${project.slug}-t${n}`} shape="rect" placeholder={`view ${n}`} onZoom={openZoom} />
          )}
        </div>
        {lbEl}
      </>);
  }

  return (
    <div className="viewer">
      {isMainGrid ?
      <div className="viewer-main-grid" style={{ "--cs-main-h": project.mainHeight || "360px", "--cs-thumb-aspect": project.thumbAspect || "16/9" }}>
        <ZoomableSlot
          id={`pv-${project.slug}-main`}
          shape="rect"
          placeholder="main image"
          onZoom={openZoom} />
        <div className="viewer-main-grid-thumbs">
          {Array.from({ length: gridCount }, (_, i) => i + 1).map((n) =>
          <ZoomableSlot
            key={n}
            id={`pv-${project.slug}-t${n}`}
            shape="rect"
            placeholder={`view ${n}`}
            onZoom={openZoom} />
          )}
        </div>
      </div> :
      isSlides ?
      <div className="viewer-slides">
          {Array.from({ length: slideCount }, (_, i) => i + 1).map((n) =>
        <ZoomableSlot
          key={n}
          id={`pv-${project.slug}-s${n}`}
          shape="rect"
          placeholder={`slide ${n}`}
          onZoom={openZoom} />
        )}
        </div> :
      isGrid4 ?
      <div className="viewer-grid4">
          {[1, 2, 3, 4].map((n) =>
        <ZoomableSlot
          key={n}
          id={`pv-${project.slug}-g${n}`}
          shape="rect"
          placeholder={`view ${n}`}
          onZoom={openZoom} />
        )}
        </div> :

      <>
          <div className={"viewer-main" + (project.has3d ? " has3d" : "") + (project.mainHeight ? " fixed-height" : "") + (project.mainUnframed ? " unframed" : "")} style={{ position: "relative", "--main-height": project.mainHeight || "auto" }}>
            {project.has3d ?
          <Model3DViewer project={project} lang={lang} /> :
          <ZoomableSlot
            id={`pv-${project.slug}-main`}
            shape="rect"
            placeholder="Drop a render"
            src={project.mainSrc}
            position={project.mainPosition}
            scale={project.mainScale}
            onZoom={openZoom} />
          }
          </div>
          {project.has3d && <div className="viewer-hint">{lang === "es" ? "arrastra para girar · scroll para acercar" : "drag to orbit · scroll to zoom"}</div>}
          <div className="thumbs">
            {Array.from({ length: project.thumbCount || 3 }, (_, i) => i + 1).map((n) =>
          <ZoomableSlot
            key={n}
            id={`pv-${project.slug}-a${n}`}
            shape="rect"
            placeholder={`view ${n}`}
            src={project.thumbSrcs && project.thumbSrcs[n]}
            position={project.thumbPositions && project.thumbPositions[n]}
            scale={project.thumbScales && project.thumbScales[n]}
            onZoom={openZoom} />
          )}
          </div>
          {project.wideSrc &&
          <div className={"viewer-wide" + (project.mainUnframed ? " unframed" : "")} style={{ "--wide-aspect": project.wideAspect || "1/1" }}>
              <ZoomableSlot
              id={`pv-${project.slug}-wide`}
              shape="rect"
              placeholder="wide view"
              src={project.wideSrc}
              position={project.widePosition}
              scale={project.wideScale}
              onZoom={openZoom} />
            </div>
          }
        </>
      }
      {lbEl}
    </div>);

}

/* ----- Fun picture frame (CSS-drawn: painted star or checker border) ----- */
function FunFrame({ slotId, placeholder, variant = "stars", caption, src, position, scale }) {
  const topN = Array.from({ length: 5 });
  const sideN = Array.from({ length: 5 });
  return (
    <div className={"fframe fframe--" + variant}>
      {variant === "stars" &&
      <React.Fragment>
          <div className="ff-stars ff-top">{topN.map((_, i) => <span key={i} className="ff-star" />)}</div>
          <div className="ff-stars ff-bottom">{topN.map((_, i) => <span key={i} className="ff-star" />)}</div>
          <div className="ff-stars ff-left">{sideN.map((_, i) => <span key={i} className="ff-star" />)}</div>
          <div className="ff-stars ff-right">{sideN.map((_, i) => <span key={i} className="ff-star" />)}</div>
        </React.Fragment>
      }
      <div className="ff-mat" style={{ backgroundColor: "rgb(157, 202, 197)" }}>
        <image-slot id={slotId} shape="rect" placeholder={placeholder} src={src} position={position} scale={scale} loading="eager"></image-slot>
        {caption && <div className="ff-cap" style={{ color: "rgb(62, 54, 49)" }}>{caption}</div>}
      </div>
    </div>);

}

Object.assign(window, { tx, TopNav, Stamp, ProductViewer, Model3DViewer, ZoomableSlot, Lightbox, FunFrame });
