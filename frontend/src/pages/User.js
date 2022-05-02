import { useEffect,useState } from "react"
import {BrowserRouter as Router,Switch,useLocation} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux"
import { getUserPosts,resetUserPosts,modifyPaths } from "../features/posts/postSlice";
import { reset, otherPostsReset } from "../features/posts/postSlice"
import InfiniteScroll from "react-infinite-scroll-component";
import PostItem from "../components/postItem";
import "bootstrap-icons/font/bootstrap-icons.css";
import MessageDash from './Message/MessageDash';
import { getOtherUser } from "../features/auth/authSlice";
import Profile from './Profile';
import AppProfile from "./AppProfile";


function User() {
    const location = useLocation();
    const dispatch = useDispatch()

    const {otherUser} = useSelector((state) => state.auth);
    const {userPosts} = useSelector((state) => state.posts);

    useEffect(()=>{
      dispatch(getOtherUser(location.state.post.user));
    },[])
    // useEffect(()=>{
    //   console.log(otherUser)
    // },[otherUser])


    const [page,setPage] = useState({
        limit: 20,
        skip: 0,
        id:location.state.post.user,
        type:'New',
      });

    useEffect(() => {
      
      //console.log(location.state.post.user);
      dispatch(modifyPaths('/user'));   
       if(!location.state.scrolled){
         dispatch(getUserPosts(page))
         setPage({
          limit:page.limit,
          skip: page.skip + page.limit,
          id:location.state.post.user
        })
      }

        

      return () => {   
        dispatch(resetUserPosts()) 
      }
    }, [])

// user has not scrolled!
    // function fetchImages() {
    //   console.log(page.skip)
    //   if(page.skip !== 0){
    //   dispatch(getUserPosts(page))
    //   }
    //     setPage({
    //       limit:page.limit,
    //       skip: page.skip + page.limit,
    //       id:location.state.user
    //     })
    //   }
    
  // user has scrolled
      function fetchImages() {
          dispatch(getUserPosts(page))
          setPage((prevState) => ({
            limit:20,
            skip: prevState.skip + prevState.limit
          }))
      }
      
      const[filterType,setFilterType] = useState("New");
      function changeFilter(filter) {
        setFilterType(filter)
        dispatch(resetUserPosts())
        setPage((prevState) => ({
          ...prevState,
          limit:20,
          skip:0,
          type : filter,
        }) )
        dispatch(getUserPosts({limit:20,skip:0,type:filter,id:location.state.post.user}))
      }
 
      function dateChange(value){
        if(value.length == 5){
          value = value.replace(/\//g, "");
          var newValue = "date"+ value;
          dispatch(resetUserPosts())
          setPage((prevState) => ({
            ...prevState,
            limit:20,
            skip:0,
            type : newValue,
          }) )
          dispatch(getUserPosts({limit:20,skip:0,type:newValue,id:location.state.post.user}))
        }

      }

     

  


    const[edit,setEdit] = useState(false)
    function editDiscription() {
      setEdit(true)
      console.log(edit)
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
      <>
      {width > 1050 ? <Profile /> : null}
      {width > 1050 ? <AppProfile /> : null}
        <div style={{minHeight:"280px",zIndex:"99",height:'auto',paddingBottom:"30px"}} className='usertopbar'>
        
            <div style={{textAlign:"center", margin:"0 auto"}}>
               <div style={{position:"absolute",left:"0",top:"0" , width:"100%" ,backgroundColor:"#33a8ff",height:"80px",zIndex:"-1",borderTopLeftRadius:"10px",borderTopRightRadius:"10px"}}></div>
                
                <div style={{display:"flex",flexDirection:"row"}}>
                     <button type="button" style={{width:"50px",height:"30px",fontSize:"12px",marginTop:"85px"}} class="btn btn-dark">{location.state.post.branch}</button>

                  <div style={{margin:"auto"}}>
                    <img style={{marginTop:"15px",borderRadius:"50%", width:"100px"}} src={location.state.post.pfp} />
                    <h4>{location.state.post.name}</h4>
                    <span style={{color:"gray",fontWeight:"bold",display:"inline"}}>{location.state.post.username}</span>
                  </div>

                  <div style={{display:"flex",flexDirection:'column',marginTop:"85px"}}>
                    <span style={{ fontSize:"13px",fontWeight:"600"}}>
                       <i style={{ marginRight:"10px"}} class="bi bi-megaphone-fill"></i>
                       <span style={{marginRight:"10px"}}>{otherUser ? otherUser.postcount:null}</span>
                    </span>
                    <span style={{ fontSize:"13px",fontWeight:"600",marginTop:"10px"}}>
                        <i style={{ marginRight:"10px"}} class="bi bi-gift-fill"></i>
                        <span style={{marginRight:"10px"}} >{otherUser ? otherUser.likecount:null}</span>
                      </span>
                  </div>

                </div>
                
                  <div style={{paddingTop:"20px",fontWeight:"500",width:"80%",margin:"0 auto",display:"flex"}}>
                     {!edit ? 
                     <span style={{margin:"0 auto",paddingLeft:"20px"}}>{otherUser?otherUser.description:null}</span> : 
                     <input  style = {{margin:"0 auto",borderTop:"0",borderLeft:"0",borderRight:"0",width:"80%" }} type="email" class="form-control discript" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Description" />
                     }
                  
                     {/* <i style ={{paddingLeft:"5px",marginTop:"5px",zIndex:"55",cursor:"pointer"}} onClick={editDiscription} class="fa fa-solid fa-pen"></i> */}
                  </div>
                 
               </div>
      
            <div style={{marginTop:"20px",display:'flex',flexDirection:'column'}}>
 

            </div>
            {/* <div style={{marginTop:"10px"}}>
            <span style={{display:"inline", marginLeft:"20px",fontSize:"20px",fontWeight:"600"}}>Comment Karma: </span>
            </div> */}
        </div>






        <div  className='topbar' style={{marginTop:"30px",display:"flex",borderRadius:"10px"}} >

<button name="post" id= 'poste' type="button" class="btn btn-light" onClick={() => changeFilter('New')} style={{margin:"auto",borderRadius:"0",borderTopLeftRadius:"5px",borderBottomLeftRadius:"5px",height: "50px", flex:"auto",backgroundColor: filterType == 'New' ? '#f8f9fa' : null}}>
          <b style={{paddingLeft:"8px",color:"gray"}}>New</b>
</button>

<button name="post" id= 'poste' type="button" class="btn btn-light" onClick={() => changeFilter('Old')} style={{margin:"auto",borderRadius:"0",height: "50px", flex:"auto",backgroundColor: filterType == 'Old' ? '#f8f9fa' : null}}>
          <b style={{paddingLeft:"8px",color:"gray"}}>Old</b>
</button>

<button name="post" id= 'poste' type="button" class="btn btn-light" onClick={() => changeFilter('Top')} style={{margin:"auto",borderRadius:"0",height: "50px", flex:"auto",backgroundColor: filterType == 'Top' ? '#f8f9fa' : null}}>
<b style={{paddingLeft:"8px",color:"gray"}}>Top</b>
          
</button>

<button name="post" id= 'poste' type="button" class="btn btn-light" onChange={(e) => dateChange(e.target.value)} style={{margin:"auto",borderRadius:"0",borderTopRightRadius:"5px",borderBottomRightRadius:"5px",height: "50px", flex:"auto", backgroundColor: filterType == 'Date' ? '#f8f9fa' : null}}>
        <input className='form-control' type="text" placeholder="YY/MM" style={{width:"80px",marginLeft:"15px",borderWidth:"2px"}}/>
</button>

</div>





        <InfiniteScroll
    dataLength={userPosts.length} //This is important field to render the next data
    next={fetchImages}
    hasMore={true}
    endMessage={
      <p style={{ textAlign: 'center' }}>
        <b>Yay! You have seen it all</b>
      </p>
    }
    >
          {userPosts.map((post,index) => (
           post.postType !== "anon" ?
            <PostItem key ={index} post={post}  /> : null
          )
          )}
    </InfiniteScroll>




   {width > 1050 ? <MessageDash />: null}

   
    </>
  )
}

export default User;