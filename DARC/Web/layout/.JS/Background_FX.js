// background.js
// Optimized version with device-adaptive + screen-size-adaptive rendering + FPS watchdog + ripples

export class BackgroundFX {
  constructor(container, options = {}) {
    this.container = container;
    this.opts = Object.assign(
      {
        count: 70,
        speedMin: 15,
        speedMax: 40,
        sizeMin: 28.2,
        sizeMax: 40,
        opacity: 0.25,
        interactive: true,
      },
      options
    );

    this.ns = "http://www.w3.org/2000/svg";
    this.modes = ["rain", "wind", "swirl"];
    this.currentMode = 0;

    // Create SVG root
    this.svg = document.createElementNS(this.ns, "svg");
    this.svg.classList.add("bgfx");
    this.svg.setAttribute("xmlns", this.ns);
    this.svg.setAttribute("width", "100%");
    this.svg.setAttribute("height", "100%");
    this.svg.setAttribute("preserveAspectRatio", "xMidYMid slice");
    this.svg.setAttribute(
      "style",
      "position:fixed;top:0;left:0;width:100%;height:100%;z-index:-1;pointer-events:none;"
    );
// defs + layer
    this.svg.innerHTML = `
      <defs>
        <linearGradient id="electric" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#0ff"/> <
stop offset = "50%"
stop - color = "#3b82f6" / >
  <stop offset="100%" stop-color="#1e40af"/>
        </linearGradient>
        <symbol id="sym-phone" viewBox="0 0 64 64">
          <rect x="16" y="8" width="32" height="48" rx="6"
                stroke="url(#electric)" stroke-width="5" fill="none"/>
        </symbol>
        <symbol id="sym-laptop" viewBox="0 0 64 64">
          <rect x="8" y="16" width="48" height="28" rx="2"
                stroke="url(#electric)" stroke-width="5" fill="none"/>
        </symbol>
      <!-- Gamepad -->
      <symbol id="sym-gamepad" viewBox="0 0 64 64">
        <rect x="8" y="20" width="48" height="24" rx="12" ry="12"
              fill="none" stroke="url(#electric)" stroke-width="5" filter="url(#bgGlow)"/>
        <circle cx="20" cy="32" r="4" stroke="url(#electric)" stroke-width="3" fill="none"/>
        <circle cx="44" cy="28" r="3" stroke="url(#electric)" stroke-width="3" fill="none"/>
        <circle cx="48" cy="32" r="3" stroke="url(#electric)" stroke-width="3" fill="none"/>
        <circle cx="44" cy="36" r="3" stroke="url(#electric)" stroke-width="3" fill="none"/>
      </symbol>
        <symbol id="sym-psbtn" viewBox="0 0 64 64">
          <circle cx="32" cy="32" r="20"
                  stroke="url(#electric)" stroke-width="5" fill="none"/>
        </symbol>
        <symbol id="sym-file" viewBox="0 0 100 120">
        <rect x="16" y="8" width="68" height="104" rx="8"
              fill="none" stroke="url(#electric)" stroke-width="6" filter="url(#bgGlow)"/>
        <line x1="26" y1="40" x2="74" y2="40" stroke="url(#electric)" stroke-width="4"/>
        <line x1="26" y1="60" x2="74" y2="60" stroke="url(#electric)" stroke-width="4"/>
      </symbol>
      <symbol id="sym-folder" viewBox="0 0 140 100">
        <path d="M16 28 h32 l12 12 h64 v48 h-108z"
              fill="none" stroke="url(#electric)" stroke-width="6" filter="url(#bgGlow)"/>
      </symbol>
      <symbol id="sym-room" viewBox="0 0 120 120">
        <polygon points="16,60 60,16 104,60 104,104 16,104"
                 fill="none" stroke="url(#electric)" stroke-width="6" filter="url(#bgGlow)"/>
      </symbol>
      <symbol id="sym-chip" viewBox="0 0 120 120">
        <rect x="28" y="28" width="64" height="64"
              fill="none" stroke="url(#electric)" stroke-width="6" filter="url(#bgGlow)"/>
        <line x1="60" y1="28" x2="60" y2="16" stroke="url(#electric)" stroke-width="4"/>
        <line x1="60" y1="92" x2="60" y2="104" stroke="url(#electric)" stroke-width="4"/>
      </symbol>
      <symbol id="sym-cloud" viewBox="0 0 160 100">
        <ellipse cx="80" cy="60" rx="50" ry="28"
                 fill="none" stroke="url(#electric)" stroke-width="6" filter="url(#bgGlow)"/>
      </symbol>
      </defs>
      <g id="bgLayer"></g>
    `;

    this.layer = this.svg.querySelector("#bgLayer");
    this.container.appendChild(this.svg);

    this.effectiveCount = this._computeParticleCount();
    console.log(
      `%c[BackgroundFX] Init → cores:${navigator.hardwareConcurrency || "?"} | mem:${navigator.deviceMemory || "?"}GB | particles:${this.effectiveCount}`,
      "color:#0ff;font-weight:bold"
    );

    // Spawn initial particles
    for (let i = 0; i < this.effectiveCount; i++) this._spawn();

    // Mode switch every 15s
    setInterval(() => {
      this.currentMode = (this.currentMode + 1) % this.modes.length;
      console.log(`[BackgroundFX] Mode switched → ${this.modes[this.currentMode]}`);
    }, 15000);

    // Ripple system
    this._initRipplePool();
    window.addEventListener("click", (e) => this._useRipple(e));

    // FPS monitor
    this._startFPSMonitor();

    // Handle resize
    window.addEventListener("resize", () => this._handleResize());
  }

