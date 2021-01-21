export * from './dump-generation/environment'
export * from './dump-generation/state-dump'
import { DumpEnvironment } from './dump-generation/environment'
import test00_BasicEnqueue from './dump-scripts/00-basic-enqueue'

const fs = require('fs')
const path = require('path')
const DIR = path.join(__dirname, '..', '..', 'dumps')

const files = fs.readdirSync(DIR)

for (const name of files) {
  const p = path.join(DIR, name)
  const file = require(p)
  module.exports[name] = file
}

export const tests: {
  name: string
  test: (env: DumpEnvironment) => Promise<void>
}[] = [].concat(test00_BasicEnqueue)
