import React, { useState, useEffect, useRef } from 'react'

export default function StoryPage(){
    const videoCtrl = useRef<HTMLVideoElement>(null)
    const [play, setPlay] = useState(false)
    const [mute, setMute] = useState(false)

    function handleMute(){
        if(videoCtrl.current!.muted){
            videoCtrl.current!.muted = false;
            setMute(false);
        }else{
            videoCtrl.current!.muted = true;
            setMute(true);
        }
    }
    function handleVideo(){
        if(videoCtrl.current!.paused){
            videoCtrl.current!.play()
            setPlay(true)
        }else{
            videoCtrl.current!.pause()
            setPlay(false)  
        }
    }
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
                            <div className="controls">
                                <button className="play">
                                    {((!play)? (
                                    <svg onMouseDown={handleVideo} onMouseUp={handleVideo} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>):(
                                    <svg onMouseDown={handleVideo} onMouseUp={handleVideo} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    ))}
                                </button>
                                <button className="mute">
                                    {((mute == false)? (
                                        <svg onClick={handleMute} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                                    </svg>
                                        ):(
                                        <svg onClick={handleMute} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clip-rule="evenodd" />
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                                        </svg>
                                    ))}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="content">
                    <video className="displayed"src="/video.mp4" ref={videoCtrl} preload="auto"/>
                    
                    
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