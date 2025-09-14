import { BTN } from "/DARC/Web/layout/.JS/Button.js";

export class WelcomeCard {
        constructor(container) {
                this.container = container;
                this.container.classList.add("welcome-card");
                
                // Title  
                this.title = document.createElement("h1");
                this.title.classList.add("welcome-title");
                this.title.textContent = "Welcome to DARC Inc";
                
                // Carousel wrapper  
                this.carouselWrapper = document.createElement("div");
                this.carouselWrapper.classList.add("welcome-carousel-wrapper");
                
                // Keygen button (use BTN class)  
                this.keyBtn = new BTN({
                        label: "Generate User PIN",
                        icon: "fa-solid fa-key",
                        className: "welcome-btn"
                });
                
                // Attach children  
                this.container.append(this.title, this.carouselWrapper, this.keyBtn.el);
        }
        
}