import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import millify from 'millify'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'

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
const likeCommentQuery = gql`
mutation LikeComment($comment_id: String!, $user_id: String!){
    likeCommentById(input:{
      comment_id: $comment_id
      user_id:$user_id
    })
  }
`
const unlikeCommentQuery = gql`
  mutation unlikeComment($comment_id: String!, $user_id: String!){
    unlikeCommentById(input:{
      comment_id: $comment_id
      user_id:$user_id
    })
  }
`
const checkLikeCommentQuery = gql`  
  mutation checkLikeComment($comment_id: String!, $user_id: String!){
      commentIsLiked(input:{
      comment_id: $comment_id
      user_id:$user_id
    })
  }
`

const deleteCommentQuery = gql`
    mutation deleteComment($comment_id: String!){
        deleteCommentById(input:$comment_id)
    }
`

const getLikeCountQuery = gql`
    mutation checkLikeCount($comment_id: String!){
	commentLikeCount(input:$comment_id)
}
`

const addNewReplyQuery = gql`
    mutation addNewReply($comment_id: String!, $user_id: String!, $reply: String!){
	postReply(input:{
    comment_id:$comment_id
    user_id:$user_id
    reply:$reply
  })
}
`


const deleteReplyQuery = gql`
mutation deleteReply($reply_id: String!){
  deleteReplyById(input:$reply_id)
}
`
const likeReplyQuery = gql`
mutation likeReply($user_id: String!, $reply_id: String!){
  	likeReplyById(input:{
      user_id:$user_id
      reply_id: $reply_id
    })
}
`

const unlikeReplyQuery = gql`
mutation unlikeReply($user_id: String!, $reply_id: String!){
  	unlikeReplyById(input:{
      user_id:$user_id
      reply_id: $reply_id
    })
}
`
const replyIsLikedQuery = gql`
    mutation checkReplyIsLiked($user_id: String!, $reply_id: String!){
        replyIsLiked(input:{
        user_id:$user_id
        reply_id: $reply_id
    })
    }
`

