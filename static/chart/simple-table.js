function tabulate(options, data) {
    // console.log("tabulate", data)
                      var table = d3.select(options.htmlElement).append('table')
                      var thead = table.append('thead')
                      var   tbody = table.append('tbody');

                      // append the header row
                      thead.append('tr')
                         .selectAll('th')
                         .data(options.labels).enter()
                         .append('th')
                         .text(function (column) {
                               return column;
                          });

                        // create a row for each object in the data
                        var rows = tbody.selectAll('tr')
                            .data(data)
                            .enter()
                            .append('tr')
                            .attr("class", function(d){
                                var str = d.party;
                                var matches = str.match(/\b(\w)/g);
                                var acronym = matches.join('');
                                return acronym.replace(/[- )(]/g,'').toLowerCase();
                            });

                        // create a cell in each row for each column
                        var cells = rows.selectAll('td')
                             .data(function (row) {
                                 return options.labels.map(function (column) {
                                          if(column == "party"){
                                            var info = row[column]

                                           if(partyShortCodesList[info] !== undefined) {
                                              row[column] = partyShortCodesList[info];
                                            } else {
                                              row[column] = row[column].match(/\b(\w)/g).join("");
                                            }

                                          } //if column == party
                                          return {column: column, value: row[column]};
                                      }); //return columns.map

                              })
                             .enter()
                             .append('td')
                             .text(function (d) {
                                  return d.value;
                                });
                                //  return table;

                                 cells.append("span")
                                 return table;
                    }


                                // render the table(s)
                    