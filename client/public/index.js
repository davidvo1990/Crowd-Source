// Display a map
mapboxgl.accessToken = 'pk.eyJ1IjoiZGF2aWR2bzE5OTAiLCJhIjoiY2p4MmsyOXJsMDAxYTQ4cGg3cHMwcTZkMCJ9.mHHhKy1QIfmGF_TC88vSUg';
if (!mapboxgl.supported()) {
    alert('Your browser does not support Mapbox GL');
} else {
    var map = new mapboxgl.Map({
        container: 'map', // container id
        style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
        center: [-93.25, 44.98], // starting position [lng, lat]
        zoom: 9 // starting zoom
    });
}

// Create a draggable Marker
var marker = new mapboxgl.Marker({
    draggable: true
})
    .setLngLat([-93.25, 44.98])
    .addTo(map);

function onDragEnd() {
    var lngLat = marker.getLngLat();
    coordinates.style.display = 'block';
    coordinates.innerHTML = 'Longitude: ' + lngLat.lng + '<br />Latitude: ' + lngLat.lat;
}

marker.on('dragend', onDragEnd);

// Get coordinates of the mouse pointer
map.on('mousemove', function (e) {
    // console.log(e)
    document.getElementById('info').innerHTML =
        // e.point is the x, y coordinates of the mousemove event relative
        // to the top-left corner of the map
        // JSON.stringify(e.point) + '<br />' +
        // e.lngLat is the longitude, latitude geographical position of the event
        "Longitude: " + JSON.stringify(e.lngLat.lng) + ", Latitude: " + JSON.stringify(e.lngLat.lng);
});

// View a fullscreen map
map.addControl(new mapboxgl.FullscreenControl());

// Locate the user
map.addControl(new mapboxgl.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true
    },
    trackUserLocation: true
}));

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());

// Display driving directions
map.addControl(new MapboxDirections({
    accessToken: mapboxgl.accessToken
}), 'top-left');


// Place the geocoder input outside the map
var geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl
});

document.getElementById('geocoder').appendChild(geocoder.onAdd(map));



var geojson = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {
                "message": "Foo",
                "iconSize": [40, 40]
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -93.324462890625,
                    44.024695711685304
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "message": "Bar",
                "iconSize": [40, 40]
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -93.2158203125,
                    44.97189158092897
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "message": "Baz",
                "iconSize": [40, 40]
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -93.29223632812499,
                    44.28151823530889
                ]
            }
        }
    ]
};

// add markers to map
geojson.features.forEach(function (marker) {
    // create a DOM element for the marker
    var el = document.createElement('div');
    el.className = 'marker';
    el.style.backgroundImage = 'url(https://placekitten.com/g/' + marker.properties.iconSize.join('/') + '/)';
    el.style.width = marker.properties.iconSize[0] + 'px';
    el.style.height = marker.properties.iconSize[1] + 'px';

    // el.addEventListener('click', function () {
    //     window.alert(marker.properties.message);
    // });

    // add marker to map
    new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .addTo(map);
});