import { fetchAsync } from "./fetch.js";
let mapa;
let resGlobal;

const $d = document;

export default function map() {
  mapa = L.map("map").setView([0, 0], 1);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "© OpenStreetMap",
  }).addTo(mapa);
}

export function location(study, index) {
  let marker = L.marker([study.address.lat, study.address.lng]).addTo(mapa);

  marker.bindPopup(`
  <h3>${study.address.contact_address}</h3>
  <p><b>Nombre del Estudio: </b> ${study.name}</p>
  <p><b>Año de publicación: </b> ${study.date_registration}</p>
  <div class="btns-card">
  <a href="https://www.google.com/maps/@${study.address.lat},${study.address.lng},16z" target="_blank" rel="noopener">Ver en Google Maps</a>
  <button class="btn-showmore" id="btn-${index}">Ver más</button>
  </div>
  `);
}

export function modalStudy(e) {
  const $pop = document.getElementById(`${e.target.id}`);
  if ($pop) {
    const [_, id] = e.target.id.split("-");
    console.log(resGlobal[id]);
  }
}

export function getCountry() {
  const $option = $d.querySelector(".country-selector"),
    $template = $d.getElementById("option-template").content,
    $fragment = $d.createDocumentFragment();

  fetchAsync({
    url: "https://meet-the-heroes.herokuapp.com/api/v1/types",
    Method: "GET",
    success: (res) => {
      res.forEach((country) => {
        $template.querySelector(".options").value = country.id;
        $template.querySelector(".options").textContent = country.name;
        let $clone = $d.importNode($template, true);
        $fragment.appendChild($clone);
        console.log(country.id, country.name);
      });

      $option.appendChild($fragment);
    },
  });
}

export function sendOptionData(data) {
  fetchAsync({
    url: `https://meet-the-heroes.herokuapp.com/api/v1/study/type?idType=${data}`,
    Method: "GET",
    success: (res) => {
      resGlobal = res;

      res.forEach((study, index) => {
        location(study, index);
      });
    },
  });
}
