var toTitle = require('./lib/to-title');
var processReadme = require('./lib/process-readme');
var callRegistry = require('./lib/call-registry');


module.exports = function (moduleName, options, cb) {
    // make second arg optional
    if (typeof options === 'function') {
        cb = options;
        options = {};
    }

    var settings = {
        sectionsToRemove: [],
        hideFirstHeading: true
    }

    // apply options
    for (item in options) {
        if (settings.hasOwnProperty(item)) settings[item] = options[item];
    }

    // get our data
    callRegistry(moduleName, function (err, data) {
        if (err) return cb(err);
        var readmeDetails = processReadme(data, settings);
        data.title = readmeDetails.title || toTitle(data.name);
        data.html = readmeDetails.html;
        data.toc = readmeDetails.toc;
        cb(null, data);
    });
};
