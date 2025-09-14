export class Menusub {
  constructor(location, className, defaultKey = "home", animateIntro = true) {
    location.innerHTML = "";

    if (className) location.classList.add(className);

    const items = [
      { key: "home", label: "Home", icon: "fa-solid fa-house" },
      { key: "project", label: "Project", icon: "fa-solid fa-diagram-project" },
      { key: "dev", label: "Dev", icon: "fa-solid fa-code" },
      { key: "store", label: "Store", icon: "fa-solid fa-store" },
      { key: "about", label: "About", icon: "fa-solid fa-user" },
      { key: "contact", label: "Contact", icon: "fa-solid fa-envelope" },
      { key: "more", label: "More", icon: "fa-solid fa-ellipsis" }
    ];

    this.elements = items.map(({ key, label, icon }) => {
      const span = document.createElement("span");
      span.classList.add("submenu-item");
      span.dataset.key = key;

      const i = document.createElement("i");
      i.className = icon;

      span.append(i, document.createTextNode(" " + label));
      return span;
    });

    location.append(...this.elements);

    // Intro tween only if animateIntro is true
    this.introTween = null;
    if (animateIntro) {
      this.introTween = gsap.fromTo(
        this.elements,
        { opacity: 0, x: () => gsap.utils.random(-200, 200), y: () => gsap.utils.random(-200, 200) },
        { opacity: 1, x: 0, y: 0, duration: 0.2, ease: "expo.out", stagger: 0.1 }
      );
    }

    this.elements.forEach(item => item.addEventListener("click", () => this.setActive(item)));

    const defaultItem = this.elements.find(el => el.dataset.key === defaultKey);
    if (defaultItem) this.setActive(defaultItem);
  }

  setActive(item) {
    this.elements.forEach(el => el.classList.remove("active"));
    item.classList.add("active");
  }
}