import React, {useState} from 'react'
import { HiDotsVertical, HiOutlineEmojiHappy, HiPaperAirplane, HiPaperClip } from 'react-icons/hi'
import guy1 from './images/guy1.jpg'
import Message from './Message'
import vishalChats from './vishalChats.json'

function ChatScreen(props) {

  const [update, setupdate] = useState(0)

  const vishalMsgs=JSON.parse(JSON.stringify(vishalChats))
  // console.log(vishalMsgs);
  const l2=[]

  const [chat, setchat] = useState('')
  const [chatLoaded, setchatLoaded] = useState(false)

  async function getChats(){
    console.log('Getting Chats')
    const response = await fetch(`http://127.0.0.1:8000/getChats?meUser=${document.cookie.slice(4)}&heUser=${props.user}`)
    const data = await response.json()
    setchat(JSON.stringify(data))
    setchatLoaded(true)
  }
  
  getChats()

  function onSend(){
    async function onSendSub(){
      await fetch('http://127.0.0.1:8000/sendMsg', {
        method: 'POST',
        body:JSON.stringify({
          key:document.cookie.slice(4),
          msg:document.getElementById('msginput').value,
          to:(props.user)
        }),
        headers:{
          'Content-type':'application/json; charset=UTF-8'
        }
      })
      props.onsend()
    }
    onSendSub()
    document.getElementById('msginput').value=''
    setupdate(update+1)
  }

  return (
    <div className='chatscreen'>
      <div className="chatdetail">
        <img src={guy1} alt="" id="logo2" />
        <div className="chatdetailtxt">
          <h5 id='chatdetailname'>{props.name}</h5>
          <span id='chatdetaillastseen'>Last seen 06:34</span>
        </div>
        <HiDotsVertical id='chatdetailmenu'/>
      </div>
      <div className="chatsarea">
        {/* <Message key={Math.floor(Math.random())} sender='he' msg='Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates incidunt voluptatem pariatur maiores delectus cum, excepturi quis facere quos tempora necessitatibus ea rerum, dignissimos amet nisi hic id nesciunt! Provident.' /> */}
        {chatLoaded ? JSON.parse(chat).map((msg)=>{
          // {/* return <Message key={msg+Math.random()} sender={Object.keys(msg)[0]} msg={msg[Object.keys(msg)[0]]} /> */}
          return <Message sender={Object.keys(msg)[0]} msg={msg[Object.keys(msg)[0]]} key={msg[Object.keys(msg)[0]]+Math.random()} />
        }):''}
      </div>
      <div className="sendmsgarea">
        <i><HiOutlineEmojiHappy id='emoji'/></i>
        <input type="text" id='msginput' name='msg' placeholder='Type Here'/>
        <input type="file" name="attachment" id="attach"/>
        <i onClick={onSend}><HiPaperAirplane id='sendBtn'/></i>
        <label htmlFor="attach" onClick={()=>{document.getElementById('attach').click()}}><i><HiPaperClip id='attachicon' /></i></label>
      </div>
    </div>
  )
}

export default ChatScreen

