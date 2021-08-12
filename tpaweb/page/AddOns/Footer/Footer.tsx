import React from "react"


export default function Footer(){
    return(
        <div className="footer">
            <div className="links">
                <a href="">About</a>
                <a href="">Blog</a>
                <a href="">Jobs</a>
                <a href="">Help</a>
                <a href="">API</a>
                <a href="">Privacy</a>
                <a href="">Terms</a>
                <a href="">Top accounts</a>
                <a href="">Hashtags</a>
                <a href="">Locations</a>
            </div>
            
            <span>
                <select name="language" id="language">
                    <option value="english">English</option>
                    <option value="indonesian">Indonesian</option>
                    <option value="japanese">Japanese</option>
                </select>
                <p>©2021 InstagraMT from MT21-1</p>
            </span>
        </div>
    )
}