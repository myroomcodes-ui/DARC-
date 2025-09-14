// Drawer.js
//import {Dbtn} from '/DARC/Web/layout/.JS/DrawerBtn.js'
export class Drawer {
        constructor(root) {
                this.drawer = document.createElement("div");
                this.drawer.classList.add("drawer");
                
                // Search input
                this.searchInput = document.createElement("input");
                this.searchInput.type = "search";
                this.searchInput.placeholder = "Search...";
                this.searchInput.classList.add("drawer-search");
                
                // Help button
                this.helpBtn = document.createElement("i");
                this.helpBtn.classList.add("drawer-help");
                this.helpBtn.className ='fa fa-question-circle' 
                
                this.drawer.appendChild(this.searchInput);
                this.drawer.appendChild(this.helpBtn)
                
                // start hidden
                root.appendChild(this.drawer);
        }
        
        open() {
                this.drawer.classList.add("open");
        
        }
        
        close() {
                this.drawer.classList.remove("open");
               
        }
        
        toggle() {
                this.drawer.classList.toggle("open");
                
        }
}