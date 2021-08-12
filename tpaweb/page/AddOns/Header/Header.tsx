import React, { useContext } from 'react'
import { JWTContext } from '../../../App'



function checkLoggedIn(){
    const [_, setJWT] = useContext(JWTContext)
    const jwt = localStorage.getItem("jwt")

    function logOut(){
        setJWT("")    
    }

    if(true){
        return(
        // klo udah login panggil ini
        <div className="pembungkus">
            <div className="header">
                <div className="logo">
                    <h1>InstagraMT</h1>
                </div>
                <div className="searchBar">
                    <form action="">
                        <input type="text" placeholder="Search" name="searchQuery" id=""/>
                    </form>
                </div>
                <div className="iconDiv">
                    <a href="#" id="home">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                    </a>
                    <a href="#" id="msg">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    </a>
                    <a href="#" id="explore">
                    <svg xmlns="http://www.w3.org/2000/svg"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                    </a>
                    <a href="#" id="like">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    </a>

                    <a href="#" id="profile">
                        <img src="./profile.jpg" alt="" />
                    </a>
                    <a href="#">
                        <button onClick={logOut}>
                            LogOut
                        </button>
                    </a>

                    <a href="#" id="msgMobile">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    </a>
                </div>
            </div>
        </div>
        )
    }else{
        return(
            <div className="pembungkus">
            <div className="header">
                <div className="logo">
                    <h1>InstagraMT</h1>
                </div>
                <div className="navDiv">
                    <a href="/login">
                        Login
                    </a>
                    <a href="/signup">
                        Sign Up
                    </a>
                </div>
            </div>
        </div>
        )
    }
}

export default function Header(){
    
    return(
        checkLoggedIn()
    )
}