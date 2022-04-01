import { useState, useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {register,reset} from "../../features/auth/authSlice.js"
import Spinner from '../../components/Spinner.js'

function Register({details}) {


  const [formData, setFormData] = useState({
    name: details.givenName.toLowerCase(),
    username: details.email.split('@')[0].toUpperCase(),
    password: '',
    password2: '',
    pfp : '',
    branch : '',
  })

  const { username, name, password, password2, pfp , branch } = formData
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const {user, isLoading, isError, isSuccess, message} = useSelector(
    (state) => state.auth)



  const colors = [ 'A5A4A4','545452','A06A42',	'C18D42',	'FF4500','FF8717','FFB000','FFD635','DDBD37',	'D4E815',	'94E044','EA0027','FF585B',
  '46A508',	'46D160',	'0DD3BB',	'25B79F',	'008985',	'24A0ED',	'0079D3',	'7193FF',	'4856A3',	'7E53C1',	'FF66AC',	'DB0064']
  const number = ['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20']
  const[showUsername,setShowUsername] = useState(true);
  const[disableArrow,setDisableArrow] = useState(false)

  useEffect(() =>{
    const randomNumber = number[Math.floor(Math.random()*number.length)]
    const randomColor = colors[Math.floor(Math.random()*colors.length)]
    const img = `${randomNumber}_${randomColor}`
    setFormData((prevState) => ({
      ...prevState,
      pfp: `https://www.redditstatic.com/avatars/avatar_default_${img}.png`,
    }))
    
    if(isError) {
      toast.error(message)
    }
    if(isSuccess || user) {
      navigate('/dashboard')
    }
    dispatch(reset())




  },[user,isError, isSuccess, message, navigate,dispatch])



  const onChange = (e) => {

    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
    
    
  }

  function slided() {
    setFormData((prevState) => ({
      ...prevState,
      password: '',
      password2: '',
      username: '',
      name:""
    }))
    
    setShowUsername(!showUsername)
  }
  const onSubmit = (e) => {
    e.preventDefault()
    if (password !== password2) {
      toast.error("passwords do not match")
    } else {
      const userData = {
        name,
        username,
        password,
        pfp,
        branch
      }
      console.log(userData)
      dispatch(register(userData))
    }
  }

 if(isLoading) {
   return <Spinner />
 }
  return (
    <>
      <section className='heading' style={{marginBottom:""}}>

        <h1 style={{marginTop:"50px",display:"inline-block",paddingRight:"20px"}}>
            <i className="fa fa-solid fa-id-card"></i>
         </h1>
         <h1 style={{display:"inline-block",paddingRight:"25px"}}>Registration</h1>

      </section>

      <section className='form'>
        <form onSubmit={onSubmit} style={{marginTop:"0"}}>

          <div>
            <img src={pfp}
                  width="100px"
                  style={{borderRadius:"50%"}}
            />
          </div>
         
            <>
            <div className='form-group' style={{paddingTop:"40px"}}>
              <input
                type='text'
                className='form-control text-box'
                id='username'
                name='username'
                disabled={true}
                value={username}
                placeholder='Enter your username'
                onChange={onChange}
              />
            </div>
            <div className='form-group' style={{paddingTop:"0px"}}>
                <input
                  type='text'
                  className='form-control text-box'
                  id='name'
                  name='name'
                  defaultValue={name}
                  placeholder='Enter your name'
                  onChange={onChange}
                />
            </div>
            <div className='form-group' style={{paddingTop:"0px"}}>
              <input
                type='password'
                className='form-control text-box'
                id='password'
                name='password'
                defaultValue={password}
                placeholder='Enter your password'
                onChange={onChange}
                autocomplete="nope"
              />
            </div>
            <div className='form-group' style={{paddingTop:"0px"}}>
                <input
                  type='password'
                  className='form-control text-box'
                  id='password2'
                  name='password2'
                  defaultValue={password2}
                  placeholder='Confirm your password'
                  onChange={onChange}
                  autocomplete="nope"
                />
            </div>
            
            
            
            <div className='form-group text-box' style={{display:"flex",justifyContent:'space-between',paddingTop:"20px"}}>
              <button style={{display:"flex",width:"50px",height:"40px",borderRadius:"5px",borderColor:"white"}} type="button" className="btn btn-secondary">CSE</button>
              <button style={{display:"flex",width:"50px",height:"40px",borderRadius:"5px",borderColor:"white"}} type="button" className="btn btn-secondary">ECE</button>
              <button style={{display:"flex",width:"50px",height:"40px",borderRadius:"5px",borderColor:"white"}} type="button" className="btn btn-secondary">EEE</button>
              <button style={{display:"flex",width:"50px",height:"40px",borderRadius:"5px",borderColor:"white"}} type="button" className="btn btn-secondary">MEC</button>
            </div>

              <div className='form-group text-box' style={{paddingTop:"50px", display:"flex",justifyContent:"flex-end"}}>
              <button style={{width:"80px", height:"40px",borderColor:"white"}} className="btn btn-primary">
                   <span>submit</span>
                  </button>
              </div>
          </>

        </form>
      </section>
    </>
  )
}

export default Register
