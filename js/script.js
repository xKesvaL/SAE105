const themes = document.querySelectorAll(`[name="theme"]`);
const scrollTopButton = document.querySelector(".back-to-top");

let SAEs;
let seeMore;
let projectSAE;
let searchBar;
let SAEContainer;
let moveButtons = {
  previous: {},
  next: {},
};

const getSAEData = (sae) => {
  return {
    semester: sae.split(".")[0].split("").pop(),
    number: sae.split(".")[1].split("").pop(),
  };
};

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

  const toggleMenu = () => {
    placeHolder.classList.toggle("active");
    burgerMenu.classList.toggle("burger-shown");
    header.classList.toggle("fixed");
    burgerSvg.classList.toggle("white-svg");
    logo.classList.toggle("burger-header");
  };

  burger.addEventListener("click", toggleMenu);
};

const searchSAE = (query) => {
  let saeElements = document.querySelectorAll(".projects.folder .sae");
  if (query && query.trim().length > 0) {
    query = query.toLowerCase().split(".").join("").split("0").join("");
    let keys = Object.keys(SAE);
    keys.forEach((key, i) => {
      if (key == "infos") {
        return;
      }

      let isVisible = key
        .toLowerCase()
        .split(".")
        .join("")
        .split("0")
        .join("")
        .includes(query);
      saeElements[i - 1].classList.toggle("hidden", !isVisible);
    });
  } else {
    saeElements.forEach((el) => {
      el.classList.remove("hidden");
    });
  }
};

try {
  SAEs = Object.keys(SAE);
  projectSAE = document.querySelector(".projects.folder .saes");
  searchBar = document.querySelector(".projects.folder .search-bar input");
} catch (e) {}

try {
  SAEContainer = document.querySelector("main > .sae");
  moveButtons.previous = document.querySelector("main > .sae .sae-previous");
  moveButtons.next = document.querySelector("main > .sae .sae-next");
} catch (e) {}

try {
  seeMore = document.querySelector(".projects.home .project.see-more");
} catch (e) {}

if (SAEContainer) {
  let queries = new URLSearchParams(window.location.search);
  let currentSAE = queries.get("sae");
  let ACKeys = Object.keys(SAE[currentSAE]["AC"]);
  let RSKeys = Object.keys(SAE[currentSAE]["ressources"]);
  let saeData = getSAEData(currentSAE);
  console.log(saeData);
  if (saeData.number <= 1) {
    if (
      SAE[
        `SAE${parseInt(saeData.semester) - 1}.0${
          SAE["infos"][parseInt(parseInt(saeData.semester))].maxSAE
        }`
      ]
    ) {
      moveButtons.previous.classList.remove("disabled");
      moveButtons.previous.href = `sae.html?sae=SAE${
        parseInt(saeData.semester) - 1
      }.0${SAE["infos"][parseInt(saeData.number)].maxSAE}`;
    }
    if (
      SAE[`SAE${parseInt(saeData.semester)}.0${parseInt(saeData.number) + 1}`]
    ) {
      moveButtons.next.classList.remove("disabled");
      moveButtons.next.href = `sae.html?sae=SAE${parseInt(saeData.semester)}.0${
        parseInt(saeData.number) + 1
      }`;
    }
  } else if (
    SAE["infos"][parseInt(saeData.semester)].maxSAE == saeData.number
  ) {
    if (
      SAE[`SAE${parseInt(saeData.semester)}.0${parseInt(saeData.number) - 1}`]
    ) {
      moveButtons.previous.classList.remove("disabled");
      moveButtons.previous.href = `sae.html?sae=SAE${parseInt(
        saeData.semester
      )}.0${parseInt(saeData.number) - 1}`;
    }

    if (
      SAE[
        `SAE${parseInt(saeData.semester) + 1}.0${
          SAE["infos"][parseInt(parseInt(saeData.semester))].minSAE
        }`
      ]
    ) {
      moveButtons.next.classList.remove("disabled");
      moveButtons.next.href = `sae.html?sae=SAE${
        parseInt(saeData.semester) + 1
      }.0${SAE["infos"][parseInt(parseInt(saeData.semester))].minSAE}`;
    }
  } else {
    if (
      SAE[`SAE${parseInt(saeData.semester)}.0${parseInt(saeData.number) - 1}`]
    ) {
      moveButtons.previous.classList.remove("disabled");
      moveButtons.previous.href = `sae.html?sae=SAE${parseInt(
        saeData.semester
      )}.0${parseInt(saeData.number) - 1}`;
    }
    if (
      SAE[`SAE${parseInt(saeData.semester)}.0${parseInt(saeData.number) + 1}`]
    ) {
      moveButtons.next.classList.remove("disabled");
      moveButtons.next.href = `sae.html?sae=SAE${parseInt(saeData.semester)}.0${
        parseInt(saeData.number) + 1
      }`;
    }
  }
  let html = `
  <div class="header">
    <div class="head">
      <div>
        <div class="name">${currentSAE}</div>
        <div class="title">${SAE[currentSAE].titre}</div>
      </div>
      <div class="img"><img src="/img/sae/${currentSAE}/1.png" alt="${currentSAE}"></div>
    </div>
    <div class="desc">${SAE[currentSAE].description}</div>
    <div class="skills">
      <div class="skill">
      ${SAE[currentSAE]["compétences"].join('</div><div class="skill">')}
      </div>
    </div>
  </div>
  <div class="body">
    <div class="acs">`;
  ACKeys.forEach((ac) => {
    html += `<div class="ac">${ac}</div>`;
  });
  html += `</div><div class="full-acs">`;
  ACKeys.forEach((ac) => {
    html += `<div class="ac">
              <div class="name">
                ${ac}
              </div>
              <div class="desc">
                ${SAE[currentSAE]["AC"][ac]}
              </div>
            </div>`;
  });
  html += `</div><div class="resources">`;
  RSKeys.forEach((rs) => {
    html += `<div class="rs">${rs}</div>`;
  });
  html += `</div><div class="full-resources">`;
  RSKeys.forEach((rs) => {
    html += `<div class="rs">
              <div class="name">
                ${rs}
              </div>
              <div class="name">
                ${SAE[currentSAE]["ressources"][rs]}
              </div>
            </div>`;
  });
  html += `
      </div>
    </div>
    <div class="semester">${SAE[currentSAE]["semestre"]}</div>
  </div>
  `;
  SAEContainer.innerHTML += html;
}

if (projectSAE) {
  SAEs.forEach((sitae) => {
    if (sitae == "infos") {
      return;
    }
    projectSAE.innerHTML += `
    <div class="sae">
      <a class="name enhance" href="/projects/sae.html?sae=${sitae}">${sitae}</a>
      <div class="title">${SAE[sitae].titre}</div>
      <a class="see-more" href="/projects/sae.html?sae=${sitae}">
        <span>+</span>
      </a>
    <div>
    `;
  });
  searchBar.addEventListener("keyup", (e) => {
    searchSAE(e.target.value);
  });
  console.log(searchBar);
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
