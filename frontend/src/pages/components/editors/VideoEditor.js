import React,{useState,useEffect} from 'react'

import client from './ipfs';

function VideoEditor({videoInput,videos}) {
    const[btn,setBtn] = useState(true)
    const[loader,setLoader] = useState(false);
    const[url,setUrl] = useState([])
    useEffect(() => {
      setUrl(videos)
  
    }, [])




    async function onChange(e) {
        setLoader(true);
        const file = e.target.files[0]
        try {
          const added = await client.add(file)
          const urlImg = await fetch(`https://ipfs.io/ipfs/${added.path}`)
          setUrl(prevState => [...prevState, `https://ipfs.io/ipfs/${added.path}`])
          videoInput(`https://ipfs.io/ipfs/${added.path}`);
          setLoader(false);



          
        } catch (error) {
          console.log(error)
          }
      }
    
  return (
      <>
      <div style={{position:"relative",display:"flex"}} className='image-editor'>
            <div>
                {url && url.map((item,index) => (
                
              <video key={index} style={{float:"left", paddingLeft:"10px", padding:"10px", width:"70%",borderRadius:"0px"}} controls>  
              <source src={item} key={index}/>
                  Your browser does not support HTML video.
              </video>
              ))         

                }
            </div>
            <div style={{position:"absolute",bottom:"10px",right:"10px"}}>
                <label htmlFor="inputFile" style={{size:"100px"}}>
                  <div style={{marginRight:"20px",marginBottom:"0",display:"inline-block",width:"30px",height:"30px",visibility: loader ? "visible" : "hidden" }} className="loader"></div> 
                  <span style={{marginBottom:"20px",display:"inline-block",borderRadius:"5px"}} className="btn btn-outline-info">Upload</span>
                </label>
                <input type="file" id="inputFile" onChange={onChange} style={{display:"none"}} ></input> 
            </div>
       </div>
    
    </>
  )
}



export default VideoEditor