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

// constructor

class InitLayer {
  constructor(federation, lat, lng) {
    this.federation = federation;
    this.layer = L.layerGroup().addLayer(L.marker([lat, lng]));
  }
}

// lancement des web worker pour remonter les datas

const giveData = new Worker("info.js");

let federations = [];
let fedLayers = [];
let compteurBdd = 0;
giveData.onmessage = (informations) => {
  compteurBdd++;
  let [lat, lng, federation, city, length] = informations.data;
  // si federation n'est jamais passé, créer un layerGroup avec son premier marker
  if (federations.indexOf(federation) === -1 ) {
    layerGroup = new InitLayer(federation, lat, lng);
    fedLayers.push(layerGroup);
    federations.push(federation);
  // si federation existe alors
  } else if ( length !== compteurBdd ){
    // chercher dans les layer déja fait
    for (var i = 0; i < fedLayers.length; i++) {
      // cherche si la fédération est dans un des layer qui porte le même nom
      if (fedLayers[i].federation === federation) {
        // rajoute le marker
        fedLayers[i].layer.addLayer(L.marker([lat, lng]));
      }
    }
  }
  else {
    console.debug(`${compteurBdd}/${length} marker ont étaient créés`);
  }
};

giveData.postMessage("info");
