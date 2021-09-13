import React, { useContext, useEffect, useState } from 'react'
import {gql, useMutation} from '@apollo/client'
import { JWTContext } from '../../App'
import { GmailLogin } from '../Components/GmailLogin'
import GuestHeader from '../AddOns/Header/GuestHeader'
import Footer from '../AddOns/Footer/Footer'
import Countdown from 'react-countdown'
import ReactLoading from "react-loading"

const emailExistQuery = gql `
    
    mutation EmailExist($email: String!){
    emailExist(input:$email)
    }
`

const SendCodeQuery = gql `
    mutation sendResetCode($email: String!){
    sendResetPassword(input:$email)
    }

`


export default function ForgotPasswordPage(){

    const [email, setEmail] = useState("")
    const [errorText, setErrorText] = useState("")
    const [_, setJWT] = useContext(JWTContext)
    const [emailExist, {data,loading,error}] = useMutation(emailExistQuery)
    const [sendCode, codeData] = useMutation(SendCodeQuery)

    const [timeIndex, setTimeIndex] = useState(0)
    const [currentTime, setCurrentTime] = useState(null)
    const loadingBtn = (<div className="loadingAnimation"><ReactLoading type={"spokes"} color={'black'} height={'100%'} width={'100%'}/></div>)
    const styles = {
        display: 'none'
    }

    function checkEmail(){
        if(email == ""){
            document.getElementById("error").innerHTML = "Email Can Not Be Empty"
            return false;
        }
        emailExist({
            variables:{
                email: email
            }
        })
        setTimeIndex(timeIndex+1)
        setCurrentTime(Date.now() + 10000)
    }

    if(error !== undefined && error.message == ""){
        document.getElementById("error").innerHTML = "Email Doesn't Exist"
    }

    useEffect(() => {
        
        if(error !== undefined && error.message == "email is used"){
            //send link query
            console.log("helo")
            document.getElementById("error").innerHTML = "Verification Code Sent!";
            (document.getElementById("sendButton") as HTMLButtonElement).disabled = true
            document.getElementById("sendButton").style.backgroundColor = "darkgray";
            document.getElementById("resend").style.display = "block"
            setTimeIndex(timeIndex+1)
            setCurrentTime(Date.now() + 10000)
            sendCode({
                variables:{
                    email: email
                }
            })
        }
        
    }, [data, error])

    const renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
          // Render a completed state
          return <a href="#" onClick={checkEmail}> Resend Code</a>;
        } else {
          // Render a countdown
          return <span className="countdown">{loadingBtn}{minutes}:{seconds}</span>;
        }
      };

    return(
        <React.Fragment>
        <GuestHeader/>
        <div id="forgotOuterDiv">
            <div id="forgotMainDiv">
                {/* div untuk form */}
                <div id="forgotFormDiv">
                    <div id="forgotForm">
                        <div>
                            <img src="/forgotpassword.png" alt="forgot"/>
                        </div>
                        <h1>Trouble Logging in?</h1>
                        <p className="forgotText">Enter Your email and we'll send you a link to get back into your account</p>
                        <form action="#">
                            <input type="text" name="id" id="email" placeholder="Email" onChange={e=>{setEmail(e.target.value)}} />
                            <p id="error" className="errorText"></p>
                            <input type="button" value="Send Login Link" id="sendButton" onClick={checkEmail}/>
                        </form>
                        <p className="resend" id="resend" style = {styles}>Resend Verification Code 
                            <p id="resendTimer">
                                <Countdown date={currentTime} renderer={renderer} key={timeIndex} />
                            </p>
                        </p>
                        <div id="orDiv">
                            <hr />
                            <p>OR</p>
                            <hr />
                        </div>

                        <a href="/signup">Create New Account</a>
                    </div>
                    <div className="backButton">
                        <a href="/login">Back To Login</a>
                    </div>
                    
                </div>
            </div>
        </div>
        <Footer/>
    </React.Fragment>
    )
}