import React ,{useState,useEffect} from 'react'
import parse from "html-react-parser"
import {useSelector, useDispatch} from 'react-redux'
import { updatePostVotes } from '../features/posts/postSlice'
import { configureStore } from '@reduxjs/toolkit'
import pdf from "../pages/components/editors/pdfico.png";
import {logout, reset} from "../features/auth/authSlice.js";
import { Link } from 'react-router-dom';
function PostItem({post}) {

    const [voteData,setVoteData] = useState({
        vote:""
    })
    
    const dispatch = useDispatch()

    useEffect(()=>{
      
        
        if(voteData.vote !== "") {
          // console.log(voteData)
          dispatch(updatePostVotes({postId:post._id,voteData}))
        }   
        return () => {
            dispatch(reset())
          }
    },[voteData,dispatch])

    const[upvote,setUpvote] = useState(false)
    const[downvote,setDownvote] = useState(false)





   
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
     
        <div>
        <Link  
           to={"/user"}
           state= {post}
          style={{textDecoration:"none",color:"black"}} >
          <img className="dummy" style={{borderRadius:"50%", width:"40px"}} src={post.pfp} />
          <div className='dummy'>
              <span style={{fontSize:"13px",display:"block"}} className='name'><b>{post.username}</b> </span>
              <span style={{fontSize:"10px",display:"block"}} className="rollno" ><b>{post.name}</b></span>
          </div>
          </Link>
        </div>
    

      
    </div>


    {/* title section */}

    <div className='titlesection'>
        <span style={{fontFamily:"Arial",fontSize:"23px",lineHeight:"1.2"}}>
        {post.title}
        </span>
        
        
    </div>


    {/* middle section */}
    <div style={{paddingBottom:"25px"}} className='middlesection'>

        {post.text !== "" ? (<p style={{fontFamily:"Open Sans"}}>{parse(post.text)}</p>) : (null)}

        {post.imgHash.length > 0 ? (  
          post.imgHash.map((img,index) => (
            <div key={index}>
               <img style={{width:"100%", paddingBottom:"10px"}} src={img}/>
            </div>
        ))) : (null) }

        {post.videoHash.length > 0 ? (
           post.videoHash.map((video,index) => (
                <div  key={index} >
                    <video style={{width:"100%",paddingBottom:"10px"}} controls>  
                    <source src={video} />
                        Your browser does not support HTML video.
                    </video>
                </div>
        ))) : (null) }

         {post.fileHash .length > 0 ? 
         ( post.fileHash.map((file, index) => (
           <div key={index}>
             <a style={{color: "inherit", paddingBottom:"10px"}} href={file.hash} target="blank">
                <figure>
                  <img src={pdf} height="200px" width="200px"/>
                  <figcaption style={{paddingLeft:"30px",color:"gray"}}><b>{file.name}</b></figcaption>
                </figure>
              </a>
           </div>
         )) ) : (null)
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
    <div  className='commentsection'>
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
                {/* <span className='dum'>
                
                <i style={{display:"inline-block", paddingInline:"5px",color:"gray"}} className="fa-solid fa-share-from-square fa-lg"></i>
                </span>
                <span className='dum'>
                <i style={{display:"inline-block", paddingInline:"5px",color:"gray"}} className="fa-regular fa-message fa-lg"></i>
                <span style={{display:"inline-block", paddingInline:"5px",color:"gray"}}>5654</span>
                </span> */}
        </div>
     </div>
  )
}

export default PostItem;