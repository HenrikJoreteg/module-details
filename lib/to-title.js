// turns "ampersand-model" into "Ampersand Model"
module.exports =  function (string) {
    return separateWords(pascalize(string), ' ');
};


function separateWords(string, separator) {
    if (separator === undefined) {
        separator = '_';
    }
    return string.replace(/([a-z])([A-Z0-9])/g, '$1'+ separator +'$2');
}

function camelize(string) {
    string = string.replace(/[\-_\s]+(.)?/g, function(match, chr) {
        return chr ? chr.toUpperCase() : '';
    });
    // Ensure 1st char is always lowercase
    return string.replace(/^([A-Z])/, function(match, chr) {
        return chr ? chr.toLowerCase() : '';
    });
}

function pascalize(string) {
    return camelize(string).replace(/^([a-z])/, function(match, chr) {
        return chr ? chr.toUpperCase() : '';
    });
}
