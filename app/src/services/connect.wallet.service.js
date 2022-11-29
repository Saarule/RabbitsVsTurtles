import { useWeb3React } from "@web3-react/core";
import { getConnection } from "../connectors/utils";



// export const connectToWallet = async (connectionName) => {
//     const connection = getConnection(connectionName);
//     try{ 
//       console.log(connection);
//       await connection.connector.activate(137);
//     } catch (err){
//       console.log(err);
//       return err
//     }
// };

export const Connect = async (connectionName, chainId) => {
    if(!chainId) chainId = 137;
    const connection = getConnection(connectionName);
    try{ 
      if(connection.connector.connectEagerly)await connection.connector.connectEagerly(chainId)
      await connection.connector.activate(chainId);
    } catch (err){
      console.log(err);
      try{
        await connection.connector.activate(chainId);
      } catch(err){
        console.log(err);
        return err
      }
    }
  };