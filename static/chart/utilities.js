var abbrevate_function = function(d) {
    var str = d.party, matches = str.match(/\b(\w)/g),
    acronym = matches.join('');
    if(d.won != 0){
        return acronym.replace(/[- )(]/g,'').toLowerCase();
    }
}