
// //all states
// var c = topojson.feature(mapshape, mapshape.objects.collection).features;

// //filter to one state
// var single = c.filter(function (d) {
// 	// console.log();
// 	return d.properties.ST_NAME === 'TN';
// })


function map_function(options, data){
	var viewportWidth = options.width - options.margin.left - options.margin.right, viewportHeight = options.height - options.margin.top - options.margin.bottom;

			//Generate the svg container by targeting the html container
			var svg = d3.select(options["htmlElement"])
				.append("svg")
				.attr("class", "map")
				.attr("viewBox", "0 0 " + options.width + " " + options.height)
				.attr("preserveAspectRatio", "xMinYMin")
				.append("g")

			// Add a tooltip to visualization
	        var tooltip = d3.select('body').append('div')
	            .attr('class', 'hidden tooltipblock');

			var projection = d3.geoMercator()
				.scale(options.scale)
				.center(options.center)
				.translate([options.width / 2, options.height / 2])
			
			var geoPath = d3.geoPath()
				.projection(projection)

			d3.json(options.map, function(error, mapshape){

				//create hashmap
				var dataMap = {};
                data.forEach(function(d){
                  //refer to scrapped info
                  dataMap[d.constNo] = d;
                })


				function search(data){

				  $("#custom-search-input").append("<select class='search-dropdown'></select>");
				  $(".search-dropdown").append("<option>Select a constituency in Karnataka 2018</option>");

				  constituencyList.forEach(function(d){
				    $(".search-dropdown").append("<option value='" + d.value + "'>" + d.label + "</option>");
				  });

				  $(".search-dropdown").change(function(){
				  		var selectedValue = $(this).val();
				  		var selectPath = ".karnatakamap-2018 path.c" + selectedValue;
				    	var showPath = d3.select(selectPath).data();
				    	var pathPosition = $(selectPath).position();
				  		console.log("showPath", showPath[0].properties.AC_NO);
				  		showTooltip_Search(showPath[0], selectedValue)
				  });

				}//search

				var className = function(d, i){
					var fd = dataMap[d.properties.AC_NO];
                    var className = "constituency ";
                    if(fd !== undefined) {
                      //refer to scrapped info
                      className += "c" + fd.constNo + " ";
                      className += fd.leadingParty.match(/\b(\w)/g).join("").toLowerCase();
                    } else {
                      className = "empty-color";
                    }
                    return className;
				}


				function showTooltip_Search(data,Val){

				  	var selectPath = ".karnatakamap-2018 path.c" + Val;
				    var pathPosition = $(selectPath).position();
				    console.log(pathPosition)

					var showData = dataMap[data.properties.AC_NO];
					var html = '';
					if(showData !== undefined) {
	                    html = '<p><b>'+ showData.constituency +'</b></p>';
						html += '<hr>';
						html += '<p><b>Leading:</b> '+ showData.leadingCandidate +' ('+ showData.leadingParty + ')</p>';
						html += '<p><b>Trailing:</b> '+ showData.trailingCandidate +' ('+ showData.trailingParty + ')</p>';
						html += '<p><b>Margin:</b> '+ showData.margin + '</p>';

                    } else {
                        html = "Constituency Name: " + d.properties.AC_NAME; 
                    }

                    tooltip.classed('hidden', false)
                          .html(html)
                          .style("left", (pathPosition.left + 50) + "px")
                          .style("top", (pathPosition.top + 20) +  "px") 

				}



				function mousemove_function(d,i){
					
					var showData = dataMap[d.properties.AC_NO];
					var html = '';
					if(showData !== undefined) {
	                    html = '<p><b>'+ showData.constituency +'</b></p>';
						html += '<hr>';
						html += '<p><b>Leading:</b> '+ showData.leadingCandidate +' ('+ showData.leadingParty + ')</p>';
						html += '<p><b>Trailing:</b> '+ showData.trailingCandidate +' ('+ showData.trailingParty + ')</p>';
						html += '<p><b>Margin:</b> '+ showData.margin + '</p>';

                    } else {
                        html = "Constituency Name: " + d.properties.AC_NAME; 
                    }

                    tooltip.classed('hidden', false)
                          .html(html)
                          .style("left", (d3.event.pageX + 10) + "px")
                          .style("top", d3.event.pageY + "px") 

				}

				var mouseout_function = function(d){
					tooltip.classed('hidden', true)
				}

				//Enable Select options
				if(options.search === true){
                	search(dataMap)	
				}

				//geodata to create mapshapes
				var c = topojson.feature(mapshape, mapshape.objects.collection).features;

				//draw and enter map based on mapshape data
				svg.selectAll(".constituency")
				.data(c).enter().append("path")
				.attr("d", geoPath)
				.attr("class", className)
				.attr('fill', "white")
				.attr('stroke', "#666")
				.attr('stroke-width', "0.5")
				.attr('stroke-opacity', "0.5")
				.on("mouseover", mousemove_function)
				.on("mouseout", mouseout_function) 

			})

}