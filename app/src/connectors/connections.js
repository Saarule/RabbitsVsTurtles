import { CoinbaseWallet } from '@web3-react/coinbase-wallet'
import { initializeConnector } from '@web3-react/core'
import { MetaMask } from '@web3-react/metamask'
import { Network } from '@web3-react/network'
import { WalletConnect } from '@web3-react/walletconnect'

export const ConnectionType = {
  INJECTED : 'MetaMask',
  COINBASE_WALLET : 'CoinbaseWallet',
  WALLET_CONNECT : 'WalletConnect',
  NETWORK : 'Network',
  GNOSIS_SAFE : 'GNOSIS_SAFE',
}

const INFURA_KEY = '0d9bcb9c917745aeb37f0cb0283b203d'

function onError(error) {
  console.debug(`web3-react error: ${error}`)
}

const [web3Network, web3NetworkHooks] = initializeConnector(
  (actions) => new Network({ actions, urlMap: {137:['https://polygon-mainnet.infura.io/v3/0d9bcb9c917745aeb37f0cb0283b203d',
]}, defaultChainId: 137 })
)

export const networkConnection = {
  connector: web3Network,
  hooks: web3NetworkHooks,
  type: ConnectionType.NETWORK,
}

const [web3Injected, web3InjectedHooks] = initializeConnector((actions) => new MetaMask({ actions, onError }))
export const injectedConnection = {
  connector: web3Injected,
  hooks: web3InjectedHooks,
  type: ConnectionType.INJECTED,
}

const [web3WalletConnect, web3WalletConnectHooks] = initializeConnector(
  (actions) =>
    new WalletConnect({
      actions,
      options: {
        rpc: {137: [`https://polygon-mainnet.infura.io/v3/0d9bcb9c917745aeb37f0cb0283b203d`]},
        qrcode: true,
        infuraId: '0d9bcb9c917745aeb37f0cb0283b203d'
      },
      onError,
    })
)
export const walletConnectConnection = {
  connector: web3WalletConnect,
  hooks: web3WalletConnectHooks,
  type: ConnectionType.WALLET_CONNECT,
}

const [web3CoinbaseWallet, web3CoinbaseWalletHooks] = initializeConnector(
  (actions) =>
    new CoinbaseWallet({
      actions,
      options: {
        url: `https://polygon-mainnet.infura.io/v3/0d9bcb9c917745aeb37f0cb0283b203d`,
        appName: 'RabbitVsTurtle',
        reloadOnDisconnect: false,
      },
      onError,
    })
)
export const coinbaseWalletConnection = {
  connector: web3CoinbaseWallet,
  hooks: web3CoinbaseWalletHooks,
  type: ConnectionType.COINBASE_WALLET,
}
