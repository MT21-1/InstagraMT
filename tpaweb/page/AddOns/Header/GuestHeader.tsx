import React, { useContext, useEffect, useMemo, useState } from "react";
import Popup from "reactjs-popup";
import { JWTContext } from "../../../App";
import gql from "graphql-tag";
import Toggle from "../../../toggle"
import { debounceTime, distinctUntilChanged, map, Subject } from "rxjs";
import { useMutation } from "@apollo/client";
import ReactLoading from "react-loading"

const searchQuery = gql`
    mutation search($username: String!){
        searchUser(input:$username){
            id
            username
            picture
        }
        searchHashtag(input:$username){
            id
            hashtag
        }
    }
`

export default function GuestHeader(){
    const [_, setJWT] = useContext(JWTContext)
    const jwt = localStorage.getItem("jwt")
    const subject = useMemo(() => new Subject<string>(), [])
    const [searchQ, searchData] = useMutation(searchQuery)
    const [userList, setUserList] = useState([]);
    const [hashtagList, setHashtagList] = useState([])
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
                searchQ({
                    variables:{
                        username: search
                    }
                })
            })
        return (() => { subject.unsubscribe })
    }, [subject])


    useEffect(() => {
        console.log(searchData.data)
        if(searchData.data !== undefined && searchData != null){
            setUserList(searchData.data.searchUser)
            setHashtagList(searchData.data.searchHashtag)
        }
    }, [searchData.data])
    return(
        <div className="pembungkus">
        <div className="header">
            <div className="logo">
                <h1>InstagraMT</h1>
                <Toggle />
            </div>
            <div className="searchBar">
                    <form action="">
                    
                    <Popup trigger={<input type="search" autoComplete="off" onChange={(e) => subject.next(e.target.value)} placeholder="Search" name="searchQuery" id=""/>} 
                    position="bottom left">
                        <div className="searchPopUp">
                            {(searchData.loading)?
                                (loadingBtn)
                            :null}
                            {(searchData.data != undefined && searchData.data != null && userList != null && userList.length != 0)?
                                searchData.data.searchUser.map(user => {
                                    return(
                                        <a href={"/profile/"+user.username} className="searchStrip">
                                            <img src={user.picture} alt="" />
                                            <p>{user.username}</p>
                                        </a>
                                    )
                                }): null
                            }
                            {(searchData.data != undefined && searchData.data != null && hashtagList != null && hashtagList.length !=0)?
                                searchData.data.searchHashtag.map(hashtag => {
                                    return(
                                        <a href={"#"} className="searchStrip">
                                            <img src="/hashtag.png" alt="" />
                                            <p>{hashtag.hashtag}</p>
                                        </a>
                                    )
                                }):
                                null  
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