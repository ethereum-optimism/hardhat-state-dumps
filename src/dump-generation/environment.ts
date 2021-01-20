import { HardhatRuntimeEnvironment } from 'hardhat/types'
import VM from '@nomiclabs/ethereumjs-vm'
import { Contract } from 'ethers'
import { getContractFactory } from '@eth-optimism/contracts'

export interface DumpEnvironment {
  hre: HardhatRuntimeEnvironment
  contracts: {
    [name: string]: Contract
  }
}

export const initEnvironment = async (
  hre: HardhatRuntimeEnvironment
): Promise<DumpEnvironment> => {
  await hre.network.provider.request({
    method: 'hardhat_reset',
    params: [],
  })

  const [signer1] = await (hre as any).ethers.getSigners()

  const factory__Lib_AddressManager = getContractFactory(
    'Lib_AddressManager',
    signer1
  )
  const Lib_AddressManager = await factory__Lib_AddressManager.deploy()

  const factory__OVM_ChainStorageContainer = getContractFactory(
    'OVM_ChainStorageContainer',
    signer1
  )
  const OVM_ChainStorageContainer__ctc__queue = await factory__OVM_ChainStorageContainer.deploy(
    Lib_AddressManager.address,
    'OVM_CanonicalTransactionChain'
  )

  await Lib_AddressManager.setAddress(
    'OVM_ChainStorageContainer:CTC:queue',
    OVM_ChainStorageContainer__ctc__queue.address
  )

  const factory__OVM_CanonicalTransactionChain = getContractFactory(
    'OVM_CanonicalTransactionChain',
    signer1
  )
  const OVM_CanonicalTransactionChain = await factory__OVM_CanonicalTransactionChain.deploy(
    Lib_AddressManager.address,
    600,
    40,
    9000000
  )

  await Lib_AddressManager.setAddress(
    'OVM_CanonicalTransactionChain',
    OVM_CanonicalTransactionChain.address
  )

  return {
    hre,
    contracts: {
      Lib_AddressManager,
      OVM_ChainStorageContainer__ctc__queue,
      OVM_CanonicalTransactionChain,
    },
  }
}

export const getHreInternals = (
  hre: HardhatRuntimeEnvironment
): {
  provider: any
  node: any
  blockchain: any
  vm: VM
} => {
  const provider = (hre.network.provider as any)._wrapped._wrapped._wrapped
    ._wrapped
  const node = (provider as any)._node
  const blockchain = (node as any)._blockchain
  const vm: VM = (node as any)._vm

  return {
    provider,
    node,
    blockchain,
    vm,
  }
}
