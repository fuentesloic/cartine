/* jshint esversion: 6 */

onmessage = countrySelected => {
  console.log(countrySelected.data);
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
        let {subcountry, city, country} = item.properties;
        postMessage([long, lat, subcountry, city, length, country]);
      });
    });
};
