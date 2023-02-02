import "@glidejs/glide/dist/css/glide.core.min.css";
import "@glidejs/glide/dist/css/glide.theme.min.css";
import "./assets/css/bootstrap.css";
import "./assets/css/socicon.css";
import "./assets/css/theme-greensea.css";
import "./assets/css/normalize.css";
import "./assets/css/custom.css";

import { initForm } from "./form";
import { initSlider } from "./slider";
import { hide, setTime, show } from "./utils";
import { initAnalytics, initWebVitals } from './analytics';
import { setUpVideoModal } from "./player";

initAnalytics();
initWebVitals();

document.onload = init();

function init() {
  setTime();
  initModals();
  initSlider();
  // initForm();
  setUpVideoModal();

  // Dynamic import
  document.getElementById("subscribe").addEventListener("click", () => {
    import("./form").then(({ initForm }) => {
      initForm();
    });
  });

}

function initModals() {
  const modalButtons = document.querySelectorAll("[data-modal]");

  modalButtons.forEach((btn) => {
    const modal = document.getElementById(btn.getAttribute("data-modal"));
    btn.addEventListener("click", () => show(modal));

    const closeBtn = modal.querySelector(".modal-close");
    closeBtn.addEventListener("click", () => hide(modal));
  });
}
