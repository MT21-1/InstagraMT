import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import React, { useState, useEffect, useMemo } from 'react'
import Footer from '../AddOns/Footer/Footer'
import UserHeader from '../AddOns/Header/UserHeader'
import ReceiveDm from '../Components/receiveDm'
import SendDm from '../Components/sendDm'
import ReactLoading from "react-loading"
import { DmProfile } from '../Components/DmProfile'
import { debounceTime, distinctUntilChanged, map, Subject } from 'rxjs'
import Popup from "reactjs-popup";
const getFollowingQuery = gql`
    mutation getFollowing($user_id: String!){
        getFollowingList(input:$user_id){
            id
        username
        picture
    }
    }
`

const searchQuery = gql`
    mutation search($username: String!){
        searchUser(input:$username){
            id
            username
            picture
        }
        searchHashtag(input:$username){
            id
            hashtag
        }
    }
`
const getSearchHistoryQuery = gql`
mutation getSearchHistory($user_id: String!){
    getSearchHistory(input:$user_id){
      search_history
    }
    
  }
`
const addSearchHistoryQuery = gql`  
  mutation addSearchHistory($user_id: String!, $search_history: String!){
    addSearchHistory(input:{
      user_id: $user_id,
      search_history: $search_history
    })
  }
`
export default function DMPage(){
    
    const user = JSON.parse(localStorage.getItem("user"))
    console.log(user)
    const [following, followingData] = useMutation(getFollowingQuery);
    const [followCount, setFollowCount] = useState(0);
    const loadingBtn = (<ReactLoading type={"spokes"} color={'black'} height={'7%'} width={'7%'}/>)

    const subject = useMemo(() => new Subject<string>(), [])
    const [searchQ, searchData] = useMutation(searchQuery)
    const [userList, setUserList] = useState([]);
    const [hashtagList, setHashtagList] = useState([])
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
    

    useEffect(() => {
        const subscribe = subject
            .pipe(
                debounceTime(500),
                distinctUntilChanged(),
                map(search => search.trim())
            )
            .subscribe(
                search => {
                searchQ({
                    variables:{
                        username: search
                    }
                })
            })
        return (() => { subject.unsubscribe })
    }, [subject])


    useEffect(() => {
        console.log(searchData.data)
        if(searchData.data !== undefined && searchData != null){
            setUserList(searchData.data.searchUser)
            setHashtagList(searchData.data.searchHashtag)
        }
    }, [searchData.data])
    return(
        <React.Fragment>
        <UserHeader/>
        <div id="dmOuterDiv">
            <div id="dmMainDiv">
                <div id="dmMainLeft">
                    <div id="dmHeader">
                        {user.username}
                        <Popup trigger={<input type="search" autoComplete="off" onChange={(e) => subject.next(e.target.value)} placeholder="username" name="searchQuery" id=""/>} 
                    position="bottom left">
                        <div className="searchPopUp">
                            {(searchData.loading)?
                                (loadingBtn)
                            :null}
                            {(searchData.data != undefined && searchData.data != null && userList != null && userList.length != 0)?
                                searchData.data.searchUser.map(users => {
                                    return(
                                        <a href="#" className="searchStrip">
                                            <img src={users.picture} alt="" />
                                            <p>{users.username}</p>
                                        </a>
                                    )
                                }): null
                            }
                            
                        </div>
                    </Popup>
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