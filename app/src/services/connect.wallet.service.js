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

export const connect = async (connectionName) => {
    const connection = getConnection(connectionName);
    try{ 
      if(connection.connector.connectEagerly)await connection.connector.connectEagerly(137)
      await connection.connector.activate(137);
    } catch (err){
      console.log(err);
      try{
        await connection.connector.activate(137);
      } catch(err){
        console.log(err);
        return err
      }
    }
  };