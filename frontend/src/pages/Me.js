import { useEffect,useState } from "react"
import {useSelector, useDispatch} from "react-redux"
import { getUserPosts } from "../features/posts/postSlice";
import { reset } from "../features/posts/postSlice"
import {reset as resetPage} from '../features/page/pageSlice';
import InfiniteScroll from "react-infinite-scroll-component";
import PostItem from "../components/postItem";
import MessageDash from './Message/MessageDash';
import Profile from './Profile';

function Me() {
    
    const dispatch = useDispatch()

    const {user} = useSelector((state) => state.auth);
    const {userPosts} = useSelector((state) => state.posts);
    const [page,setPage] = useState({
        limit: 20,
        skip: 20,
        id:user.id
        
      });

    useEffect(() => {
        dispatch(reset())
        dispatch(resetPage());
        dispatch(getUserPosts({limit:20,skip:0,id:user.id}))
   
      return () => {   
       dispatch(reset())
       dispatch(resetPage());
        
          
      }
    }, [dispatch])

    function fetchImages() {
        setPage({
          limit:page.limit,
          skip: page.skip + page.limit,
          id:user.id
        })
        dispatch(getUserPosts(page))
      }


    



  return (
      <>
      <Profile />
        <div style={{minHeight:"280px",zIndex:"-2"}} className='usertopbar'>
        
            <div style={{textAlign:"center", margin:"0 auto"}}>
            <button type="button" style={{position:"absolute", top:"81px",left:"0",width:"50px",height:"30px",fontSize:"12px"}} class="btn btn-dark">{user.branch}</button>
            <div style={{position:"absolute",left:"0",top:"0" , width:"100%" ,backgroundColor:"#33a8ff",height:"80px",zIndex:"-1",borderTopLeftRadius:"10px",borderTopRightRadius:"10px"}}></div>
                <img style={{marginTop:"15px",borderRadius:"50%", width:"100px"}} src={user.pfp} />
                <h4 style={{}}>{user.name}</h4>
                <span style={{color:"gray",fontWeight:"bold",display:"inline"}}>{user.username}</span>
                {/* <div style={{width:"90%",margin:"auto",marginTop:"10px"}}>
                <h6 style={{display:"inline"}}>my name is vinay kumar. currently studying final year. I will be graduating in 2022</h6>
                </div> */}
            </div>
            <div style={{marginTop:"20px"}}>
                <span style={{display:"inline", marginLeft:"20px",fontSize:"20px",fontWeight:"600"}}>Karma: </span>
            </div>
            {/* <div style={{marginTop:"10px"}}>
            <span style={{display:"inline", marginLeft:"20px",fontSize:"20px",fontWeight:"600"}}>Comment Karma: </span>
            </div> */}
        </div>



  <div  className='topbar' style={{marginTop:"30px",display:"flex",borderRadius:"10px"}} >

      <button name="post" id= 'poste' type="button" class="btn btn-light" style={{margin:"auto",borderRadius:"0",borderTopLeftRadius:"5px",borderBottomLeftRadius:"5px",height: "50px", flex:"auto",borderBottom: "1px solid #DAE0E6"}}>
                <b style={{paddingLeft:"8px",color:"gray"}}>New</b>
      </button>

      <button name="post" id= 'poste' type="button" class="btn btn-light" style={{margin:"auto",borderRadius:"0",height: "50px", flex:"auto",borderBottom:"1px solid #DAE0E6"}}>
                <b style={{paddingLeft:"8px",color:"gray"}}>Old</b>
      </button>

      <button name="post" id= 'poste' type="button" class="btn btn-light" style={{margin:"auto",borderRadius:"0",height: "50px", flex:"auto",borderBottom:"1px solid #DAE0E6"}}>
      <b style={{paddingLeft:"8px",color:"gray"}}>Top</b>
                
      </button>

      <button name="post" id= 'poste' type="button" class="btn btn-light" style={{margin:"auto",borderRadius:"0",borderTopRightRadius:"5px",borderBottomRightRadius:"5px",height: "50px", flex:"auto",borderBottom: "1px solid #DAE0E6"}}>
              <input className='form-control' type="text" placeholder="2022/3" style={{width:"80px",marginLeft:"15px",borderWidth:"2px"}}/>
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
            <PostItem key = {index} post={post} component = "user"/>
          ))}
    </InfiniteScroll>




  <MessageDash />
    </>
  )
}

export default Me;