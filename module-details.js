var toTitle = require('./lib/to-title');
var processReadme = require('./lib/process-readme');
var callRegistry = require('./lib/call-registry');
var _ = require('underscore');


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
        var prev;
        data.title = readmeDetails.title || toTitle(data.name);
        data.html = readmeDetails.html;
        data.toc = readmeDetails.toc;
        data.npmlink = 'https://npmjs.org/package/' + data.name;
        data.releases = _.keys(data.versions).map(function (version) {
            var res = {
                version: version,
                diffurl: prev ? (data.homepage + '/compare/v' + prev + '...v' + version) : ''
            };
            prev = version;
            return res;
        }).reverse();
        cb(null, data);
    });
};
