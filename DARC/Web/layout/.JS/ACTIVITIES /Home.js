// activities/project.js
import { WelcomeCardSrc } from "/DARC/Web/src/WelcomeCardSrc.js";

export class HomeActivity {
constructor() {
this.el = document.createElement("div");
this.el.classList.add("activity", "home-activity");
this.welcomeCard = document.createElement('section')
setTimeout(() => {
this.welcomeCard = new WelcomeCardSrc(this.el, {
bgImages: [
"/DARC/res/drawable_images/Build_a_No_Code_Agent_on_Phone_Using_Replit.webp",
"/DARC/res/drawable_images/kid-coding-infographic-icon-neon-boy-programming-on-laptop-in-computer-language-children-learning-kids-coding-school-teach-to-create-computer-and-mobile-phone-apps-vector.jpg",
"/DARC/res/drawable_images/Article-Image-945×498.jpg",
"/DARC/res/drawable_images/HMD_Smartphones-Catalogue-OG_Image.jpg"
],
interval: 7000 // switch every 7 seconds
});
}, 0);
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