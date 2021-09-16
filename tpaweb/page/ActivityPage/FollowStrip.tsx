import React, { useState, useEffect } from 'react'

export default function FollowStrip(){

    const [follow, setFollow] = useState(false)

    const toggleFollow = () =>{
        setFollow(!follow)
    }

    const followBtn = (<button className="followButton" onClick={toggleFollow}>Follow</button>)
    const followingBtn = (<button className="followingButton"onClick={toggleFollow}>Following</button>)
    return(
        <div className="activityStrip">
            <div className="detail">
                <a href="/profile/user123">
                    <img src="/wp.jpg" alt="" />
                </a>
                <p><b>username</b> started following you.</p>
            </div>
            <div className="right">
                {(follow)?followingBtn:followBtn}
            </div>
        </div>
    )
}