import React, { useState, useEffect } from 'react'

export default function MentionStrip(){
    return(
       <div className="mentionStrip">
           <div id="storyImg">
               <a href="/story">
                    <img src="/wp.jpg" alt="" />
               </a>
           </div>
           <div id="detail">
                <h1>Mentions</h1>
                <p>1 story mentioned you</p>
           </div>
       </div>
    )
}