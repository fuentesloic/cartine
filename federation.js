/* jshint esversion: 6 */

onmessage = _ => {

    fetch('locales.json')
        .then(response => {
            return response.json();
        })
        // ITERATE INSIDE
        .then(json => {
        const items = json.features;
        let federations = [];
        items.forEach(item => {
          let federationCode = item.properties.subcountry;
          if (federations.indexOf(federationCode) === -1 ) {
            federations.push(federationCode);
          }
        });
        postMessage(federations);
    });
};
