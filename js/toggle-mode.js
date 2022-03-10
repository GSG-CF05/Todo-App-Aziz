(function() {
  const toggleModeBtn = document.querySelector(".header .mode button");
  const body = document.querySelector("body");

  document.addEventListener('DOMContentLoaded', readModeFromLocalStorage);

  function readModeFromLocalStorage() {
    if(localStorage.getItem("dark") == "on") {
      changeModeIcon("sun");
      togglePageMode();
    }
  }

  toggleModeBtn.addEventListener("click", (e) => {
    const icon = e.target.children[0];
    const currentIconName = icon.className.split(" ")[1].split("-")[1].trim(); // TODO: use regular expressions instead
    const iconName = currentIconName == "sun" ? "moon" : "sun";
    const darkModeStatus = iconName == "sun" ? "on" : "off";
    changeModeIcon(iconName);
    togglePageMode();
    updateDarkModeInLocalStorage(darkModeStatus);
  });

  function changeModeIcon(iconName) {
    if(iconName == "moon")
      toggleModeBtn.innerHTML = `<i class="far fa-moon"></i>`;
    else
      toggleModeBtn.innerHTML = `<i class="fa-solid fa-sun"></i>`;
  }

  function togglePageMode() {
    body.classList.toggle("dark-mode");
  }

  function updateDarkModeInLocalStorage(darkModeStatus) {
    localStorage.setItem("dark", darkModeStatus);
  }

}());