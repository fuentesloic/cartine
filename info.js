/* jshint esversion: 6 */

onmessage = _ => {

    fetch('locales.json')
        .then(response => {
            return response.json();
        })
        // ITERATE INSIDE
        .then(json => {
            const items = json.features;
            items.forEach( item => {
                let lat = item.geometry.coordinates[0];
                let long = item.geometry.coordinates[1];
                let fed = item.properties.subcountry;
                let city = item.properties.city;
                postMessage([long, lat, fed, city]);
            });
        });
};
