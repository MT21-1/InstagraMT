import React, { useEffect, useRef, useState } from 'react'
import millify from 'millify';
import Popup from 'react-animated-popup';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Popup2 from 'reactjs-popup';
import { Comment } from './Comment';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router';
import ReactLoading from "react-loading"
import { FacebookShareButton} from "react-share"
const getPostQuery = gql`
mutation getPost($post_id: String!){
  getPostBasedOnPostId(input:$post_id){
    	id
        caption
        user_id
        post_contents{
            id
            path
            type
        }
        post_comments{
            id
            comment
            user_id
            replies{
              id
              user_id
              reply
            }
        }
  }
}
`

const getUserQuery = gql`
    mutation getUserFromId($user_id:String!){
	getUserBasedOnId(input:$user_id){
		id
    email
    username
    picture
    full_name
  }
}
`
const editPostQuery = gql`
    mutation editPost($caption: String!, $post_id: String!){
        editPostById(input:{
            new_caption:$caption
            post_id: $post_id
    })
    }
`

const deletePostQuery = gql`
    mutation deletePost($post_id: String!){
        deletePostById(input:$post_id)
    }
`


const checkLikeQuery = gql`
  mutation checkLike($user_id: String!, $post_id: String!){
    postIsLiked(input:{
      user_id:$user_id
      post_id:$post_id
    }) 
  }
`
const likeQuery = gql`
  mutation likePost($user_id: String!, $post_id: String!){
    likePostById(input:{
      user_id:$user_id
      post_id:$post_id
    }) 
  }
`
const dislikeQuery = gql`
  mutation dislikePost($user_id: String!, $post_id: String!){
    unLikePostById(input:{
      user_id:$user_id
      post_id:$post_id
    }) 
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

const postCommentQuery = gql`
    mutation postComment($user_id: String!, $post_id: String!, $comment: String!){
        commentPost(input:{
        user_id:$user_id
        post_id:$post_id
        comment:$comment
    })
    }
`

const postLikeCountQuery = gql`
    mutation checkPostLikeCount($post_id: String!){
	    postLikeCount(input:$post_id)
    }

`
const postCommentCountQuery = gql`
    mutation checkPostCommentCount($post_id: String!){
        postCommentCount(input:$post_id)
    }
