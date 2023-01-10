const $ = document;
const myNavbar = $.querySelector(".my-navbar");
const myNavbarMobile = $.querySelector(".my-navbar-mobile");
const menuBtn = $.querySelector(".menu-btn");
const closeMenuBtn = $.querySelector(".close-menu-btn");
const navbarItemsMobile = $.querySelector(".navbar-items-mobile");
const backToTop = $.querySelector(".back-to-top");

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
