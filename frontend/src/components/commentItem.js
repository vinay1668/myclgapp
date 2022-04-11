import React ,{useState,useEffect} from 'react'
// import parse from "html-react-parser"
import {useSelector, useDispatch} from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { Link } from 'react-router-dom';
import {reset} from "../features/comments/commentSlice.js";
import { updateCommentVotes,updateReplyVotes, resetComment} from '../features/comments/commentSlice'
import { getReply } from '../features/comments/commentSlice';
import moment from 'moment';

function CommentItem({comment,alterSize}) {

  const[upvote,setUpvote] = useState(false)
  const[downvote,setDownvote] = useState(false)
  const {replies} = useSelector((state) => state.comments);

      
  const dispatch = useDispatch()
  const [voteData,setVoteData] = useState({
    vote:""
})

const[page,setPage] = useState({
  parentId:''
})

  useEffect(()=>{   
    if(voteData.vote !== "") {
      dispatch(updateCommentVotes({commentId:comment._id,voteData}))
    }  
    dispatch(getReply(page))
       
    
    },[voteData,dispatch,page])

    useEffect(()=>{
      return () => {
         dispatch(resetComment())
      }

    },[])
 
  const upvoteClicked = () => {
    setVoteData(() => ({
        vote:"upvote"
    }))
  }
  const downvoteClicked = () => {
    setVoteData(() => ({
        vote:"downvote"
    }))
  }

  function upvoteReplyClicked(id){
    const voteData ={
      vote:"upvote"
    }
    dispatch(updateReplyVotes({commentId: id, voteData}))
  }
  function downvoteReplyClicked(id){
    const voteData = {
      vote:"downvote"
    }
    dispatch(updateReplyVotes({commentId: id, voteData}))

  }
  function getReplies(id){
    setPage({parentId:id}) 
    alterSize(id);  
  }

 

  

  return (

    <div style={{marginTop:"15px"}}>
      <div>
      <Link  
           to={"/user"}
           state= {comment}
          style={{textDecoration:"none",color:"black"}} >
        <img className="" style={{borderRadius:"50%", width:"25px",marginLeft:"2px"}} src={comment.pfp} />
        <div className='dummy'>
            <span style={{fontSize:"10px",display:"block"}} className='name'><b>{comment.username}</b> </span>
            <span style={{fontSize:"8px",display:"block"}} className="rollno" ><b>{comment.name}</b></span>
        </div> 
      </Link>
        <div className='dummy' style={{marginLeft:"20px",verticalAlign:"super",marginTop:"0"}}>
              <span style={{fontSize:"8px",color:"gray",fontWeight:"bold"}}>
              {moment(comment.createdAt).fromNow()} 
                </span>
                <span></span>
          </div>


        <div style={{marginTop:"0px",marginLeft:"32px"}}>
            <span style={{fontSize:"14px"}}>{comment.text}</span>
        </div>

        <div style={{marginLeft:"20px",marginTop:"5px"}}>
            <i  style ={{color: comment.upvoted ? "red" : "gray",fontSize:"14px"}}
                    className="fa-solid fa-arrow-up fa-lg dumer" onClick={upvoteClicked} >
            </i>
            <span style={{fontSize:"14px"}}>{comment.votes}</span>
            <i style ={{color: comment.downvoted ? "#3293db" : "gray", marginTop:"-13px",fontSize:"14px"}}
                    className="fa-solid fa-arrow-down fa-lg dumer" onClick={downvoteClicked}>
            </i>
            <div style={{display:"inline",paddingLeft:"10px"}}>
            <i onClick={()=>getReplies(comment._id)} style={{color: page.parentId === comment._id  ? "black":"gray",fontSize:"14px"}} class="fa fa-reply dumer showreply" ></i>
            <span style={{fontSize:"14px"}}>{comment.replyNums}</span>
            </div>
      </div>

      {/* replies of a comment */}

      <div>
        {replies.length > 0 ? (replies.map((reply,index) =>(

          reply.parent == comment._id ? (
            <div style={{marginLeft:"60px",marginTop:"15px"}}>
               <img className="" style={{borderRadius:"50%", width:"25px",marginLeft:"2px"}} src={reply.pfp} />
               <div className='dummy'>
                 <span style={{fontSize:"10px",display:"block"}} className='name'><b>{reply.username}</b> </span>
                 <span style={{fontSize:"8px",display:"block"}} className="rollno" ><b>{reply.name}</b></span>
               </div> 

               <div className='dummy' style={{marginLeft:"20px",verticalAlign:"super",marginTop:"0"}}>
                  <span style={{fontSize:"8px",color:"gray",fontWeight:"bold"}}>
                    {moment(reply.createdAt).fromNow()} 
                  </span>
                  <span></span>
                </div>
    
                <div style={{marginTop:"0px",marginLeft:"32px"}}>
                   <span style={{fontSize:"14px"}}>{reply.text}</span>
                </div>
    
                <div style={{marginLeft:"20px",marginTop:"5px"}}>
                    <i  style ={{color: reply.upvoted ? "red" : "gray",fontSize:"14px",paddingInline:"6px"}}
                            className="fa-solid fa-arrow-up fa-lg dumer" onClick={()=>upvoteReplyClicked(reply._id)} >
                    </i>
                    <span style={{fontSize:"14px",paddingInline:"6px"}}>{reply.votes}</span>
                    <i style ={{color: reply.downvoted ? "#3293db" : "gray", marginTop:"-13px",fontSize:"14px",paddingInline:"6px"}}
                            className="fa-solid fa-arrow-down fa-lg dumer" onClick={ ()=>downvoteReplyClicked(reply._id)}>
                    </i>
                </div>

              






            </div> 
 
          ) : 
          
          
          (null)

        ))):(null)
        }
      </div>

      </div>
        
    </div>

  )
}

export default CommentItem;