/* jshint esversion: 6 */

// Fond de carte

const white = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibG9pY2Z1ZW50ZXMiLCJhIjoiY2l4cWFvanBwMDAyNzJ3cGJkNnRmanp0diJ9.Wt3BUvjiwJwbfMGHNQFQxg");
const black = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/dark-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibG9pY2Z1ZW50ZXMiLCJhIjoiY2l4cWFvanBwMDAyNzJ3cGJkNnRmanp0diJ9.Wt3BUvjiwJwbfMGHNQFQxg");

var baseMaps = {
    "white": white,
    "black": black
};

// Valeurs initiale de la carte

const map = L.map('map', {
  center: [50, -100],
  zoom: 4,
  layers: [white]
});

// lancement des web worker pour créer les marker

const giveData = new Worker("info.js");

let federations = [];
giveData.onmessage = (informations) => {
  let [lat, lng, federation, city] = informations.data;
  let marker = L.marker([lat, lng]).bindPopup(`${city} in ${federation}`).addTo(map);
};

giveData.postMessage("info");
