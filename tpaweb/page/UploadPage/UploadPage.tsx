import React, { useState, useEffect, useContext } from 'react'
import { FirebaseAppContext } from '../../App'
import Footer from '../AddOns/Footer/Footer'
import UserHeader from '../AddOns/Header/UserHeader'
import { ReadFiles } from '../Components/ReadFile'
import { v4 as uuidv4 } from "uuid"
import { gql, useMutation } from '@apollo/client'
import ReactLoading from "react-loading"
import Popup from 'react-animated-popup';
const postQuery = gql`

    mutation insertPost($detail: [newPostContent]!, $caption: String!, $user_id: String!){
        insertNewPost(input:{
        content:$detail,
        caption: $caption,
        user_id: $user_id
    }){
        caption
        id
    }
    }

`

export default function UploadPage(){

    const [upload, setUpload] = useState({contents: []})
    const firebase = useContext(FirebaseAppContext)
    const [idx, setIdx] = useState(0);
    const [getUserData, {data, loading, error}] = useMutation(postQuery)
    const [caption, setCaption] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const user = JSON.parse(localStorage.getItem("user"));
    var totalImage = 1;
    const [visible, setVisible] = useState(false)
    const loadingBtn = (<button className="loadingButton" ><ReactLoading type={"spokes"} color={'white'} height={'7%'} width={'7%'}/></button>)
    const [loadingStyle, setloadingStyle] = useState({"width" : '0'})
    const [uploadProgress, setUploadProgress] = useState(0)
    const [autoShare, setAutoShare] = useState(false);

    useEffect(() => {
        setloadingStyle({"width" : `${uploadProgress}&`})
        console.log("tes");
    }, [uploadProgress])

    useEffect(() => {
        if(data !== undefined && data != null){
            if(autoShare)
                handleShareByTwitter(data.insertNewPost.id);
        }
    }, [data])

    function left(){
        if(idx != 0){
            setIdx(idx-1)
        }
    }

    function right(){
        if(idx < upload.contents.length-1){
            setIdx(idx+1);
        }
    }

    async function handleUpload(files: FileList) {
        const fileType = Array.from(files).map((f) => f.type.split("/")[0])

        setUploadProgress(33);
        console.log(uploadProgress)


        fileType.map(ft => {
            if(ft != "video" && ft != "image"){
                return;
            }
        })
        
        const posts = await ReadFiles(files)
        const postId = posts.map(p => firebase.storage().ref(uuidv4()))
        const uploadPromises = posts.map((p, idx)=> postId[idx].putString(p,"data_url"));
        await Promise.all(uploadPromises)
        setUploadProgress(66);
        
        const urlPromises = postId.map((id) => id.getDownloadURL())
        const urls = (await Promise.all(urlPromises)) as string[];
        setUpload({
            contents: urls.map((path, idx)=>{
                return{
                    id: uuidv4(),
                    type: fileType[idx],
                    link: path
                }
            })
        })        
        setUploadProgress(100);
    }
    function handleShareByTwitter(postId: string) {
        window.open(`http://www.twitter.com/share?url=${location.host}/post/${postId}`, "_blank");
    }
    async function handleSubmit() {
        if(uploadProgress < 100){
            setErrorMessage("Upload not done...");
            return
        }else{
            setErrorMessage('');
        }
        if(caption == ''){
            setErrorMessage("Caption must be filled!")
            return
        }else{
            setErrorMessage("");
        }
        if(upload.contents.length == 0){
            setErrorMessage("Choose a picture");
            return
        }else{
            setErrorMessage("");
        }
        let arrayOfDetail = upload.contents.map(data =>{
            return{
                path: data.link,
                type: data.type
            }
        })
        
        getUserData({
            variables:{
                user_id : user.id,
                caption : caption,
                detail  : arrayOfDetail
            }
        })
        
        setCaption("")
        setUpload({contents:[]})
        setVisible(true);
        setUploadProgress(0)
    }

    return(
        <React.Fragment>
            <UserHeader/>
            <div id="uploadOuterDiv">
                <div id="uploadMainDiv">
                    {/* div untuk form */}

                    <Popup visible={visible} onClose={() => setVisible(false)} >
                        <div className="successModal">
                        <svg xmlns="http://www.w3.org/2000/svg"fill="none" viewBox="0 0 24 24" stroke="currentColor">
                             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p>Successfully Uploaded</p>
                        <button id="confirm" onClick={()=>{
                            setVisible(false)
                        }}>Confirm</button>
                        </div> 
                    </Popup>
                    <div id="uploadFormDiv">
                       
                        <div id="uploadForm">
                            <h1>Upload</h1>
                            
                            {(upload.contents.length == 0) ?(
                                <div id="uploadArea" onDragOver={e => e.preventDefault()} onDrop={e => { handleUpload(e.dataTransfer.files); e.preventDefault()}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                    </svg>
                                    <input type="file" name="upload" id="upload" accept="image/*, video/*" multiple={true} onChange={e =>{handleUpload(e.currentTarget.files!)}}/>
                                </div>

                            ):
                                <div id="imageCarouselDiv">
                                    {(upload.contents.length > 1)?<button id="leftSlide" onClick={left}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </button>:null}
                                    
                                    {upload.contents.map((content, i)=>{
                                        return ((i == idx)?((content.type == "image")?<img className="uploadImage" id= {(i).toString()} src={content.link} alt="" key={content.id}/>: <video className="uploadImage" id = {(i).toString()}src={content.link} key = {content.id} controls preload="auto"></video>):null)
                                    })}
                                    {(upload.contents.length > 1)?<button id="rightSlide" onClick={right}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>:null}
                                    
                                </div>
                            }
                            
                            
                            <div id="textAreaDiv">
                                Caption
                                <textarea name="caption" id="caption" value={caption} onChange={e =>{
                                    setCaption(e.target.value)
                                }}></textarea>
                                <p id="errorLabel">{errorMessage}</p>
                                <span id="shareDiv"><input type="checkbox" name="share" id="shareChk" onClick={()=> setAutoShare(!autoShare)}/> share to other social media</span>
                            </div>
                            <div id="loadingBarBackground">
                                <div id="loadingBarFill" style={{"width":`${uploadProgress}%`}}>
                                </div>
                            </div>
                            <div id="buttonDiv">
                                {(loading)?loadingBtn:<button id="uploadButton" onClick={handleSubmit}>Upload</button>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </React.Fragment>
    )


}