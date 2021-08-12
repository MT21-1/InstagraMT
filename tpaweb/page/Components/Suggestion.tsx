import React from 'react'

export default function Suggestion(){
    return(
        <div className="friendSuggestion">
            <div className="profileDetail">
                <img src="/profile.jpg" alt="profilepic" />
                <div>
                    <p className="username">bambang</p>
                    <p className="subname">Followed by bambang</p>    
                </div>
            </div>
            
            <a href="#">Follow</a>
        </div>
    )
}