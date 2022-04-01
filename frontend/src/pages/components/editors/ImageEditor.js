import React,{useState,useEffect} from 'react'

import client from './ipfs';

function ImageEditor({imageInput,images}) {

    const[loader,setLoader] = useState(false);
    const[url,setUrl] = useState([])
    useEffect(() => {
      setUrl(images)
  
    }, [])
    

    async function onChange(e) {
        setLoader(true);
        const file = e.target.files[0]
        try {
          const added = await client.add(file)
          const urlImg = await fetch(`https://ipfs.io/ipfs/${added.path}`)
          setUrl(prevState => [...prevState, `https://ipfs.io/ipfs/${added.path}`])
          imageInput(`https://ipfs.io/ipfs/${added.path}`);
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
              <img
                src={item} 
                key={index}
                style={{float:"left", marginRight:"50px",paddingLeft:"10px", padding:"10px", width:"200px", height:"200px",borderRadius:"20px"}}
              /> 
              ))}
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

export default ImageEditor


