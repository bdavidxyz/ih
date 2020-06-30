const fs = require('fs')
 
let manifestJSON = {}
fs.readdirSync('./public/packs/')
  .filter((fileName) => fileName.indexOf('manifest-') === 0)
  .forEach(fileName => {
    manifestJSON = Object.assign(
      manifestJSON,
      JSON.parse(fs.readFileSync(`./public/packs/${fileName}`, 'utf8'))
    )
})
 
fs.writeFileSync('./public/packs/manifest.json', JSON.stringify(manifestJSON))
