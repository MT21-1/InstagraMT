import { useApolloClient, useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import React, { useEffect, useRef, useState } from 'react'
import Footer from '../AddOns/Footer/Footer'
import UserHeader from '../AddOns/Header/UserHeader'
import Story from '../Components/Story'
import Suggestion from '../Components/suggestion'
import ReactLoading from "react-loading"
import { Post } from '../Components/Post'

const selectPostHomeQuery = gql`
    mutation selectPostHome($nextpost: String, $userId: String!){
        selectPostHomePage(nextpost:$nextpost, user_id:$userId){
            posts{
            id
            user_id
            caption
            created_at
        }
        nextpost
        hasnext
        }
    }
`

export default function HomePage(){

    const [posts,setPosts]=useState({data:[]})
    const [nextpost,setNextPost] = useState("")
    const postsRef = useRef<HTMLDivElement>(null)
    const nextPostTriggerRef = useRef<HTMLDivElement>(null)
    const [isLoading,setIsLoading] = useState(false)
    const [observer,setObserver] = useState<IntersectionObserver>();
    const nextPostKeyRef = useRef(nextpost)
    const apollo = useApolloClient()
    const [hasnext,SetNext] = useState(true);
    const [selectPost, selectPostData] = useMutation(selectPostHomeQuery)
    const loadingBtn = (<div className="loadingAnimation"><ReactLoading type={"spokes"} color={'black'} height={'100%'} width={'100%'}/></div>)
    
    const user = JSON.parse(localStorage.getItem("user"))
    console.log(user)
    async function loadMoreItems() {
        const postPagged = await apollo.mutate({
            mutation:selectPostHomeQuery,
            variables:{
                nextpost: nextPostKeyRef.current! ==="" ? null : 
                    nextPostKeyRef.current!,
                userId: user.id
            },
        });

        posts.data.push(...postPagged.data!.selectPostHomePage.posts);

        setPosts({data:posts.data})
        setNextPost(postPagged.data.selectPostHomePage.nextpost);
        SetNext(postPagged.data.selectPostHomePage.hasnext)
        setIsLoading(false);
    }

    useEffect(() => {
        nextPostKeyRef.current = nextpost 
    }, [nextpost])

    useEffect(()=>{
        setObserver(new IntersectionObserver(
            (entries,observer)=>{
                if(!entries[0].isIntersecting ){
                    return;
                }
                
                observer.unobserve(nextPostTriggerRef.current!);
                setIsLoading(true)
                loadMoreItems()
            },
        ));
    },[])

    useEffect(() => {
        if(observer === undefined || isLoading || nextpost == null || hasnext == false){
            return;
        }
        observer!.observe(nextPostTriggerRef.current!);
    }, [observer,isLoading,nextpost,hasnext])
    return(
        <React.Fragment>
            <UserHeader/>
            
            <div className="outerDiv">

                <div className="innerDiv">
                    {/* Post + story div */}
                    <div className="leftHomeDiv" ref={postsRef}>

                        {/* Story div */}
                        <div className="storyDiv">
                            <Story></Story>
                            <Story></Story>
                            <Story></Story>
                            <Story></Story>
                            <Story></Story>
                            <Story></Story>
                            <Story></Story>
                            <Story></Story>
                            <Story></Story>
                            <Story></Story>
                            <Story></Story>
                            <Story></Story>
                            <Story></Story>
                            <Story></Story>
                        </div>

                        {/*Map Post div */}
                        {(posts.data.map((content)=>{
                            console.log(content)
                            return(<Post post_id={content.id}></Post>)
                        }))}
                        {isLoading?loadingBtn:<div ref={nextPostTriggerRef}>&nbsp;</div>}
                    </div>

                    {/* //Suggestion Absolute */}
                    <div className="rightHomeDiv">

                        {/* profile snediri */}
                        <div className="profileSuggestion">
                            <div className="profileDetail">
                                <img src={user.picture} alt="profilepic" />
                                <div>
                                    <p className="username">{user.username}</p>
                                    <p className="subname">{user.full_name}</p>    
                                </div>
                            </div>
                            
                            <a href="#">Switch</a>
                        </div>

                        <span>Suggestions For You <a href="#">See All</a></span>

                        {/* nanti map suggestion disini */}
                        <Suggestion></Suggestion>
                        <Suggestion></Suggestion>
                        <Suggestion></Suggestion>
                        <Suggestion></Suggestion>
                        <Suggestion></Suggestion>
                        <div>

                        </div>
                        <Footer></Footer>
                    </div>

                </div>
                
            </div>
        </React.Fragment>
        
    )

}