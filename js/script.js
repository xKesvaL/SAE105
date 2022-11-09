window.addEventListener("load", () => {
  document.querySelector("body").classList.remove("preload");
  createBurgerMenu();
  listenToBurger();
});

const createBurgerMenu = () => {
  let pages = document.querySelector("header .pages");
  let menu = document.querySelector("body").appendChild(pages.cloneNode(true));
  menu.classList.remove("pages");
  menu.classList.add("burger-menu");
};

const listenToBurger = () => {
  let burger = document.querySelector("header .burger");
  let burgerMenu = document.querySelector(".burger-menu");
  let burgerSvg = document.querySelector("header .burger svg");
  burger.addEventListener("click", () => {
    burgerMenu.classList.toggle("burger-shown");
    burgerSvg.classList.toggle("white-svg");
    let burgerAnchors = document.querySelectorAll("header a");
    burgerAnchors.forEach((anchor) => {
      anchor.classList.toggle("burger-header");
    });
  });
};
