
import mongoose from 'mongoose';

let isConnected = false;

export const connectToDB = async () => {
//  mongoose.set('strictQuery', true);
 if(!process.env.MONGODB_URI) {
   return console.log('MongoDB URL is missing');
 }
 if(isConnected) {
   console.log('Already Connected to MongoDB');
   return;
 }
 try {
    await mongoose.connect(process.env.MONGODB_URI);

    isConnected = true;
    console.log('Connected to MongoDB');
 } catch (error) {
    console.log('Error connecting to MongoDB', error);
 }

};
