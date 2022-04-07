import { useEffect,useState } from "react"
import {useSelector, useDispatch} from "react-redux"
import {createComment, createCommentReply, getComment} from "../features/comments/commentSlice.js";
import PostItem from "../components/postItem";
import { reset } from "../features/posts/postSlice"
import {BrowserRouter as Router,Switch,useLocation} from "react-router-dom";
import CommentItem from "../components/commentItem.js";


function Post() {

  const {comments,isLoading,isError,message,isSuccess} = useSelector((state) => state.comments);
    const location = useLocation();
    const dispatch = useDispatch()
    const post = location.state;    
  
    const [page,setPage] = useState({
      postId:post._id,
    });

    const[commentData,setCommentData]= useState({
      text:'',
      postId: post._id,
      parentId:''
    })

    useEffect(() =>{
        dispatch(getComment(page));
        return () => { 
            dispatch(reset())
            
          }

    },[])
    useState(()=>{
      

    },[comments])
    function commenting(e){
      setCommentData(prevState=>({
        ...prevState,
        text:e.target.value,
      }))
    }

    function send(){
      if(commentData.text != ""){
        if(commentData.parentId == "") {
           dispatch(createComment(commentData));
        }
        else{
          dispatch(createCommentReply(commentData));
        }
        setCommentData(prevState=>({
          ...prevState,
          text: '',
        }))

      }
    }

    const[subReply,setSubReply] = useState(false)

    function alterSize(id){
      setSubReply(true);
      setCommentData(prevState=>({
        ...prevState,
        parentId: id
      }))
    }
    function alterSizey(){
      setSubReply(false);
      setCommentData(prevState=>({
        ...prevState,
        parentId:'',
      }))
    }

  return (
      <div>
       <PostItem post={post} alterSizey={alterSizey}/>

       <div className="viewcommentbar" style={{paddingBottom: "60px"}}>
       {comments.map((comment,index) => (
            <CommentItem comment={comment} key={index} alterSize={alterSize} />
          ))}
        </div>
       <div className="postcommentbar" style={{display:"flex",paddingLeft : subReply ? "75px" :"0px"}}>
        <input type="text" style={{flex:"auto",marginRight:"10px",height:"40px"}} placeholder="Add a comment" value= {commentData.text} className="form-control input-sm" onChange={commenting}/>
        <button type="button" style={{flex:"auto",height:"38px"}} class="btn btn-primary" onClick={send}>send</button>
       </div>

    </div>
    
  )
}

export default Post