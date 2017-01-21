/* jshint esversion: 6 */

// Valeurs initiale de la carte

const map = L.map('map', {
  center: [50, -100],
  zoom: 4,
  layers: [
    L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibG9pY2Z1ZW50ZXMiLCJhIjoiY2l4cWFvanBwMDAyNzJ3cGJkNnRmanp0diJ9.Wt3BUvjiwJwbfMGHNQFQxg")
  ]
});

// constructor

class InitLayer {
  constructor(federation, lat, lng) {
    this.federation = federation;
    this.layer = L.layerGroup().addLayer(L.marker([lat, lng]));
  }
}

// lancement des web worker pour remonter les datas

const giveData = new Worker("info.js");
let federationLayers = {};
let infoCount = 0;

giveData.onmessage = (informations) => {
  infoCount++;
  let [lat, lng, federation, city, length] = informations.data;
  // federation key is not registered yet
  if (!(federation in federationLayers)) {
    federationLayers[federation] = L.layerGroup();
  }
  // add the layer to the current federation
  federationLayers[federation].addLayer(L.marker([lat, lng]).bindPopup(`${city} in ${federation}`));

  // info counter
  console.info(`${infoCount}/${length} markers were created.`);
  if(infoCount === length) {
    console.info('done!');
    L.control.layers(federationLayers).addTo(map);
  }
};

giveData.postMessage("info");
