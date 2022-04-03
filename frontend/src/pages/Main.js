
import Register from "./components/Register.js"

import Login from "./components/Login.js";
import { useState } from 'react';


function Main() {
  const[details,setDetails] = useState('');



  const addDetails = (e) =>{
    console.log(e)
       setDetails(e)
  }
  return (
    <div className="App">
      
      {!details ? <Login  addDetails = {addDetails} /> : <Register  details={details}/>}

    </div>
  );
}

export default Main;