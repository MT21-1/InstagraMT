import React from 'react'

export const Suggestion= (props)=>{
    const username = props.username
    const picture = props.picture
    const fullname = props.fullname

    return(
        <div className="friendSuggestion">
            <div className="profileDetail">
                <img src={picture} alt="profilepic"/>
                <div>
                    <p className="username">{username}</p>
                    <p className="subname">{fullname}</p>    
                </div>
            </div>
            <a href={`/profile/${username}`}>Follow</a>
        </div>
    )
}