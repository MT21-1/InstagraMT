import React, { useState, useEffect } from 'react'

export default function CommentStrip(){
    return(
        <div className="activityStrip">
            <div className="detail">
                <a href="/profile/user123">
                    <img src="/wp.jpg" alt="" />
                </a>
                <p><b>username</b> commented: apa gitu 🤡</p>
            </div>
            <div className="right">
                <a href="/post/12">
                    <img src="/wp.jpg" alt="" />
                </a>
            </div>
        </div>
    )
}