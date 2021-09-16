import React, { useState, useEffect } from 'react'

export const DmProfile = (props) =>{
    const username = props.username;
    const profile = props.profile;
    return(
        <div className="receiverProfile">
            <div id="receiverImage">
                <img src={profile} alt="" />
            </div>
            <div id="receiverDetail">
                <h1>{username}</h1>
                <p>Active Now</p>
            </div>
        </div>
    )
}