/* jshint esversion: 6 */

// init map

const map = L.map('map', {
  center: [50, -100],
  zoom: 3,
  layers: [
    L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibG9pY2Z1ZW50ZXMiLCJhIjoiY2l4cWFvanBwMDAyNzJ3cGJkNnRmanp0diJ9.Wt3BUvjiwJwbfMGHNQFQxg")
  ]
});

const giveData = new Worker("dataWorker.js");

// marker web Worker

let federationLayers = {};
let infoCount = 0;
giveData.onmessage = (informations) => {
  let [lat, lng, federation, city, length, country, countrySelected] = informations.data;
  infoCount++;
  // federation key is not registered yet
  if (country === countrySelected) {
    if (!(federation in federationLayers)) {
      federationLayers[federation] = L.layerGroup();
    }
    // add the layer to the current federation
    federationLayers[federation].addLayer(L.marker([lat, lng]).bindPopup(`${city} in ${federation}`));
  }
  // info counter
  if(infoCount === length) {
    L.control.layers(federationLayers).addTo(map);
    infoCount = 0;
  }
};
