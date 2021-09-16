import React, { useState, useEffect } from 'react'
import Footer from '../AddOns/Footer/Footer'
import UserHeader from '../AddOns/Header/UserHeader'

export default function SuggestionPage(){

    return(
        <React.Fragment>
            <UserHeader/>
            <div className="settingOuterDiv">
                Suggestions
            </div>
            <Footer/>
        </React.Fragment>
    )
}