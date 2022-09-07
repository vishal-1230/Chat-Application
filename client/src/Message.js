import React from 'react'
// import './App.css'

function Message(props) {
    let me=true
    if (props.sender=='he'){
        me=false
    }else{
        me=true
    }
    return me? <>
        <div className="msgme">{props.msg}</div>
    </>:<>
        <div className="msghe">{props.msg}</div>
    </>
}

export default Message