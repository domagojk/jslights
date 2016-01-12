/* */ 
var dust = require('../node_modules/dustjs-linkedin');
var fs = require('fs');
dust.helper = require('../node_modules/dustjs-helpers');
fs.readFile('docs/api.dust.js', function(err, data) {
  if (err) {
    throw err;
  }
  dust.loadSource(data);
  fs.readFile('docs/data.json', function(err, rawJSON) {
    if (err) {
      throw err;
    }
    var raw = JSON.parse(rawJSON);
    var data = [];
    for (var i = 0; i < raw.length; i += 1) {
      if (!raw[i].isPrivate && !raw[i].ignore) {
        data.push(raw[i]);
      }
    }
    dust.render('api', data, function(err, out) {
      if (err) {
        throw err;
      }
      fs.writeFile('docs/api.md', out);
    });
  });
});
