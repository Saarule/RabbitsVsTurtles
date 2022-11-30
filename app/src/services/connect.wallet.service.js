import { getConnection } from "../connectors/utils";

export const Connect = async (connectionName, chainId) => {
    if(!chainId) chainId = 137;
    const connection = getConnection(connectionName);
    console.log(connection);
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