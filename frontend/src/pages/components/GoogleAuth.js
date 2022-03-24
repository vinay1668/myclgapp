import React, { useState } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';

const clientId = "238335891416-t4nmmqpv12l36hvlpg59kqs68n0pdvr2.apps.googleusercontent.com";

function GoogleAuth({details,setUser}) {

    // const [showloginButton, setShowloginButton] = useState(true);
    // const [showlogoutButton, setShowlogoutButton] = useState(false);

    const onLoginSuccess = (res) => {
        console.log('Login Success:', res.profileObj.email);
        console.log(res.profileObj);
        if(/@srecnandyal.edu.in\s*$/.test(res.profileObj.email)) {
            console.log("This is a college email ID. Log in successful")
            console.log(res.profileObj)
            details(res.profileObj);

        }
        else{
            console.log("This is not a college email ID. please use college email ID")
            setUser(false);
        }
    };

    const onLoginFailure = (res) => {
        console.log('Login Failed:', res);
    };

    return (
        <div>
            
                <GoogleLogin
                    clientId={clientId}
                    render={renderProps => (
                        <p style={{fontSize:"16px",color:"blue",cursor:"pointer"}} onClick={renderProps.onClick} disabled={renderProps.disabled}>Register with google</p>
                      )}
                    onSuccess={onLoginSuccess}
                    onFailure={onLoginFailure}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={true}
                    
                /> 
        </div>
    );
}
export default GoogleAuth;