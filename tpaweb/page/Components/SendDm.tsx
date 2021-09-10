import React, { useState, useEffect } from 'react'

export default function SendDm(){
    const user = JSON.parse(localStorage.getItem("user"))
    return(
        <div className="sendDm">
            <p id="msg">Hello World!</p>
            <a href={'/profile/'+user.username}><img src={user.picture} alt="" /></a>
        </div>
    )
}