import { DumpEnvironment } from 'src/dump-generation/environment'

const sizes = [1, 2, 4, 8, 16, 32]

export default sizes.map((size) => {
  return {
    name: `${size} enqueues`,
    test: async (env: DumpEnvironment) => {
      for (let i = 0; i < size; i++) {
        await env.contracts.OVM_CanonicalTransactionChain.enqueue(
          '0x' + '11'.repeat(20),
          8000000,
          '0x' + '12'.repeat(32) + '34'.repeat(32)
        )
      }
    },
  }
})
