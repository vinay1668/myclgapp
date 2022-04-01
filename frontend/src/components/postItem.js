import React ,{useState,useEffect} from 'react'
import parse from "html-react-parser"
import {useSelector, useDispatch} from 'react-redux'
import { updatePostVotes } from '../features/posts/postSlice'
import { configureStore } from '@reduxjs/toolkit'
import pdf from "../pages/components/editors/pdfico.png";
import {logout, reset} from "../features/auth/authSlice.js"
function PostItem({post}) {

    const [voteData,setVoteData] = useState({
        vote:""
    })
    
    const dispatch = useDispatch()

    useEffect(()=>{
        console.log(post)
        if(voteData.vote !== ""){
          dispatch(updatePostVotes({postId:post._id,voteData}))
        }
    
        return () => {
            dispatch(reset())
          }

    },[voteData,dispatch,post])

    const[upvote,setUpvote] = useState(false)
    const[downvote,setDownvote] = useState(false)

    const text = parse(post.text);



   
    const upvoteClicked = () => {
        setVoteData(() => ({
            vote:"upvote"
        }))
        
      
        


      }
      const downvoteClicked = () => {
        setVoteData(() => ({
            vote:"downvote"
        }))
     

        // dispatch(updatePostVotes(post._id, voteData))
      }



  return (
    <div className='editcontainer'>
    {/* top section */}

    <div className='topsection'>
        <img className="dummy" style={{borderRadius:"50%", width:"40px"}} src={post.pfp} />
        <div className='dummy'>
            <span style={{fontSize:"13px",display:"block"}} className='name'><b>{`u/${post.username}`}</b> </span>
            <span style={{fontSize:"10px",display:"block"}} className="rollno" ><b>{post.name}</b></span>
        </div>
    </div>


    {/* title section */}

    <div className='titlesection'>
        <h3 style={{fontFamily:"Arial"}}>
        {post.title}
        </h3>
        
        
    </div>


    {/* middle section */}
    <div className='middlesection'>

        {post.text ? (<p style={{fontFamily:"Open Sans"}}>{post.text}</p>) : (null)}
        {post.videoHash.length > 0 ? (<video style={{width:"100%"}} controls>  
           <source src={post.videoHash} />
               Your browser does not support HTML video.
           </video>) : (null)}
        {post.imgHash.length > 0 ? (<img style={{width:"100%"}} src={post.imgHash}/>) : (null) }
         {post.fileHash .length > 0 ? 
         ( <a style={{color: "inherit"}} href={post.fileHash.hash} target="blank">
                <figure>
                  <img src={pdf} height="200px" width="200px"/>
                  <figcaption style={{paddingLeft:"30px",color:"gray"}}><b>{post.fileHash.name}</b></figcaption>
                </figure>
        </a>) : (null)
         }

      
           {/* {post.text !== "" &&  <p style={{fontFamily:"Open Sans"}}>{text}</p>}
            {post.imgHash !== "" &&  <img src= {post.imgHash} style={{width:"100%"}} /> }

           {post.videoHash !== "" && 
           <video style={{width:"100%"}} controls>  
           <source src={post.videoHash} />
               Your browser does not support HTML video.
           </video>
           }

           {post.fileHash !== "" && 
            <>
            <a style={{color: "inherit"}} href={post.fileHash.hash} target="blank">
                <figure>
                  <img src={pdf} height="200px" width="200px"/>
                  <figcaption style={{paddingLeft:"30px",color:"gray"}}><b>{post.fileHash.name}</b></figcaption>
                </figure>
            </a>
         </>
           
           } */}

    </div>
  {/* bootom section */}
    <div className='commentsection'>
        <i  style ={{color: post.upvoted ? "red" : "gray"}}
                className="fa-solid fa-arrow-up fa-lg dum"
                onClick={upvoteClicked}
                >
            </i>
            <span>{post.votes}</span>
            <i style ={{color: post.downvoted ? "#3293db" : "gray", marginTop:"-13px"}}
                className="fa-solid fa-arrow-down fa-lg dum"
                onClick={downvoteClicked }
                >
            </i>
                <span className='dum'>
                
                <i style={{display:"inline-block", paddingInline:"5px",color:"gray"}} className="fa-solid fa-share-from-square fa-lg"></i>
                {/* <span style={{display:"inline-block", paddingInline:"5px"}} >share</span> */}
                </span>
                <span className='dum'>
                <i style={{display:"inline-block", paddingInline:"5px",color:"gray"}} className="fa-regular fa-message fa-lg"></i>
                <span style={{display:"inline-block", paddingInline:"5px",color:"gray"}}>5654</span>
                {/* <span style={{display:"inline-block", paddingInline:"0px"}}>comments</span> */}
                </span>
        </div>
     </div>
  )
}

export default PostItem;