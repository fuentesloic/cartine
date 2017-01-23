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

var markers = L.markerClusterGroup();
markers.addLayer(L.marker([40,50])).addLayer(L.marker([45,50])).addLayer(L.marker([40,50]));
// ... Add more layers ...
map.addLayer(markers);
