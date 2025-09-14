import { darcInfo } from '/DARC/E.ngine/[ JS ]/DARC_INFO.JS';

class Menu {
    returnMenu(location) {
        const menu = document.createElement('div');
        menu.classList.add('menu-container');

        this.menubox = document.createElement('div');   
        this.menubox.classList.add('menu-box');

        // --- LOGO (SVG D) ---  
        const logoWrapper = document.createElement('div');  
        logoWrapper.classList.add('menu-logo');  
        logoWrapper.innerHTML = `  
        <svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" fill="none">  
          <defs>  
            <linearGradient id="electric" x1="0" y1="0" x2="1" y2="1">  
              <stop offset="0%" stop-color="#0ff"/>  
              <stop offset="50%" stop-color="#3b82f6"/>  
              <stop offset="100%" stop-color="#1e40af"/>  
            </linearGradient>  
            <filter id="glow">  
              <feGaussianBlur stdDeviation="1.5" result="blur"/>  
              <feMerge>  
                <feMergeNode in="blur"/>  
                <feMergeNode in="SourceGraphic"/>  
              </feMerge>  
            </filter>  
          </defs>  

          <g transform="translate(128,128)"   
             stroke="url(#electric)" stroke-width="6" fill="none"  
             stroke-dasharray="19 19" stroke-linecap="round"  
             filter="url(#glow)">  
            <ellipse rx="90" ry="36">  
              <animate attributeName="stroke-dashoffset" values="0;29" dur="2s" repeatCount="indefinite"/>  
            </ellipse>  
            <ellipse rx="90" ry="36" transform="rotate(30)">  
              <animate attributeName="stroke-dashoffset" values="0;24" dur=43s" repeatCount="indefinite"/>  
            </ellipse>  
            <ellipse rx="90" ry="36" transform="rotate(-30)">  
              <animate attributeName="stroke-dashoffset" values="0;24" dur="3.5s" repeatCount="indefinite"/>  
            </ellipse>  
          </g>  

          <path d="M88 64h40c38 0 68 30 68 68s-30 68-68 68H88V64z"     
                stroke="url(#electric)" stroke-width="14"   
                stroke-linecap="round" stroke-linejoin="round"   
                fill="none" filter="url(#glow)"/>  
        </svg>  
        `;  

        // --- TEXT ("DARC" without the first D) ---  
        const textContainer = document.createElement('div');  
        textContainer.classList.add('menu-text');  

        const name = darcInfo.darc.name.toUpperCase(); // "DARC"  
        const sliced = name.slice(1); // "ARC"  
        sliced.split("").forEach((letter) => {  
            const span = document.createElement('span');  
            span.textContent = letter;  
            textContainer.appendChild(span);  
        });  

        // --- BRAND (D + ARC together) ---  
        this.brand = document.createElement('div');   // FIX: attach to "this"
        this.brand.classList.add('menu-brand');  
        this.brand.appendChild(logoWrapper);  
        this.brand.appendChild(textContainer);  

        // --- BAR ICON (hamburger) ---  
        this.barIcon = document.createElement('i');  
        this.barIcon.className = 'fa fa-bars menu-bar';  

        // Append children  
        menu.appendChild(this.brand);        // FIX: use this.brand  
        menu.appendChild(this.barIcon);  
        this.menubox.appendChild(menu);  

        // Append to page  
        location.appendChild(this.menubox);  

      // --- GSAP Animation (C → R → A → D) ---
if (window.gsap) {
    const letters = Array.from(textContainer.children); // should be [A, R, C]

    // reorder them: we want sequence C → R → A
    const sequence = [letters[2], letters[1], letters[0]];

    const tl = gsap.timeline();

    // Animate C, R, A one by one (2s each)
    sequence.forEach((letter) => {
        tl.fromTo(
            letter,
            { opacity: 0, y: 100, scale: 0.8 },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: .5,
                ease: "power3.out"
            }
        );
    });

    // Animate the "D" logo after ARC
    tl.fromTo(
        logoWrapper,
        { opacity: 0, scale: 0.2, rotate: -45 },
        {
            opacity: 1,
            scale: 1,
            rotate: 0,
            duration: .5,
            ease: "elastic.out(1, 0.6)"
        }
    );
}
    }
}
export const menuOPT = new Menu();

// instead of exporting undefined early, use functions:
export function getMenuBox() {
  return menuOPT.menubox;
}
export function getBaricon() {
  return menuOPT.barIcon;
}
export function getBrand() {
  return menuOPT.brand;   // FIX: now works
}