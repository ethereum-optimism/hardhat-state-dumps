import { initEnvironment } from './dump-generation/environment'
import { exportHardhatStateDump } from './dump-generation/state-dump'
import test1 from './dump-scripts/00-basic-enqueue'

async function main() {
  for (const task of test1) {
    const env = await initEnvironment()
    console.log(`Running: ${task.name}`)
    await task.test(env)
    console.log(JSON.stringify(await exportHardhatStateDump(env.hre)))
  }
}

main()
