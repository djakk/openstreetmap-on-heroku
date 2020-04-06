var map = L.map('the_map').setView([48.11836, -1.68727], 18); // Anatole France street, Rennes, Brittany
//var map = L.map('the_map').setView([6126568.36, -187826.04], 18);
/*
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
*/
/*
L.marker([51.5, -0.09]).addTo(map)
    .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
    .openPopup();*/


var vectorTileStyling = {

	my_lines: {	// mapbox & nextzen only
		weight: 1,
		fillColor: '#f2b648',
		color: '#f2b648',
		fillOpacity: 0.2,
		opacity: 0.4, 
	     fill: true,
	     fillColor: 'green',
	     fillOpacity: 0.25,
	     stroke: true,
	     color: 'green',
	     weight: 1
	}
};



// debug via interactive: true : thanks to 
// https://ubuntuplace.info/questions/474866/styling-geoserver-pbf-vector-tiles-in-leaflet?__cf_chl_jschl_tk__=cb53ac9904c11ad6e9a4f7fd28d81c88e8d2240b-1586181431-0-Ab1Mb6fHtxZpdRaENjjIeIGcLj0TCfP-34e2hPFMYYqkLyruuxCPlCULL0s4whdU5A9vvV6RqkA5Q9qHTaqpRwIuPaU9QUzuLZqZNPmEp0_nxQ8vwUzQwjKHQi12t5xgdkcFtRgBjOP9l3k_a6qv_-WhFcntYcro_NsPcjY2J5JodYUnfcPrDOaAM1KkCoSyhlxz0WJKwxR1QjhlzhEOo7e0YEAdE3PlTKWyKei1bll2UcQw4uTqW1xn6ncKXujKsUuF93W7zWZcWF4E7UNxMfZGcUWBO-BZAIZ7adeJtOct_yoRJ3WPcwUITl6CoJJ5CwvK8CKOnVpQTogFIrlBtVZ1gn-54Q8R2XkuPfiEyMb9
var mapboxUrl = "https://openstreetmap-on-heroku.herokuapp.com/{z}/{x}/{y}.mvt";
var mapboxVectorTileOptions = {
			rendererFactory: L.svg.tile,
			attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://www.mapbox.com/about/maps/">MapBox</a>', 
			vectorTileLayerStyles: vectorTileStyling, 
	                interactive: true, pane: 'OverlayPane'
};
var mapboxPbfLayer = L.vectorGrid.protobuf(mapboxUrl, mapboxVectorTileOptions).on('click',function(e) {
    console.log(e.layer);
    L.DomEvent.stop(e);
};
mapboxPbfLayer.addTo(map);
