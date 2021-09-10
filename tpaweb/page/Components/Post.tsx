import React, { useState } from 'react'
import Comment from './Comment';
import millify from 'millify';
import Popup from 'react-animated-popup';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Popup2 from 'reactjs-popup';
Popup

export default function Post(){
    const [comment, setComment] = useState("");
    const [showMore, setShowMore] = useState(false);
    const [like, setLike] = useState(false);
    const [saved, setSaved] = useState(false);
    const [visible, setVisible] = useState(false)
    const [visible2, setVisible2] = useState(false);
    var likes = 32644000;
    var comments = 68200;
    var getCaption = "bambang Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex consequatur aperiam officia animi voluptatibus tenetur dignissimos veniam ad id. Quod, ani";
    var shortenCaption;
    var shortened = false;
    var isShort;
    if(getCaption.length > 30){
        shortenCaption = getCaption.substr(0,20);
        shortenCaption += "...."
        shortened = true;
        isShort = false;
    }else{
        shortenCaption = getCaption;
        isShort = true;
    }

    var convertedLikes = millify(likes)
    var convertedComments = millify(comments);

    function showFullCaption(){
        shortened= !shortened;
        setShowMore(shortened);
    }

    function toggleLike(){
        setLike(!like);
        // masukin code dbnya
    }
    function toggleSaved(){
        setSaved(!saved);
        // masukin code dbnya
    }


    return(
        <div className="postDiv">
                            <Popup visible={visible2} onClose={() => setVisible2(false)} >
                                <div className="deleteModal">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                        
                                    <p>Are You Sure You Want To Delete The Post?</p>
                                    <button id="confirm">Yes</button>
                                </div>
                                        
                            </Popup>                 
                            {/* Profile */}
                            <div className="postProfileDiv">
                                
                                <a href="#" id="username">
                                    <img src="/profile.jpg" alt="" />
                                    <span>Bimbing</span>
                                </a>
                            <Popup2 trigger={
                                <button id="postSettingButton"> 
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                                    </svg>
                                </button>} position="left top">
                                    
                                    <div className="popUpPost">
                                        <button id="editButton">Edit</button>
                                        <button onClick={()=>setVisible2(true)}>Delete</button>
                                    </div>
                            </Popup2>
                            </div>
                           
                            {/* ini untuk post */}
                            <div className="pictureDiv">
                                <img src="/wp.jpg" alt="" />
                            </div>

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
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                            </svg>
                                        </button>

                                        {/* Share */}
                                        <button id="share" onClick={()=>setVisible(true)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                            </svg>
                                        </button>
                                        <Popup visible={visible} onClose={() => setVisible(false)} >
                                            <div className="modal">
                                            Share
                                            <div id ="buttonShareModal">
                                            <CopyToClipboard text={shortenCaption}>
                                                <button id="shareClipboard">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                                </svg>
                                                </button>
                                            </CopyToClipboard>
                                              
                                                <button id="shareSosmed">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96.124 96.123">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M72.089,0.02L59.624,0C45.62,0,36.57,9.285,36.57,23.656v10.907H24.037c-1.083,0-1.96,0.878-1.96,1.961v15.803
                                                        c0,1.083,0.878,1.96,1.96,1.96h12.533v39.876c0,1.083,0.877,1.96,1.96,1.96h16.352c1.083,0,1.96-0.878,1.96-1.96V54.287h14.654
                                                        c1.083,0,1.96-0.877,1.96-1.96l0.006-15.803c0-0.52-0.207-1.018-0.574-1.386c-0.367-0.368-0.867-0.575-1.387-0.575H56.842v-9.246
                                                        c0-4.444,1.059-6.7,6.848-6.7l8.397-0.003c1.082,0,1.959-0.878,1.959-1.96V1.98C74.046,0.899,73.17,0.022,72.089,0.02z"/>
                                                </svg>
                                                </button>
                                                <button id="shareDm">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                                </svg>
                                                </button>
                                            </div>
                                            </div>
                                            
                                        </Popup>
                                       
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
                                <p id="likes">{convertedLikes} likes</p>

                                <p className="captionDiv">
                                    <p id="username">Bimbing</p>
                                    {(isShort)?(<p id="caption">{getCaption}</p>): (!showMore && !isShort)? (
                                    <React.Fragment>
                                        <p id="caption">{shortenCaption}<div id="showMore" onClick={showFullCaption}>more</div></p>
                                        
                                    </React.Fragment>)
                                    : (
                                    <React.Fragment>
                                        <p id="caption">{getCaption}<div id="showMore" onClick={showFullCaption}>hide</div></p>
                                        
                                    </React.Fragment>
                                    )}
                                    
                                </p>
                                <a href="#" className="viewMoreComments"> View all {convertedComments} Comments</a>
                                {/* Commnet section */}
                                <Comment/>
                                <Comment/>
                                <Comment/>
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

                                <button id="postButton">
                                    Post
                                </button>

                            </div>
                        </div>
    )
}