
import mongoose from 'mongoose';

let isConnected = false;

export const connectToDB = async () => {
 mongoose.set('strictQuery', true);
 if(!process.env.MONGODB_URI) {
   throw new Error('MongoDB URL is missing');
 }
 if(isConnected) return console.log('Already Connected to MongoDB');

 try {
    await mongoose.connect(process.env.MONGODB_URI);

    isConnected = true;
    console.log('Connected to MongoDB');
 } catch (error) {
    console.log('Error connecting to MongoDB', error);
 }

};
