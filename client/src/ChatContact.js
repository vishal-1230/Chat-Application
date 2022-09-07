import React from 'react'
import img1 from './images/arrow.jpg'

function ChatContact(props) {
  return (
    <div className='chatcontact' onClick={()=>{props.onclick(props.user+' '+props.name)}}>
        <img src={props.dp} alt='' id='logo1'/>
        <div id="chatcontacttxt">
            <h5 id='contactname'>{props.name}</h5>
            <span id='lastmsg'>{props.msg}</span>
        </div>
    </div>
  )
}


export default ChatContact