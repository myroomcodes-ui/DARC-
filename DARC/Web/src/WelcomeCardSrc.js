// WelcomeCardSrc.js

// Import the main card UI
import { WelcomeCard } from "/DARC/Web/layout/.JS/WelcomeCard.js";

// Import the carousel UI & logic
import { WelcomeCardCarousel } from "/DARC/Web/layout/.JS/WelcomeCardCarousel.js";
import { WelcomeCardCarouselSrc } from "/DARC/Web/src/WelcomeCardCarouselSrc.js";
export class WelcomeCardSrc {
        constructor(container, { bgImages = ["/DARC/res/drawable_images/Build_a_No_Code_Agent_on_Phone_Using_Replit.webp"], interval = 5000 } = {}) {
                this.container = container;
                
                // Build UI
                this.ui = new WelcomeCard(container);
                
                // Setup carousel inside card
                this.carouselUI = new WelcomeCardCarousel(this.ui.carouselWrapper);
                this.carouselSrc = new WelcomeCardCarouselSrc(this.carouselUI);
                
                // Backgrounds
                this.bgImages = bgImages;
                this.currentIndex = 0;
                
                // Create a background layer
                this.bgLayer = document.createElement("div");
                this.bgLayer.classList.add("welcome-bg-layer");
                this.container.prepend(this.bgLayer);
                
                // Initial background
                this.updateBackground();
                
                // Cycle backgrounds every interval
                setInterval(() => this.nextBackground(), interval);
        }
        
        updateBackground() {
                this.bgLayer.style.backgroundImage = `url(${this.bgImages[this.currentIndex]})`;
                this.currentIndex = this.currentIndex % this.bgImages.length;
        }
        
        nextBackground() {
                this.currentIndex = (this.currentIndex + 1) % this.bgImages.length;
                this.updateBackground();
        }
}