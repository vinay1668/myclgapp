import { useState, useEffect } from 'react'


function Register({details}) {

  const colors = [ 'A5A4A4','545452','A06A42',	'C18D42',	'FF4500','FF8717','FFB000','FFD635','DDBD37',	'D4E815',	'94E044','EA0027','FF585B',
  '46A508',	'46D160',	'0DD3BB',	'25B79F',	'008985',	'24A0ED',	'0079D3',	'7193FF',	'4856A3',	'7E53C1',	'FF66AC',	'DB0064']
  const number = ['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20']
  const[img,setImage] = useState();
  const[showUsername,setShowUsername] = useState(true);
  const[disableArrow,setDisableArrow] = useState(false)

  useEffect(() =>{
    const randomNumber = number[Math.floor(Math.random()*number.length)]
    const randomColor = colors[Math.floor(Math.random()*colors.length)]

    setImage(`${randomNumber}_${randomColor}`)



  },[])
  const [formData, setFormData] = useState({
    name: details.givenName.toLowerCase(),
    username: details.email.split('@')[0].toUpperCase(),
    password: '',
    password2: '',
  })

  const { username, name, password, password2 } = formData

  const onChange = (e) => {

    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))


    if(e.target.name = "name" && e.target.value == ""){
      setDisableArrow(true)
    }
    else {
      setDisableArrow(false)
    }


  }

  const onSubmit = (e) => {
    e.preventDefault()

    if (password !== password2) {
      console.log('Passwords do not match')
    } else {
      const userData = {
        name,
        username,
        password,
      }
    }
  }


  return (
    <>
      <section className='heading' style={{marginBottom:""}}>

        <h1 style={{marginTop:"50px",display:"inline-block",paddingRight:"20px"}}>
            <i class="fa fa-solid fa-id-card"></i>
         </h1>
         <h1 style={{display:"inline-block",paddingRight:"25px"}}>Registration</h1>

      </section>

      <section className='form'>
        <form onSubmit={onSubmit} style={{}}>

          <div>
            <img src={`https://www.redditstatic.com/avatars/avatar_default_${img}.png`}
                  width="100px"
                  style={{borderRadius:"50%"}}
            />
          </div>
          {showUsername ?
          (
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
            <div className='form-group text-box' style={{display:"flex",justifyContent:'space-between',paddingTop:"20px"}}>
              <button style={{display:"flex",width:"50px",height:"40px",borderRadius:"5px",borderColor:"white"}} type="button" class="btn btn-secondary">CSE</button>
              <button style={{display:"flex",width:"50px",height:"40px",borderRadius:"5px",borderColor:"white"}} type="button" class="btn btn-secondary">ECE</button>
              <button style={{display:"flex",width:"50px",height:"40px",borderRadius:"5px",borderColor:"white"}} type="button" class="btn btn-secondary">EEE</button>
              <button style={{display:"flex",width:"50px",height:"40px",borderRadius:"5px",borderColor:"white"}} type="button" class="btn btn-secondary">MEC</button>
            </div>

              <div className='form-group text-box' style={{paddingTop:"50px", display:"flex",justifyContent:"flex-end"}}>
                    <button disabled={disableArrow} onClick={()=> setShowUsername(!showUsername)} style={{width:"60px", height:"40px", display:"flex",borderColor:"white"}} type="button" class="btn btn-primary">
                        <i class="fa fa-solid fa fa-arrow-right"></i>
                    </button>
              </div>

            </>
         ) :
          (
            <>
              <div className='form-group' style={{paddingTop:"40px"}}>
              <input
                type='password'
                className='form-control text-box'
                id='password'
                name='password'
                value={password}
                placeholder='password'
                onChange={onChange}
              />
            </div>
            <div className='form-group' style={{paddingTop:"0px"}}>
                <input
                  type='password'
                  className='form-control text-box'
                  id='password2'
                  name='password2'
                  placeholder='confirm your password'
                  value={password2}
                  onChange={onChange}
                />
            </div>

            <div className='form-group text-box' style={{paddingTop:"50px", display:"flex",justifyContent:"space-between"}}>
                  <button onClick={()=> setShowUsername(!showUsername)} style={{width:"60px", height:"40px",borderColor:"white"}} type="button" class="btn btn-dark">
                    <i  class="fa fa-solid fa fa-arrow-left"></i>
                  </button>
                  <button style={{width:"80px", height:"40px",borderColor:"white"}} type="button" class="btn btn-primary">
                   <span>submit</span>
                  </button>

            </div>

          </>
          )
          }


        {/* <div className='form-group'>
            <input
              type='email'
              className='form-control'
              id='email'
              name='email'
              onChange={onChange}
              value={details.email}
              readOnly
            />
          </div>

          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='username'
              name='username'
              onChange={onChange}
              value={`u/${details.email.split('@')[0]}`}
              readOnly
            />
          </div>

          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='name'
              name='name'
              value={name}
              placeholder='Enter your name'
              onChange={onChange}
            />
          </div>



          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              value={password}
              placeholder='Enter password'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password2'
              name='password2'
              value={password2}
              placeholder='Confirm password'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <button type='submit' className='btn btn-block'>
              Submit
            </button>
          </div> */}
        </form>
      </section>
    </>
  )
}

export default Register
