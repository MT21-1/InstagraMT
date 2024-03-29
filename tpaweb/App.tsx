import React, { useState, useEffect, createContext } from 'react'
import {BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import ActivityPage from './page/ActivityPage/ActivityPage'
import Footer from './page/AddOns/Footer/Footer'
import DMPage from './page/DMPage/DMPage'
import ExplorePage from './page/ExplorePage/ExplorePage'
import ForgotPasswordPage from './page/ForgotPasswordPage/ForgotPasswordPage'
import HomePage from './page/HomePage/HomePage'
import LoginPage from './page/LoginPage/LoginPage'
import Profile from './page/Profile/Profile'
import RegisterPage from './page/RegisterPage/RegisterPage'
import ResetPasswordPage from './page/ResetPasswordPage/ResetPasswordPage'
import StoryPage from './page/StoryPage/StoryPage'
import UploadPage from './page/UploadPage/UploadPage'
import VerifyEmailPage from './page/VerifyEmailPage/VerifyEmailPage'
import firebase from "firebase/app";
import "firebase/storage";
import PostPage from './page/PostPage/PostPage'
import SettingPage from './page/SettingPage/SettingPage'
import SuggestionPage from './page/SuggestionPage/SuggestionPage'

export const JWTContext = createContext<[string, React.Dispatch<React.SetStateAction<string>>]>(["", () => { }]);


const firebaseConfig =  firebase.initializeApp({
    apiKey: "AIzaSyCbDGCRMWIKB13JxL4lZHMzFf_JBA7eEYA",
    authDomain: "instagramt.firebaseapp.com",
    projectId: "instagramt",
    storageBucket: "instagramt.appspot.com",
    messagingSenderId: "405713718682",
    appId: "1:405713718682:web:bc7061bc2b71ac61403e23"
  });
  
export const FirebaseAppContext = createContext(firebaseConfig);

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
    <FirebaseAppContext.Provider value={firebaseConfig}>
        <JWTContext.Provider value={[jwt,setJwt]}>
            <Router>
                <div>
                    <Switch>
                        <Route path="/dev">
                        </Route>
                        <Route exact path="/login">
                            {
                                jwt !== ""? <HomePage/> : <LoginPage/>
                            }
                        </Route>
                        <Route exact path="/signup">
                            {
                                jwt !== ""? <HomePage/> : <RegisterPage/>
                            }
                        </Route>
                        <Route exact path="/">
                            {
                                jwt === ""? <LoginPage/> : <HomePage/>
                            }
                        </Route>
                        <Route exact path="/upload">
                            {
                                jwt !== ""? <UploadPage/>: <LoginPage/>
                            }
                        </Route>
                        <Route exact path="/verify/:userEmail">
                            
                            {
                                jwt === ""? <VerifyEmailPage/>: <LoginPage/>
                            }
                            
                            
                        </Route>
                        <Route exact path="/forgot">
                            {
                                jwt === ""? <ForgotPasswordPage/> : <HomePage/>
                            }
                        </Route>
                    
                        <Route exact path="/reset/:token">
                            <ResetPasswordPage/>
                        </Route>
                        <Route path="/profile/:username">
                            {
                                <Profile/>
                            }
                        </Route>
                        <Route exact path="/explore">
                            {
                                jwt !== ""? <ExplorePage/>: <LoginPage/>
                            }
                        </Route>
                        <Route exact path="/dm">
                            {
                                jwt !== ""? <DMPage/>: <LoginPage/>
                            }
                            
                        </Route>
                        <Route exact path="/story">
                            {
                                jwt !== ""? <StoryPage/>: <LoginPage/>
                            }
                            
                        </Route>
                        <Route exact path="/activity">
                            {
                                jwt !== ""? <ActivityPage/>: <LoginPage/>
                            }
                            
                        </Route>
                        <Route exact path="/post/:postId">
                            
                            {
                                jwt !== ""? <PostPage/>: <LoginPage/>
                            }
                            
                            
                        </Route>
                        <Route exact path="/setting">
                            
                            {
                                jwt !== ""? <SettingPage/>: <LoginPage/>
                            }
                            
                            
                        </Route>
                        <Route exact path="/suggestion">
                            
                            {
                                jwt !== ""? <SuggestionPage/>: <LoginPage/>
                            }
                            
                            
                        </Route>
                    </Switch>
                </div>
            </Router>
        </JWTContext.Provider>
    </FirebaseAppContext.Provider>
    )
}