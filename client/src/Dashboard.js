import React, { useState } from 'react'
import Navbar from './Navbar'
import ChatList from './ChatList'
import ChatScreen from './ChatScreen'

function Dashboard() {

    if  (document.cookie.charAt(0)!='k'){
        window.location.href="http://127.0.0.1:3000/"
    }else{
        async function alertUser(){
            const response = await fetch(`http://127.0.0.1:8000/getUser?key=${document.cookie.slice(4)}`)
            const data = await response.json()
            console.log(JSON.parse(data));
        }
        // alertUser()
    }

    const [chatOpened, setchatOpened] = useState('sfd')
    const [userOpened, setuserOpened] = useState('dsf')
    function onContactClicked(username, second){
      // alert(chatOpened)
      setchatOpened(username.split(' ')[1])
      setuserOpened(username.split(' ')[0])
    }
    const [chatupdate, setchatupdate] = useState(0)

  return (
    <div className='dashboard'>
      <Navbar />
      <ChatList onclick={onContactClicked} faltu={chatupdate} />
      <ChatScreen name={chatOpened} user={userOpened} onsend={()=>{setchatupdate(chatupdate+1)}}/>
    </div>
  )
}

export default Dashboard