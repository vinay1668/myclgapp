
import React,{useState,useEffect} from 'react'
import client from './ipfs';
import pdf from "./pdfico.png"


function File({fileInput,files}) {




  const[loader,setLoader] = useState(false);
    const[url,setUrl] = useState([])
    useEffect(() => {
      setUrl(files)
    }, [])

 

    async function onChange(e) {
        const name = e.target.value.split(/(\\|\/)/g).pop();
        setLoader(true);
        const file = e.target.files[0]
        try {
          const added = await client.add(file)
          const urlImg = await fetch(`https://ipfs.io/ipfs/${added.path}`)
          setUrl(prevState => [...prevState, {name:name, hash:`https://ipfs.io/ipfs/${added.path}` } ]);
          fileInput({name:name , hash: `https://ipfs.io/ipfs/${added.path}`});
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
                   <>
                      <a style={{color: "inherit"}} href={item.hash} target="blank">
                          <figure>
                            <img src={pdf} height="200px" width="200px"/>
                            <figcaption style={{paddingLeft:"30px",color:"gray"}}><b>{item.name}</b></figcaption>
                          </figure>
                      </a>
                   </>

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

export default File