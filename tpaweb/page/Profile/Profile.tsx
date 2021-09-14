import { gql, useMutation, useQuery } from '@apollo/client'
import millify from 'millify'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Footer from '../AddOns/Footer/Footer'
import UserHeader from '../AddOns/Header/UserHeader'
import ReactLoading from "react-loading"
import {useRouteMatch, Router, Redirect, Route, Switch } from 'react-router-dom'
const getUserQuery = gql`
    mutation getUserFromUsername($username: String!){
        getUserBasedOnUsername(input: $username)
        {
            id
            email
            username
            picture
            full_name
            is_verified
            is_google_account
        }
        
    }
`

const followQuery =  gql`
    mutation insertRelation($follow_id: String!, $followed_id: String!){
        createRelation(input:{
        follow_id: $follow_id,
        followed_id: $followed_id
    }){
        follow_id
    }
    }
`

const unfollowQuery = gql`
    mutation removeRelation($follow_id: String!, $followed_id: String!){
        deleteRelation(input:{
            follow_id: $follow_id,
        followed_id: $followed_id
    })
    }
`
const issFollowing = gql`
    mutation issFollowing($follow_id: String!, $followed_id: String!){
        isFollowing(input:{
            follow_id: $follow_id,
            followed_id: $followed_id
        })
    }
`

const getAllPostQuery = gql`
    mutation getAllPost($user_id:String!){
        getPostBasedOnUserId(input:$user_id){
            id
            caption
            user_id
            post_contents{
                id
                path
                type
            }
        }
    }
`
const getAllSavedPostQuery = gql`
    mutation getAllSavedPost($user_id:String!){
        getSavedPostBasedOnUserId(input:$user_id){
            id
                post_id
            user_id
            post_contents{
                id
                path
                type
            }
        }
    }
`
const getAllTaggedPostQuery = gql`
mutation getAllTaggedPost($user_id:String!){
    getTaggedPostBasedOnUserId(input:$user_id){
        id
    		post_id
        user_id
        post_contents{
            id
            path
            type
        }
    }
}
`

