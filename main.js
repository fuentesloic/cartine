/* jshint esversion: 6 */

// init map

const map = L.map('map', {
  center: [0, 0],
  zoom: 2,
  layers: [
    L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibG9pY2Z1ZW50ZXMiLCJhIjoiY2l4cWFvanBwMDAyNzJ3cGJkNnRmanp0diJ9.Wt3BUvjiwJwbfMGHNQFQxg")
  ]
});

// progress bar

let progressContainer = document.getElementById('progressContainer');
let progressBar = document.getElementById('progressBar');
updateProgressBar = (processed, total, elapsed, layersArray) => {
	if (elapsed > 1000) {
	  progressBar.style.display = 'block';
		progressBar.style.width = Math.round(processed/total*100) + '%';
	}
	if (processed === total) {
	progressBar.style.display = 'none';
  }
};

// web worker run

const giveData = new Worker("dataWorker.js");

let layerGroup = L.markerClusterGroup({ chunkProgress: updateProgressBar });
let infoCount = 0;
giveData.onmessage = (informations) => {
  infoCount++;
  let [lat, lng, length] = informations.data;
  layerGroup.addLayer(L.marker([lat, lng]));
  if (infoCount == length) {
    map.addLayer(layerGroup);
  }
};

giveData.postMessage("info");
