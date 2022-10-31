import {injectedConnection, networkConnection, walletConnectConnection, coinbaseWalletConnection, ConnectionType} from './connections'

export function getIsInjected() {
  return Boolean(window.ethereum);
}

export function getIsMetaMask() {
  return window.ethereum?.isMetaMask ?? false;
}

export function getIsCoinbaseWallet() {
  return window.ethereum?.isCoinbaseWallet ?? false;
}

const CONNECTIONS = [
  injectedConnection,
  coinbaseWalletConnection,
  walletConnectConnection,
  networkConnection,
];

export function getConnection(c) {
    switch (c) {
      case ConnectionType.INJECTED:
        return injectedConnection;
      case ConnectionType.COINBASE_WALLET:
        return coinbaseWalletConnection;
      case ConnectionType.WALLET_CONNECT:
        return walletConnectConnection;
      case ConnectionType.NETWORK:
        return networkConnection;
    }
//   }
}

export function getConnectionName(connectionType, isMetaMask) {
  switch (connectionType) {
    case ConnectionType.INJECTED:
      return isMetaMask ? "MetaMask" : "Injected";
    case ConnectionType.COINBASE_WALLET:
      return "Coinbase Wallet";
    case ConnectionType.WALLET_CONNECT:
      return "WalletConnect";
    case ConnectionType.NETWORK:
      return "Network";
    case ConnectionType.GNOSIS_SAFE:
      return "Gnosis Safe";
  }
}
