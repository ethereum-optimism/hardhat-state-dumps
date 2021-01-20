import 'hardhat/types/config'

declare module 'hardhat/types/config' {
  interface HardhatUserConfig {
    dump?: string
  }

  interface HardhatConfig {
    dump?: string
  }
}
