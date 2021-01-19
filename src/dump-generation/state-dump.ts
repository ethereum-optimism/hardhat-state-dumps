const {
  HardhatBlockchain,
} = require('hardhat/internal/hardhat-network/provider/HardhatBlockchain')
import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { getHreInternals } from './environment'
import Block from 'ethereumjs-block'

export interface HardhatStateDump {
  genesis: any
  blocks: any[]
}

export const exportHardhatStateDump = async (
  hre: HardhatRuntimeEnvironment
): Promise<HardhatStateDump> => {
  const { blockchain, vm } = getHreInternals(hre)

  const blocks = [...(blockchain as any)._data._blocksByNumber].map(
    ([_, block]) => {
      return block.toJSON(true)
    }
  ).slice(1)

  return {
    genesis: (vm as any)._common._chainParams.genesis,
    blocks,
  }
}

export const importHardhatStateDump = async (
  hre: HardhatRuntimeEnvironment,
  dump: HardhatStateDump
): Promise<void> => {
  await hre.network.provider.request({
    method: 'hardhat_reset',
    params: [],
  })

  const { node } = getHreInternals(hre)

  ;(node as any)._blockchain = new HardhatBlockchain()
  ;(node as any)._vm._common._chainParams.genesis = dump.genesis

  const genesisBlock = new Block(null, { common: (node as any)._vm._common })
  genesisBlock.setGenesisParams()
  await (node as any)._blockchain.addBlock(genesisBlock)

  for (const block of dump.blocks) {
    const result = await (node as any)._vm.runBlock({
      block: new Block(block, {
        common: (node as any)._vm._common,
      }),
      generate: true,
      skipBlockValidation: true,
    })

    await (node as any)._saveBlockAsSuccessfullyRun(block, result)
  }
}
