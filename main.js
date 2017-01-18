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

// Création des layerGroup

class OverlayMap {
  constructor(groupName, federationLayer) {
    this.groupName = groupName;
    this.federationLayer = L.layerGroup([]);
  }
}

// lancement des web worker pour créer les marker

const markerWorker = new Worker("marker.js");
const federationWorker = new Worker("federation.js");

var layerFederationGroup = [];
federationWorker.onmessage = (federationList) => {
  const federation = federationList.data;
  federation.forEach(federation => {
    federationLayer = new OverlayMap(federation);
    layerFederationGroup.push(federationLayer);
  });
  markerWorker.postMessage("marker");
};

markerWorker.onmessage = (locations) => {
  let [lat, lng, federation, city] = locations.data;
  let marker = L.marker([lat, lng]).bindPopup(`${city} in ${federation}`);

  layerFederationGroup.forEach((layerFederation) => {
    if (layerFederation.groupName === federation) {
      console.debug(`add layer for city ${city}`);
      // ajouter le marker au layerGroup qui correspond
    }
  });
};

federationWorker.postMessage("federation");