  _computeParticleCount() {
    const cores = navigator.hardwareConcurrency || 2;
    const mem = navigator.deviceMemory || 4;
    const width = window.innerWidth;
    const height = window.innerHeight;
    const density = 0.0005;
    let count = Math.floor(width * height * density);

    if (cores <= 2 || mem <= 2) count = Math.floor(count * 0.4);
    else if (cores <= 6 || mem <= 6) count = Math.floor(count * 0.7);

    return Math.max(12, Math.min(this.opts.count, count));
  }

  _handleResize() {
    const oldCount = this.effectiveCount;
    const newCount = this._computeParticleCount();

    if (newCount > oldCount) for (let i = 0; i < newCount - oldCount; i++) this._spawn();
    else if (newCount < oldCount) this._trimParticles(oldCount - newCount);

    this.effectiveCount = newCount;
    if (!window.gsap) return;
    gsap.globalTimeline.getChildren().forEach((t) => t.invalidate());
  }

  _startFPSMonitor() {
    this.frameTimes = [];
    let last = performance.now();

    const loop = (now) => {
      const delta = now - last;
      last = now;
      this.frameTimes.push(delta);
      if (this.frameTimes.length > 60) this.frameTimes.shift();
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);

    setInterval(() => {
      if (this.frameTimes.length < 10) return;
      const avg = this.frameTimes.reduce((a, b) => a + b) / this.frameTimes.length;
      const fps = 1000 / avg;

      if (fps < 45 && this.effectiveCount > 12) {
        this._trimParticles(4);
        this.effectiveCount -= 4;
      } else if (fps > 55 && this.effectiveCount < this.opts.count) {
        for (let i = 0; i < 4; i++) this._spawn();
        this.effectiveCount += 4;
      }
    }, 5000);
  }

  _trimParticles(n) {
    for (let i = 0; i < n; i++) {
      const node = this.layer.lastChild;
      if (node) this.layer.removeChild(node);
    }
  }

  _initRipplePool() {
    this.ripplePool = [];
    for (let i = 0; i < 8; i++) {
      const c = document.createElementNS(this.ns, "circle");
      c.setAttribute("fill", "none");
      c.setAttribute("stroke", "url(#electric)");
      c.setAttribute("stroke-width", "2");
      c.style.opacity = 0;
      this.svg.appendChild(c);
      this.ripplePool.push(c);
    }
    this.rippleIndex = 0;
  }

  _useRipple(e) {
    if (!window.gsap) return;
    const c = this.ripplePool[this.rippleIndex];
    this.rippleIndex = (this.rippleIndex + 1) % this.ripplePool.length;
    gsap.killTweensOf(c);
    gsap.set(c, { cx: e.clientX, cy: e.clientY, r: 0, opacity: 0.3 });
    gsap.to(c, { r: 60, opacity: 0, duration: 1, ease: "power1.out" });
  }

  _spawn() {
    const sym = this._rand(["#sym-phone", "#sym-laptop", "#sym-gamepad", "#sym-psbtn"]);
    const g = document.createElementNS(this.ns, "g");
    const use = document.createElementNS(this.ns, "use");
    use.setAttribute("href", sym);

    const size = this._randRange(this.opts.sizeMin, this.opts.sizeMax);
    use.setAttribute("width", size);
    use.setAttribute("height", size);

    g.appendChild(use);
    g.style.willChange = "transform";
    g.style.opacity = this.opts.opacity;

    if (this.opts.interactive && window.gsap) {
      g.addEventListener("mouseenter", () => gsap.to(g, { scale: 1.4, duration: 0.3, overwrite: "auto" }));
      g.addEventListener("mouseleave", () => gsap.to(g, { scale: 1, duration: 0.3, overwrite: "auto" }));
    }

    this.layer.appendChild(g);
    this._animateFall(g);
  }

  _animateFall(node) {
    if (!window.gsap) return;

    const duration = this._randRange(this.opts.speedMin, this.opts.speedMax);
    const startX = this._randRange(0, window.innerWidth);
    const startY = this._randRange(-100, -50);
    const rotate = this._randRange(-90, 180);
    const delay = this._randRange(0, 4);

    gsap.set(node, { x: startX, y: startY, rotation: 0, transformOrigin: "50% 50%", scale: 1, force3D: true });

    const mode = Math.random() < 0.65 ? "swirl" : this._rand(["rain", "wind"]);
    let anim;

    if (mode === "rain") anim = { x: startX, y: window.innerHeight + 200, rotation: rotate };
    else if (mode === "wind") anim = { x: startX + this._randRange(-400, 400), y: window.innerHeight + 200, rotation: rotate * 2 };
    else if (mode === "swirl") anim = {
      motionPath: {
        path: `M${startX},${startY} Q${startX + this._randRange(-300, 300)},${window.innerHeight/2} ${startX + this._randRange(-500,500)},${window.innerHeight + 200}`
      },
      rotation: rotate * 3
    };

    gsap.to(node, {
      ...anim,
      duration,
      delay,
      ease: "linear",
      onComplete: () => this._animateFall(node)
    });
  }

  _rand(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  _randRange(min, max) {
    return min + Math.random() * (max - min);
  }
}