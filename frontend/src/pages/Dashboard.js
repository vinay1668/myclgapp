import { useState ,useRef, useEffect} from 'react';
import RichTextEditor from './components/editors/RichTextEditor';
import VideoEditor from './components/editors/VideoEditor';
import ImageEditor from './components/editors/ImageEditor';
import File from './components/editors/File';
import { create } from 'ipfs-http-client';

import {useSelector, useDispatch} from "react-redux"
import {logout, reset} from "../features/auth/authSlice.js"
import {createPost, getPosts} from "../features/posts/postSlice.js";
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import PostItem from '../components/postItem';
import "../App.css";
/* Create an instance of the client */
const client = create('https://ipfs.infura.io:5001/api/v0')



function Dashboard() {
        
        
        const[url,setUrl] = useState('')
        const[editor,setEditor] = useState('post')

        const navigate = useNavigate()
        const dispatch = useDispatch()

        const {user} = useSelector((state) => state.auth);
        const {posts,isLoading,isError,message} = useSelector((state) => state.posts);

        const [post,setPost] = useState({
          title:'',
          text:'',
          imgHash:[],
          videoHash:[],
          fileHash:[],
        })


        useEffect(() => {
 
          if(isError){
            console.log(message)
          }

          if(!user){
            navigate('/');
            console.log("user logged out")
          }

          dispatch(getPosts())

          return () => {
            dispatch(reset())
          }
        },[user, isError,message,dispatch,navigate])

       useEffect(()=>{
         console.log(post)

       },[post])
 


        const getValue = (e) => {
          setPost((prevState) => ({
            ...prevState,
            text: String(e)
          }))

        };
        function changeHeading(e) {
          setPost((prevState) => ({
            ...prevState,
            title: e.target.value
          }))
        }

        function postClick() {
          console.log(post.imgHash)
            // dispatch(createPost(post))
        }
        
        const onLogout = () => {
          dispatch(logout())
          dispatch(reset())
        }


        function imageInput(imgHash) {
          setPost(prevState => ({
            ...prevState,
            imgHash:[...prevState.imgHash,imgHash],
          }))
        }
        function videoInput(videoHash) {
          setPost(prevState => ({
            ...prevState,
            videoHash:[...prevState.videoHash, videoHash],
          }))
        }
        function fileInput(fileHash) {
          setPost(prevState => ({
            ...prevState,
            fileHash: [...prevState.fileHash, {name: fileHash.name, hash: fileHash.hash}],
          }))

        }
        function changeEditor(e) {
          setEditor(e);
        }
        function reset(){
          setEditor("discard")
          setPost({
            title:'',
            text:'',
            imgHash:[],
            videoHash:[],
            fileHash:[],

          });
          setTimeout(function () {
            setEditor("post")
          }, 1000)
        }


        // if(isLoading) {
        //   return <Spinner />
        // }


  return (
    <>
    <div className="">

      {/* top profile */}
    

    <div className='topbar'>
        <div className='column' style={{paddingLeft:"20px"}}>
            <input  style ={{height:"30px", paddingRight:"0px"}} className="form-control input-sm search-username" id="inputsm" placeholder = "search" type="search"/>
        </div>
        <div className='column' style={{}}>
           <div style={{paddingRight:"10px",paddingLeft:"0px",display:"inline-block"}}>
               <img style={{borderRadius:"50%", width:"30px",paddingRight:"0px"}} src={user && user.pfp } />
               <div className='dummy'>
                    <span style={{fontSize:"12px",display:"block"}} className='name'><b>{user ? `u/${user.username}` : "null"}</b> </span>
                    <span style={{fontSize:"10px",display:"block"}} className="rollno" ><b>{user ? `${user.name}` : 'null'}</b></span>
               </div>
           </div>
           <div style={{pointer:'cursor', display:"inline-block", paddingRight:"10px"}}>
              <i onClick = {onLogout} style={{color:"red",marginRight:"6px"}} class="fa-solid fa-arrow-right-from-bracket fa-lg"></i>
              <span onClick = {onLogout}  style={{pointer:'cursor'}} className='logout'>Logout</span>
           </div>
        </div> 
    </div>


      {/* ipfs adding files  */}
      <div  className='topbar' style={{marginTop:"30px",display:"flex",borderRadius:"10px"}} >
          
          <button onClick={() => changeEditor("post")} name="post" id= 'poste' type="button" class="btn btn-light" style={{margin:"auto",borderTopLeftRadius:"5px",borderTopLeftRadius:"5px",height: "50px", flex:"auto",borderBottom: editor == "post" ? "1px solid #DAE0E6": null}}>
               <i style={{color:"gray"}} className="fa-solid fa-envelope"></i>
               <b style={{paddingLeft:"8px",color:"gray"}}>Post</b>
          </button>

          <button onClick={() => changeEditor("image")} name="image" id= 'poste' type="button" class="btn btn-light" style={{height: "50px" ,flex:"auto",borderBottom: editor == "image" ? "1px solid #DAE0E6": null}}>
            <i style={{color:"gray"}} className="fa-solid fa-file-image"></i>
            <b style={{paddingLeft:"8px", color:"gray"}}>Image</b>
          </button>
          <button onClick={() => changeEditor("video")} name="video"  id= 'poste' type="button" class="btn btn-light" style={{height: "50px" , flex:"auto",borderBottom: editor == "video" ? "1px solid #DAE0E6": null}}>
            <i style={{color:"gray"}} className="fa-solid fa-file-video"></i>
            <b style={{paddingLeft:"8px",color:"gray"}}>Video</b>
          </button>
          <button onClick={() => changeEditor("poll")} name="poll" id= 'poste' type="button" class="btn btn-light" style={{borderTopRightRadius:"5px",borderTopRightRadius:"5px",height: "50px" ,flex:"auto", borderBottom: editor == "poll" ? "1px solid #DAE0E6": null}}>
             <i style={{color:"gray"}} className="fa-solid fa-square-poll-horizontal"></i>
             <b style={{paddingLeft:"8px", color:"gray"}}>File</b>
          </button>
     
       </div>


       





      {/* Editor */}

    <div className="editcontainer" style={{minHeight:"330px",position:"relative",borderRadius:"10px", marginTop:'5px'}}>
              <div class="input-group mb-3">
                <input onChange={changeHeading}  type="text" class="form-control title-box" placeholder="An interesting title" aria-label="Username" aria-describedby="basic-addon1" />
              </div>
              <div>
              
              {editor == "post"  ? 
              ( <RichTextEditor initialValue={post.text} altered={getValue}/>) : 
              (editor == "image" ? (<ImageEditor imageInput={imageInput} images={post.imgHash}/>): 
              (editor == "video" ?  (<VideoEditor videoInput={videoInput} videos={post.videoHash}/>) : 
              (editor == "discard" ? (<div style={{textAlign:"center",padding:"50px 0"}} className='image-editor'><h5 style={{color:"gray"}}>Discarding the post..</h5></div>) :  
              (<File fileInput={fileInput} files={post.fileHash}/>) ) )) }



              </div>  
              <div style={{marginTop:"50px"}}>
              <button type="button"style={{position:"absolute",right:"90px", bottom:"10px"}} onClick ={reset} class="btn btn-secondary"> Discard</button>
              <button type="button"style={{position:"absolute",right:"20px", bottom:"10px",width:"fit-content"}} onClick={postClick} class="btn btn-primary"> Post </button>
              </div>
     </div>


{/*  
    posts */}


    {/* {posts && } */}

    
     {posts && <div>
                  {posts.map((post) => (
                    <PostItem key ={post._id} post={post}/>
                  ))}
               </div>
     }

     {/* <div className='editcontainer'>
            
       </div> */}











    </div>
    </>

  );
}

export default Dashboard;
