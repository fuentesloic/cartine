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
  // forEach date put one more in compteur, at the end we'll know if it's finish or not (cf last else)
  compteurBdd++;
  //information from webworker bitch !
  let [lat, lng, federation, city, length] = informations.data;

  // looking for it's the first time for this federation, if yes so do ...
  if (federations.indexOf(federation) === -1 ) {
    // initiate a layerGroup with is first marker and an federation attribute to reconize it
    layerGroup = new InitLayer(federation, lat, lng);
    // increase layerGroup to iterate inside after
    fedLayers.push(layerGroup);
    // increase federation to iterate inside after
    federations.push(federation);

  // ... if not and the are again item in
  } else if ( length !== compteurBdd ){
    // looking for grab the good federation Layer item
    for (var i = 0; i < fedLayers.length; i++) {
      // when find do ...
      if (fedLayers[i].federation === federation) {
        // ... add marker into layerGroup according its federation
        fedLayers[i].layer.addLayer(L.marker([lat, lng]));
      }
    }
  }

  // put controller according the layerGroup in fedLayer[]
  else {
    console.debug(`${compteurBdd}/${length} marker ont étaient créés`);
  }
};

giveData.postMessage("info");
