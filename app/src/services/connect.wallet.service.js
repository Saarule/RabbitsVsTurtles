import { getConnection } from "../connectors/utils";

export const Connect = async (connectionName, chainId) => {
    if(!chainId) chainId = 137;
    const connection = getConnection(connectionName);
    try{ 
      console.log('first');
      if(connection.connector.connectEagerly) await connection.connector.connectEagerly(chainId)
      await connection.connector.activate(chainId);
    } catch (err){
      console.log(err);
      try{
        console.log('second');
        await connection.connector.activate(chainId);
      } catch(err){
        console.log(err);
        return err
      }
    }
  };