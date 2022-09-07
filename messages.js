import mongoose from "mongoose";

const chatSchema= new mongoose.Schema({
    user:String,
    msgs:Array
})

export default mongoose.model('Message', chatSchema)