`

export const Post = (props)=>{
    const postId = props.post_id;
    const [getPost, {data,loading,error}] = useMutation(getPostQuery)
    const [editPost, editPostData] = useMutation(editPostQuery)
    const [deletePost, deletePostData] = useMutation(deletePostQuery)
    const [checkLike, checkLikeData] = useMutation(checkLikeQuery)
    const [likePost, likePostData] = useMutation(likeQuery)
    const [dislikePost, dislikePostData] = useMutation(dislikeQuery)
    const [checkSaved, checkSavedData] = useMutation(checkSavedPostQuery)
    const [savePost, savePostData] = useMutation(savePostQuery)
    const [unsavePost, unsavePostData] = useMutation(unsavePostQuery)
    const [postComment, postCommentData] = useMutation(postCommentQuery)
    const [postLikeCount, postLikeCountData] = useMutation(postLikeCountQuery)

    const currUser = JSON.parse(localStorage.getItem("user"))
    const [getUser, userData] = useMutation(getUserQuery)

    const [visible, setVisible] = useState(false)
    const [visible2, setVisible2] = useState(false);
    const [visible3, setVisible3] = useState(false);
    const [comment, setComment] = useState("");
    const [commentArray, setCommentArray] = useState([]);
    const [showMore, setShowMore] = useState(false);
    const [like, setLike] = useState(false);
    const [saved, setSaved] = useState(false);
    const [username, setUsername] = useState("");
    const [userProfile, setUserProfile]= useState("");
    const [userId, setUserId] = useState("");
    const [likeCount, setLikeCount] = useState("");
    const [commentCount, setCommentCount] = useState(0);
    const [caption, setCaption] = useState("");
    const [newCaption, setNewCaption] = useState("");
    const [originalCaption, setOriginalCaption] = useState("");
    const [isShort, setIsShort] = useState(false);
    const [image, setImage] = useState([]);
    const [idx, setIdx] = useState(0);
    
    const history = useHistory()
    const loadingBtn = (<div className="loadingAnimation"><ReactLoading type={"spokes"} color={'black'} height={'100%'} width={'100%'}/></div>)

    const videoCtrl = useRef<HTMLVideoElement>(null)
    const [play, setPlay] = useState(false)

    function handleVideo(){
        if(videoCtrl.current!.paused){
            videoCtrl.current!.play()
            setPlay(true)
        }else{
            videoCtrl.current!.pause()
            setPlay(false)  
        }
    }

    function left(){
        if(idx != 0){
            setIdx(idx-1)
        }
    }

    function right(){
        if(idx < image.length-1){
            setIdx(idx+1);
        }
    }

    function showFullCaption(){
        if(!showMore){
            setCaption(originalCaption)
        }else{
            setCaption(originalCaption.substr(0,20) + "...")
        }
        setShowMore(!showMore);
        
    }

    function toggleLike(){
        if(like){
            dislikePost({
                variables:{
                    user_id: currUser.id,
                    post_id: postId
                }
            })
        }else{
            likePost({
                variables:{
                    user_id: currUser.id,
                    post_id: postId
                }
            })
        }
        setLike(!like)
        // masukin code dbnya
    }
    function toggleSaved(){
        if(!saved){
            savePost({
                variables:{
                    user_id: currUser.id,
                    post_id: postId
                }
            })
        }else{
            unsavePost({
                variables:{
                    user_id: currUser.id,
                    post_id: postId
                }
            })
        }
        setSaved(!saved);
        // masukin code dbnya
    }

    function deletePst(){
        deletePost({
            variables:{
                post_id:postId
            }
        })
    }

    function editPst(){
        editPost({
            variables:{
                post_id: postId,
                caption: newCaption
            }
        })
    }

    function addCmmnt(){
        if(caption.length > 0){
            postComment({
                variables:{
                    comment: comment,
                    user_id: currUser.id,
                    post_id: postId
                }
            })
        }
        
    }

    useEffect(() =>{
        if(postCommentData.data != undefined && postCommentData.data != null){
            window.location.reload()
        }
    }, [postCommentData])

    useEffect(() => {
        getPost({
            variables:{
                post_id: postId
            }
        })
        checkLike({
            variables:{
                post_id: postId,
                user_id: currUser.id
            }
        })
        checkSaved({
            variables:{
                post_id: postId,
                user_id: currUser.id
            }
        })
        postLikeCount({
            variables:{
                post_id:postId
            }
        })
    }, [])

    useEffect(() => {

        if(checkSavedData.error != null){

            setSaved(false)
        }else{
            setSaved(true)
        }
    }, [checkSavedData.loading])

    useEffect(() => {
        if( editPostData.data != undefined && editPostData.data != null){
            window.location.reload()
        }
    }, [editPostData])

    useEffect(() => {

        if(deletePostData.data != undefined && deletePostData.data != null){
            console.log("redirect..")
            window.location.reload()
        }

    }, [deletePostData])
    

    

    useEffect(() => {

        
        if(checkLikeData.error != null){
            setLike(false)
        }else{
            setLike(true)
        }
        

    }, [checkLikeData.loading])

    useEffect(() => {
        
        if(postLikeCountData.data != undefined && postLikeCountData != null){
            var likeCounts = postLikeCountData.data.postLikeCount;
            setLikeCount(millify(likeCounts*1000))
        }

    }, [postLikeCountData])

    useEffect(() => {
        
        if(data!== undefined && data!=null){
            console.log(data.getPostBasedOnPostId)
            setUserId(data.getPostBasedOnPostId.user_id)
            setOriginalCaption(data.getPostBasedOnPostId.caption)
            setImage(data.getPostBasedOnPostId.post_contents)
            setCommentArray(data.getPostBasedOnPostId.post_comments)
            if(data.getPostBasedOnPostId.caption.length > 30){
                setCaption(data.getPostBasedOnPostId.caption.substr(0,20) + "...")
                setShowMore(false)
                setIsShort(false)
                console.log("short caption")
            }else{
                setCaption(data.getPostBasedOnPostId.caption)
                setIsShort(true)
            }
        }

    }, [data])

    useEffect(() =>{

        if(userData.data !== undefined && userData.data != null){
            console.log(userData.data.getUserBasedOnId)
            setUsername(userData.data.getUserBasedOnId.username)
            setUserProfile(userData.data.getUserBasedOnId.picture)
        }
    }, [userData])

    useEffect(() =>{
        // query dapetin data user
        if(userId != null && userId != undefined){
            getUser({
                variables:{
                    user_id: userId
                }
            })
        }
    }, [userId])


    return(
        <div className="postDiv">          
            {/* Profile */}
            <div className="postProfileDiv">
                <Popup2 trigger={<a href={"/profile/" + username} id="username">
                    <a href="/story">
                        <img src={userProfile} alt="" />
                    </a>
                    <span>{username}</span>
                </a>} on="hover" position="bottom left">
                    <iframe src={"/profile/" + username} width="600" height="400"></iframe>

                </Popup2>
                
                {(userId == currUser.id)?
                    
                            <div className="editPost">
                            <Popup2 trigger={
                                    <button id="editButton"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                  </svg></button>} position="left top" modal>
                                        <div className="deleteModal">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                            </svg>
                                                
                                            <p>Insert New Caption:</p>
                                            <input type="text" autoComplete="off" placeholder="Caption..." onChange={(e) =>{setNewCaption(e.target.value)}}/>
                                            <button id="confirm" onClick={editPst}>Update</button>
                                        </div>
                                </Popup2>
                                
                                <Popup2 trigger={
                                    <button><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                  </svg></button>} position="left top" modal>
                                        <div className="deleteModal">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                                
                                            <p>Are You Sure You Want To Delete The Post?</p>
                                            <button id="confirm" onClick={deletePst}>Yes</button>
                                        </div>
                                </Popup2>
                                

                                
                            </div>
                :null}
            </div>
            
            {/* ini untuk post */}
            {(image.length != 0 && image != undefined && image != null) ?(
                <div className="pictureDiv">    
                    {(image.length > 1)?<button id="leftSlide" onClick={left}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>:null}
                    
                    {image.map((content, i)=>{
                        return ((i == idx)?((content.type == "image")?<img className="displayed" id= {(i).toString()} src={content.path} alt="" key={content.id}/>:
                            <div className="videoDiv">
                                <video className="displayed" id = {(i).toString()}src={content.path} key = {content.id} ref={videoCtrl} preload="auto"/>
                                <button onClick={handleVideo}>
                                    {((!play)? (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>):(
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    ))}
                                </button>
                            </div>
                            ):null)
                    })}
                    {(image.length > 1)?<button id="rightSlide" onClick={right}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>:null}
                </div>
            ):
                loadingBtn
            }

            {/* commentsection and like */}
            <div className="interactDiv">
                {/* interact */}
                <div className="interactInnerDiv">
                    <div className="leftInnerDiv">
                        {/* Like */}
                        <button id="like" onClick={toggleLike}>
                            {(like)?(
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                </svg>
                            ) : 
                            (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>)}
                            
                        </button>

                        {/* Comment */}
                        <button id="comment">
                            <a href={"/post/"+postId}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            </a>
                        </button>

                        {/* Share */}
                        <Popup2 trigger={
                                    <button id="share">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                    </svg>
                                </button>} 
                        position="left top" modal>
                                <div className="modal">
                                    Share
                                    <div id ="buttonShareModal">
                                    <CopyToClipboard text={window.location.href+ "post/"+postId}>
                                        <button id="shareClipboard">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                        </svg>
                                        </button>
                                    </CopyToClipboard>
                                    <FacebookShareButton url={window.location.href+ "post/"+postId} id="shareSosmed" resetButtonStyle={false}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96.124 96.123">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M72.089,0.02L59.624,0C45.62,0,36.57,9.285,36.57,23.656v10.907H24.037c-1.083,0-1.96,0.878-1.96,1.961v15.803
                                                c0,1.083,0.878,1.96,1.96,1.96h12.533v39.876c0,1.083,0.877,1.96,1.96,1.96h16.352c1.083,0,1.96-0.878,1.96-1.96V54.287h14.654
                                                c1.083,0,1.96-0.877,1.96-1.96l0.006-15.803c0-0.52-0.207-1.018-0.574-1.386c-0.367-0.368-0.867-0.575-1.387-0.575H56.842v-9.246
                                                c0-4.444,1.059-6.7,6.848-6.7l8.397-0.003c1.082,0,1.959-0.878,1.959-1.96V1.98C74.046,0.899,73.17,0.022,72.089,0.02z"/>
                                        </svg>
                                        
                                    </FacebookShareButton>
                                        <button id="shareDm">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                        </svg>
                                        </button>
                                    </div>
                                </div>
                        </Popup2>
                        
                    </div>

                    {/* Save */}
                    <button id="save" onClick={toggleSaved}>
                        {(saved)?
                        (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                            </svg>
                        ):
                        (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                            </svg>
                        )}
                        
                    </button>

                </div>

                {/* jumlah likes */}
                <p id="likes">{likeCount} likes</p>

                <p className="captionDiv">
                    <p id="username">{username}</p>
                        {console.log(isShort)}
                        {(isShort)?(<p id="caption">{caption}</p>): (!showMore)? (
                        <React.Fragment>
                            <p id="caption">{caption}<div id="showMore" onClick={showFullCaption}>more</div></p>
                        </React.Fragment>)
                        : (
                        <React.Fragment>
                            <p id="caption">{caption}<div id="showMore" onClick={showFullCaption}>hide</div></p>
                            
                        </React.Fragment>
                        )}
                    
                </p>
                {/* Commnet section */}
                {(commentArray.length != 0 && commentArray != undefined && commentArray != null) ?
                    (
                        <div className="pictureDiv">    
                            {commentArray.map((content, i)=>{
                                return (i < 5)?
                                (
                                    <Comment comment_id={content.id} comment_value={content.comment} comment_user_id = {content.user_id} comment_header_id= {-1} comment_replies = {content.replies} commend_fromHome = {true}/>
                                ): null
                                })}
                        </div>
                    ):
                        (loading)?loadingBtn:null
                    }
                {(commentArray.length != 0 && commentArray != undefined && commentArray != null && commentArray.length > 5)?<a href={"/post/"+postId} className="viewMoreComments"> View {millify(commentArray.length * 1000)} Comments</a>: null}
                
                
                <p id="time">1 MINUTE AGO</p>
            </div>

            {/* tempat input comment */}
            <div className="inputCommentSection">

                {/* Emoji */}
                <button id="emojiButton">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>

                {/* Comment input */}
                <input type="text" placeholder="Add a comment..." onChange={e=>{setComment(e.target.value)}}/>

                <button id="postButton" onClick={addCmmnt}>
                    Post
                </button>

            </div>
        </div>
    )
}