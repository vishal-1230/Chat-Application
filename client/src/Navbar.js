import React from 'react'
import { HiChat, HiChatAlt, HiChatAlt2, HiCurrencyDollar, HiCurrencyRupee, HiDocumentText, HiHome, HiMenu, HiOutlineLogout, HiUserCircle } from 'react-icons/hi'

function Navbar() {

  async function getName(){
    const response=await fetch(`http://127.0.0.1:8000/getName?key=${document.cookie.slice(4)}`)
    const data=await response.json()
    document.getElementById('profileName').innerHTML=data
  }
  getName()
  // document.getElementById('menuExpand').checked=false

  function menuPressed(){
    const check=document.getElementById('menuExpand')
    if (check.checked){
      check.click()
      document.getElementById('navbar').style.width='105px'
      for (let i of document.getElementsByClassName('navLabels')){
        i.style.display='none'
        document.getElementById('newMsgIcon').style.display=''
      }
    }else{
      check.click()
      document.getElementById('navbar').style.width='255px'
      for (let i of document.getElementsByClassName('navLabels')){
        i.style.display='inline'
      }
      document.getElementById('newMsgIcon').style.display='none'
    }
  }

  return (
    <div className='navbar' id='navbar' >
        <input type="checkbox" name="menuExpand" id="menuExpand" />
        <HiMenu id='menuicon' className='navitem' onClick={menuPressed} />
        <div className="navitems" id='navitems'>
        <div><HiUserCircle className='navitem' style={{fontSize:'26px'}} /><span className='navLabels' id='profileName'>Profile</span></div>
        <div><HiCurrencyRupee className='navitem'/><span className='navLabels'>Payments</span></div>
        <div><HiChatAlt className='navitem'/><span className='navLabels'>Messages</span></div>
        <div><HiOutlineLogout className='navitem'/><span className='navLabels'>Logout</span></div>
        </div> 
    </div>
  )
}

export default Navbar