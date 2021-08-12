import React, { useContext, useEffect, useState } from 'react'
import {gql, useMutation} from '@apollo/client'
import { JWTContext } from '../../App'
import { GmailLogin } from '../Components/GmailLogin'
import GuestHeader from '../AddOns/Header/GuestHeader'
import { useHistory, useParams } from 'react-router-dom'
import Countdown from 'react-countdown'
import Footer from '../AddOns/Footer/Footer'



//buat query ganti verified ke true

const verifyEmailQuery = gql `
    mutation verifyEmail($email: String!, $token: String!){
    verifyUser(
        input:{
            email: $email,
            token: $token
        })
    }
`

const resendCodeQuery = gql `
    mutation sendVerificationCode($email: String!){
         resendVerificationCode(input:$email)
    }
`

export default function VerifyEmailPage(){

    let {userEmail} = useParams<{userEmail:string}>()
    
    const [verifyToken, setVerifyToken] = useState("")
    const [errorText, setErrorText] = useState("")
    const [_, setJWT] = useContext(JWTContext)
    const [verifyUser, {data, loading, error}] = useMutation(verifyEmailQuery)
    const [resendCode, resendData] = useMutation(resendCodeQuery)

    const [timeIndex, setTimeIndex] = useState(0)
    const [currentTime, setCurrentTime] = useState(Date.now() + 10000)

    useEffect(() => {

        if(data !== undefined && data !== null){
            setJWT(data.VerifyUser)
        }
    }, [data])


    if(error !== undefined){
        if(error.message == "internal system error"){
            document.getElementById("error").innerHTML = "Invalid Token"    
        }else{
            document.getElementById("error").innerHTML = error.message
        }
        
    }

    function verify(){
        verifyUser({
            variables:{
                email: userEmail,
                token: verifyToken
            }
        })
    
    }

    function resend(){
        resendCode({
            variables:{
                email: userEmail
            }
        })
        setTimeIndex(timeIndex+1)
        setCurrentTime(Date.now() + 10000)
        
    }
    const renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
          // Render a completed state
          return <a href="#" onClick={resend}> Resend Code</a>;
        } else {
          // Render a countdown
          return <span> {minutes}:{seconds}</span>;
        }
      };

    return(
        <React.Fragment>
        <GuestHeader/>
        <div id="verifyOuterDiv">
            <div id="verifyMainDiv">
                {/* div untuk form */}
                <div id="verifyFormDiv">
                    <div id="verifyForm">
                        <h1 id="title">InstagraMT</h1>
                        <div>
                            <img src="/verify.png" alt="verify"/>
                        </div>
                        <p className="verifyText">
                            Thanks For Signing Up, Enter Your Verification Code that we sent to 
                                <u> {userEmail} </u> 
                            Down below
                        </p>


                        <form action="#">
                            <input type="text" name="id" id="token" placeholder="Token" onChange={e=>{setVerifyToken(e.target.value)}} />
                            <p id="errorMsg"></p>
                            <p id="error" className="errorText"></p>
                            <input type="button" value="Verify" id="verifyButton" onClick={verify}/>
                        </form>
                        
                        <p className="resend">Resend Verification Code 
                            <p id="resendTimer">
                                <Countdown date={currentTime} renderer={renderer} key={timeIndex} />
                            </p>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <Footer></Footer>
    </React.Fragment>
    )
}