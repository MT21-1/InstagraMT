import React, { useState, useEffect } from 'react'

export default function TaggedStrip(){
    return(
        <div className="activityStrip">
        <div className="detail">
            <img src="wp.jpg" alt="" />
            <p><b>username</b> tagged you in a post.</p>
        </div>
        <div className="right">
            <img src="wp.jpg" alt="" />
        </div>
    </div>
    )
}