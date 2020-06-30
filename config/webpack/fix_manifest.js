const fs = require('fs');
fs.readFile('./public/packs/manifest.json', 'utf8', function (err, data) {
  try {
    JSON.parse(data);
  } catch (e) {
    // Replace the first instance of `}` with `,`
    var corruptJSON = JSON.stringify(data);
    var validJSON = corruptJSON.replace('}', ',');
    fs.writeFile('./public/packs/manifest.json', JSON.parse(validJSON), function(err) {
      if (err) console.log(err);
    });
  }
});
