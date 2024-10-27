import mongoose from "mongoose";

let isConnected = false;  // track connection

export const connectToDB = async () => {


     // Ensure MONGODB_URI is defined in environment variables
     
    if (!process.env.MONGODB_URI) {
        console.error("Error: MONGODB_URI is not defined in environment variables.");
        throw new Error("MONGODB_URI environment variable is missing.");
    }

    mongoose.set('strictQuery', true);


    if(isConnected){
        console.log('MongoDb is already connected!');
        return;
    } 

    try{
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "share_prompt",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        isConnected = true;

        console.log("MongoDB connected");

    }catch(err){
        console.error('Failed to connect to MongoDB', err.stack);       
    }
} 






