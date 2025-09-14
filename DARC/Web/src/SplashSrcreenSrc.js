import { SplashScreen } from '/DARC/Web/layout/.JS/SplashSrcreen.js';

let splashInstance = null;

export function showSplash(root) {
        splashInstance = new SplashScreen(root);
        return splashInstance;
}

export function hideSplash() {
        if (splashInstance) splashInstance.hide();
}