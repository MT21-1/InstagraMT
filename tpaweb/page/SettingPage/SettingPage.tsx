import React, { useState, useEffect } from 'react'
import Footer from '../AddOns/Footer/Footer'
import UserHeader from '../AddOns/Header/UserHeader'

export default function SettingPage(){

    return(
        <React.Fragment>
            <UserHeader/>
            <div className="settingOuterDiv">
            Setting
                
            </div>
            <Footer/>
        </React.Fragment>
    )
}