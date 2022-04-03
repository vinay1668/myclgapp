import { useEffect,useState } from "react"
import {useSelector, useDispatch} from "react-redux"
import { getUserPosts } from "../features/posts/postSlice";
import { reset } from "../features/posts/postSlice"
import InfiniteScroll from "react-infinite-scroll-component";
import PostItem from "../components/postItem";

function User({id,username}) {
    console.log(id);
    console.log(username);
    const dispatch = useDispatch()

    const {user} = useSelector((state) => state.auth);
    const {posts,isLoading,isError,message,isSuccess} = useSelector((state) => state.posts);
    const [page,setPage] = useState({
        limit: 5,
        skip: 5
      });

    useEffect(() => {
        dispatch(reset())
        dispatch(getUserPosts({limit:5,skip:0}))
        
      return () => {   
        
          
      }
    }, [dispatch])

    function fetchImages() {
        setPage({
          limit:page.limit,
          skip: page.skip + page.limit,
        })
        dispatch(getUserPosts(page))
      }


    



  return (
      <>
        <div style={{minHeight:"280px",zIndex:"-2"}} className='usertopbar'>
        
            <div style={{textAlign:"center", margin:"0 auto"}}>
            <button type="button" style={{position:"absolute", top:"81px",left:"0",width:"50px",height:"30px",fontSize:"12px"}} class="btn btn-dark">{user.branch}</button>
            <div style={{position:"absolute",left:"0",top:"0" , width:"100%" ,backgroundColor:"#33a8ff",height:"80px",zIndex:"-1",borderTopLeftRadius:"10px",borderTopRightRadius:"10px"}}></div>
                <img style={{marginTop:"15px",borderRadius:"50%", width:"100px"}} src={user.pfp} />
                <h4 style={{}}>{user.name}</h4>
                <span style={{color:"gray",fontWeight:"bold",display:"inline"}}>{`u/${user.username}`}</span>
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





        <InfiniteScroll
    dataLength={posts.length} //This is important field to render the next data
    next={fetchImages}
    hasMore={true}
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





    </>
  )
}

export default User;