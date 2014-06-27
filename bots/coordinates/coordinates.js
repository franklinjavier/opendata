"use strict";

phantom.injectJs('BR-SP.js');

var Webpage = require('webpage'),
	page = {},
	coordinates = mapaSP.features,
	i,
	fs = require('fs'),
	file,
	str,
	links = 0,
	url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=",
	lat = function(coords) {
		var X = 0,
			len = coords.length;
		for (i in coords) {
			X = X + coords[i][1];
		}
		return X / len;
	},
	lon = function(coords) {
		var Y = 0,
			len = coords.length;
		for (i in coords) {
			Y = Y + coords[i][0];
		}
		return Y / len;
	},
	saveFile = function() {
		file = JSON.stringify(mapaSP);

		try {
			fs.write("coordinates.json", file, 'w');
		} catch (e) {
			console.log(e);
		}
	};

for (i in coordinates) {
	var c = coordinates[i].geometry.coordinates,
		api = url + lat(c) + ',' + lon(c),
		p = Webpage.create();

	page[i] = p;

	if (typeof mapaSP.features[i] !== 'undefined') {
		if (typeof mapaSP.features[i].properties !== 'undefined') {
			mapaSP.features[i].properties.center = [lat(c), lon(c)];

			p.open(api, function(status) {

				if (coordinates.length === links) {
					saveFile();
					phantom.exit();
				}

			});

		}
	}

	links++;

}