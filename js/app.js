import { clap, getClap } from "./modules/clap.js";
import map, {
  location,
  getCountry,
  sendOptionData,
  modalStudy,
} from "./modules/mapa.js";

const $d = document;

$d.addEventListener("DOMContentLoaded", (e) => {
  map();
  getClap();
  getCountry();
});

$d.addEventListener("click", (e) => {
  clap(".clap-button", e);

  modalStudy(e);
  // location(Math.random(), Math.random());
});

$d.addEventListener("change", (e) => {
  const $option = $d.querySelector(".country-selector");

  if (e.target === $option) sendOptionData(e.target.value);
});

addEventListener("resize", (e) => {
  const $shape = $d.querySelector(".shape-title");

  /*if (innerHeight < 400) {
    $shape.setAttribute("viewBox", "50 10 75 100");
    return;
  }

  if (innerHeight < 400) {
    $shape.setAttribute("viewBox", "50 10 75 100");
    return;
  }

  if (innerHeight < 400) {
    $shape.setAttribute("viewBox", "50 10 75 100");
    return;
  }

  if (innerHeight < 400) {
    $shape.setAttribute("viewBox", "50 10 75 100");
    return;
  }*/

  if (innerHeight < 400) $shape.setAttribute("viewBox", "50 10 75 100");
  else if (innerWidth < 600) $shape.setAttribute("viewBox", "50 10 50 100");
  else if (innerWidth < 1000) $shape.setAttribute("viewBox", "50 10 200 100");
  else if (innerWidth < 1200) $shape.setAttribute("viewBox", "50 10 30 100");

  console.log("ViewBox", $shape.getAttribute("viewBox"));
  // location(Math.random(), Math.random());
});
