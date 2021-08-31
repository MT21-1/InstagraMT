import React, { useState, useEffect } from 'react'
import Footer from '../AddOns/Footer/Footer'
import UserHeader from '../AddOns/Header/UserHeader'

export default function UploadPage(){

    return(
        <React.Fragment>
            <UserHeader/>
            <div id="uploadOuterDiv">
                <div id="uploadMainDiv">
                    {/* div untuk form */}
                    <div id="uploadFormDiv">
                       
                        <div id="uploadForm">
                            <h1>Upload</h1>
                            <div id="uploadArea">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                </svg>
                                <input type="file" name="upload" id="upload" accept="image/*, video/*" multiple={true}/>
                            </div>
                            
                            <div id="textAreaDiv">
                                Caption
                                <textarea name="caption" id="caption" cols="30" rows="10"></textarea>
                            </div>
                            <div id="buttonDiv">
                                <button id="uploadButton">Upload</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </React.Fragment>
    )


}