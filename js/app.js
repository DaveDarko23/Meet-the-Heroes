import { clap, getClap } from "./modules/clap.js";
import map, { location, getCountry } from "./modules/mapa.js";

const $d = document;

$d.addEventListener("DOMContentLoaded", (e) => {
  map();
  getClap();
  getCountry();

  console.log(innerWidth);
});

$d.addEventListener("click", (e) => {
  console.log(e.target);
  clap(".clap-button", e);

  // location(Math.random(), Math.random());
});

$d.addEventListener("change", (e) => {
  console.log(e.target);

  // location(Math.random(), Math.random());
});

addEventListener("resize", (e) => {
  const $shape = $d.querySelector(".shape-title");
  console.log(innerWidth);

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
