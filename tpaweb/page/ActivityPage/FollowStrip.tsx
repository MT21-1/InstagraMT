import React, { useState, useEffect } from 'react'

export default function FollowStrip(){
    return(
        <div className="activityStrip">
            <div className="detail">
                <img src="wp.jpg" alt="" />
                <p><b>username</b> started following you.</p>
            </div>
            <div className="right">
                <button>Follow</button>
            </div>
        </div>
    )
}