/* jshint esversion: 6 */

onmessage = _ => {

fetch('countriesList.json')
  .then(response => {
    return response.json();
  })
  // ITERATE INSIDE
  .then(json => {
    const items = json;
    items.forEach(item => {
      let code = item.code;
      let name = item.name;
      postMessage([code, name]);
    });
  });
};
