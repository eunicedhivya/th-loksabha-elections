
// //all states
// var c = topojson.feature(mapshape, mapshape.objects.collection).features;

// //filter to one state
// var single = c.filter(function (d) {
// 	// console.log();
// 	return d.properties.ST_NAME === 'TN';
// })
function getStateCode() {
	var selectedValue = document.getElementById("showbystate").value;
	console.log(selectedValue)
	map_function(loksabha_2019, selectedValue);
}

function getStateInfo(criteria) {
	return stateInfo.filter(function (obj) {
		return obj.STATE_CODE === criteria;
	})
}

function map_function(options, chosenstate){
	//Empty container
	d3.select(options["htmlElement"]).html(null)

	//Generate the svg container by targeting the html container
	var svg = d3.select(options["htmlElement"])
		.append("svg")
		.attr("class", "map")
		.attr("viewBox", "0 0 " + options.width + " " + options.height)
		.attr("preserveAspectRatio", "xMinYMin")
		.append("g")

	//Get latlong, scale info of chosenstate
	var chosenStateInfo = getStateInfo(chosenstate);

	//Enter latlong, scale info of chosenstate
	var projection = d3.geoMercator()
		.scale(chosenStateInfo[0]['SCALE'])
		.center(chosenStateInfo[0]['CENTER'])
		.translate([options.width / 2, options.height / 2])

	var geoPath = d3.geoPath()
		.projection(projection)


	d3.json(options.map, function (error, mapshape) {
		var allConstShape = topojson.feature(mapshape, mapshape.objects.collection).features;
		var chosenStateShapes;
		if (chosenstate !== "IN"){
			var chosenStateShapes = allConstShape.filter(function (d) {
				return d.properties.ST_NAME === chosenstate;
			})
		}else{

			chosenStateShapes = allConstShape
		}

		//draw and enter map based on mapshape data
		svg.selectAll(".constituency")
			.data(chosenStateShapes).enter().append("path")
			.attr("d", geoPath)
			.attr("class", "state")
			.attr('fill', "white")
			.attr('stroke', "#666")
			.attr('stroke-width', "0.5")
			.attr('stroke-opacity', "0.5")

	});


}