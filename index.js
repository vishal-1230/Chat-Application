import express, { json, urlencoded } from "express";
import bcrypt, { compare } from 'bcrypt'
import mongoose from "mongoose";
import cors from 'cors'
import jwt from "jsonwebtoken";
import crypto from 'crypto'
import dotenv from 'dotenv'
import 'ejs'
import userpass from "./userPass.js";
import Message from "./messages.js";
import cookieParser from "cookie-parser";
import path from "path";

const app=express()
app.use(json())
app.use(urlencoded({extended: false}))
app.use(cors({
    origin:'http://127.0.0.1:3000'
}))
app.use(cookieParser())
dotenv.config()

const port = process.env.PORT || 8000

app.set('view engine', 'ejs')

if (process.env.NODE_ENV=='production'){
    app.use(express.static('client/build'));
    app.get('*', (req, res)=>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}


mongoose.connect('mongodb+srv://vishal:Cluster2004@cluster0.btbmdim.mongodb.net/ChatApp?retryWrites=true&w=majority', (err)=>console.log('connected'))
var db=mongoose.connection

app.get('/signup/checkUser', (req, res)=>{
    console.log('checking Username');
    userpass.find({user:req.query.user}, (err, data)=>{
        console.log(data);
        if (err) throw err;
        if (data.length==0){
            res.json('1')
        }else{
            res.json('0')
        }
    })    
})

app.get('/signup/checkPass', (req, res)=>{
    const nums=[1,2,3,4,5,6,7,8,9,0]
    const alphas='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    console.log('checking pass');
    const pass=req.query.pass
    
    let haveNum=false
    let haveAlpha=false
    let haveSymb=true
    
    for (let i of pass){
        for (let i2 of nums){
            if (i==i2){
                haveNum=true
                break
            }
        }
    }
    for (let i3 of pass){
        for (let i4 of alphas){
            if (i3==i4){
                haveAlpha=true
                break
            }
        }
    }
    let alphanums=0
    for (let i5 of pass){
        for (let i6 of 'abcdefghijklmnopqrstuvwxyz1234567890'){
            if (pass!=''){
                if (i5==i6){
                    alphanums++
                }
            }
        }
    }
    
    if (alphanums==pass.length){
        haveSymb=false
    }else{
        haveSymb=true
    }

    if (haveAlpha && haveNum && haveSymb){
        res.json('1')
    }else{
        res.json('0')
    }

})

app.post('/signup', (req, res)=>{
    console.log('signing up');
    async function hashKar(){
        let hashedPass = await bcrypt.hash(req.body.pswd, 10)
        console.log(hashedPass.toString());
        userpass.create({user:req.body.user, name:req.body.name, pswd:hashedPass.toString()}, (err)=>{console.log(err);})
        res.redirect('http://127.0.0.1:3000/')
    }
    hashKar() 
})

app.post('/login', (req, res)=>{
    userpass.find({user:req.body.user}, (err, data)=>{
        if (data.length==0){
            res.render('afterLogin', {exists:false, key:'', correct:false})
        }else{
            async function checkCorrect(){
                const exists=await bcrypt.compare(req.body.pswd, data[0].pswd)
                if (exists.toString()=='true'){
                    console.log(process.env.SECRET_TOKEN)
                    const key=jwt.sign({user:req.body.user}, process.env.SECRET_TOKEN, {expiresIn: '6h'})
                    console.log(key);
                    res.render('afterLogin', {exists:true, correct:true, key:key})
                }else{
                    res.render('afterLogin', {exists:true, correct:false, key:''})
                }
            }
            checkCorrect()
        }
    })
})

app.get('/getUser', (req, res)=>{
    console.log('logging in')
    const data = jwt.verify(req.query.key, process.env.SECRET_TOKEN)
    console.log(data)
    res.json(data)
})

app.get('/getName', (req, res)=>{
    const data = jwt.verify(req.query.key, process.env.SECRET_TOKEN)
    userpass.find({user:data.user}, (err, data)=>{
        if (err) throw err;
        res.json(data[0].name)
    })
})

app.get('/getChatList', (req, res)=>{
    const user=jwt.verify(req.query.key, process.env.SECRET_TOKEN).user
    Message.find({user:user}, (err, data)=>{
        let chats=[]
        if (err) throw err;
        if (data.length==0){
            chats=[]
        }else{
            userpass.find({}, (err, data3)=>{
                for (let i of data[0].msgs){
                    for (let i2 of data3){
                        if (i2.user==Object.keys(i)[0]){
                            let chatDetail={}
                            if (err) throw err;
                            chatDetail['user']=Object.keys(i)[0]
                            chatDetail['name']=i2.name
                            chatDetail['lastMsg']=i[Object.keys(i)[0]][i[Object.keys(i)[0]].length-1][Object.keys(i[Object.keys(i)[0]][i[Object.keys(i)[0]].length-1])[0]]
                            chats.push(chatDetail)
                        }
                    }
                }
                res.json(chats)
            })
        }
    })
})

app.post('/sendMsg', (req, res)=>{
    
    Message.find({user:jwt.verify(req.body.key, process.env.SECRET_TOKEN).user}, (err, data)=>{
        if (err) throw err;
        if (data.length==0){
            let newMsg={}
            let newMsg2={}
            let newMsg2Array=[]
            newMsg2['me']=req.body.msg
            newMsg2Array.push(newMsg2)
            newMsg[req.body.to]=newMsg2Array
            Message.create({
                user:jwt.verify(req.body.key, process.env.SECRET_TOKEN).user,
                msgs:[newMsg]
            })
        }else{
            const oldMsgs=data[0].msgs
            for (let i of oldMsgs){
                if (Object.keys(i)[0]==req.body.to){
                    i[Object.keys(i)[0]].push({'me':req.body.msg})
                    Message.findOneAndUpdate({user:jwt.verify(req.body.key, process.env.SECRET_TOKEN).user}, {msgs:oldMsgs}, (err)=>{if (err) throw err;})
                }
            }
        }
        Message.find({user:req.body.to}, (err, data2)=>{
            if (err) throw err;
            if (data2.length==0){
                const user1=jwt.verify(req.body.key, process.env.SECRET_TOKEN).user
                let msgList=[{}]
                let msgList2=[{}]
                msgList2[0]['he']=req.body.msg
                msgList[0][(user1)]=msgList2
                Message.create({
                    user:req.body.to,
                    msgs:msgList
                })
            }else{
                const oldMsgs2=data2[0].msgs
                for (let i of oldMsgs2){
                    if (Object.keys(i)[0]==jwt.verify(req.body.key, process.env.SECRET_TOKEN).user){
                        i[Object.keys(i)[0]].push({'he':req.body.msg})
                        Message.findOneAndUpdate({user:req.body.to}, {msgs:oldMsgs2}, (err)=>{if (err) throw err;})
                    }
                }
            }
        })
    })
})

app.get('/getChats', (req, res)=>{
    const thisUser=jwt.verify(req.query.meUser, process.env.SECRET_TOKEN).user
    console.log("this user==>" + thisUser)
    const thatUser=req.query.heUser
    console.log("that user==>"+ thatUser)
    Message.find({user:thisUser}, (err, data)=>{
        console.log('Finding User Chats4');
        if (err) throw err;
        const msgs=data[0].msgs
        for (let i of msgs){
            console.log(Object.keys(i)[0]);
            if (Object.keys(i)[0]==thatUser){
                res.json(i[Object.keys(i)[0]])
            }
        }
    })
})

app.get('/addUser', (req, res)=>{
    const thisUser=jwt.verify(req.query.thisUser, process.env.SECRET_TOKEN).user
    const thatUser=req.query.thatUser

    Message.find({user:thisUser}, (err, data)=>{
        if (data.length!=0){
            let oldMsgs=data[0].msgs
            let newMsgObj={}
            newMsgObj[thatUser]=[]
            oldMsgs.push(newMsgObj)
            userpass.find({user:thatUser}, (err, data)=>{
                if (data.length==0){
                    res.json('0')
                }else{
                    Message.findOneAndUpdate({user:thisUser}, {msgs:oldMsgs})
                    res.json('1')
                }
            })
        }else{
            let msg1={}
            msg1[thatUser]=[{'he':'Start Chatting Here'}]
            Message.create({user:thisUser, msgs:[msg1]})
        }
        
    })
    // Message.create({user:thisUser, msgs:[{thatUser:[]}]})
})



app.listen(port)