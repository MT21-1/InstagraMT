import React, { useState, useEffect } from 'react'

export default function StoryPage(){

    return(
        <div id="storyOuterDiv">
            <div id="storyHeader">
                <div className="logo">
                    <h1>InstagraMT</h1>
                </div>
                <a href="/"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg></a>
                
            </div>
            <div id="storyMainDiv">
                <button id="leftSlide">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
                </button>
                <div id="story">
                    
                    <div id="profile">
                        <div id="progressBar"></div>
                        <div id="profileDiv">
                            
                            <div id="profileImage">
                                <a href="/profile/user123">
                                 <img src="wp.jpg" alt="" />
                                </a>
                            </div>
                            <h1>Sugiono</h1>
                            
                        </div>
                        
                    </div>
                    <div id="interaction">
                        <input type="text" placeholder="Reply to Sugiono..."/>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                        </svg>
                    </div>
                </div>
                <button id="rightSlide">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
                </button>
            </div>
        </div>
    )
}