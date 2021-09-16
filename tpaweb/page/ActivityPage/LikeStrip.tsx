import React, { useState, useEffect } from 'react'

export default function LikeStrip(){
    return(
        <div className="activityStrip">
            <div className="detail">
                <a href="/profile/user123">
                    <img src="/wp.jpg" alt="" />
                </a>
                <p><b>username</b> liked your post.</p>
            </div>
            <div className="right">
                <a href="/post/12">
                    <img src="/wp.jpg" alt="" />
                </a>
            </div>
        </div>
    )
}