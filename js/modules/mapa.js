import { fetchAsync } from "./fetch.js";
let mapa, markerLayerGroup;
let resGlobal;
let i = 0;

const $d = document;

export default function map() {
  mapa = L.map("map").setView([0, 0], 1);
  markerLayerGroup = L.layerGroup();

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    minZoom: 2,
    attribution: "© OpenStreetMap",
  }).addTo(mapa);
}

export function location(study, index) {
  let marker = L.marker([study.address.lat, study.address.lng]);

  marker.bindPopup(`
  <h3>${study.address.contact_address}</h3>
  <p><b>Nombre del Estudio: </b> ${study.name}</p>
  <p><b>Año de publicación: </b> ${study.date_registration}</p>
  <div class="btns-card">
  <a href="https://www.google.com/maps/@${study.address.lat},${study.address.lng},16z" target="_blank" rel="noopener">Ver en Google Maps</a>
  <button class="btn-showmore" id="btn-${index}" >Ver más</button>
  </div>
  `);

  markerLayerGroup.addLayer(marker);
  mapa.addLayer(markerLayerGroup);
}

export function clearMap(e) {
  if (mapa.hasLayer(markerLayerGroup)) {
    console.log("already have one, clear it");
    markerLayerGroup.clearLayers();
  }
}

export function modalStudy(e) {
  if (!e.target.id.includes("btn-")) return;

  const $modal = $d.querySelector(".info-modal");

  $modal.classList.add("is-active");

  const [_, id] = e.target.id.split("-"),
    study = resGlobal[id];

  getStudiesByAddress(study.address_id);
}

export function closeModal(e) {
  const $closeModal = $d.querySelector(".info-screen button"),
    $modal = $d.querySelector(".info-modal"),
    $sliderSlides = $d.querySelector(".slider-slides");

  if (e.target !== $closeModal) return;

  $sliderSlides.innerHTML = ``;
  $modal.classList.toggle("is-active");

  i = 0;
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
      });

      $option.appendChild($fragment);
    },
  });
}

export function getStudiesByAddress(data) {
  fetchAsync({
    url: `https://meet-the-heroes.herokuapp.com/api/v1/study/address?idAddress=${data}`,
    Method: "GET",
    success: (res) => {
      const $sliderSlides = $d.querySelector(".slider-slides");

      console.log(res);
      res.forEach((study, index) => {
        const $infoStudy = $d.createElement("section");
        $infoStudy.classList.add("info-study");

        $sliderSlides.insertAdjacentElement("beforeend", $infoStudy);
        printStudy(study, index);
      });
    },
  });
}

function printStudy(study, index) {
  const $modal = $d.querySelectorAll(".info-study")[index],
    $template = $d.getElementById("modal").content,
    $fragment = $d.createDocumentFragment();

  if (index === 0) $modal.classList.add("onFocus");

  const studyKeys = Object.keys(study),
    studyValues = Object.values(study);

  studyKeys.forEach((study, index) => {
    $template.querySelector(".modal-title").textContent = study;
    study !== "Dirección web"
      ? ($template.querySelector(".modal-text").textContent =
          studyValues[index])
      : ($template.querySelector(".modal-text").innerHTML = `
        <a href="${studyValues[index]} rel="noopener" target="_blank">Visitar Página Web</a>
      `);

    let $clone = $d.importNode($template, true);
    $fragment.appendChild($clone);
  });

  $modal.appendChild($fragment);
}

export function sendOptionData(data, success) {
  fetchAsync({
    url: `https://meet-the-heroes.herokuapp.com/api/v1/study/type?idType=${data}`,
    Method: "GET",
    success: (res) => {
      resGlobal = res;
      const $spinner = $d.querySelector(".spinner");
      $spinner.classList.remove("onVisible");

      console.log(res);
      res.forEach((study, index) => location(study, index));
    },
  });
}
export function sliderStudies(e) {
  if (!(e.target.matches(".prev") || e.target.matches(".next"))) return;

  e.preventDefault();

  const $nextBtn = $d.querySelector(".slider-btns .next"),
    $prevBtn = $d.querySelector(".slider-btns .prev"),
    $slides = $d.querySelectorAll(".info-study");

  if (e.target === $prevBtn) {
    $slides[i].classList.remove("onFocus");
    i--;

    if (i < 0) i = $slides.length - 1;

    $slides[i].classList.add("onFocus");
  }

  if (e.target === $nextBtn) {
    $slides[i].classList.remove("onFocus");
    i++;

    if (i >= $slides.length) i = 0;

    $slides[i].classList.add("onFocus");
  }
}
