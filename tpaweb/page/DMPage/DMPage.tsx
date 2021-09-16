import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import React, { useState, useEffect } from 'react'
import Footer from '../AddOns/Footer/Footer'
import UserHeader from '../AddOns/Header/UserHeader'
import ReceiveDm from '../Components/receiveDm'
import SendDm from '../Components/sendDm'
import ReactLoading from "react-loading"
import { DmProfile } from '../Components/DmProfile'

const getFollowingQuery = gql`
    mutation getFollowing($user_id: String!){
        getFollowingList(input:$user_id){
            id
        username
        picture
    }
    }
`

export default function DMPage(){
    
    const user = JSON.parse(localStorage.getItem("user"))
    console.log(user)
    const [following, followingData] = useMutation(getFollowingQuery);
    const [followCount, setFollowCount] = useState(0);
    const loadingBtn = (<ReactLoading type={"spokes"} color={'black'} height={'7%'} width={'7%'}/>)

    useEffect(()=>{
        following({
            variables:{
                user_id: user.id
            }
        })
    }, [])
    
    useEffect(()=>{
        if(followingData.data != null && followingData.data != undefined){
            setFollowCount(followingData.data.getFollowingList.length)
        }
    }, [followingData.data])

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
                        {(followingData.loading)? loadingBtn:
                            (followCount > 0)? 
                                (followingData.data.getFollowingList.map((content)=>{
                                    return(<DmProfile username = {content.username} profile = {content.picture}></DmProfile>)
                                }))
                            : "Zero Following"
                        }
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