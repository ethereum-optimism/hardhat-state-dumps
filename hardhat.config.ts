import { HardhatUserConfig } from 'hardhat/types'
import { defaultPath } from '@ethersproject/hdnode'

// Plugins
import '@nomiclabs/hardhat-ethers'

const DEFAULT_MNEMONIC =
  'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about'
const mnemonic = process.env.MNEMONIC || DEFAULT_MNEMONIC

const config: HardhatUserConfig = {
  solidity: '0.7.3',
  networks: {
    hardhat: {
      accounts: {
        mnemonic,
        path: defaultPath,
        count: 5,
      },
    },
  },
}

export default config
