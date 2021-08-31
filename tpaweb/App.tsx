import React, { useState, useEffect, createContext } from 'react'
import {BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import Footer from './page/AddOns/Footer/Footer'
import Header from './page/AddOns/Header/Header'
import ForgotPasswordPage from './page/ForgotPasswordPage/ForgotPasswordPage'
import HomePage from './page/HomePage/HomePage'
import LoginPage from './page/LoginPage/LoginPage'
import Profile from './page/Profile/Profile'
import RegisterPage from './page/RegisterPage/RegisterPage'
import ResetPasswordPage from './page/ResetPasswordPage/ResetPasswordPage'
import UploadPage from './page/UploadPage/UploadPage'
import VerifyEmailPage from './page/VerifyEmailPage/VerifyEmailPage'

export const JWTContext = createContext<[string, React.Dispatch<React.SetStateAction<string>>]>(["", () => { }]);

export default function App(){

    const [jwt, setJwt] = useState("");

    useEffect(() => {
        const _jwt = localStorage.getItem("jwt");
        if (_jwt != null && _jwt !== "") {
            setJwt(_jwt);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("jwt", jwt);
    }, [jwt]);

    return(
    <JWTContext.Provider value={[jwt,setJwt]}>
        <Router>
            <div>
                <Switch>
                    <Route path="/dev">
                    </Route>
                    <Route path="/login">
                        {
                            jwt !== ""? <Redirect to="/"/> : <LoginPage/>
                        }
                    </Route>
                    <Route path="/signup">
                        <RegisterPage></RegisterPage>
                    </Route>
                    <Route exact path="/">
                        {
                            jwt === ""? <Redirect to="/login"/> : <HomePage/>
                        }
                    </Route>
                    <Route exact path="/upload">
                        {
                            <UploadPage/>
                        }
                    </Route>
                    <Route path="/verify/:userEmail">
                        
                        {
                            jwt === ""? <VerifyEmailPage/>: <Redirect to="/login"/>
                        }
                        
                        
                    </Route>
                    <Route path="/forgot">
                        {
                            jwt === ""? <ForgotPasswordPage/> : <HomePage/>
                        }
                    </Route>
                   
                    <Route path="/reset/:token">
                        <ResetPasswordPage/>
                    </Route>
                    <Route path="/profile/:username">
                        {
                            <Profile/>
                        }
                    </Route>
                </Switch>
            </div>
        </Router>
    </JWTContext.Provider>
    
    )
}