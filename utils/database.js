import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);
    if(isConnected){
        console.log('Mongo db is already connected!');
        return 0;
    }
    try {
        mongoose.connect(process.env.MONGODB_URI,{
            dbName: "share_prompt",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        isConnected = true;
        console.log("Mongo Db connected!");
    } catch (error) {
        console.log(error);
    }
}