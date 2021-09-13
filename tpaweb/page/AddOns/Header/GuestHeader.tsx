import React, { useContext, useEffect, useMemo, useState } from "react";
import Popup from "reactjs-popup";
import { JWTContext } from "../../../App";
import gql from "graphql-tag";
import { debounceTime, distinctUntilChanged, map, Subject } from "rxjs";
import { useMutation } from "@apollo/client";
import ReactLoading from "react-loading"

const searchUserQuery = gql`
    mutation searchUser($username: String!){
        searchUser(input:$username){
            id
            username
            picture
        }
    }
`

export default function GuestHeader(){
    const [_, setJWT] = useContext(JWTContext)
    const jwt = localStorage.getItem("jwt")
    const subject = useMemo(() => new Subject<string>(), [])
    const [searchUser, searchUserData] = useMutation(searchUserQuery)
    const [userList, setUserList] = useState([]);
    const loadingBtn = (<button className="loadingButton" ><ReactLoading type={"spokes"} color={'black'} height={'7%'} width={'7%'}/></button>)
    function logOut(){
        setJWT("")    
    }
    useEffect(() => {
        const subscribe = subject
            .pipe(
                debounceTime(500),
                distinctUntilChanged(),
                map(search => search.trim())
            )
            .subscribe(
                search => {
                searchUser({
                    variables:{
                        username: search
                    }
                })
            })
        return (() => { subject.unsubscribe })
    }, [subject])


    useEffect(() => {
        if(searchUserData.data !== undefined && searchUserData != null){
            setUserList(searchUserData.data.searchUser)
        }
    }, [searchUserData.data])
    return(
        <div className="pembungkus">
        <div className="header">
            <div className="logo">
                <h1>InstagraMT</h1>
            </div>
            <div className="searchBar">
                    <form action="">
                    
                    <Popup trigger={<input type="search" autoComplete="off" onChange={(e) => subject.next(e.target.value)} placeholder="Search" name="searchQuery" id=""/>} 
                    position="bottom left">
                        <div className="searchPopUp">
                            {(searchUserData.loading)?
                                (loadingBtn)
                                :
                                (searchUserData.data != undefined && searchUserData.data != null && userList != null && userList.length != 0)?
                                    searchUserData.data.searchUser.map(user => {
                                        return(
                                            <a href={"/profile/"+user.username} className="searchStrip">
                                                <img src={user.picture} alt="" />
                                                <p>{user.username}</p>
                                            </a>
                                        )

                                    })
                                    :
                                    <div>User not Found</div>
                                }
                        </div>
                    </Popup>
                        
                    </form>
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