import { HardhatUserConfig } from "hardhat/types"
import { defaultPath } from '@ethersproject/hdnode'

// Plugins
import '@nomiclabs/hardhat-ethers'

let mnemonic = process.env.MNEMONIC;
if (typeof mnemonic === 'undefined') {
  mnemonic = 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about'
}

const config: HardhatUserConfig = {
  solidity: "0.7.3",
  networks: {
    hardhat: {
      accounts: {
        mnemonic,
        path: defaultPath,
        count: 5,
      }
    }
  }
}

export default config
