import React, { useState, useEffect } from 'react'


export default function VideoStrip(){
    return(
        <div className="videoGlobalStrip">
            {/* grid */}
            <div className="videoLeft"> 
                <img src="wp.jpg" alt="" />
                <img src="wp.jpg" alt="" />
            </div>
            <div className="videoRight">
                <img src="wp.jpg" alt="" />
            </div>
        </div>
    )
}