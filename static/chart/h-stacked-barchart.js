function single_HStackbar_function(options,  data) {
			
			var viewportWidth = options.width - options.margin.left - options.margin.right, viewportHeight = options.height - options.margin.top - options.margin.bottom;

			//Generate the svg container by targeting the html container
			var svg = d3.select(options["htmlElement"])
				.append("svg")
				.attr("class", "single-Hstackbar")
				.attr("viewBox", "0 0 " + options.width + " " + options.height)
				.attr("preserveAspectRatio", "xMinYMin")

			var viewport = d3.select(".single-Hstackbar")
					 .append("g")
					 .attr("transform", "translate("+ options.margin.left +","+ options.margin.top +")")

			var total = d3.sum(data, function(d){
				return d.total;					
			})


			var cumArray = [0,];
			var cumVal = 0;

			for(var i=0; i<data.length; i++){
				if (data[i].won>0){
					cumVal += parseInt(data[i].won);
					cumArray.push(cumVal)
				}
			}

			var xScale = d3.scaleLinear()
				.domain([0, total])
				.range([0, viewportWidth])

			viewport.selectAll('rect')
				.data(data).enter().append('rect')
    				.attr('class', abbrevate_function)
    				.attr('x', function(d,i){
    						return xScale(cumArray[i])	
    				})
    				.attr('y', function(d,i){
    					return viewportHeight/2 - 25
    				})
    				.attr('height', 30)
    				.attr('width', function(d,i){
    					return xScale(d.won)
    				})
    				.attr('stroke', 'black')
    				.attr('stroke-width', 0.1)


			viewport.selectAll('.stackvalue')
			    .data(data).enter().append('text')
				    .attr('class', 'stackvalue')
				    .attr('text-anchor', 'middle')
				    .attr('x', function(d,i){
				    	return xScale(cumArray[i]) + (xScale(d.won) / 2)
				    })
				    .attr('y', viewportHeight/2 - 5)
				    .text(function(d) {
					    return d.won
					})

			viewport.selectAll('.party-name')
			    .data(data).enter().append('text')
				    .attr('class', 'party-name')
				    .attr('text-anchor', 'middle')
				    .attr('x', function(d,i){
				    	return xScale(cumArray[i]) + (xScale(d.won) / 2)
				    })
				    .attr('y', viewportHeight + 10 )
				    .text(function(d) {
					    var str = d.party, matches = str.match(/\b(\w)/g),
					    acronym = matches.join('');
					    if(d.won != 0){
					        return acronym.replace(/[- )(]/g,'').toUpperCase()  ;
					    }
					})


		} // single_HStackbar_function