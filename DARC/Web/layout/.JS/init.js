import { BackgroundFX } from '/DARC/Web/layout/.JS/Background_FX.js';
import { menuOPT, getBrand } from '/DARC/Web/layout/.JS/Menu.js';
import { LOADERclass } from '/DARC/Web/src/classes/LOADERclass.js';
import { MenuSrc } from '/DARC/Web/src/MenuSrc.js';
import { initScreen, getScreen } from "/DARC/Web/layout/.JS/Screen.js";
import { DrawerSrc } from "/DARC/Web/src/DrawerSrc.js";
import { showSplash, hideSplash } from '/DARC/Web/src/SplashSrcreenSrc.js';
import { text } from '/bin.js';

class AppInitializer {
        static CSS_FILES = [
                'DARC/Web/layout/default/Darc.all.css',
                'DARC/E.ngine/Externals/mod/font awesome/css/all.min.css',
                'DARC/E.ngine/Externals/mod/font awesome/css/fontawesome.min.css',
                'DARC/Web/layout/default/homeActivity.css'
        ];
        
        static JS_FILES = [
                'DARC/E.ngine/Externals/mod/gsap@3.13.0/gsap.min.js',
                'DARC/E.ngine/Externals/mod/gsap@3.13.0/MotionPathPlugin.js'
                
        ];
        
        async init() {
                try {
                        initScreen(document.body);
                        // Load external CSS + JS resources
                        const cssPromises = AppInitializer.CSS_FILES.map(f => LOADERclass.loadCSS(f));
                        LOADERclass.copying()
                        const jsPromises = AppInitializer.JS_FILES.map(f => LOADERclass.loadJS(f));
                        await Promise.all([...cssPromises, ...jsPromises]);
                        // Menu
                        menuOPT.returnMenu(document.body);
                        new MenuSrc()
                        
                        
                        
                        const fx = new BackgroundFX(document.body, {
                                count: 48, // max particle count
                                interactive: true
                        });
                        
                        console.log("✅ BackgroundFX initialized!");
                        
                        
                        
                        
                        
                        
                        // Screen
                        
                        
                        // Drawer
                        new DrawerSrc(document.body);
                        
                        // Brand element (fallback: "DARC")
                        const brandEl = getBrand();
                        const brandHTML = brandEl ? brandEl.outerHTML : "DARC";
                        
                        // Initialize SubMenuSrc
                        
                        
                        
                        console.log('✅ App successfully initialized!');
                } catch (error) {
                        console.error('❌ Failed to initialize the app:', error);
                        document.body.innerHTML = '<h1>Error: Failed to load app resources.</h1>';
                }
        }
}
// Bootstrap with Splash
(async function startApp() {
        const splash = showSplash(document.body);
        const app = new AppInitializer();
        
        try {
                // Wait until DOM is ready
                await new Promise(resolve => {
                        if (document.readyState === "loading") {
                                window.addEventListener("DOMContentLoaded", resolve, { once: true });
                        } else {
                                resolve();
                        }
                });
                
                // Initialize the app
                await app.init();
                
        } catch (err) {
                console.error("App failed to initialize:", err);
                
        } finally {
                hideSplash(splash);
        }
})();