import React, { useContext } from "react";
import Popup from "reactjs-popup";
import MentionStrip from '../../ActivityPage/MentionStrip'
import { JWTContext } from "../../../App";
import TaggedStrip from "../../ActivityPage/TaggedStrip";
import CommentStrip from "../../ActivityPage/commentStrip";
import LikeStrip from "../../ActivityPage/likeStrip";
import FollowStrip from "../../ActivityPage/followStrip";

export default function UserHeader(){
    const [_, setJWT] = useContext(JWTContext)
    const jwt = localStorage.getItem("jwt")
    const user = JSON.parse(localStorage.getItem("user"))
    function logOut(){
        setJWT("")    
    }
    console.log(jwt);
    return(
        // klo udah login panggil ini
        <div className="pembungkus">
            <div className="header">
                <div className="logo">
                    <h1>InstagraMT</h1>
                </div>
                <div className="searchBar">
                    <form action="">
                        <input type="text" placeholder="Search" name="searchQuery" id=""/>
                    </form>
                </div>
                <div className="iconDiv">
                    <a href="/" id="home">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                    </a>
                    <a href="/upload" id="upload">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </a>
                    <a href="/dm" id="msg">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    </a>
                    <a href="/explore" id="explore">
                    <svg xmlns="http://www.w3.org/2000/svg"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                    </a>
                    <Popup trigger={
                                <a href="#" id="like">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                     </svg>
                                </a>
                                } 
                    position="bottom right">
                        <div className="activityPopUp">
                            
                            <div id="activityPopUpFooter">
                                <MentionStrip></MentionStrip>
                                <FollowStrip></FollowStrip>
                                <FollowStrip></FollowStrip>
                                <FollowStrip></FollowStrip>
                                <FollowStrip></FollowStrip>
                                <FollowStrip></FollowStrip>
                                <LikeStrip></LikeStrip>
                                <CommentStrip></CommentStrip>
                                <CommentStrip></CommentStrip>
                                <CommentStrip></CommentStrip>
                                <CommentStrip></CommentStrip>
                                <TaggedStrip></TaggedStrip>
                                <a href="/activity" id="showMore">Show More</a>
                            </div>
                        </div>
                    </Popup>
                    

                    
                        
                        <Popup trigger={<a href="#" id="profile">
                                            <img src={user.picture} alt="" />
                                        </a>
                                         } 
                        position="bottom right">
                            <div className="popUp">
                                <a href={`/profile/${user.username}`}>

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                    Profile
                                </a>
                                <a href="#">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                </svg>
                                    Saved
                                </a>
                                <a href="#">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                    Settings
                                </a>
                                <a>
                                    <button onClick={logOut}>
                                        Log Out
                                    </button>
                                </a>

                            </div>
                            
                        </Popup>
                    <a href="#" id="msgMobile">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    </a>
                </div>
            </div>
        </div>
        )

}