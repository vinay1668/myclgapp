import React from 'react'

function SelectedList({list,handleClick}) {
  return (
    <div className='chats' style={{overflowY:"scroll",height:"100px",marginLeft:"35px"}}>

        {list.map(item => (
            <button style={{position:"relative",width:"73px",height:"15px",fontSize:'10px',marginLeft:"3px",textAlign:"center",alignContent:"center"}} type="button" class="btn btn-outline-secondary" onClick={() => handleClick(item.userId)}>
              <span style={{position:"absolute",top:"0",left:"0",textSizeAdjust:"auto"}}>{item.username}</span>
            </button>
        ))}

    </div>
  )
}

export default SelectedList