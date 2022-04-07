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
import InfiniteScroll from 'react-infinite-scroll-component';

import { Link } from 'react-router-dom';
/* Create an instance of the client */
const client = create('https://ipfs.infura.io:5001/api/v0')
// import InfiniteScroll from 'react-infinite-scroll-component';



function Dashboard() {
        
        
        const[url,setUrl] = useState('')
        const[editor,setEditor] = useState('post')

        const navigate = useNavigate()
        const dispatch = useDispatch()
        const firstTime = true;
        const {user} = useSelector((state) => state.auth);
        const {posts,isLoading,isError,message,isSuccess} = useSelector((state) => state.posts);

        const [posty,setPosty] = useState({
          title:'',
          text:'',
          imgHash:[],
          videoHash:[],
          fileHash:[],
        }) 
        

        const [page,setPage] = useState({
          limit: 5,
          skip: 5
        });

        useEffect(() => {
          if(isError) {
            console.log(message)
          }
          dispatch(getPosts({limit:5,skip:0}))
          
        
          if(!user){
            navigate('/login');
            
          }

          
          
          return () => { 
            dispatch(reset())
          }
        },[user, isError,message,dispatch,navigate,user])






     
        function fetchImages() {
          setPage({
            limit:page.limit,
            skip: page.skip + page.limit,
          })
          dispatch(getPosts(page))
        }





        const getValue = (e) => {
          setPosty((prevState) => ({
            ...prevState,
            text: String(e)
          }))

        };
        function changeHeading(e) {
          setPosty((prevState) => ({
            ...prevState,
            title: e.target.value
          }))
        }

    
        
        const onLogout = () => {

          dispatch(logout())
           
    
        }


        function imageInput(imgHash) {
          setPosty(prevState => ({
            ...prevState,
            imgHash:[...prevState.imgHash,imgHash],
          }))
        }
        function videoInput(videoHash) {
          setPosty(prevState => ({
            ...prevState,
            videoHash:[...prevState.videoHash, videoHash],
          }))
        }
        function fileInput(fileHash) {
          setPosty(prevState => ({
            ...prevState,
            fileHash: [...prevState.fileHash, {name: fileHash.name, hash: fileHash.hash}],
          }))

        }
        function changeEditor(e) {
          setEditor(e);
        }
        function reset(){
          setEditor("discard")
          setPosty({
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


        function postToDb() {
          if(posty.title == ""){
             setEditor("notitle");
             setTimeout(function () {
              setEditor("post")
            }, 1000)
          }
          else{
            dispatch(createPost(posty));
            setEditor("postSuccess")
            setPosty({
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
            <input  style ={{height:"30px", paddingRight:"0px"}} className="form-control input-sm search-username" id="inputsm" placeholder = "Search" type="search"/>
        </div>
        <div className='column' style={{}}>
        <Link style={{ textDecoration: 'none', color: 'black' }} to = "/me" >
           <div style={{paddingRight:"10px",paddingLeft:"0px",display:"inline-block"}}>
               <img style={{borderRadius:"50%", width:"30px",paddingRight:"0px"}} src={user && user.pfp } />
               <div className='dummy'>
                    <span style={{curser:"pointer",fontSize:"12px",display:"block"}} className='name'><b>{user ? user.username : "null"}</b> </span>
                    <span style={{fontSize:"10px",display:"block"}} className="rollno" ><b>{user ? `${user.name}` : 'null'}</b></span>
               </div>
           </div>
        </Link>
           <div style={{pointer:'cursor', display:"inline-block", paddingRight:"10px"}}>
             <Link to="/login">
                 <i onClick = {onLogout} style={{color:"red",marginRight:"6px"}} class="fa-solid fa-arrow-right-from-bracket fa-lg"></i>
            </Link>
              
              {/* <span onClick = {onLogout}  style={{pointer:'cursor'}} className='logout'></span> */}
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
              <textarea  value={posty.title} style={{height:"40px"}} type="text" class="form-control title-box" placeholder="An interesting title" aria-label="Username" aria-describedby="basic-addon1" onChange={changeHeading} > </textarea>
              </div>
              <div>
              
              {editor == "post"  ? 
              ( <RichTextEditor initialValue={posty.text} altered={getValue}/>) : 
              (editor == "image" ? (<ImageEditor imageInput={imageInput} images={posty.imgHash}/>): 
              (editor == "video" ?  (<VideoEditor videoInput={videoInput} videos={posty.videoHash}/>) : 
              (editor == "discard" ? (<div style={{textAlign:"center",padding:"50px 0"}} className='image-editor'><h5 style={{color:"gray"}}>Discarding the post..</h5></div>) :  
              (editor == "postSuccess" ? (<div style={{textAlign:"center",padding:"50px 0"}} className='image-editor'><h5 style={{color:"#6BCB77"}}><i class="fa fa-solid fa-square-check"></i> posted!</h5></div>):
              (editor == "notitle" ? (<div style={{textAlign:"center",padding:"50px 0"}} className='image-editor'><h5 style={{color:"#FC4F4F"}}><i class="fa-solid fa-xmark"></i> Please add the title.</h5></div>) :
              (<File fileInput={fileInput} files={posty.fileHash}/>) ) )) ))}



              </div>  
              <div style={{marginTop:"50px"}}>
              <button type="button"style={{position:"absolute",right:"90px", bottom:"10px"}} onClick ={reset} class="btn btn-secondary"> Discard</button>
              <button type="button"style={{position:"absolute",right:"20px", bottom:"10px",width:"fit-content"}} class="btn btn-primary" onClick={postToDb} > Post </button>
              </div>
     </div>


    {/* search filters */}
     
     <div  className='topbar' style={{marginTop:"30px",display:"flex",borderRadius:"10px"}} >

       <button name="post" id= 'poste' type="button" class="btn btn-light" style={{margin:"auto",borderTopLeftRadius:"5px",borderTopLeftRadius:"5px",height: "50px", flex:"auto",borderBottom: editor == "post" ? "1px solid #DAE0E6": null}}>
          <div class="dropdown">
            <b class="dropdown-toggle" type="button" id="dropdownMenuButton" style={{color:"gray"}} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              All
            </b>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a class="dropdown-item" href="#">All</a>
              <a class="dropdown-item" href="#">CSE</a>
              <a class="dropdown-item" href="#">ECE</a>
              <a class="dropdown-item" href="#">EEE</a>
            </div>
          </div>
       </button>

        <button name="post" id= 'poste' type="button" class="btn btn-light" style={{margin:"auto",borderTopLeftRadius:"5px",borderTopLeftRadius:"5px",height: "50px", flex:"auto", borderBottom: editor == "post" ? "1px solid #DAE0E6": null}}>
                  <b style={{paddingLeft:"8px",color:"gray"}}>New</b>
        </button>

        <button name="post" id= 'poste' type="button" class="btn btn-light" style={{margin:"auto",borderTopLeftRadius:"5px",borderTopLeftRadius:"5px",height: "50px", flex:"auto",borderBottom: editor == "post" ? "1px solid #DAE0E6": null}}>
                  <b style={{paddingLeft:"8px",color:"gray"}}>Hot</b>
        </button>

        <button name="post" id= 'poste' type="button" class="btn btn-light" style={{margin:"auto",borderTopLeftRadius:"5px",borderTopLeftRadius:"5px",height: "50px", flex:"auto",borderBottom: editor == "post" ? "1px solid #DAE0E6": null}}>
          <div class="dropdown">
            <b class="dropdown-toggle" type="button" id="dropdownMenuButton" style={{color:"gray"}} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Top
            </b>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a class="dropdown-item" href="#">Today</a>
              <a class="dropdown-item" href="#">This month</a>
              <a class="dropdown-item" href="#">This Year</a>
              <a class="dropdown-item" href="#">All Time</a>
            </div>
        </div>
       </button>
    

       <button name="post" id= 'poste' type="button" class="btn btn-light" style={{margin:"auto",borderTopLeftRadius:"5px",borderTopLeftRadius:"5px",height: "50px", flex:"auto",borderBottom: editor == "post" ? "1px solid #DAE0E6": null}}>
                  <input className='form-control' type="text" placeholder="2022/3" style={{width:"80px",borderWidth:"2px"}}/>
                  
        </button>
       
  
    
    
    </div>






{/*  
    posts */}

{/* 
    {/* {posts && } */}

    <InfiniteScroll
    dataLength={posts.length} //This is important field to render the next data
    next={fetchImages}
    hasMore={true}
    // loader={<h6 style={{color:"gray",margin:"0 auto"}}>Loading...</h6>}
    endMessage={
      <p style={{ textAlign: 'center' }}>
        <b>Yay! You have seen it all</b>
      </p>
    }
    >
          {posts.map((post,index) => (
            <PostItem key ={index} post={post}/>
          ))}
    </InfiniteScroll>

    {/* {posts && <div>
          {posts.map((post,index) => (
            <PostItem key ={index} post={post}/>
          ))}
        </div>
    } */}

     {/* <div className='editcontainer'>
            
       </div> */}











    </div>
    </>

  );
}

export default Dashboard;
