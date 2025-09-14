import { Menusub } from "/DARC/Web/layout/.JS/MenuSub.js";
import { getScreen } from "/DARC/Web/layout/.JS/Screen.js";
import * as Activities from "/DARC/Web/layout/.JS/ACTIVITIES /index.js";

export class SubMenuSrc {
        constructor(container, defaultKey = "home") {
                this.submenuContainer = container;
                this.screen = getScreen();
                this.currentKey = defaultKey;
                
                // Play intro animation only once
                this.submenu = new Menusub(this.submenuContainer, "submenu", defaultKey, true);
                
                this.currentActivity = null;
                
                this.submenu.elements.forEach(item => {
                        item.addEventListener("click", () => this.loadActivity(item.dataset.key));
                });
                
                this.loadActivity(defaultKey);
        }
        
        loadActivity(key) {
                if (!key) key = this.currentKey;
                
                if (this.currentActivity) {
                        if (this.currentActivity.destroy) this.currentActivity.destroy();
                        this.currentActivity = null;
                }
                
                const activityMap = {
                        home: Activities.HomeActivity,
                        project: Activities.ProjectActivity,
                        dev: Activities.DevActivity,
                        store: Activities.StoreActivity,
                        about: Activities.AboutActivity,
                        contact: Activities.ContactActivity
                };
                
                const ActivityClass = activityMap[key];
                if (!ActivityClass) return;
                
                this.currentActivity = new ActivityClass();
                if (this.screen) this.screen.setContent(this.currentActivity.el);
                
                const activeItem = this.submenu.elements.find(el => el.dataset.key === key);
                if (activeItem) this.submenu.setActive(activeItem);
                
                this.currentKey = key;
        }
}