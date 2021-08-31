import React from 'react'
import VideoStrip from './videoStrip'
import ImageStrip from './imageStrip'
import UserHeader from '../AddOns/Header/UserHeader'
import Footer from '../AddOns/Footer/Footer'

export default function ExplorePage(){

    return (
        <React.Fragment>
        <UserHeader/>
        <div className="exploreOuterDiv">
            <div className="exploreInnerDiv">
                <VideoStrip/>
                <ImageStrip/>
                <VideoStrip/>
                <ImageStrip/>
                <VideoStrip/>
                <ImageStrip/>
            </div>
        </div>
        <Footer/>
        </React.Fragment>
    )

}