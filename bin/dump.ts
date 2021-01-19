import * as fs from 'fs'
import * as path from 'path'
import mkdirp from 'mkdirp'
import { tests, initEnvironment, exportHardhatStateDump } from '../src'

async function main() {
  await mkdirp(path.resolve(__dirname, '../dumps'))

  for (const task of tests) {
    console.log(`Running task: ${task.name}`)

    const env = await initEnvironment()
    await task.test(env)

    console.log(`Saving task output...`)
    const dump = JSON.stringify(await exportHardhatStateDump(env.hre), null, 4)
    fs.writeFileSync(
      path.resolve(
        __dirname,
        '../dumps',
        `${task.name.replace(' ', '_')}.json`
      ),
      dump
    )
  }
}

main()
