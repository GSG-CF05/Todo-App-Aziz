(function() {
  const menuBtn = document.querySelector(".menu");
  const navbar = document.querySelector(".navbar");
  const pageContainer = document.querySelector(".page-container");
  const logoLink = document.querySelector(".header .logo .go-home");
  const pageOverlay = document.querySelector(".page-container div");

  menuBtn.addEventListener("click", () => {
    navbar.classList.toggle('show-menu');
    logoLink.classList.toggle("disabled");
    pageOverlay.classList.toggle("page-overlay");
  });
  
  pageContainer.addEventListener("click", (e) => {
    if(e.currentTarget == pageContainer && e.target != document.querySelector(".fa-solid")) {
      navbar.classList.remove('show-menu');
      logoLink.classList.remove("disabled");
      pageOverlay.classList.remove("page-overlay");
    }
  })
}());

