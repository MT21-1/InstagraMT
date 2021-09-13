import React, { useContext, useEffect, useState } from 'react'
import {gql, useMutation} from '@apollo/client'
import { JWTContext } from '../../App'
import GoogleLogin from 'react-google-login'
import { GmailLogin } from '../Components/GmailLogin'
import GuestHeader from '../AddOns/Header/GuestHeader'
import Footer from '../AddOns/Footer/Footer'
import { useHistory } from 'react-router-dom'
import ReactLoading from "react-loading"


const loginQuery = gql`
    mutation LoginUser($email: String!, $pass: String!){
        loginUser(input:{
            email:$email,
            password:$pass
        })
    }
`

const resendCodeQuery = gql `
    mutation sendVerificationCode($email: String!){
         resendVerificationCode(input:$email)
    }
`

const getUser = gql`

    mutation getUserFromEmail($email: String!){
    getUserBasedOnEmail(input: $email)
    {
        id
        email
        username
        picture
        full_name
        is_verified
        is_google_account
        }
    }
`



export default function LoginPage(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorText, setErrorText] = useState("")
    const [login, {data, loading, error}] = useMutation(loginQuery)
    const [getUserState, userData] = useMutation(getUser)
    const [resendCode, resendData] = useMutation(resendCodeQuery)
    const history = useHistory()

    const [_, setJWT] = useContext(JWTContext)

    const loadingBtn = (<button className="loadingButton" ><ReactLoading type={"spokes"} color={'white'} height={'7%'} width={'7%'}/></button>)

    const responseGoogle = (response) => {
        console.log(response);
      }
      
    if(error !== undefined){
        document.getElementById("error").innerHTML = error.message
    }

    useEffect(() => {
        if(userData.data !== undefined && userData.data !== ""){
            console.log(userData.data.getUserBasedOnEmail)
            if(!userData.data.getUserBasedOnEmail.is_verified){
                // klo belom verif kita redirect
                let userEmail = userData.data.getUserBasedOnEmail.email
                resendCode({
                    variables:{
                        email: userEmail
                    }
                })
                history.push("/verify/" + userEmail)
            }else{
                localStorage.setItem("user", JSON.stringify(userData.data.getUserBasedOnEmail))
                setJWT(data.loginUser)
            }
        }
            
    }, [userData])

    useEffect(() => {
        if(data !== undefined && data!= null){
            // disini masukin data user kedalam localstoreg

            getUserState({
                variables:{
                    email: email
                }
            })
        }
        
    }, [data])

    function logins(){
        login({
            variables:{
                email: email,
                pass: password
            }
        })
        event.preventDefault();
    }
    return (
        <React.Fragment>
            <GuestHeader/>
            <div id="loginOuterDiv">
                <div id="loginMainDiv">
                    {/* gambar div */}
                    <div id="loginImageDiv">
                        <img src="/phone.png" alt="" />
                    </div>

                    {/* div untuk form */}
                    <div id="loginFormDiv">
                        <div id="loginForm">
                            <h1 id="title">InstagraMT</h1>
                            <form action="#">
                                <input type="text" name="id" id="id" placeholder="Email" onChange={e=>{setEmail(e.target.value)}}/>
                                <input type="password" name="pass" id="pass" placeholder="Password" onChange={e=>{setPassword(e.target.value)}}/>
                                <p className="errorText" id="error"></p>
                                {(loading)?(loadingBtn):(<input type="submit" value="Log In" id="loginButton" onClick={logins}/>)}
                            </form>
                            <div id="orDiv">
                                <hr />
                                <p>OR</p>
                                <hr />
                            </div>

                            <button id="altLogin" type="button">
                                <GmailLogin></GmailLogin>
                            </button>
                            <a href="/forgot"> Forgot Password?</a>
                        </div>

                        <div id="signUpDiv">
                            <span>Don't have an account?</span>
                            <a href="/signup">Sign Up</a>
                        </div>
                        <div id="downloadDiv">
                            <p>Get the app</p>
                            <span>
                                <img src="/appleDownload.png" alt="" />
                                <img src="/googleDownload.png" alt="" />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </React.Fragment>
    );
}