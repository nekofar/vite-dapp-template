//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Counter
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe789E1d1D0833bC93d76a258aB90DC06674948a5)
 */
export const counterAbi = [
  {
    type: 'function',
    inputs: [],
    name: 'increment',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'number',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'newNumber', internalType: 'uint256', type: 'uint256' }],
    name: 'setNumber',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

/**
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe789E1d1D0833bC93d76a258aB90DC06674948a5)
 */
export const counterAddress = {
  11155111: '0xe789E1d1D0833bC93d76a258aB90DC06674948a5',
} as const

/**
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xe789E1d1D0833bC93d76a258aB90DC06674948a5)
 */
export const counterConfig = {
  address: counterAddress,
  abi: counterAbi,
} as const
