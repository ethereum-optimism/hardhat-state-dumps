const fs = require('fs')
const path = require('path')
const DIR = 'dumps'

module.exports = {}

const files = fs.readdirSync(DIR)

for (const name of files) {
  const p = path.join(__dirname, DIR, name)
  const file = require(p)
  module.exports[name] = file
}
