import React,{useState} from 'react'
// import { MdLogin } from 'react-icons/fa'
import GoogleAuth from './GoogleAuth'

function Login({addDetails}) {

  const[user, setUser] = useState(true);
  const[disable,setDisable] = useState(true)

  const [formData, setFormData] = useState({
      username: '',
      password: '',
    })


  const { username, password, } = formData

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
    if(username !== "" && password !== ""){
      setDisable(false)
  }}


  const details=(e) =>{
      addDetails(e)
  }

  const onSubmit = (e) => {
    if(!username || !password){

    }

  }
  if(!user){
      setTimeout(() => setUser(true), 2000);

  }

  return    (
       <>
  <section className='heading'>
    <h1 style={{marginTop:"100px",display:"inline-block",paddingRight:"20px"}}>
    <i class="fa fa-sign-in" aria-hidden="true"></i>
    </h1>
    <h1 style={{display:"inline-block",paddingRight:"25px"}}>Log In</h1>
  </section>

  <section className='form'>

    <form onSubmit={onSubmit} style={{paddingTop:"0px"}}>
      <div className='form-group'>
        <input
          type='text'
          className='form-control text-box'
          id='name'
          name='username'
          value={username}
          placeholder='Enter your username'
          onChange={onChange}
          required
        />
      </div>
      <div className='form-group'>
        <input
          type='password'
          className='form-control text-box'
          id='password'
          name='password'
          value={password}
          placeholder='Enter password'
          onChange={onChange}
          required
        />
      </div>

      <div className='form-group'>
        <button disabled={disable} type='submit' className= "btn btn-primary text-box">
          Submit
        </button>

      </div>

      <div style={{marginTop:"20px", fontSize:"18px"}}>
       <GoogleAuth details = {details} setUser={setUser}/>
       </div>

        {user ?  (null) :(<p style={{color:"red"}}>Email is not Authorized</p>) }


    </form>
  </section>
</>
)
}

export default Login
