const $ = document;
const myNavbar = $.querySelector(".my-navbar");
const myNavbarMobile = $.querySelector(".my-navbar-mobile");
const menuBtn = $.querySelector(".menu-btn");
const closeMenuBtn = $.querySelector(".close-menu-btn");
const navbarItemsMobile = $.querySelector(".navbar-items-mobile");
const backToTop = $.querySelector(".back-to-top");
const CardService = $.querySelectorAll(".card-service");
const feature = $.querySelectorAll(".feature");
const cardTeam = $.querySelector(".card-team");
const scrollDownBtn = $.querySelector(".scroll-down-btn");

// Fix navbar after scrolling
window.addEventListener("scroll", () => {
  if (scrollY > 0) {
    myNavbar.classList.add("nav-fixed");
    myNavbarMobile.classList.add("nav-fixed");
  } else {
    myNavbar.classList.remove("nav-fixed");
    myNavbarMobile.classList.remove("nav-fixed");
  }

  if (scrollY > 100) {
    backToTop.style.transform = "translateY(0)";
  } else {
    backToTop.style.transform = "translateY(100px)";
  }
});

// click back to top button
backToTop.addEventListener("click", () => {
  scrollTo(0, 0);
});

// click open menu mobile
menuBtn.addEventListener("click", () => {
  navbarItemsMobile.classList.add("show-drawer");
  $.body.style.overflowY = "hidden";
  backToTop.style.transform = "translateY(100px)";
});

// click close menu mobile
closeMenuBtn.addEventListener("click", () => {
  navbarItemsMobile.classList.remove("show-drawer");
  $.body.style.overflowY = "scroll";
});

const checkCard = () => {
  const triggerBottom = (window.innerHeight / 5) * 4;

  const cardTeamTop = cardTeam.getBoundingClientRect().top;
  if (cardTeamTop < triggerBottom) {
    cardTeam.classList.add("show");
  } else {
    cardTeam.classList.remove("show");
  }

  feature.forEach((f) => {
    const featureTop = f.getBoundingClientRect().top;
    if (featureTop < triggerBottom) {
      f.classList.add("show");
    } else {
      f.classList.remove("show");
    }
  });

  CardService.forEach((card) => {
    const cardTop = card.getBoundingClientRect().top;
    if (cardTop < triggerBottom) {
      card.classList.add("show");
    } else {
      card.classList.remove("show");
    }
  });
};

scrollDownBtn.addEventListener("click", () => {
  scrollTo(0,window.scrollY + window.innerHeight - 50);
});

window.addEventListener("scroll", checkCard);

// loading script
let loaded = $.querySelector(".loaded");
window.addEventListener("load", function () {
  setTimeout(function () {
    loaded.classList.add("hidden");
  }, 500);
});
