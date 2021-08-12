import React, { useState } from 'react'
import Comment from './Comment';

export default function Post(){
    const [comment, setComment] = useState("");
    return(
        <div className="postDiv">
                            {/* Profile */}
                            <div className="postProfileDiv">
                                
                                <a href="#" id="username">
                                    <img src="/profile.jpg" alt="" />
                                    <span>Bimbing</span>
                                </a>

                                <button id="postSettingButton"> 
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                                    </svg>
                                </button>
                                
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
                                        <button id="like">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                            </svg>
                                        </button>

                                        {/* Comment */}
                                        <button id="comment">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                            </svg>
                                        </button>

                                        {/* Share */}
                                        <button id="share">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                            </svg>
                                        </button>
                                    </div>

                                    {/* Save */}
                                    <button id="save">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                        </svg>
                                    </button>

                                </div>

                                {/* jumlah likes */}
                                <p id="likes">2,216 likes</p>

                                <p className="captionDiv">
                                    <p id="username">Bimbing</p>
                                    <p id="caption">This is my first post!</p>
                                </p>
                                <a href="#" className="viewMoreComments"> View all 115 Comments</a>
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