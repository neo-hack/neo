const fs = require('fs')
const path = require('path')

fs.readFile(path.resolve(__dirname, './content.js'), (err, data) => {
  fs.writeFileSync(path.resolve(__dirname, './content'), '#!/usr/bin/env node\n' + data.toString())
})
