import * as fs from 'fs'
import { task } from 'hardhat/config'
import { TASK_NODE_SERVER_READY } from 'hardhat/builtin-tasks/task-names'

import './types'
import { importHardhatStateDump } from '../dump-generation/state-dump'

task(TASK_NODE_SERVER_READY, async (args, hre, runSuper) => {
  if (hre.config.dump) {
    await importHardhatStateDump(
      hre,
      JSON.parse(fs.readFileSync(hre.config.dump).toString())
    )
  }

  await runSuper(args)
})
