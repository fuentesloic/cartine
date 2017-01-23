/* jshint esversion: 6 */

onmessage = _ => {
  fetch('locales.json')
    .then(response => {
      return response.json();
    })
    .then(json => {
      const items = json.features;
      let length = items.length;
      console.log(length);
      items.forEach(item => {
        let [lat, long] = item.geometry.coordinates;
        postMessage([long, lat, length]);
      });
    });
};
