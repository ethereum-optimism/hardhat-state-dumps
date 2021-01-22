export * from './dump-generation/environment'
export * from './dump-generation/state-dump'
import { DumpEnvironment } from './dump-generation/environment'
import test00_BasicEnqueue from './dump-scripts/00-basic-enqueue'

export const tests: {
  name: string
  test: (env: DumpEnvironment) => Promise<void>
}[] = [].concat(test00_BasicEnqueue)
