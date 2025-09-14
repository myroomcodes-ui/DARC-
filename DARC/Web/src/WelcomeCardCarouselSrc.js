
// WelcomeCardCarouselSrc.js
export class WelcomeCardCarouselSrc {
constructor(carouselUI) {
this.ui = carouselUI;
this.slides = [
"🌐 We build immersive digital worlds",
"⚡ Powered by DARC technology",
"🔒 Secure & scalable systems",
"🤝 Connecting innovation with people"
];
this.current = 0;

this.updateSlide();  
              
            // Auto-rotate  
            this.interval = setInterval(() => this.next(), 3000);  
              
            // Controls  
            this.ui.nextBtn.el.addEventListener("click", () => this.next());  
            this.ui.prevBtn.el.addEventListener("click", () => this.prev());  
    }  
      
    updateSlide() {  
            this.ui.slideEl.textContent = this.slides[this.current];  
    }  
      
    next() {  
            this.current = (this.current + 1) % this.slides.length;  
            this.updateSlide();  
    }  
      
    prev() {  
            this.current = (this.current - 1 + this.slides.length) % this.slides.length;  
            this.updateSlide();  
    }

}