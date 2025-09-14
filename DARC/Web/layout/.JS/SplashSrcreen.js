export class SplashScreen {
        constructor(root) {
                this.root = root || document.body;
                
                this.el = document.createElement("div");
                this.el.className = "darc-splash";
                this.el.innerHTML = `
            <div class="darc-splash-logo">🚀 DARC</div>
            <div class="darc-loader"></div>
        `;
                
                this.root.appendChild(this.el);
        }
        
        hide() {
                this.el.classList.add("hidden");
                setTimeout(() => {
                        this.el.remove();
                }, 600); // match CSS transition
        }
}