var request = require('request');


module.exports = function (moduleName, cb) {
    request('http://registry.npmjs.org/' + moduleName, function (err, res, body) {
        if (err) return cb(err);
        cb(null, JSON.parse(body));
    });
}
