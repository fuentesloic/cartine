/* jshint esversion: 6 */

// init map

const map = L.map('map', {
  center: [50, -100],
  zoom: 2,
  layers: [
    L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibG9pY2Z1ZW50ZXMiLCJhIjoiY2l4cWFvanBwMDAyNzJ3cGJkNnRmanp0diJ9.Wt3BUvjiwJwbfMGHNQFQxg")
  ]
});

const countriesList = new Worker("countriesWorker.js");
const giveData = new Worker("dataWorker.js");

// countriesList web worker

const selectElement = document.getElementById("selectCountry");
countriesList.onmessage = (countries) => {
  let [code, name] = countries.data;
  let optionElement = document.createElement("option");
  optionElement.setAttribute("value", code);
  let insertCode = document.createTextNode(name);
  optionElement.appendChild(insertCode);
  selectElement.insertBefore(optionElement, null);
};

countriesList.postMessage("send countries");

// marker web Worker

let federationLayers = {};
let infoCount = 0;
let federationCount = 0;
giveData.onmessage = (informations) => {
  let [lat, lng, federation, city, length, country, countrySelected] = informations.data;
  infoCount++;
  // federation key is not registered yet
  if (country === countrySelected) {
    if (!(federation in federationLayers)) {
      federationLayers[federation] = L.layerGroup();
      federationCount++;
    }
    // add the layer to the current federation
    federationLayers[federation].addLayer(L.marker([lat, lng]).bindPopup(`${city} in ${federation}`));
  }
  // info counter
  if(infoCount === length) {
    if (federationCount < 0) {
      L.control.layers(federationLayers).addTo(map);
      infoCount = 0;
    }
    alert(`malgré ${length} starbucks, il n'y en a pas en ${country}`);
  }
};

selectCountry = _ => {
  federationLayers = {};
  let select = document.getElementById("selectCountry");
  let countryValue = select.options[select.selectedIndex].value;

  giveData.postMessage(countryValue);
};