const checkSavedPostQuery = gql`
    mutation checkSaved($user_id: String!, $post_id: String!){
        postIsSaved(input:{
            user_id: $user_id
        post_id: $post_id
    })
    }
`
const savePostQuery = gql`
    mutation savePost($user_id: String!, $post_id: String!){
        savePostById(input:{
            user_id: $user_id
        post_id: $post_id
    })
    }
`
const unsavePostQuery = gql`
    mutation unsavePost($user_id: String!, $post_id: String!){
        unsavePostById(input:{
            user_id: $user_id
        post_id: $post_id
    })
    }
`
export default function Profile(){
    const loadingBtn = (<div className="loadingAnimation"><ReactLoading type={"spokes"} color={'black'} height={'100%'} width={'100%'}/></div>)
    const {username} = useParams<{username:string}>();
    const [getUser, {data, loading ,error}] = useMutation(getUserQuery)
    const [followUser, followUserData] = useMutation(followQuery)
    const [unfollowUser, unfollowUserData] = useMutation(unfollowQuery)
    const [isFollowing, isFollowingData] = useMutation(issFollowing)
    const [getAllPost, postData] = useMutation(getAllPostQuery)
    const [getAllSavedPost, savedData] = useMutation(getAllSavedPostQuery)
    const [getAllTaggedPost, taggedData] = useMutation(getAllTaggedPostQuery)

    const [follow, setFollow] = useState(false)
    const currUser = JSON.parse(localStorage.getItem("user"))
    const [picUrl, setPicUrl] = useState("");
    const [username2, setUsername2] = useState("");
    const [bio, setBio] = useState("");
    const [full_name, setFull_name] = useState("");
    const [userId, setUserId] = useState("");
    const [followers, setFollowers] = useState("");
    const [following, setFollowing] = useState("");
    const [postCount, setPostCount] = useState("");
    const [postLoading, setLoading] = useState(true);
    const [savedPostCount, setSavedPostCount] = useState("");
    const [savedLoading, setSavedLoading] = useState(true);
    const [taggedLoading, setTaggedLoading] = useState(true);
    const [taggedPostCount, setTaggedPostCount] = useState("");
    let user;
    const match = useRouteMatch();

    var fwrs = 45900000;
    var flws = 4590;
    var pstcnt = 1424;

    const toggleFollow = () =>{

        console.log("folow = " + follow)
        if(follow == false){
            followUser({
                variables:{
                    follow_id: currUser.id,
                    followed_id: userId,
                }
            })
        }else{
            unfollowUser({
                variables:{
                    follow_id: currUser.id,
                    followed_id: userId,
                }
            })
        }
        setFollow(!follow)
    }


    useEffect(()=>{
        getUser({
            variables:{
                username: username
            }
        })
    },[])
    useEffect(()=>{
        if(data!== undefined && data != null){
            user = data.getUserBasedOnUsername
            setUserId(user.id);
            setPicUrl(user.picture);
            setBio("Hello world");
            setFull_name(user.email);
            setUsername2(user.username)
            setFollowers(millify(fwrs))
            setFollowing(millify(flws))
            setPostCount(millify(pstcnt))
            if(currUser.id != user.id){
                isFollowing({
                    variables:{
                        follow_id: currUser.id,
                        followed_id: user.id,
                    }
                })
            }
            
        }
    },[data])

   useEffect(() => {
        if(isFollowingData.error != null){
            setFollow(false)
        }else{
            setFollow(true)
        }
   }, [isFollowingData.loading])

   useEffect(() => {
       console.log(isNaN(parseInt(userId)))
       if(!isNaN(parseInt(userId))){
            getAllPost({
                variables:{
                    user_id: userId
                }
            })
            getAllSavedPost({
                variables:{
                    user_id: userId
                }
            })
            getAllTaggedPost({
                variables:{
                    user_id: userId
                }
            })
            console.log("load post...")
       }
       
   }, [userId])

   useEffect(() => {
       if(postData.data != null && postData.data !== undefined){
            setLoading(false)
            setPostCount((postData.data.getPostBasedOnUserId.length))
            console.log(postData.data.getPostBasedOnUserId)
       }
       console.log(postLoading)
   }, [postData.data])

    useEffect(() => {
        if(savedData.data != null && savedData.data !== undefined){
            setSavedLoading(false)
            setSavedPostCount((savedData.data.getSavedPostBasedOnUserId.length))
        }
    }, [savedData.data])

    useEffect(() => {
        if(taggedData.data != null && taggedData.data !== undefined){
            setTaggedLoading(false)
            setTaggedPostCount((taggedData.data.getTaggedPostBasedOnUserId.length))
        }
    }, [taggedData.data])

   const followBtn = (<button className="followButton" onClick={toggleFollow}>Follow</button>)
   const followingBtn = (<button className="followingButton"onClick={toggleFollow}>Following</button>)
   const editProfileBtn = (<button className="editProfileButton">Edit Profile</button>)
   const messageBtn = (<button className="editProfileButton"> <a href="/dm">Message</a></button>)
   const uploadButton = (<a href="/upload" className="uploadButton"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></a>)
   

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
                                    <a href="/story">
                                        <img src={picUrl} alt="profile"/>
                                    </a>
                                    
                                    <div className="mobileUpperRightDiv">
                                        <span>
                                            <h1>{username2}</h1>
                                            <button id="settingButton">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                                            </svg>
                                            </button>    
                                        </span>
                                        <span>
                                            {(currUser.id == userId)?editProfileBtn:(follow)?followingBtn:followBtn}
                                            {(currUser.id == userId)?uploadButton:messageBtn}
                                            {(currUser.id == userId)?<button id="dropDown">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </button>: null}
                                            
                                        </span>
                                        
                                    </div>
                                </div>
                                
                                <div className = "subProfileDiv">
                                    <span className="userFullName"><b>{full_name}</b></span>
                                    <p className="profileDescription">{bio}</p>
                                </div>
    
                                {/* nanti diganti sesuai dengan siapa yg lgi login. ini kalau usernya sndiri */}
                                <p id="followedBy">
                                    Followed by <b>bambang</b>,<b> bimbing</b>, <b>jono</b> +129 more
                                </p>
                            </div>
                            <div className= "profileStatsDiv">
                                    <div><p>{postCount}</p><a href="#">posts</a></div>
                                    <div><p>{followers}</p><a href="#">followers</a></div>
                                    <div><p>{following}</p><a href="#">following</a></div>
                                </div>
                        </div>
                        {/* End of mobile and tablet view */}
                        
                        <div className="desktopProfileDiv">

                            <div className="profileImageDiv">
                                <a href="/story">
                                    <img src={picUrl} alt="profile"/>
                                </a>
                            </div>
                            
                            <div className="profileDetailDiv">
    
                                {/* nanti diganti sesuai dengan siapa yg lgi login. ini kalau usernya sndiri */}
                                <div className="profileUsernameDiv">
                                    <h1 className ="username">{username2}</h1>
                                    {(currUser.id == userId)?editProfileBtn:(follow)?followingBtn:followBtn}
                                    {(currUser.id == userId)?uploadButton:messageBtn}
                                    {(currUser.id == userId)?<button id="dropDown">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                                                </svg>
                                    </button>: null}
                                    {(currUser.id == userId)?<button id="settings">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                                        </svg>
                                    </button>: null}
                                    
                                </div>
    
                                <div className="profileStatsDiv">
                                    <p id ="postNumber"><b>{postCount} </b>posts</p>
                                    <p id ="followerNumber"><b>{followers} </b>followers</p>
                                    <p id ="followingNumber"><b>{following} </b>following</p>
                                </div>
    
                                <div className = "subProfileDiv">
                                    <span className="userFullName"><b>{full_name}</b></span>
                                    <p className="profileDescription">{bio}</p>
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
                                <button> <a href={`/profile/${username}`}>POSTS</a></button>
                                <button> <a href={`/profile/${username}/tagged`}>TAGGED</a>  </button>
                                <button> <a href={`/profile/${username}/saved`}>SAVED</a></button>
                            </div>
                            <Switch>
                                <Route exact path = {`${match.path}`}>
                                    {/* {"isi dari posts nanti di map"} */}
                                    <div className="postDiv">
                                        {/* {"nnti isi pakai post"} */}
                                        
                                        {(postLoading)?
                                            loadingBtn:
                                            
                                            (postCount == '0')?
                                                <div>No Posts Available...</div>:

                                                postData.data.getPostBasedOnUserId.map((content)=>{
                                                    
                                                    return(
                                                        
                                                    (content.post_contents[0].type == "video")?    
                                                        (
                                                            <button>
                                                                <a href={"/post/"+content.id}>
                                                                <video src={content.post_contents[0].path}/>
                                                                </a>
                                                            </button>
                                                        )
                                                    :
                                                        (
                                                        <button>
                                                            <a href={"/post/"+content.id}>
                                                                <img src={content.post_contents[0].path} alt="image" />
                                                            </a>    
                                                        </button>
                                                        )
                                                    )
                                                })
                                        }
                                    </div>
                                </Route>
                                <Route exact path = {`${match.path}/saved`}>
                                    {/* {"isi dari posts nanti di map"} */}
                                    <div className="postDiv">
                                        {/* {"nnti isi pakai post"} */}
                                        
                                        {(savedLoading)?
                                            loadingBtn:
                                            
                                            (savedPostCount == '0')?
                                                <div>No Posts Available...</div>:

                                                savedData.data.getSavedPostBasedOnUserId.map((content)=>{
                                                    return(
                                                        
                                                            <button>
                                                                <a href={"/post/" + content.post_id}>
                                                                    <img src={content.post_contents[0].path} alt="image" />
                                                                </a>
                                                            </button>
                                                        
                                                    )
                                                })
                                        }
                                    </div>
                                </Route>
                                <Route exact path = {`${match.path}/tagged`}>
                                    {/* {"isi dari posts nanti di map"} */}
                                    <div className="postDiv">
                                        {/* {"nnti isi pakai post"} */}
                                        
                                        {(taggedLoading)?
                                            loadingBtn:
                                            
                                            (taggedPostCount == '0')?
                                                <div>No Posts Available...</div>:

                                                taggedData.data.getTaggedPostBasedOnUserId.map((content)=>{
                                                    return(
                                                        
                                                            <button>
                                                                <a href={"/post/" + content.post_id}>
                                                                    <img src={content.post_contents[0].path} alt="image" />
                                                                </a>
                                                            </button>
                                                        
                                                    )
                                                })
                                        }
                                    </div>
                                </Route>
                            </Switch>
                        </div>

                </div>

            </div>
            <Footer/>
        </React.Fragment>
    )
}