import React, { useState, useEffect } from 'react'
import Footer from '../AddOns/Footer/Footer'
import UserHeader from '../AddOns/Header/UserHeader'
import DmProfile from '../Components/dmProfile'
import ReceiveDm from '../Components/receiveDm'
import SendDm from '../Components/sendDm'


export default function DMPage(){
    const user = JSON.parse(localStorage.getItem("user"))
    console.log(user)
    return(
        <React.Fragment>
        <UserHeader/>
        <div id="dmOuterDiv">
            <div id="dmMainDiv">
                <div id="dmMainLeft">
                    <div id="dmHeader">
                        {user.username}
                    </div>
                    <div id="dmPeopleList">
                        {/* kasih komponen user message */}
                            <DmProfile></DmProfile>
                            <DmProfile></DmProfile>
                            <DmProfile></DmProfile>
                            <DmProfile></DmProfile>
                            <DmProfile></DmProfile>
                            <DmProfile></DmProfile>
                            <DmProfile></DmProfile>
                            <DmProfile></DmProfile>
                            <DmProfile></DmProfile>
                            <DmProfile></DmProfile>
                            <DmProfile></DmProfile>
                            <DmProfile></DmProfile>
                    </div>
                </div>
                <div id="dmMainRight">
                    <div id="dmReceiverHeader">
                        <div id="dmReceiverImage">
                            <img src={user.picture} alt="" />
                        </div>
                        <div id="dmReceiverDetail">
                            <h1>Sugioo</h1>
                            <p>Active Now</p>
                        </div>
                    </div>
                    <div id="dmMessageDiv">
                        <div id="dmMessageList">
                            {/* kasih komponen message */}
                            <SendDm></SendDm>
                            <ReceiveDm></ReceiveDm>
                            <ReceiveDm></ReceiveDm>
                            <SendDm></SendDm>
                            <SendDm></SendDm>
                            <ReceiveDm></ReceiveDm>
                            <SendDm></SendDm>
                            <ReceiveDm></ReceiveDm>
                            <SendDm></SendDm>
                            <SendDm></SendDm>
                            <ReceiveDm></ReceiveDm>
                        </div>
                        <div id="chatBox">
                            <input type="text" placeholder="Message..."/>
                            <button id="sendButton">Send</button>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
    </React.Fragment>
    )
}