import React,{useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {login,reset} from "../../features/auth/authSlice.js"
import Spinner from '../../components/Spinner.js'
import GoogleAuth from './GoogleAuth'
import logo from "../images/newlogo.png"


function Login({addDetails}) {

  const[useri, setUser] = useState(true);
  const[disable,setDisable] = useState(true)

  const [formData, setFormData] = useState({
      username: '',
      password: '',
    })
  
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const {user, isLoading, isError, isSuccess, message} = useSelector(
    (state) => state.auth)

    useEffect(() =>{
      if(isError) {
        toast.error(message)
      }
      if(isSuccess || user) {
        navigate('/')
      }
      dispatch(reset())
    },[user,isError, isSuccess, message, navigate,dispatch])
    

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

    const userData = {
      username: username.toUpperCase(),
      password: password,
    }
    dispatch(login(userData));

  }
  if(!user){
      setTimeout(() => setUser(true), 2000);

  }


  const[showAppProfile,setShowAppProfile]= useState(true);
  useEffect(()=>{
   setTimeout(()=>{
     setShowAppProfile(false)
   },1500)

  },[])

  //Knowing the width of the screen

  const [width, setWidth]   = useState(window.innerWidth);    
  const updateDimensions = () => {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
      window.addEventListener("resize", updateDimensions);
      
      return () => window.removeEventListener("resize", updateDimensions);
      
  }, []);





  if(isLoading) {
    return <Spinner />
  }


  return    (
    <div>

    {showAppProfile ? 
      <div style={{textAlign:"center",verticalAlign:"middle"}}>
       <img  src={logo} style={{width: width >1050 ?"500px":"400px",height: width > 1050 ? "500px":"400px"}}/>
      </div>
       
       :
    
       <>
       
  <section className='heading'>
    <h1 style={{marginTop:"100px",display:"inline-block",paddingRight:"20px"}}>
    <i className="fa fa-sign-in" aria-hidden="true"></i>
    </h1>
    <h1 style={{display:"inline-block",paddingRight:"25px",paddingBottom:"20px"}}>Log In</h1>
  </section>

  <section className='form'>

    <form onSubmit={onSubmit} style={{paddingTop:"30px"}}>
      <div className='form-group'>
        <input
          type='text'
          className='form-control text-box'
          id='name'
          name='username'
          value={username}
          placeholder='Enter your username'
          onChange={onChange}
          autoComplete="off"
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

        {useri ?  (null) :(<p style={{color:"red"}}>Email is not Authorized</p>) }


    </form>
  </section>
</>
}
</div>
)
}

export default Login
