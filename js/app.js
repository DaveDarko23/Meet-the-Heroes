import { clap, getClap } from "./modules/clap.js";
import map, {
  getCountry,
  sendOptionData,
  modalStudy,
  closeModal,
  clearMap,
  sliderStudies,
} from "./modules/mapa.js";

const $d = document;

$d.addEventListener("DOMContentLoaded", (e) => {
  console.log(innerWidth);
  map();
  getClap();
  getCountry();
});

$d.addEventListener("click", (e) => {
  console.log("click?");
  clap(".button", e);
  sliderStudies(e);
  modalStudy(e);
  closeModal(e);
  // location(Math.random(), Math.random());
});

$d.addEventListener("change", (e) => {
  const $option = $d.querySelector(".country-selector"),
    $spinner = $d.querySelector(".spinner");

  $spinner.classList.add("onVisible");

  clearMap(e);
  if (e.target === $option) sendOptionData(e.target.value);
});

addEventListener("resize", (e) => {
  const $shape = $d.querySelector(".shape-title");
  const $shapeMap = $d.querySelector(".shape-map");

  if (innerHeight < 400) $shape.setAttribute("viewBox", "55 20 50 100");
  else if (innerWidth < 600) $shape.setAttribute("viewBox", "50 30 70 100");
  else if (innerWidth < 1000) $shape.setAttribute("viewBox", "50 40 80 100");
  else if (innerWidth < 1200) $shape.setAttribute("viewBox", "50 40 90 100");

  if (innerHeight < 400) $shapeMap.setAttribute("viewBox", "-20 40 150 200");
  else if (innerWidth < 600) $shapeMap.setAttribute("viewBox", "-15 0 150 200");
  else if (innerWidth < 1000)
    $shapeMap.setAttribute("viewBox", "-10 -20 150 200");
  else if (innerWidth < 1200)
    $shapeMap.setAttribute("viewBox", "-5 -20 150 200");

  console.log("ViewBox", $shape.getAttribute("viewBox"));
  // location(Math.random(), Math.random());
});

addEventListener("scroll", (e) => {
  console.log(e);
});
