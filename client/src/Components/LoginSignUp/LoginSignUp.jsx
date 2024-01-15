import React from "react";
import './LoginSignUp.css'

import user_icon from '../Assets/user.png'
import user_email from '../Assets/email.jpeg'
import user_password from '../Assets/password.png'
const LoginSignUp = () =>{
    return(
    <div className="container">
        <div className="header">
            <div className="text">Sign Up</div>
            <div className="underline"></div>
        </div>
        <div className="inputs">   
         <div className="input">
            <img src={user_icon} alt="" />
            <input type="text" />
            </div>
         <div className="input">
            <img src={user_email} alt="" />
            <input type="email" />
            </div>
         <div className="input">
            <img src={user_password} alt="" />
            <input type="password" />
            </div>
            </div>

    </div>
    )
}
export default LoginSignUp