(function() {
  const menuBtn = document.querySelector(".menu");
  const navbar = document.querySelector(".navbar");

  menuBtn.addEventListener("click", () => {
    navbar.classList.toggle('show-menu');
  });
}());

