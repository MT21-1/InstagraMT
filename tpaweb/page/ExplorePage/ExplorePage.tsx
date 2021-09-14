import VideoStrip from './videoStrip'
import ImageStrip from './imageStrip'
import UserHeader from '../AddOns/Header/UserHeader'
import Footer from '../AddOns/Footer/Footer'
import gql from 'graphql-tag'
import React, { useState, useEffect, useRef } from 'react'
import { useApolloClient, useMutation } from '@apollo/client'
import ReactLoading from "react-loading"

const selectPostQuery = gql`
mutation selectPostExplore($nextpost: String){
    selectPostExplorePage(nextpost:$nextpost){
        posts{
            id
            user_id
            caption
            created_at
            post_contents{
                id
                post_id
                type
                path
            }
        }
        nextpost
        hasnext
    }
    
  }
`
export default function ExplorePage(){

    const [posts,setPosts]=useState({data:[]})
    const [nextpost,setNextPost] = useState("")
    const postsRef = useRef<HTMLDivElement>(null)
    const nextPostTriggerRef = useRef<HTMLDivElement>(null)
    const [isLoading,setIsLoading] = useState(false)
    const [observer,setObserver] = useState<IntersectionObserver>();
    const nextPostKeyRef = useRef(nextpost)
    const apollo = useApolloClient()
    const [hasnext,SetNext] = useState(true);
    const [selectPost, selectPostData] = useMutation(selectPostQuery)
    const loadingBtn = (<div className="loadingAnimation"><ReactLoading type={"spokes"} color={'black'} height={'100%'} width={'100%'}/></div>)
    async function loadMoreItems() {
        const postPagged = await apollo.mutate({
            mutation:selectPostQuery,
            variables:{
                nextpost: nextPostKeyRef.current! ==="" ? null : 
                    nextPostKeyRef.current!
            },
        });

        posts.data.push(...postPagged.data!.selectPostExplorePage.posts);

        setPosts({data:posts.data})
        setNextPost(postPagged.data.selectPostExplorePage.nextpost);
        SetNext(postPagged.data.selectPostExplorePage.hasnext)
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

    return (
        <React.Fragment>
        <UserHeader/>
        <div className="exploreOuterDiv">
            <div className="exploreInnerDiv">
                <div className="postDiv" ref={postsRef}>
                    {posts.data.map((content) =>{
                        return (content.post_contents[0].type == "video")?
                            (
                                <button>
                                    <a href={"/post/"+content.id}>
                                    <video src={content.post_contents[0].path}/>
                                    </a>
                                </button>
                            )
                        :
                            (
                            <button>
                                <a href={"/post/"+content.id}>
                                    <img src={content.post_contents[0].path} alt="image" />
                                </a>    
                            </button>
                            )
                    })}
                    
                    {isLoading?loadingBtn:<div ref={nextPostTriggerRef}>&nbsp;</div>}
                </div>
            </div>
        </div>
        <Footer/>
        </React.Fragment>
    )

}