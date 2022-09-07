import mongoose from "mongoose";

const schema=new mongoose.Schema({
    user:String,
    name:String,
    pswd:String
})

const userpass=mongoose.model('chatAppUserPass', schema)
export default userpass