var mymap = L.map('mapid').setView([25.677884, -100.181903], 2);


L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1Ijoib3NjYXJhdG5jIiwiYSI6ImNrYTRra2xhZzA5NTUzcW5zMWU0Z2EwbXcifQ.CPp5QJdP8c6cHsS_BKbU7w'
}).addTo(mymap);

var coutries = JSON.parse(locations); 
console.log(coutries)


Object.entries(coutries).forEach(([key,value])=> {

    if(value.latitude == null || value.longitude == null) {
        return
    }

    var marker = L.marker([value.latitude, value.longitude]).addTo(mymap);
    marker.bindPopup(`<b>${key} </b><br><b>Happiness Score </b><br>${Math.random()}.`).openPopup();
})

