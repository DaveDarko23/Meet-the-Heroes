import { fetchAsync } from "./fetch.js";
let mapa;

const $d = document;

export default function map() {
  mapa = L.map("map").setView([20.60374, -103.263764], 12);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "© OpenStreetMap",
  }).addTo(mapa);
}

export function location(latitude, longitude) {
  let marker = L.marker([latitude, longitude]).addTo(mapa);

  let ubicación = "Minerva";
  marker.bindPopup(`
  <b>Hola Mundo!</b><br>Estamos en ${latitude} y ${longitude}
  <br>
  <button>Siguiente</button>
  `);
}

export function getCountry() {
  const $option = $d.querySelector(".country-selector"),
    $template = $d.getElementById("option-template").content,
    $fragment = $d.createDocumentFragment();
  console.log($option);

  fetchAsync({
    url: "https://meet-the-heroes.herokuapp.com/api/v1/types",
    Method: "GET",
    success: (res) => {
      res.forEach((country) => {
        $template.querySelector(".options").id = country.id;
        $template.querySelector(".options").value = country.name;
        $template.querySelector(".options").textContent = country.name;

        let $clone = $d.importNode($template, true);
        $fragment.appendChild($clone);
        console.log(country.id, country.name);
      });

      console.log($option);
      $option.appendChild($fragment);
    },
  });
}
