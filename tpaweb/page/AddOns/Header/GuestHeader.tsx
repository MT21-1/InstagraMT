import React, { useContext } from "react";
import { JWTContext } from "../../../App";

export default function GuestHeader(){
    const [_, setJWT] = useContext(JWTContext)
    const jwt = localStorage.getItem("jwt")

    function logOut(){
        setJWT("")    
    }
    
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