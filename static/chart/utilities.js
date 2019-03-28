
function getStateCode() {
    var selectedValue = document.getElementById("showbystate").value;
    // console.log(selectedValue)

    // FIlter constituency list data based on chosen date
    var filteredConstList = filterConstList(selectedValue)
    // FIlter Party list data based on chosen date
    var filteredPartyList = filterPartyList(selectedValue)
    console.log(filteredPartyList)

    //Generate Constituency dropdown list based on the state displayed 
    createDropdownsConst('#const-list-dropdown', filteredConstList, 'searchByConst(event);', "PC_CODE", "PC_NAME", "ST_NAME");
   
    //Generate Parties dropdown list based on the state displayed 
    createDropdownsParties('#party-list-dropdown', filteredPartyList, 'searchByParties(event);', "PARTY_NAME")
    
    // Re-draw the map based on the chosen State
    map_function(loksabha_2019, selectedValue, data2014);
}

function getStateInfo(criteria) {
    return stateInfo.filter(function (obj) {
        return obj.STATE_CODE === criteria;
    })
}

// Constituency Drop down list selection triggers this function
function searchByConst(e){
    // console.log(e.target.selectedOptions[0].dataset)

    var selectedConstState = e.target.selectedOptions[0].dataset.state;
    var selectedConstNo = parseInt(e.target.selectedOptions[0].dataset.pcno);


    d3.selectAll(".map path").attr("fill-opacity", "0.1")
    d3.selectAll(".map path").attr("stroke-opacity", "0.1")
    d3.select(".c" + selectedConstNo + "." + selectedConstState.toLowerCase()).attr('fill-opacity', "1")

    var fd = data2014.filter(function (dataobj, i) {
        return dataobj.constNo === selectedConstNo && dataobj.stateCode === selectedConstState;
    })

    // console.log('fd',fd[0])
    d3.select('div.tooltipblock').style('display', 'block')

    var html = '';
    if (fd.length > 0) {
        if (fd[0]['constituencyName'] !== undefined) {
            html = '<p><b>' + fd[0]['constituencyName'] + '</b></p>';
            html += '<hr>';
            html += '<p><b>Leading:</b> ' + fd[0]['leadingCandidate'] + ' (' + fd[0]['leadingParty'] + ')</p>';
            html += '<p><b>Trailing:</b> ' + fd[0]['trailingCandidate'] + ' (' + fd[0]['trailingParty'] + ')</p>';
            html += '<p><b>Margin:</b> ' + fd[0]['margin'] + '</p>';

        } else {

        }
    } else {
        html = '<p><b>' + d.properties.PC_NAME; + '</b></p>';
    }

    d3.select('#clickedcontent').html(html)


} // end searchByConst(e)

function searchByParties(e){
    console.log(e.target.selectedOptions[0].dataset)
    // // var selectedValue = document.getElementById("searchbyconst").value;
    // var selectedConstState = e.target.selectedOptions[0].dataset.state;
    // var selectedConstNo = parseInt(e.target.selectedOptions[0].dataset.pcno);
    var selectedPartyname = e.target.selectedOptions[0].dataset.party;

    // // const article = document.querySelector('#showbyconst option');

    // console.log('selectedPartyname', selectedPartyname)

    // // d3.selectAll(".map path").attr("class", "empty-color")
    d3.selectAll(".map path").attr("fill-opacity", "0.1")
    d3.selectAll(".map path").attr("stroke-opacity", "0.1")
    d3.selectAll("." + selectedPartyname).attr('fill-opacity', "1")


    var fd = data2014.filter(function(d,i){
        return d.leadingParty;
    });

    console.log(fd)


    // // console.log('fd',fd[0])
    // d3.select('div.tooltipblock').style('display', 'block')

    // var html = '';
    // if (fd.length > 0) {
    //     if (fd[0]['constituencyName'] !== undefined) {
    //         html = '<p><b>' + fd[0]['constituencyName'] + '</b></p>';
    //         html += '<hr>';
    //         html += '<p><b>Leading:</b> ' + fd[0]['leadingCandidate'] + ' (' + fd[0]['leadingParty'] + ')</p>';
    //         html += '<p><b>Trailing:</b> ' + fd[0]['trailingCandidate'] + ' (' + fd[0]['trailingParty'] + ')</p>';
    //         html += '<p><b>Margin:</b> ' + fd[0]['margin'] + '</p>';

    //     } else {

    //     }
    // } else {
    //     html = '<p><b>' + d.properties.PC_NAME; + '</b></p>';
    // }

    // d3.select('#clickedcontent').html(html)


} // end searchByParties(e)


function createDropdownsState(selection, ddData, callFunc, val, name) {
    d3.select(selection).html(null);
    var select = d3.select(selection)
        .append('select')
        .attr('class', 'select')
        .attr('onchange', callFunc)
        .attr('id', 'showbystate')

    var options = select
        .selectAll('option')
        .data(ddData).enter()
        .append('option')
        .attr("value", function (d) { return d[val]; })
        .text(function (d) { return d[name]; });
}

function createDropdownsParties(selection, ddData, callFunc, partyname) {
    d3.select(selection).html(null);
    console.log("parties are active")
    var select = d3.select(selection)
        .append('select')
        .attr('class', 'select')
        .attr('onchange', callFunc)
        .attr('id', 'showbystate')

    var options = select
        .selectAll('option')
        .data(ddData).enter()
        .append('option')
        .attr("data-party", function (d) { return d[partyname].toLowerCase(); })
        .text(function (d) { return d[partyname]; });
}

function createDropdownsConst(selection, ddData, callFunc, val, name, state) {
    d3.select(selection).html(null);
    var select = d3.select(selection)
        .append('select')
        .attr('class', 'select')
        .attr('onchange', callFunc)
        .attr('id', 'searchbyconst')

    var options = select
        .selectAll('option')
        .data(ddData).enter()
        .append('option')
        .attr("data-state", function (d) { return d[state]; })
        .attr("data-pcno", function (d) { return d[val]; })
        .attr("value", function (d) { return d[state]; })
        .text(function (d) { return d[name]; });
}

function filterConstList(statename) {
    return allConstList.filter(function (obj) {
        return obj["ST_NAME"] === statename;
    })
}

function filterPartyList(statename) {
    return allPartiesList.filter(function (obj) {
        return obj["ST_NAME"] === statename;
    })
}


$("#closeButton").click(function () {
    // $(".tooltipblock").addClass("hidden tooltipblock");
    d3.select('div.tooltipblock').style('display', 'none')
    d3.selectAll(".map path").attr("fill-opacity", "1")
    d3.selectAll(".map path").attr("stroke-opacity", "1")
});