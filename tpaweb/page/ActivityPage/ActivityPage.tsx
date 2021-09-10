import React, { useState, useEffect } from 'react'
import Footer from '../AddOns/Footer/Footer'
import UserHeader from '../AddOns/Header/UserHeader'
import CommentStrip from './commentStrip'
import FollowStrip from './followStrip'
import LikeStrip from './likeStrip'
import MentionStrip from './MentionStrip'
import TaggedStrip from './TaggedStrip'

export default function ActivityPage(){
    return(
        <React.Fragment>
        <UserHeader/>
        <div id="activityOuter">
            <div id="activityMain">
                <MentionStrip></MentionStrip>
                <FollowStrip></FollowStrip>
                <FollowStrip></FollowStrip>
                <FollowStrip></FollowStrip>
                <FollowStrip></FollowStrip>
                <FollowStrip></FollowStrip>
                <LikeStrip></LikeStrip>
                <CommentStrip></CommentStrip>
                <CommentStrip></CommentStrip>
                <CommentStrip></CommentStrip>
                <CommentStrip></CommentStrip>
                <TaggedStrip></TaggedStrip>
                <FollowStrip></FollowStrip>
                <FollowStrip></FollowStrip>
                <FollowStrip></FollowStrip>
                <FollowStrip></FollowStrip>
                <FollowStrip></FollowStrip>
                <LikeStrip></LikeStrip>
                <CommentStrip></CommentStrip>
                <CommentStrip></CommentStrip>
                <CommentStrip></CommentStrip>
                <CommentStrip></CommentStrip>
                <TaggedStrip></TaggedStrip>

            </div>
        </div>
        <Footer/>
    </React.Fragment>
    )
}