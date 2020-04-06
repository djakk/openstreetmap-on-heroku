var map = L.map('the_map').setView([48.11836, -1.68727], 18); // Anatole France street, Rennes, Brittany

/*L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([51.5, -0.09]).addTo(map)
    .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
    .openPopup();*/


var vectorTileStyling = {

	planet_osm_line: {	// mapbox & nextzen only
		weight: 1,
		fillColor: '#f2b648',
		color: '#f2b648',
		fillOpacity: 0.2,
		opacity: 0.4
	}, 
	tile: {	// mapbox & nextzen only
		weight: 1,
		fillColor: '#f2b648',
		color: '#f2b648',
		fillOpacity: 0.2,
		opacity: 0.4
	}, 
	line: {	// mapbox & nextzen only
		weight: 1,
		fillColor: '#f2b648',
		color: '#f2b648',
		fillOpacity: 0.2,
		opacity: 0.4
	}, 
	lines: {	// mapbox & nextzen only
		weight: 1,
		fillColor: '#f2b648',
		color: '#f2b648',
		fillOpacity: 0.2,
		opacity: 0.4
	}
};




var mapboxUrl = "https://openstreetmap-on-heroku.herokuapp.com/{z}/{x}/{y}.mvt";
var mapboxVectorTileOptions = {
			rendererFactory: L.svg.tile,
			attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://www.mapbox.com/about/maps/">MapBox</a>', 
			vectorTileLayerStyles: vectorTileStyling
};
var mapboxPbfLayer = L.vectorGrid.protobuf(mapboxUrl, mapboxVectorTileOptions);
mapboxPbfLayer.addTo(map);
