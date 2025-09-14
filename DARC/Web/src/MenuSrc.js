import { getMenuBox, getBaricon } from "/DARC/Web/layout/.JS/Menu.js";
import { getScreen } from "/DARC/Web/layout/.JS/Screen.js";
import { SubMenuSrc } from "/DARC/Web/src/SubMenuSrc.js";

export class MenuSrc {
        constructor() { 
                this.submenuContainer = document.createElement("div");
                this.submenuContainer.classList.add("submenu-container");
                this.submenuContainer.style.maxHeight = "0px";
                this.submenuContainer.style.overflow = "scroll";
                this.submenuContainer.style.paddingTop = "0px";
                this.submenuContainer.style.paddingBottom = "0px";
                this.submenuContainer.classList.add("collapsed");
                
                this.submenuInstance = null;
                
                this.baricon = getBaricon();
                if (this.baricon) {
                        this.baricon.addEventListener("click", () => this.toggleSubmenu());
                } else {
                        console.warn("⚠️ baricon not found when MenuSrc initialized.");
                }
                
                this.initSubmenu();
        }
        
        initSubmenu() {
                if (this.submenuInstance) return; // only once
                
                const box = getMenuBox();
                if (!box) return;
                
                const topRow = box.querySelector(".menu-container");
                
                // Pass last active key if needed
                const defaultKey = this.submenuInstance?.currentKey || "home";
                this.submenuInstance = new SubMenuSrc(this.submenuContainer, defaultKey);
                
                if (topRow) {
                        topRow.insertAdjacentElement("afterend", this.submenuContainer);
                } else {
                        box.appendChild(this.submenuContainer);
                }
        }
        toggleSubmenu() {
        if (!this.submenuInstance) this.initSubmenu();
        
        if (this.submenuContainer.classList.contains("open")) {
                // Collapse
                if (this.submenuInstance?.submenu?.introTween)
                        this.submenuInstance.submenu.introTween.reverse();
                
                this.submenuContainer.classList.remove("open");
                this.submenuContainer.classList.add("collapsed");
                
                gsap.to(this.submenuContainer, {
                        maxHeight: 0,
                        paddingTop: 0,
                        paddingBottom: 0,
                        duration: 0.15,
                        ease: "expo.in"
                });
        } else {
                // Expand
                this.submenuContainer.classList.remove("collapsed");
                this.submenuContainer.classList.add("open");
                
                if (this.submenuInstance?.submenu?.introTween)
                        this.submenuInstance.submenu.introTween.play();
                
                // Animate to scrollHeight, then remove maxHeight restriction
                gsap.to(this.submenuContainer, {
                        maxHeight: this.submenuContainer.scrollHeight + "px",
                        paddingTop: 10,
                        paddingBottom: 10,
                        duration: 0.3,
                        ease: "expo.out",
                        onComplete: () => {
                                this.submenuContainer.style.maxHeight = "none"; // allow natural height
                        }
                });
        }
        
        getScreen()?.resize();
}
}