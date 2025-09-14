export class LOADERclass {
        static loadCSS(href) {
                return new Promise((resolve, reject) => {
                        // prevent duplicate
                        if ([...document.styleSheets].some(s => s.href && s.href.includes(href))) {
                                resolve(href);
                                return;
                        }
                        
                        const link = document.createElement('link');
                        link.rel = 'stylesheet';
                        link.href = href;
                        link.onload = () => resolve(href);
                        link.onerror = () => reject(new Error(`Failed to load CSS: ${href}`));
                        document.head.appendChild(link);
                });
        }
        
        static loadJS(src) {
                return new Promise((resolve, reject) => {
                        // prevent duplicate
                        if ([...document.scripts].some(s => s.src && s.src.includes(src))) {
                                resolve(src);
                                return;
                        }
                        
                        const script = document.createElement('script');
                        script.src = src;
                        script.async = true;
                        script.onload = () => resolve(src);
                        script.onerror = () => reject(new Error(`Failed to load JS: ${src}`));
                        document.body.appendChild(script);
                });
        }
       static copying() {

                document.addEventListener("contextmenu", (event) => event.preventDefault());

                // Disable keyboard shortcuts (Ctrl+C, Ctrl+X, Ctrl+V, etc.)
                document.addEventListener("keydown", (event) => {
                        if (event.ctrlKey && (event.key === "c" || event.key === "x" || event.key === "v" || event.key === "u")) {
                                event.preventDefault();
                        };
                });
        };
}