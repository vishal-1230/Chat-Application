import React, {useState} from 'react'
import ChatContact from './ChatContact'
import {SiGooglemessages} from 'react-icons/si'
import guy1 from './images/guy1.jpg'
import guy2 from './images/guy2.jpg'
import guy3 from './images/guy3.jpg'
import guy4 from './images/guy4.jpg'

function ChatList(props) {

    const [update, setupdate] = useState(0)
    const [chats, setchats] = useState('')
    const [chatsListLoaded, setchatsListLoaded] = useState(false)
    let abcd=props.faltu
    abcd+='a'

  // let msgs=["Hey, How are you bro? I hope you're fine", "Hey, How are you bro? I hope you're fine", 'I just finished my meeting, where r you?', 'Having A tough time bro!, will meet you next month', "It's Okay bro, Everything is going to be fine man", "Hey, How are you bro? I hope you're fine", 'I just finished my meeting, where r you?', 'Having A tough time bro!, will meet you next month', "It's Okay bro, Everything is going to be fine man", 'I just finished my meeting, where r you?']
    let dps=[guy1, guy2, guy3, guy4, guy1, guy2, guy3, guy4, guy1, guy2]

    async function newMsg(){
      const data = prompt('Enter User ID')
      const response=await fetch(`http://127.0.0.1:8000/addUser?thisUser=${document.cookie.slice(4)}&thatUser=${data}`)
      const data2=await response.json()
      if (data2=='0'){
        alert('No such User exist')
      }else{
        const a=0
        setupdate(update+1)
      }
    }

    async function getChatList(){
      const response = await fetch(`http://127.0.0.1:8000/getChatList?key=${document.cookie.slice(4)}`)
      const data=await response.json()
      setchats(JSON.stringify(data))
      setchatsListLoaded(true)
    }
    getChatList()

  return (
    <div className='chatlist'>
        <div className="chatsheader">CHATS</div>
        <div className="chatlist2">
          {chatsListLoaded ? (JSON.parse(chats)).map((i)=>{
            return <ChatContact name={i['name']} msg={i['lastMsg']} dp={dps[Math.floor(Math.random()*10)]} key={i['name']+Math.random()} user={i['user']} onclick={props.onclick} />
          }):''}
        </div>
        <SiGooglemessages id='newMsgIcon' onClick={newMsg} />
    </div>
  )
}

export default ChatList