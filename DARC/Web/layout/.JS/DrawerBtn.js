export class DrawerBtn {
  constructor(root) {
    this.btn = document.createElement("button");
    this.btn.classList.add("drawer-btn");
    this.icon = document.createElement("i");
    this.icon.classList.add("fa-solid", "fa-chevron-left");
    this.btn.appendChild(this.icon);
    
    root.appendChild(this.btn);
  }
  
  onClick(callback) {
    this.btn.addEventListener("click", () => {
      callback();
      
      // flip chevron on toggle
      if (this.icon.classList.contains("fa-chevron-left")) {
        this.icon.classList.replace("fa-chevron-left", "fa-chevron-right");
      } else {
        this.icon.classList.replace("fa-chevron-right", "fa-chevron-left");
      }
    });
  }
}