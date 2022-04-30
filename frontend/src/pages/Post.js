import { useEffect,useState } from "react"
import {useSelector, useDispatch} from "react-redux"
import {createComment, createCommentReply, getComment} from "../features/comments/commentSlice.js";
import PostItem from "../components/postItem";
import { reset,modifyPaths } from "../features/posts/postSlice"
import {BrowserRouter as Router,Switch,useLocation, useNavigate} from "react-router-dom";
import CommentItem from "../components/commentItem.js";
import MessageDash from './Message/MessageDash';
import Profile from './Profile';




function Post() {

  const {comments,isLoading,isError,message,isSuccess} = useSelector((state) => state.comments);
  const {posts,userPosts} = useSelector((state) => state.posts);
 
    const location = useLocation();
    const dispatch = useDispatch();
    const stateData = location.state; 
    const post = stateData['post']
    
  


  
    const [page,setPage] = useState({
      postId:post._id,
    });

    const[commentData,setCommentData]= useState({
      text:'',
      postId: post._id,
      parentId:''
    })
 
    
    useEffect(() =>{
      console.log("in post")
      dispatch(modifyPaths('/post'));
     
        dispatch(getComment(page));
        return () => { 
            // dispatch(reset())
            
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
    const [width, setWidth]   = useState(window.innerWidth);    
    const updateDimensions = () => {
      setWidth(window.innerWidth);
    }
  
    useEffect(() => {
        window.addEventListener("resize", updateDimensions);
        
        return () => window.removeEventListener("resize", updateDimensions);
        
    }, []);

  return (
      <div style={{paddingBottom:"30px"}}>
        {width > 1050 ? <Profile /> : null}
       <PostItem post={post} alterSizey={alterSizey} />

       {/* filter */}
       {/* <div className="viewcommentbar"style={{backgroundColor:"#DAE0E6"}}>
       <button name="post" id= 'poste' type="button" class="btn btn-light" style={{margin:"auto",borderRadius:"5px",height: "40px", marginLeft:"0"}}>
          <div class="dropdown">
            <b class="dropdown-toggle" type="button" id="dropdownMenuButton" style={{color:"gray"}} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Top comments
            </b>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a  class="dropdown-item" href="#">Top comments</a>
              <a  class="dropdown-item" href="#">Best comments</a>
              <a  class="dropdown-item" href="#">Most replied</a>
              <a  class="dropdown-item" href="#">Most downvoted</a>    
            </div> 
          </div>
       </button>
       </div> */}


      {comments.length > 0 &&
        <div className="viewcommentbar" style={{padding:"10px" ,minHeight:'0'}}>
        {comments.map((comment,index) => (
              <CommentItem comment={comment} key={index} alterSize={alterSize} />
            ))}
          </div> 
      }
      


      <div className="postcommentbar" style={{display:"flex",paddingLeft : subReply ? "75px" :"0px"}}>
        <input type="text" style={{flex:"auto",marginRight:"10px",height:"40px"}} placeholder="Add a comment" value= {commentData.text} className="form-control input-sm" onChange={commenting}/>
        <button type="button" style={{flex:"auto",height:"38px"}} class="btn btn-primary" onClick={send}>
        <i style={{fontSize:"20px"}} class="fa-solid fa-arrow-up-from-bracket"></i>
        </button>
      </div> 
    

    {width > 1050? <MessageDash />:null}
    </div> 
    
  )
}

export default Post