// DrawerBtnSrc.js
import { Drawer } from "/DARC/Web/layout/.JS/Drawer_ui.js";
import { DrawerBtn } from "/DARC/Web/layout/.JS/DrawerBtn.js";

export class DrawerSrc {
        constructor(root = document.body) {
                // create floating drawer button
                this.button = new DrawerBtn(root);
                
                // create drawer container
                this.drawer = new Drawer(root);
                
                // hook toggle
                this.button.onClick(() => {
                        this.drawer.toggle();
                
                });
                
               // console.log("✅ Drawer button + drawer initialized.");
        }
}