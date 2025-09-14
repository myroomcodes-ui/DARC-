// Universal Button Class (fixed)
export class BTN {
        constructor({ label = "", icon = "", className = "", onClick = null, attrs = {} } = {}) {
                this.el = document.createElement("button");
                this.el.classList.add("btn");
                
                // ✅ accept "a b c" or ["a","b","c"]
                if (className) {
                        if (Array.isArray(className)) {
                                this.el.classList.add(...className.filter(Boolean));
                        } else if (typeof className === "string") {
                                this.el.classList.add(...className.split(/\s+/).filter(Boolean));
                        }
                }
                
                if (icon) {
                        const i = document.createElement("i");
                        i.className = icon;
                        this.el.appendChild(i);
                }
                
                if (label) {
                        const span = document.createElement("span");
                        span.textContent = label;
                        this.el.appendChild(span);
                } else if (icon && !("aria-label" in attrs)) {
                        // accessibility for icon-only buttons
                        this.el.setAttribute("aria-label", "button");
                }
                
                if (onClick) this.el.addEventListener("click", onClick);
                
                // optional attributes (e.g., type: "button")
                if (attrs && typeof attrs === "object") {
                        for (const [k, v] of Object.entries(attrs)) {
                                if (v != null) this.el.setAttribute(k, v);
                        }
                }
        }
}