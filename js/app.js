import { clap, getClap } from "./modules/clap.js";
import map, { location, getCountry } from "./modules/mapa.js";

const $d = document;

$d.addEventListener("DOMContentLoaded", (e) => {
  map();
  getClap();
  getCountry();
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
