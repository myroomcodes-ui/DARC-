

// activities/store.js
export class StoreActivity {
        constructor() {
                this.el = document.createElement("div");
                this.el.classList.add("activity", "store-activity");
                this.el.innerHTML = "<h1>Store Screen</h1>";
        }
        
        destroy() {
                if (!this.el.parentNode) return;
                if (window.gsap) {
                        gsap.to(this.el, {
                                opacity: 0,
                                y: -50,
                                duration: 0.3,
                                ease: "expo.in",
                                onComplete: () => this.el.remove()
                        });
                } else {
                        this.el.remove();
                }
        }
}
