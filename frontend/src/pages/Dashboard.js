import { useState ,useRef, useEffect} from 'react';
import RichTextEditor from './components/editors/RichTextEditor';
import VideoEditor from './components/editors/VideoEditor';
import ImageEditor from './components/editors/ImageEditor';
import File from './components/editors/File';
import { create } from 'ipfs-http-client';
import {useSelector, useDispatch, batch} from "react-redux"
import {logout,getMe} from "../features/auth/authSlice.js"
import {createPost, getPosts,reset as resetDash, modifyPaths} from "../features/posts/postSlice.js";
import {modifyPage} from "../features/page/pageSlice.js";
import {reset as resetter} from "../features/page/pageSlice.js";
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import PostItem from '../components/postItem';
import "../App.css";
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom';
import { filter } from 'domutils';
import { createBrowserHistory } from "history";
import MessageDash from './Message/MessageDash';
import Profile from './Profile';
import { queryHomeUser,emptyUserList } from '../features/chat/chatSlice';
import HomeSearchResults from './HomeSearchResults';
import anon from "./images/anon.png"
import AppProfile from './AppProfile';
import logo from "./images/newlogo.png";



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
        const {homeSearchResults} = useSelector((state) => state.chat);
        const {posts,isLoading,isError,message,isSuccess,paths} = useSelector((state) => state.posts);
        const {limit,skip} = useSelector((state) => state.page);

        const [posty,setPosty] = useState({
          title:'',
          text:'',
          imgHash:[],
          videoHash:[],
          fileHash:[],
          postType:"",
        }) 
        

        const [page,setPage] = useState({
          limit: limit,
          skip: skip,
          branch: "ALL",
          type: "hot",
          feed:"student",
        });

        useEffect(()=>{
          dispatch(getMe())

        },[])
        useEffect(() => {
          //console.log(user)
          if(isError) {
            console.log(message)
          }
          // if(skip == 0) {
          //   dispatch(getPosts(page))
          //   dispatch(modifyPage({limit,skip}));
          // }
        
          if(!user){
            navigate('/login');
            
          }
          return () => { 
            // dispatch(reset())
          }
        },[user,navigate,skip])

        // if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
        //   dispatch(reset())
        // }
     
        
        
        const history = createBrowserHistory();
        useEffect(() =>{
          if(history.action !== 'POP'){
            if(skip !== 0) {
              console.log(`skip after modifying ${skip}`)
              dispatch(getPosts({limit,skip,branch:page.branch,type:page.type}))
            }       
          }
        },[skip])

          

        //The below useEffect might be the bug!
        useEffect(()=>{
           if(skip !== 0 ){
            if(paths !== '/user' ){
              if(paths !== '/post') {
            dispatch(getPosts({limit:page.limit, skip:skip, branch:page.branch, type:page.type, feed: page.feed}))
            //console.log(skip) 
              }
            }     
           }
        },[skip])

        function fetchImages() {
           //dispatch(modifyPage({limit:20,skip:0})) 
           // Runs the above useEffect function!!
           
          
          dispatch(modifyPage({limit,skip})).then(() =>{
  

               
          });
          


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
            postType:"",

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
              postType:""
            });
            dispatch(getMe())
            
            setTimeout(function () {
              setEditor("post")
            }, 1000)
          }


        }


        

       
        
        const[userScrolled,setUserScrolled] = useState(false);

        window.onscroll = function (e)
        {
          setUserScrolled(true);
        }

        
        const[filterType, setFilterType] = useState("hot");
        const[buttonName,setButtonName] = useState('All');
        const[timeButton,setTimeButton] = useState('Top');

        function changeBranch(branch){
          setButtonName(branch);
          dispatch(resetter()) 
          setPage((prevState) => ({
            ...prevState,
            branch: branch,
            skip:0,
            limit:20
          })
          )
        }
       // function changeTimePeriod(time){
          // setTimeButton(time);
          //  dispatch(resetter());
          //  setPage((prevState) => ({
          //   ...prevState,
          //   type: time,
          //   skip:0,
          //   limit:20
          // })
          // )
           
       // }

        function changeFilterType(e){
          if(e !== 'new' && e !== "hot") {
            setTimeButton(e)
          }
          setFilterType(e);
          dispatch(resetter()) 
          setPage((prevState) => ({
            ...prevState,
            type: e,
            skip:0,
            limit:20
          })
          )      
        }

        function changeFeed(feed) {
          dispatch(resetter())
          setPage((prevState) => ({
            ...prevState,
            feed:feed,
            skip:0,
            limit:20
          })
          )
          

        }

        function filterByTime(value) {
          setFilterType("Date");
          if(value.length == 5){
            value = value.replace(/\//g, "");
            var newValue = "date"+ value;
            dispatch(resetter()) 
            setPage((prevState) => ({
              ...prevState,
              type: newValue,
              skip:0,
              limit:20
            })
            ) 
          }
          
        }

        useEffect(() =>{
          //console.log(skip); 
          //console.log(paths)
            if(skip == 0) {
              if(paths !== '/user' ){
                if(paths !== '/post') {
                    dispatch(resetDash())
                    dispatch(resetter())
                    dispatch(getPosts(page))
                      .catch((e) => {
                        console.log(e)
                      });  
                    //console.log("doing...")
              }
            }

              }
              dispatch(modifyPaths('/'))
        },[page])


        const[showMessageBox,setShowMessageBox] = useState(false);
        

        // Searching User from Home Screen
        function searchUserFromHome(user){
          
          if(user.length > 0){
          dispatch(queryHomeUser(user))
          }
          else{
            dispatch(emptyUserList());
          }
          
        
        }
        useEffect(()=>{
           return(()=>{
             dispatch(emptyUserList())
           })
        },[])
        
        const[anoni,setAnoni] = useState(false);
        function toAnon(){
          setAnoni(!anoni)
        }

        useEffect(()=>{
          if(anoni == true){
            setPosty(prevState => ({
              ...prevState,
              postType:"anon",     
            }))
          }
          else{
            setPosty(prevState => ({
              ...prevState,
              postType:"",     
            }))

          }
        },[anoni])

        const[showAppProfile,setShowAppProfile]= useState( paths == "/user" || "/post" ? false: true);
    
        useEffect(()=>{

         setTimeout(()=>{
           
           setShowAppProfile(false)
         },1500)

        },[])

        
        //Displaying the searched results in home screen
        



        //Knowing the width of the screen

        const [width, setWidth]   = useState(window.innerWidth);    
        const updateDimensions = () => {
          setWidth(window.innerWidth);
        }
      
        useEffect(() => {
            window.addEventListener("resize", updateDimensions);
            
            return () => window.removeEventListener("resize", updateDimensions);
            
        }, []);








  return (

    <> 

    {showAppProfile ?
    <div style={{textAlign:"center",verticalAlign:"middle"}}>
       <img  src={logo} style={{width: width >1050 ?"500px":"400px",height: width > 1050 ? "500px":"400px"}}/>
    </div> :
  
    <div>



    <div className="" >
  
    {user && width>1050 ? <AppProfile /> :null }
    {user && width > 1050 ? <Profile /> :null }

      {/* top profile */}
    


    <div className='topbar' >
        <div className='column' style={{paddingLeft:"10px"}}>
            <input  style ={{height:"30px", paddingRight:"0px",width:"110px"}} autoComplete="off" className="form-control input-sm search-username" id="inputsm" onChange={(e)=>searchUserFromHome(e.target.value)} placeholder = "Search" type="search"/>
        </div>

        {homeSearchResults.length > 0 ?
        <div className='chats' style={{position:"absolute",zIndex:"212",top:"50px",marginLeft:"30px",marginTop:"10px",width:"220px", height:"auto",minHeight:"50px",maxHeight:"500px",overflowY:"scroll",borderRadius:"8px",backgroundColor:"#DAE0E6"}}>         
          {homeSearchResults.map((searchedUser)=>(
            
              <HomeSearchResults searchedUser={searchedUser} />  
          ))}
         </div>
         :
         null
      }
        
        { width < 1050 ?
        <div className='column'> 
        { !showMessageBox ?
             <i style={{fontSize:"25px",color:"gray",fontWeight:"800",marginTop:"5px",cursor:"pointer"}} onClick={()=>setShowMessageBox(true)} className="bi bi-chat-square-text-fill"></i>:
             <i style={{fontSize:"25px",color:"gray",fontWeight:"600",marginTop:"5px",cursor:"pointer"}} onClick={()=>setShowMessageBox(false)} class="fa-solid fa-house"></i>
        }
        </div> :null}


        <div className='column' style={{}}>
        <Link 
          to={"/me"}
          state= {{useri:user,scrolled:false}}
          style={{ textDecoration: 'none', color: 'black' }}>
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
                 <i onClick = {onLogout} style={{color:"red",marginRight:"6px"}} className="fa-solid fa-arrow-right-from-bracket fa-lg"></i>
            </Link>
              
              {/* <span onClick = {onLogout}  style={{pointer:'cursor'}} className='logout'></span> */}
           </div>
        </div> 
    </div>


    { !showMessageBox ?
    <>
    
    
      <div  className='topbar' style={{marginTop:"10px",display:"flex",borderRadius:"10px"}} >
          
          <button onClick={() => changeEditor("post")} name="post" id= 'poste' type="button" className="btn btn-light" style={{margin:"auto",borderRadius:"0",borderTopLeftRadius:"5px",borderBottomLeftRadius:"5px",height: "50px", flex:"auto",backgroundColor: editor == "post" ? "#f8f9fa": null}}>
               <i style={{color:"gray"}} className="fa-solid fa-envelope"></i>
               <b style={{paddingLeft:"8px",color:"gray"}}>Post</b>
          </button>

          <button onClick={() => changeEditor("image")} name="image" id= 'poste' type="button" className="btn btn-light" style={{height: "50px" ,flex:"auto",borderRadius:"0",backgroundColor: editor == "image" ? "#f8f9fa": null}}>
            <i style={{color:"gray"}} className="fa-solid fa-file-image"></i>
            <b style={{paddingLeft:"8px", color:"gray"}}>Image</b>
          </button>
          <button onClick={() => changeEditor("video")} name="video"  id= 'poste' type="button" className="btn btn-light" style={{height: "50px" , flex:"auto",borderRadius:"0", backgroundColor: editor == "video" ? "#f8f9fa": null}}>
            <i style={{color:"gray"}} className="fa-solid fa-file-video"></i>
            <b style={{paddingLeft:"8px",color:"gray"}}>Video</b>
          </button>
          <button onClick={() => changeEditor("poll")} name="poll" id= 'poste' type="button" className="btn btn-light" style={{borderRadius:"0",borderTopRightRadius:"5px",borderBottomRightRadius:"5px",height: "50px" ,flex:"auto", backgroundColor: editor == "poll" ? "#f8f9fa": null}}>
             <i style={{color:"gray"}} className="fa-solid fa-square-poll-horizontal"></i>
             <b style={{paddingLeft:"8px", color:"gray"}}>File</b>
          </button>
     
       </div>


       





       

    <div className="editcontainer" style={{minHeight:"330px",position:"relative",borderRadius:"10px", marginTop:'5px'}}>
              <div className="input-group mb-3" style={{display:"flex"}}>
              <button type="button"  style={{height:"40px",width:"40px",marginTop:"10px",paddingBottom:"10px",paddingLeft:"5px",paddingTop:"3px",marginLeft:"10px",backgroundColor: anoni ? "grey": null}} class="btn" onClick={toAnon}>
                <img style={{height:"30px",width:"30px",}} src={anon}/>
              </button>
                <textarea  value={posty.title} style={{height:"40px",borderRadius:"3px"}} type="text" className="form-control title-box" placeholder="An interesting title" aria-label="Username" aria-describedby="basic-addon1" onChange={changeHeading} > </textarea>
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


   


    
     
     <div  className='topbar' style={{marginTop:"20px",display:"flex",borderRadius:"10px"}} >

       <button name="post" id= 'poste' type="button" class="btn btn-light" style={{margin:"auto",borderRadius:"0",borderTopLeftRadius:"5px",borderBottomLeftRadius:"5px",height: "50px", flex:"auto", backgroundColor:"#f8f9fa"}}>
          <div className="dropdown">
            <b className="dropdown-toggle" type="button" id="dropdownMenuButton" style={{color:"gray"}} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              {buttonName}
            </b>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <span onClick={()=>changeBranch('ALL')} class="dropdown-item">ALL</span>
              <span onClick={()=>changeBranch('CSE')} class="dropdown-item">CSE</span>
              <span onClick={()=>changeBranch('ECE')} class="dropdown-item">ECE</span>
              <span onClick={()=>changeBranch('EEE')} class="dropdown-item" >EEE</span>
             
            </div> 
          </div>
       </button>

        <button name="post" id= 'poste' type="button" class="btn btn-light" style={{margin:"auto",borderRadius:"0",height: "50px", flex:"auto", backgroundColor: filterType == "hot" ? "#f8f9fa" : null }} onClick={() => changeFilterType("hot")}>
                  <b style={{paddingLeft:"8px",color:"gray"}}>Hot</b>
        </button>

        <button name="post" id= 'poste' type="button" class="btn btn-light" style={{margin:"auto",borderRadius:"0",height: "50px", flex:"auto", backgroundColor: filterType == "new" ? "#f8f9fa" : null }} onClick={() => changeFilterType("new")} >
                  <b style={{paddingLeft:"8px",color:"gray"}}>New</b>
        </button>

        <button name="post" id= 'poste' type="button" class="btn btn-light" style={{margin:"auto",borderRadius:"0",height: "50px", flex:"auto", backgroundColor: filterType == "Top" || filterType == "Month" || filterType == "Year" || filterType == "Week" ? "#f8f9fa" : null }}>
          <div class="dropdown">
            <b class="dropdown-toggle" type="button" id="dropdownMenuButton" style={{color:"gray"}} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              {timeButton}
            </b>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <span onClick={()=>changeFilterType('Week')}  class="dropdown-item">This Week</span>
              <span onClick={()=>changeFilterType('Month')}  class="dropdown-item">This Month</span>
              <span onClick={()=>changeFilterType('Year')}  class="dropdown-item">This Year</span>
              <span onClick={()=>changeFilterType('Top')}  class="dropdown-item">All Time Top</span>
            </div>
        </div>
       </button>
    
         <button name="post" id= 'poste' type="button" class="btn btn-light" style={{margin:"auto",borderRadius:"0",borderTopRightRadius:"5px",borderBottomRightRadius:"5px",height: "50px", flex:"auto",backgroundColor: filterType == "Date" ? "#f8f9fa": null, textAlign:"center"}}>
                  <input className='form-control' type="text" placeholder="22/03" onChange={(e)=> filterByTime(e.target.value)} style={{width:"60px",alignItems:"center",paddingLeft:"5px"}}/>          
          </button>
    </div>
 

   
    
    <div  className='topbar' style={{marginTop:"5px",display:"flex",borderRadius:"10px"}} >

    <button name="post" id= 'poste' type="button" class="btn btn-light" onClick={() => {changeFeed("student")}} style={{borderRadius:"0",borderTopLeftRadius:"5px",borderBottomLeftRadius:"5px",margin:"auto",height: "50px", flex:"auto",backgroundColor: page.feed == 'student' ? "#f8f9fa" :null}}>
                  <b style={{paddingLeft:"8px",color:"gray"}}>Student's Feed</b>
        </button>

        <button name="post" id= 'poste' type="button" class="btn btn-light" onClick={() => {changeFeed("faculty")}} style={{borderRadius:"0",borderTopRightRadius:"5px",borderBottomRightRadius:"5px",margin:"auto",borderRadius:"0",height: "50px", flex:"auto",backgroundColor :page.feed =='faculty' ? '#f8f9fa':null}}>
                  <b style={{paddingLeft:"8px",color:"gray"}}>Faculty Feed</b>
        </button>

    </div>









    <InfiniteScroll
    dataLength={posts.length} //This is important field to render the next data
    next={fetchImages}
    hasMore={true}
    loader={<div style={{display:"flex",justifyContent:"center",alignItems:"center",marginTop:"10px"}}><h6 style={{color:"gray"}}>Loading...</h6></div>}
    endMessage={
      <p style={{ textAlign: 'center' }}>
        <b>Yay! You have seen it all</b>
      </p>
    }
    >
          {posts.map((post,index) => (
            <PostItem key ={index} post={post} userScrolled={userScrolled}/>
          ))}
    </InfiniteScroll>




    </>
    : <MessageDash />
    }



    </div>
   
  
   {width > 1050 ? <MessageDash /> : null}
    

    

    </div>
}
    </>

  );
}

export default Dashboard;
