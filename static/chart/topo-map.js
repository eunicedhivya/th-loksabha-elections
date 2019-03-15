
function getStateCode() {
	var selectedValue = document.getElementById("showbystate").value;
	console.log(selectedValue)
	map_function(loksabha_2019, selectedValue, data2014);
}

function getStateInfo(criteria) {
	return stateInfo.filter(function (obj) {
		return obj.STATE_CODE === criteria;
	})
}

function map_function(options, chosenstate, mapdata){
	var filteredData;

	function filterStatewiseData(criteria) {
		return mapdata.filter(function (obj) {
			return obj.stateCode === criteria;
		})
	}

	//show data based on chosenstate
	if(chosenstate === "IN"){
		filteredData = mapdata;
	}else{
		filteredData = filterStatewiseData(chosenstate);
	}

	console.log(filteredData)
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
var j =0;
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
			.attr("class", function(d,i){
				// console.log(i, d.properties.ST_NAME, d.properties.PC_CODE)
				var fd = mapdata.filter(function (dataobj) {
					return dataobj.constNo === d.properties.PC_CODE && dataobj.stateCode === d.properties.ST_NAME;
				})
				console.log("fd", fd)
				var className ;
				if (fd.length > 0){
					if (fd[0]['constituencyName'] !== undefined) {
						//refer to scrapped info
						j++
						console.log(fd[0]['constituencyName'],j)
						className += "cno" + fd[0]['constNo'] + " ";
						className += "sc" + d.properties.ST_NAME + " ";
						className += "sc" + fd[0]['constituencyName'] + " ";
					} else {
						console.log("Constituency name undefined")
						className = "empty-color";
					}
				}else{
					console.log("Constituency name undefined", j++)
					className = "empty-color";
				}
				return className
			})
			.attr('fill', "white")
			.attr('stroke', "#666")
			.attr('stroke-width', "0.5")
			.attr('stroke-opacity', "0.5")

	});


}