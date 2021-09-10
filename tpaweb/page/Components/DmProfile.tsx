import React, { useState, useEffect } from 'react'

export default function DmProfile(){
    return(
        <div className="receiverProfile">
            <div id="receiverImage">
                <img src="wp.jpg" alt="" />
            </div>
            <div id="receiverDetail">
                <h1>Sugioo</h1>
                <p>Active Now</p>
            </div>
        </div>
    )
}