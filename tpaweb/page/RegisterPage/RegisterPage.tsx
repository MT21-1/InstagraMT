import React, { useContext, useEffect, useState } from 'react'
import {gql, useMutation} from '@apollo/client'
import { JWTContext } from '../../App'
import { GmailLogin } from '../Components/GmailLogin'
import GuestHeader from '../AddOns/Header/GuestHeader'
import Footer from '../AddOns/Footer/Footer'
import { Redirect, useHistory } from 'react-router-dom'


const registerQuery = gql`
        mutation createNewUser2($email: String!, $full_name:String!, $username: String!, $pass: String!){
            createUser(input:{
                email: $email,
                full_name: $full_name,
                password: $pass,
                username: $username
            })
        }
`

export default function RegisterPage(){
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [full_name, setFullName] = useState("")
    const [password, setPassword] = useState("")
    const [errorText, setErrorText] = useState("")
    const [register, {data, loading, error}] = useMutation(registerQuery)
    const [_, setJWT] = useContext(JWTContext)
    const history = useHistory()
    useEffect(() => {
        if(data !== undefined && data!= null){
            history.push("/verify/"+email);
        }   
    }, [data])

    if(error !== undefined){
        document.getElementById("error").innerHTML = error.message
    }
    
    function registerUser(){
        register({
            variables:{
                username: username,
                email: email,
                full_name: full_name,
                pass: password
            }
        })
    }

    return(
        <React.Fragment>
        <GuestHeader/>
        <div id="registerOuterDiv">
            <div id="registerMainDiv">
                {/* div untuk form */}
                <div id="registerFormDiv">
                    <div id="registerForm">
                        <h1 id="title">InstagraMT</h1>

                        <p className="signUp">Sign up to see photos and videos from your friends.</p>
                        <button id="altLogin" type="button">
                            <GmailLogin></GmailLogin>
                        </button>

                        <div id="orDiv">
                            <hr />
                            <p>OR</p>
                            <hr />
                        </div>

                        <form action="#">
                            <input type="text" name="id" id="id" placeholder="Email" onChange={e=>{setEmail(e.target.value)}} />
                            <input type="text" name="id" id="id" placeholder="Full Name" onChange={e=>{setFullName(e.target.value)}}/>
                            <input type="text" name="id" id="id" placeholder="Username" onChange={e=>{setUsername(e.target.value)}}/>
                            <input type="password" name="pass" id="pass" placeholder="Password" onChange={e=>{setPassword(e.target.value)}}/>
                            <p id="error" className="errorText"></p>
                            <input type="button" value="Sign Up" id="registerButton" onClick={registerUser}/>
                        </form>
                        
                        <p className="terms">By signing up, you agree to our <a href="#">Terms</a> , <a href="#">Data Policy</a> and <a href="#">Cookies Policy</a> .</p>
                    </div>

                    <div id="signUpDiv">
                        <span>Have an account?</span>
                        <a href="/login">Log In</a>
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
    )
}