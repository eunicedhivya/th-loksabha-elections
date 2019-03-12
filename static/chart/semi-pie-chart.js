function buildSemiPie(options, data){	
			
	var radius = options.width/2;

	var svg = d3.select(options.htmlElement).append("svg")
		.attr("viewBox", "0 0 " + options.width + " " + options.height)
		.attr("preserveAspectRatio", "xMinYMin")
		.append("g")
		.attr("transform", "translate("+ options.width/2 +","+ options.height +")")

	//Arc generator
	var arc = d3.arc()
        .outerRadius(radius - 10)
        .innerRadius(options.donut);

    //Arc for Label generator
	var labelArc = d3.arc()
        .outerRadius(radius - 50)
        .innerRadius(radius - 50);

	//Pie Generator
	var pie = d3.pie()
        .sort(null)
        .value(function(d) {
        	return d.total;
        })
        .startAngle(-90 * (options.pi/180))
          .endAngle(90 * (options.pi/180));

        data.forEach(function(d){
            d.party = d.party
            d.allianceName = d.allianceName
            d.total = +d.total
            d.grandTotal = +d.grandTotal
            d.leading = +d.leading
            d.won = +d.won
        })

        var g = svg.selectAll(".arc")
            .data(pie(data))
            .enter().append("g")
            .attr("class", "arc")

        g.append("path")
            .attr("d", arc)
            .attr("fill", "blue")
            .attr("class", function(d){
                var str = d.data.party, matches = str.match(/\b(\w)/g), acronym = matches.join('');
                    return acronym.replace(/[- )(]/g,'').toLowerCase()
            })
            .attr("stroke", "#666")

        g.append("text")
            .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
              .attr("dy", ".35em")
              .attr("font-size", "2em")
              .text(function(d) { 
                    return d.data.total;
               });


}//buildSemiPie