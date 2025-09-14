import { getMenuBox } from "/DARC/Web/layout/.JS/Menu.js";

export class ScreenSrc {
    constructor(location) {
        if (!location) return console.error("❌ ScreenSrc needs a valid location!");

        this.screen = document.createElement("div");
        this.screen.id = "darc-screen";
        this.screen.classList.add("darc-screen");
        location.appendChild(this.screen);

        this._boundResize = () => this.resize();
        window.addEventListener("resize", this._boundResize);

        this.waitForMenuThenResize();
    }

    waitForMenuThenResize(retries = 20, interval = 50) {
        const menuBox = getMenuBox();
        if (menuBox) {
            this.resize();
            return;
        }
        if (retries > 0) setTimeout(() => this.waitForMenuThenResize(retries - 1, interval), interval);
        else console.warn("⚠️ ScreenSrc: menuBox not found after waiting.");
    }

    resize() {
        const menuBox = getMenuBox();
        if (!menuBox) return;

        // Use only the stable top menu row, not dynamic submenu
        const topRow = menuBox.querySelector(".menu-container");
        const menuHeight = topRow ? topRow.getBoundingClientRect().height : 0;

        const winHeight = window.innerHeight;
        this.screen.style.height = (winHeight - menuHeight) + "px";
    }

    setContent(html) {
        this.screen.innerHTML = "";
        let el;

        if (typeof html === "string") {
            const wrapper = document.createElement("div");
            wrapper.innerHTML = html;
            el = wrapper;
        } else if (html instanceof HTMLElement) {
            el = html;
        }

        if (!el) return;

        this.screen.appendChild(el);

        if (window.gsap) {
            const targets = Array.from(el.childNodes).filter(n => n.nodeType === 1 || n.nodeType === 3);
            gsap.fromTo(
                targets,
                { opacity: 0, y: 40 },
                { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.15 }
            );
        }
    }

    destroy() {
        window.removeEventListener("resize", this._boundResize);
        if (this.screen && this.screen.parentNode) this.screen.parentNode.removeChild(this.screen);
    }
}

// Singleton
let screenInstance = null;
export function initScreen(root) {
    if (!screenInstance) screenInstance = new ScreenSrc(root);
    return screenInstance;
}
export function getScreen() {
    return screenInstance;
}