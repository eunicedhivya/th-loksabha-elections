
// //all states
// var c = topojson.feature(mapshape, mapshape.objects.collection).features;

// //filter to one state
// var single = c.filter(function (d) {
// 	// console.log();
// 	return d.properties.ST_NAME === 'TN';
// })


function map_function(options){
	//Generate the svg container by targeting the html container
	var svg = d3.select(options["htmlElement"])
		.append("svg")
		.attr("class", "map")
		.attr("viewBox", "0 0 " + options.width + " " + options.height)
		.attr("preserveAspectRatio", "xMinYMin")
		.append("g")

	var projection = d3.geoMercator()
		.scale(options.scale)
		.center(options.center)
		.translate([options.width / 2, options.height / 2])

	var geoPath = d3.geoPath()
		.projection(projection)

			d3.json(options.map, function(error, mapshape){

				console.log("mapshapedata", mapshape)
				//geodata to create mapshapes
				var c = topojson.feature(mapshape, mapshape.objects.collection).features;
				
				var singleC = c.filter(function (d) {
					return d.properties.ST_NAME === 'TN';
				})
				console.log("filteredmapshapedata", singleC)

				//draw and enter map based on mapshape data
				svg.selectAll(".constituency")
					.data(c).enter().append("path")
					.attr("d", geoPath)
					.attr("class", "state")
					.attr('fill', "white")
					.attr('stroke', "#666")
					.attr('stroke-width', "0.5")
					.attr('stroke-opacity', "0.5")
					// .transition().duration(2000)

			}) //import map json file

}