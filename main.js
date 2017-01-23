/* jshint esversion: 6 */

// init map

const map = L.map('map', {
  center: [0, 0],
  zoom: 2,
  layers: [
    L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibG9pY2Z1ZW50ZXMiLCJhIjoiY2l4cWFvanBwMDAyNzJ3cGJkNnRmanp0diJ9.Wt3BUvjiwJwbfMGHNQFQxg")
  ]
});

// marker web Worker

var markers1 = L.markerClusterGroup();
var markers2 = L.markerClusterGroup();
var markers3 = L.markerClusterGroup();
var markers4 = L.markerClusterGroup();
var markers5 = L.markerClusterGroup();
markers1.addLayer(L.marker([40,-100]));
markers2.addLayer(L.marker([50,-100]));
markers3.addLayer(L.marker([40,-110]));
markers4.addLayer(L.marker([40,-150]));
markers4.addLayer(L.marker([40,-110]));
// ... Add more layers ...
map.addLayer(markers1).addTo(map);
