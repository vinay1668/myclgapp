import React from 'react'
import pfp from "./images/pfp.png"
import logo from "./images/newlogo.png"
import oldlogo from "./images/oldlogo.png"

function AppProfile() {
  return (
      <>
    <a href="https://github.com/vinay1668/myclgapp" style={{position:'fixed',top:"-70px",left:"-130px",paddingLeft:0}}>
        <img src={logo} style={{width:'600px',height:"300px",Zindex:"52"}}/>
    </a>
    <a href="https://github.com/vinay1668/myclgapp" style={{position:"fixed",bottom:"50px",left:"30px",display:"flex",cursor:"pointer",textDecoration:"none",}}>
       <img src={pfp} style={{height:"30px",width:"30px"}}/>
       <h6 style={{marginTop:"8px",opacity:"0.5",fontSize:"14px",marginLeft:"15px",color:"black"}}>Copyright © 2022 Vinay</h6>
    </a>
    </>
  )
}

export default AppProfile