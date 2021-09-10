import React, { useState, useEffect } from 'react'

export default function CommentStrip(){
    return(
        <div className="activityStrip">
            <div className="detail">
                <img src="wp.jpg" alt="" />
                <p><b>username</b> commented: apa gitu 🤡</p>
            </div>
            <div className="right">
                <img src="wp.jpg" alt="" />
            </div>
        </div>
    )
}