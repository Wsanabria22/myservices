import { connect, connection } from 'mongoose';

let isConnected: boolean = false;

export const connectToDB = async () => {

  if (isConnected) {
    console.log('MongoDB is alrady connected')
    return
  }

  try {
    const {MONGODB_URI} = process.env;
    console.log('MONGODB_URI',MONGODB_URI)
    if (!MONGODB_URI) throw Error('MONGODB_URI bust be defined');
    const db = await connect(MONGODB_URI, {dbName: 'my_services'})
    isConnected = true;
    console.log('MongoDB is Connected');
    console.log(db.connection.db.databaseName);
  } catch (error) {
      console.log('Error DB connection:', error)
  };

};