const replyLikeCountQuery = gql`
    mutation checkReplyLikeCount($reply_id: String!){
    replyLikeCount(input:$reply_id)
    }
`
export const Comment = (props) =>{
    const atHome = (window.location.pathname == "/"? true: false)
    const comment_id = props.comment_id
    const comment_value = props.comment_value
    const comment_user_id = props.comment_user_id
    const comment_header_id = props.comment_header_id
    const comment_replies = props.comment_replies
    console.log(comment_header_id)
    console.log(comment_replies)
    console.log(comment_id)
    const likeBtn = (<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20"><path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" fill-rule="evenodd" clip-rule="evenodd"></path></svg>)
    const notLikeBtn = (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>)

    const [like, setlike] = useState(false)
    const [likeCounts, setLikeCounts] = useState("")
    const [username, setUsername] = useState("")
    const [userProfile, setUserProfile] = useState("")
    const [getUser, getUserData] = useMutation(getUserQuery)
    const [deleteComment, deleteCommentData] = useMutation(deleteCommentQuery)
    const [checkLikeComment, checkLikeCommentData] = useMutation(checkLikeCommentQuery)
    const [likeComment, likeCommentData] = useMutation(likeCommentQuery)
    const [unlikeComment, unlikeCommentData] = useMutation(unlikeCommentQuery)
    const [likeCount, likeCountData] = useMutation(getLikeCountQuery)
    const [replyVisibility, setReplyVisibility] = useState(false)
    const [replyCount, setReplyCount] = useState(0)
    
    const [addReply, addReplyData] = useMutation(addNewReplyQuery)
    const [likeReply, LikeReplyData] =useMutation(likeReplyQuery)
    const [deleteReply, deleteReplyData] = useMutation(deleteReplyQuery)
    const [unlikeReply, unlikeReplyData] = useMutation(unlikeReplyQuery)
    const [replyIsLiked, replyIsLikedData] = useMutation(replyIsLikedQuery)
    const [replyLikeCount, replyLikeCountData] = useMutation(replyLikeCountQuery)
    
    const [newReply, setNewReply] = useState("")
    const [showReplyInput, setShowReplyInput] = useState(false)

    const currUser = JSON.parse(localStorage.getItem("user"))
    function toggleLike(){
        if(like){
            if(comment_header_id == -1){
                unlikeComment({
                    variables:{
                        user_id: currUser.id,
                        comment_id: comment_id
                    }
                })
            }else{
                unlikeReply({
                    variables:{
                        user_id: currUser.id,
                        reply_id: comment_id
                    }
                })
            }
            
        }else{
            if(comment_header_id == -1){
                likeComment({
                    variables:{
                        user_id: currUser.id,
                        comment_id: comment_id
                    }
                })
            }
            else{
                likeReply({
                    variables:{
                        user_id: currUser.id,
                        reply_id: comment_id
                    }
                })
            }
        }
        setlike(!like)
    }
    function deleteCmment(){
        if(comment_header_id == -1){
            deleteComment({
                variables:{
                    comment_id:comment_id
                }
            })
        }else{
            deleteReply({
                variables:{
                    reply_id:comment_id
                }
            })
        }
    }

    function addRply(){
        if(comment_header_id == -1){
            addReply({
                variables:{
                    comment_id: comment_id,
                    user_id: currUser.id,
                    reply: newReply
                }
            })    
        }else{
            addReply({
                variables:{
                    comment_id: comment_header_id,
                    user_id: currUser.id,
                    reply: newReply
                }
            })    
        }
        
    }

    useEffect(() =>{

        if(addReplyData.data != null && addReplyData.data != undefined)
            window.location.reload()
    }, [addReplyData.data])


    useEffect(() => {
        getUser({
            variables:{
                user_id: comment_user_id
            }
        })
        if(comment_header_id == -1){
            checkLikeComment({
                variables:{
                    comment_id:comment_id,
                    user_id: currUser.id
                }
            })
            likeCount({
                variables:{
                    comment_id: comment_id
                }
            })
        }else{
            replyIsLiked({
                variables:{
                    user_id: currUser.id,
                    reply_id: comment_id
                }
            })
            replyLikeCount({
                variables:{
                    reply_id: comment_id
                }
            })
        }
        
    }, [])

    useEffect(()=>{

        if(deleteCommentData.data !== undefined && deleteCommentData.data != null){
            window.location.reload()
        }

    }, [deleteCommentData.loading])

    useEffect(()=>{

        if(deleteReplyData.data !== undefined && deleteReplyData.data != null){
            window.location.reload()
        }

    }, [deleteReplyData.loading])

    useEffect(() =>{

        if(getUserData.data !== undefined && getUserData.data != null){
            setUsername(getUserData.data.getUserBasedOnId.username)
            setUserProfile(getUserData.data.getUserBasedOnId.picture)
        }
    }, [getUserData.data])


    useEffect(() =>{
        
        if(likeCountData.data !== undefined && likeCountData.data != null){
            let likes = likeCountData.data.commentLikeCount
            setLikeCounts(millify(likes*1000))
        }
        if(replyLikeCountData.data !== undefined && replyLikeCountData.data != null){
            let likes = replyLikeCountData.data.replyLikeCount
            setLikeCounts(millify(likes*1000))
        }
    }, [likeCountData.data, replyLikeCountData.data])

    useEffect(() => {
        if(comment_header_id == -1){
            if(checkLikeCommentData.error != null){
                setlike(false)
            }else{
                setlike(true)
            }
        }else{
            if(replyIsLikedData.error != null){
                setlike(false)
            }else{
                setlike(true)
            }
        }
        
    }, [checkLikeCommentData.loading, replyIsLikedData.loading])

    return(
        
        <div className="commentSection">
            {/* Comment Map */}
            <div className="comment">
                {(atHome)?null:<img src={userProfile} alt="" />}
                <div className="commentRight">
                    <div className="commentRightTop">
                        <div className="commentValue">
                            <a id="usernameComment" href={'/profile/'+username}><b>{username}</b> {comment_value}</a>
                            
                        </div>
                        
                        {/* like/dislike btn */}
                        <div className="interactComment">
                            <button id="likeButton" onClick={toggleLike}>
                                {(like)?likeBtn:notLikeBtn}
                            </button>
                            {(currUser.id == comment_user_id)?<button id="likeButton" onClick={deleteCmment}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>: null}
                            
                        </div>
                    </div>
                    
                    <div className="infoDiv">
                        
                       <p className="totalLikes">{likeCounts} Likes</p>
                        {(atHome)?null:<button className="replyButton" onClick={()=>setShowReplyInput(!showReplyInput)}>Reply</button>}
                        {(comment_replies != undefined && comment_replies != null && comment_replies.length > 0 && comment_header_id == -1)?
                            (!replyVisibility)?
                                <button className="replyButton" onClick={() => setReplyVisibility(!replyVisibility)}>View {comment_replies.length} Replies</button>
                            :
                                null
                        :
                            null}
                    </div>
                    {(showReplyInput?
                    <span>
                        <input type="text" placeholder="Add a reply..." onChange={e =>{setNewReply(e.target.value)}}/>
                        <button onClick={addRply}>Post</button>
                    </span>
                    
                    
                    :null)}
                    {(comment_header_id == -1 && comment_replies != null && comment_replies.length > 0)?
                        (replyVisibility?
                        <div className="commentReplies">
                        {comment_replies.map((content) =>{
                            return(<Comment comment_id={content.id} comment_value={content.reply} comment_user_id = {content.user_id} comment_header_id= {comment_id} comment_replies = {null}/>)
                        })}
                        <button className="replyButton" onClick={() => setReplyVisibility(!replyVisibility)}>Hide {comment_replies.length} Replies</button>
                    </div>:null)
                    : null}
                    
                    
                    
                </div>
                
                
            </div>
        </div>
    )
}