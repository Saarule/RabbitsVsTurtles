import { useWeb3React } from "@web3-react/core";
import { connectors } from "./connectors";

export default function Modal({ isConnectWallet, setIsConnectWallet }) {
  const { activate } = useWeb3React();

  const setProvider = (type) => {
    window.localStorage.setItem("provider", type);
  };

  return (
    <div
      onClick={() => setIsConnectWallet(!isConnectWallet)}
      style={{
        position: "absolute",
        background: "white",
        width: "123px",
        zIndex: "1",
        top: "180px",
        borderRadius: "7px",
        alignItems: "center",
        justifyContent: "space-around",
        gap: "30px",
        display: "flex",
        flexDirection: "column",
        padding: "75px 68px",
        cursor: "normal",
        color: "black",
      }}
    >
      <div
        onClick={async() => {
            try{
                await activate(connectors.injected);
                console.log('try');
          setProvider("injected");
        } catch(err){
            console.log(err);
        }
        }}
      >
        Metamask
      </div>
      <div
        onClick={async () => {
            try{
                await activate(connectors.coinbaseWallet);
                setProvider("coinbaseWallet");
            } catch(err){
                console.log(err);
            }
        }}
      >
        Coinbase Wallet
      </div>
      <div
        onClick={() => {
          activate(connectors.walletConnect);
          setProvider("walletConnect");
        }}
      >
        WalletConnect
      </div>
    </div>
  );
}
