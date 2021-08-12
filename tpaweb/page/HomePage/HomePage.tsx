import React, { useState } from 'react'
import Footer from '../AddOns/Footer/Footer'
import UserHeader from '../AddOns/Header/UserHeader'
import Post from '../Components/Post'
import Story from '../Components/Story'
import Suggestion from '../Components/suggestion'

export default function HomePage(){

    const user = JSON.parse(localStorage.getItem("user"))

    return(
        <React.Fragment>
            <UserHeader/>
            
            <div className="outerDiv">

                <div className="innerDiv">
                    {/* Post + story div */}
                    <div className="leftHomeDiv">

                        {/* Story div */}
                        <div className="storyDiv">
                            <Story></Story>
                            <Story></Story>
                            <Story></Story>
                            <Story></Story>
                            <Story></Story>
                            <Story></Story>
                            <Story></Story>
                            <Story></Story>
                            <Story></Story>
                            <Story></Story>
                            <Story></Story>
                            <Story></Story>
                            <Story></Story>
                            <Story></Story>
                        </div>

                        {/*Map Post div */}
                        <Post></Post>
                        <Post></Post>
                        <Post></Post>
                        <Post></Post>
                        <Post></Post>
                        <Post></Post>
                        <Post></Post>
                        <Post></Post>
                        <Post></Post>
                        <Post></Post>
                        <Post></Post>
                        <Post></Post>
                    </div>

                    {/* //Suggestion Absolute */}
                    <div className="rightHomeDiv">

                        {/* profile snediri */}
                        <div className="profileSuggestion">
                            <div className="profileDetail">
                                <img src={user.profile} alt="profilepic" />
                                <div>
                                    <p className="username">{user.username}</p>
                                    <p className="subname">{user.full_name}</p>    
                                </div>
                            </div>
                            
                            <a href="#">Switch</a>
                        </div>

                        <span>Suggestions For You <a href="#">See All</a></span>

                        {/* nanti map suggestion disini */}
                        <Suggestion></Suggestion>
                        <Suggestion></Suggestion>
                        <Suggestion></Suggestion>
                        <Suggestion></Suggestion>
                        <Suggestion></Suggestion>
                        <div>

                        </div>
                        <Footer></Footer>
                    </div>

                </div>
                
            </div>
        </React.Fragment>
        
    )

}