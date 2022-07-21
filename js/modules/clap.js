import { fetchAsync } from "./fetch.js";

const $counter = document.querySelector(".counter"),
  url = "https://meet-the-heroes.herokuapp.com/api/v1/claps";

export function getClap() {
  console.log($counter);

  fetchAsync({
    url,
    Method: "GET",
    success: (res) => {
      refreshCounter(res.clapCount.toString());
    },
  });
}

export function clap(element, e) {
  const $clap = document.querySelector(element);

  if (e.target !== $clap) return;

  fetchAsync({
    url,
    method: "PUT",
    success: (res) => {
      refreshCounter((parseInt($counter.textContent) + 1).toString());
    },
  });

  console.log("Clap");
}

const refreshCounter = (number) => {
  let baseCount = "000000",
    finalCount = baseCount.substring(number.length);
  console.log("refreshCounter: ", finalCount, " - ", number);
  $counter.textContent = finalCount + number;
};
