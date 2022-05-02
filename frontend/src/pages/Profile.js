import React from 'react'

import {useSelector, useDispatch, batch} from "react-redux"


function Profile() {
    const {user} = useSelector((state) => state.auth);
  
    return (
      <div className='sideprofile' style={{position:"fixed", top:"28%",left:"10px",paddingRight:"200px",marginLeft:"0",width:"50%"}}>
    
    <div className='usertopbar' style={{marginLeft:"10px",width:"60%",zIndex:"99",height:'335px',paddingBottom:"30px"}} >
        
            <div style={{textAlign:"center", margin:"0 auto"}}>
               <div style={{position:"absolute",left:"0",top:"0" , width:"100%" ,backgroundColor:"#33a8ff",height:"80px",zIndex:"-1",borderTopLeftRadius:"10px",borderTopRightRadius:"10px"}}></div>
                
                <div style={{display:"flex",flexDirection:"row"}}>
                     <button type="button" style={{width:"50px",height:"30px",fontSize:"12px",marginTop:"85px"}} class="btn btn-dark">{user.branch}</button>

                  <div style={{margin:"auto"}}>
                    <img style={{marginTop:"15px",borderRadius:"50%", width:"100px"}} src={user.pfp} />
                    <h4>{user.name}</h4>
                    <span style={{color:"gray",fontWeight:"bold",display:"inline"}}>{user.username}</span>
                  </div>

                  <div style={{display:"flex",flexDirection:'column',marginTop:"85px"}}>
                    <span style={{ fontSize:"13px",fontWeight:"600"}}>
                       <i style={{ marginRight:"10px"}} class="bi bi-megaphone-fill"></i>
                       <span style={{marginRight:"10px"}}>{user.postcount}</span>
                    </span>

                    <span style={{ fontSize:"13px",fontWeight:"600",marginTop:"10px"}}>
                        <i style={{ marginRight:"10px"}} class="bi bi-gift-fill"></i>
                        <span style={{marginRight:"10px"}} >{user.likecount}</span>
                      </span>
                  </div>

                </div>
                
                  <div style={{paddingTop:"20px",fontWeight:"500",width:"80%",margin:"0 auto",display:"flex"}}>
                     {true ? 
                     <span style={{margin:"0 auto"}}>{user.description}</span> : 
                     <input  style = {{margin:"0 auto",borderTop:"0",borderLeft:"0",borderRight:"0",width:"80%" }} type="email" class="form-control discript" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Description" />
                     }
                  
                     
                  </div>
                 
               </div>
      
            <div style={{marginTop:"20px",display:'flex',flexDirection:'column'}}>
 

            </div>
            {/* <div style={{marginTop:"10px"}}>
            <span style={{display:"inline", marginLeft:"20px",fontSize:"20px",fontWeight:"600"}}>Comment Karma: </span>
            </div> */}
        </div>
    </div>
  )
}

export default Profile