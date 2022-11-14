const themes = document.querySelectorAll(`[name="theme"]`);
const scrollTopButton = document.querySelector(".back-to-top");
const seeMore = document.querySelector(".projects.home .project.see-more");

window.addEventListener("scroll", () => {
  if (
    document.body.scrollTop > 300 ||
    document.documentElement.scrollTop > 300
  ) {
    scrollTopButton.classList.add("active");
  } else {
    scrollTopButton.classList.remove("active");
  }
});

window.addEventListener("load", () => {
  themes.forEach((theme) => {
    theme.addEventListener("click", () => {
      storeTheme(theme.id);
    });
  });

  if (seeMore) {
    seeMoreEvents();
  }

  applyTheme();
  createBurgerMenu();
  listenToBurger();
  scrollTopButton.addEventListener("click", scrollToTop);

  // Always last : activates all transitions.
  document.querySelector("body").classList.remove("preload");
});

const seeMoreEvents = () => {
  seeMore.addEventListener("click", () => {
    window.location.assign("/projects");
  });
};

const showSAE = (containerName) => {
  if (!SAE) {
    console.error("No SAE data file found.");
  }
};

const scrollToTop = () => {
  window.scroll(0, 0);
};

const storeTheme = (theme) => {
  localStorage.setItem("theme", theme);
};

const applyTheme = (theme) => {
  const activeTheme = localStorage.getItem("theme");
  themes.forEach((theme) => {
    if (theme.id == activeTheme) {
      theme.checked = true;
    }
  });
};

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
  let logo = document.querySelector("header a:nth-child(2)");
  let burgerAnchors = document.querySelectorAll(".burger-menu a");
  let placeHolder = document.querySelector(".header-placeholder");
  burgerAnchors.forEach((anchor) => {
    anchor.addEventListener("click", () => {
      burger.click();
    });
  });

  burger.addEventListener("click", () => {
    placeHolder.classList.toggle("active");
    burgerMenu.classList.toggle("burger-shown");
    burgerSvg.classList.toggle("white-svg");
    logo.classList.toggle("burger-header");
  });
};
