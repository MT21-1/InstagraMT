import { gql, useMutation } from '@apollo/client'
import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Footer from '../AddOns/Footer/Footer'
import GuestHeader from '../AddOns/Header/GuestHeader'

const resetPassQuery = gql`

    mutation verifyResetPassword($newPass: String!, $token: String!){
        verifyResetPassword(input:{token: $token, password: $newPass})
    }
`

export default function ResetPasswordPage(){
    let {token} = useParams<{token: string}>();

    const [resetPass, {data,loading,error}] = useMutation(resetPassQuery)
    const [pass, setPass] = useState("")

    function resetPassword(){
        resetPass({
            variables:{
                token:token,
                newPass: pass 
            }
        })
    }

    useEffect(() => {
        
        if(data !== undefined && data !== ""){
            document.getElementById("error").style.color = "green"
            document.getElementById("error").innerHTML="Password Successfuly Changed";
            (document.getElementById("sendButton") as HTMLButtonElement).disabled = true
            document.getElementById("sendButton").style.backgroundColor="darkgray"
        }

    }, [data])

    if(error !== undefined){
        if(error.message == "email doesn't exist")
            document.getElementById("error").innerHTML = "Invalid Token."
    }

        return(
            <React.Fragment>
            <GuestHeader/>
            <div id="resetOuterDiv">
                <div id="resetMainDiv">
                    {/* div untuk form */}
                    <div id="resetFormDiv">
                        <div id="resetForm">
                            <h1>Reset Password</h1>
                            <p className="resetText">Enter New Password</p>
                            <form action="#">
                                <input type="text" name="id" id="pass" placeholder="New Password" onChange={e=>{setPass(e.target.value)}} />
                                <p id="error" className="errorText"></p>
                                <input type="button" value="Change Password" id="sendButton" onClick={resetPassword}/>
                            </form>
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