import { gql, useMutation, useQuery } from '@apollo/client'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Footer from '../AddOns/Footer/Footer'
import UserHeader from '../AddOns/Header/UserHeader'

const getUserQuery = gql`
    mutation getUserFromUsername($username: String!){
        getUserBasedOnUsername(input: $username)
        {
            email
            username
            picture
            full_name
            is_verified
            is_google_account
        }
        
    }
`

export default function Profile(){

    const {username} = useParams<{username:string}>();
    const [getUser, {data, loading ,error}] = useMutation(getUserQuery)
    let user = undefined

    useEffect(()=>{
        getUser({
            variables:{
                username: username
            }
        })
    },[])    

    if(loading){
        return(
        <div className="loading">loading..</div>)
    }
    if(error){
        if(error.message == "invalid username"){
            return(
                <div className="loading">
                    Whoops... user not found
                    <a href="/">Back to home</a>
                </div>
            )
        }
    }
    if(data !== undefined){
        user = data.getUserBasedOnUsername
        console.log(user)
        return(
            <React.Fragment>
                <UserHeader/>
                <div className="homeOuterDiv">
    
                    <div className="homeInnerDiv">
                        
                        <div className="profileUpperDiv">

                            {/* This part is for mobile & tablets.. */}
                            <div className="mobileProfileDiv">
                                
                                <div className="marginDiv">
                                    <div className="mobileUpperDiv">
                                        <img src={user.picture} alt="profile"
                                        />
                                        <div className="mobileUpperRightDiv">
                                            <span>
                                                <h1>{user.username}</h1>
                                                <button id="settingButton">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                                                </svg>
                                                </button>    
                                            </span>
                                            <span>
                                                <button id="follow">
                                                    Follow
                                                </button>
                                                <button id="dropDown">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </button>
                                            </span>
                                            
                                        </div>
                                    </div>
                                    
                                    <div className = "subProfileDiv">
                                        <span className="userFullName"><b>{user.full_name}</b></span>
                                        <p className="profileDescription">hiyahiyahiya Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores, culpa! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores, natus!</p>
                                    </div>
        
                                    {/* nanti diganti sesuai dengan siapa yg lgi login. ini kalau usernya sndiri */}
                                    <p id="followedBy">
                                        Followed by <b>bambang</b>,<b> bimbing</b>, <b>jono</b> +129 more
                                    </p>
                                </div>
                                <div className= "profileStatsDiv">
                                        <div><p>1,722</p><a href="#">posts</a></div>
                                        <div><p>1.3m</p><a href="#">followers</a></div>
                                        <div><p>2,842</p><a href="#">following</a></div>
                                    </div>
                            </div>
                            {/* End of mobile and tablet view */}
                            
                            <div className="desktopProfileDiv">

                                <div className="profileImageDiv">
                                        <img src={user.picture} alt="profile" />
                                </div>
                                
                                <div className="profileDetailDiv">
        
                                    {/* nanti diganti sesuai dengan siapa yg lgi login. ini kalau usernya sndiri */}
                                    <div className="profileUsernameDiv">
                                        <h1 className ="username">{user.username}</h1>
                                        <button id="follow">
                                            Follow
                                        </button>
                                        <button id="dropDown">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>
                                        <button id="settings">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                                            </svg>
                                        </button>
                                    </div>
        
                                    <div className="profileStatsDiv">
                                        <p id ="postNumber"><b>1,424 </b>posts</p>
                                        <p id ="followerNumber"><b>48.9k </b>followers</p>
                                        <p id ="followingNumber"><b>1 </b>following</p>
                                    </div>
        
                                    <div className = "subProfileDiv">
                                        <span className="userFullName"><b>{user.full_name}</b></span>
                                        <p className="profileDescription">hiyahiyahiya Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores, culpa! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores, natus!</p>
                                    </div>
        
                                    {/* nanti diganti sesuai dengan siapa yg lgi login. ini kalau usernya sndiri */}
                                    <p id="followedBy">
                                        Followed by <b>bambang</b>,<b> bimbing</b>, <b>jono</b> +129 more</p>
                                </div>
                            </div>
                        </div>
    
                        <div className="profileBottomDiv">
                                
                                {/* {"navbar untuk posts"} */}
                                <div className="postNavbar">
                                    <button>POSTS</button>
                                    <button>REELS</button>
                                    <button>IGTV</button>
                                    <button>TAGGED</button>
                                </div>
    
                                {/* {"isi dari posts nanti di map"} */}
                                <div className="postDiv">
                                    {/* {"nnti isi pakai post"} */}
                                    <button>
                                        <img src="/wp.jpg" alt="" />
                                    </button>
                                    <button>
                                        <img src="/wp.jpg" alt="" />
                                    </button>
                                    <button>
                                        <img src="/wp.jpg" alt="" />
                                    </button>
                                    <button>
                                        <img src="/wp.jpg" alt="" />
                                    </button>
                                    <button>
                                        <img src="/wp.jpg" alt="" />
                                    </button>
                                </div>
                            </div>
    
                    </div>
    
                </div>
                <Footer/>
            </React.Fragment>
        )
    }else{
        return(
            <div className="loading">loading..</div>)
    }
        
    
    

}