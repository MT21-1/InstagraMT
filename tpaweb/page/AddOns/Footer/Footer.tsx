import React from "react"


export default function Footer(){
    return(
        <div className="footer">
            <div className="links">
                <a href="https://about.instagram.com/">About</a>
                <a href="https://about.instagram.com/en_US/blog">Blog</a>
                <a href="https://about.instagram.com/about-us/careers">Jobs</a>
                <a href="https://help.instagram.com/">Help</a>
                <a href="https://developers.facebook.com/docs/instagram">API</a>
                <a href="https://www.instagram.com/legal/privacy/">Privacy</a>
                <a href="https://www.instagram.com/legal/terms/">Terms</a>
                <a href="https://www.instagram.com/directory/profiles/">Top accounts</a>
                <a href="https://www.instagram.com/directory/hashtags/">Hashtags</a>
                <a href="https://www.instagram.com/explore/locations/">Locations</a>
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