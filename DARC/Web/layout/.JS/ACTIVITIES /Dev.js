// activities/dev.js

import { WelcomeCardSrc } from "/DARC/Web/src/WelcomeCardSrc.js";

export class DevActivity {
    constructor() {
        this.el = document.createElement("div");
        this.el.classList.add("activity", "dev-activity");
        this.el.innerHTML = "<h1>Dev Screen</h1>"
        this.next= document.createElement('div')
        
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