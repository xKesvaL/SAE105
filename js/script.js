const themes = document.querySelectorAll(`[name="theme"]`);
const scrollTopButton = document.querySelector(".back-to-top");

let SAEs;
let seeMore;
let projectSAE;

try {
  SAEs = Object.keys(SAE);
  projectSAE = document.querySelector(".projects.folder .saes");
} catch (e) {}

try {
  seeMore = document.querySelector(".projects.home .project.see-more");
} catch (e) {}

if (projectSAE) {
  SAEs.forEach((sitae) => {
    let comps = Object.values(SAE[sitae]["compétences"]);
    projectSAE.innerHTML += `
    <div class="sae">
      <div class="name enhance">${sitae}</div>
      <div class="title">${SAE[sitae].titre}</div>
      <div class="acs">
        <div class="ac">
          ${comps.join('</div><div class="ac">')}
        </div>
      </div>
    <div>
    `;
  });
}

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

const applyTheme = () => {
  const activeTheme = localStorage.getItem("theme");
  themes.forEach((theme) => {
    if (theme.id == activeTheme) {
      theme.checked = true;
    }
  });
  /* 
  :has has a main coverage of 82.92%
  I actually consider that to be enough that we don't care about the rest.
  Rest : Firefox (will have it soon), other not really known browsers
  document.documentElement.className = theme;
  */
};

const createBurgerMenu = () => {
  let pages = document.querySelector("header .pages");
  let menu = document.querySelector("body").appendChild(pages.cloneNode(true));
  menu.classList.remove("pages");
  menu.classList.add("burger-menu");
};

const listenToBurger = () => {
  let header = document.querySelector("header");
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
    header.classList.toggle("fixed");
    burgerSvg.classList.toggle("white-svg");
    logo.classList.toggle("burger-header");
  });
};
