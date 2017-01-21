/* jshint esversion: 6 */

onmessage = _ => {

  fetch('locales.json')
    .then(response => {
      return response.json();
    })
    // ITERATE INSIDE
    .then(json => {
      const items = json.features;
      let length = items.length;
      items.forEach(item => {
        let [lat, long] = item.geometry.coordinates;
        let {subcountry, city} = item.properties
        postMessage([long, lat, subcountry, city, length]);
      });
    });
};
