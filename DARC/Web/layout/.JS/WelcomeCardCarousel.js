
// WelcomeCardCarousel.js
import { BTN } from "/DARC/Web/layout/.JS/Button.js";

export class WelcomeCardCarousel {
constructor(container) {
this.container = container;
this.container.classList.add("welcome-carousel");

// Slide element  
            this.slideEl = document.createElement("div");  
            this.slideEl.classList.add("welcome-slide");  
              
            // Controls  
            this.prevBtn = new BTN({  
                    icon: "fa-solid fa-chevron-left",  
                    className: "carousel-btn prev-btn"  
            });  
              
            this.nextBtn = new BTN({  
                    icon: "fa-solid fa-chevron-right",  
                    className: "carousel-btn next-btn"  
            });  
              
            const controls = document.createElement("div");  
            controls.classList.add("carousel-controls");  
            controls.append(this.prevBtn.el, this.nextBtn.el);  
              
            // Attach  
            this.container.append(this.slideEl, controls);  
    }

}