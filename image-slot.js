(() => {
  const STATE_FILE = ".image-slots.state.json?v=20260701-tags";
  const subs = new Set();
  let slots = {};
  let loaded = false;
  let loadP = null;

  function load() {
    if (loaded) return Promise.resolve();
    if (loadP) return loadP;
    loadP = fetch(STATE_FILE)
      .then((r) => (r.ok ? r.json() : {}))
      .then((json) => {
        slots = json && typeof json === "object" ? json : {};
      })
      .catch(() => {
        slots = {};
      })
      .then(() => {
        loaded = true;
        subs.forEach((fn) => fn());
      });
    return loadP;
  }

  function getSlot(id) {
    const value = slots[id];
    if (!value) return null;
    return typeof value === "string" ? { u: value, s: 1, x: 0, y: 0 } : value;
  }

  const style = `
    :host {
      display: inline-block;
      position: relative;
      vertical-align: top;
      width: 240px;
      height: 160px;
      overflow: hidden;
      background: rgba(0,0,0,.04);
      color: rgba(0,0,0,.45);
      font: 12px/1.3 system-ui, -apple-system, sans-serif;
    }
    .frame {
      position: absolute;
      inset: 0;
      overflow: hidden;
      background: inherit;
    }
    img {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      max-width: none;
      object-fit: cover;
      object-position: 50% 50%;
      user-select: none;
      -webkit-user-drag: none;
      display: none;
    }
    .empty {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 10px;
      text-align: center;
      box-sizing: border-box;
      letter-spacing: .01em;
    }
    :host([data-filled]) .empty {
      display: none;
    }
  `;

  class ImageSlot extends HTMLElement {
    static get observedAttributes() {
      return ["id", "src", "shape", "radius", "mask", "fit", "position", "scale", "loading"];
    }

    constructor() {
      super();
      const root = this.attachShadow({ mode: "open" });
      root.innerHTML = `
        <style>${style}</style>
        <div class="frame">
          <img part="image" alt="" draggable="false">
          <div class="empty"></div>
        </div>
      `;
      this._frame = root.querySelector(".frame");
      this._img = root.querySelector("img");
      this._empty = root.querySelector(".empty");
      this._update = this._update.bind(this);
    }

    connectedCallback() {
      subs.add(this._update);
      this._update();
      const hydrate = () => load().then(this._update);
      if (this.hasAttribute("src")) {
        if ("requestIdleCallback" in window) {
          window.requestIdleCallback(hydrate, { timeout: 2500 });
        } else {
          window.setTimeout(hydrate, 900);
        }
      } else {
        hydrate();
      }
    }

    disconnectedCallback() {
      subs.delete(this._update);
    }

    attributeChangedCallback() {
      this._update();
    }

    _applyShape() {
      const mask = this.getAttribute("mask");
      const shape = this.getAttribute("shape") || "rounded";
      const radius = this.getAttribute("radius") || "12";
      const clip = mask || "";
      this._frame.style.clipPath = clip;
      this.style.clipPath = clip;

      if (shape === "circle" || shape === "pill") {
        this._frame.style.borderRadius = "999px";
      } else if (shape === "rect") {
        this._frame.style.borderRadius = "0";
      } else {
        this._frame.style.borderRadius = `${parseFloat(radius) || 12}px`;
      }
    }

    _update() {
      this._applyShape();

      const id = this.id || this.getAttribute("id");
      const stored = id ? getSlot(id) : null;
      const src = stored && stored.u ? stored.u : this.getAttribute("src");
      const fit = this.getAttribute("fit") || "cover";
      const pos = this.getAttribute("position") || "50% 50%";
      const fallbackScale = Math.max(1, Number(this.getAttribute("scale")) || 1);

      this._empty.textContent = this.getAttribute("placeholder") || "";

      if (!src) {
        this.removeAttribute("data-filled");
        this._img.removeAttribute("src");
        this._img.style.display = "none";
        return;
      }

      this.setAttribute("data-filled", "");
      this._img.src = src;
      this._img.style.display = "block";
      this._img.style.objectFit = fit;
      this._img.loading = this.getAttribute("loading") || "lazy";
      this._img.decoding = "async";
      this._img.fetchPriority = this._img.loading === "eager" ? "high" : "auto";

      if (stored) {
        const scale = Math.max(1, Number(stored.s) || 1);
        const x = Number(stored.x) || 0;
        const y = Number(stored.y) || 0;
        this._img.style.objectPosition = `calc(50% + ${x}%) calc(50% + ${y}%)`;
        this._img.style.transform = `scale(${scale})`;
      } else {
        this._img.style.objectPosition = pos;
        this._img.style.transform = fallbackScale > 1 ? `scale(${fallbackScale})` : "none";
      }
    }
  }

  if (!customElements.get("image-slot")) {
    customElements.define("image-slot", ImageSlot);
  }
})();
