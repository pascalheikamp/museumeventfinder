import express from "express";
import mongoose, {Mongoose} from "mongoose";
import "dotenv/config";

//Here connection with Mongo db
const connectToMongoDbAsync = async () => {
    try {
       await mongoose.connect(process.env.MONGODB_URL + process.env.MONGODB_PORT + "/" + process.env.MONGODB_NAME);
    } catch (err) {
        console.log("The expected error is " + err);
    }
}
connectToMongoDbAsync()



//Here the import of the routes


const app = express();
app.listen(process.env.EXPRESS_PORT, function () {
    console.log("Server started at " + process.env.EXPRESS_PORT)
})
