import React from "react";
import './LoginSignUp.css'

import user_icon from '../Assets/user.png'
import user_email from '../Assets/email.jpeg'
import user_password from '../Assets/password.png'
import national_id from '../Assets/nid.png'
const LoginSignUp = () =>{
    return(
        <div className="container">
            <div className="header">
                <div className="text">Sign-Up</div>
                <div className="underline">Underline</div>
            </div>
            <div className="inputs">
                <div className="input">
                    <img src="" alt="" />
                </div>
            </div>
        </div>
    // <div className="container">
    //     <div className="header">
    //         <div className="text">Sign Up</div>
    //         <div className="underline"></div>
    //     </div> 

    //     <div className="inputs">   
        
    //      <div className="input">
    //         <img className="img1" src={user_icon} alt="" />
    //         <input type="text" placeholder="Enter your name"/>
    //         </div>
        
    //      <div className="input">
    //         <img className="img1" src={user_email} alt="" />
    //         <input type="email" placeholder="Enter Your E-mail" />
    //         </div>
        
    //      <div className="input">
    //         <img className="img1" src={user_password} alt="" />
    //         <input type="password" placeholder="Enter Password"/>
    //         </div>
            
    //         <div className="input">
    //             <img src="{national_id}" alt="" />
    //             <input type="text" placeholder="Enter Your National Id Number" />
    //         </div>

    //         <div className="input">
    //             <input type="file" name="" placeholder="Upload one photo of yours" id="" />
    //         </div>
            
    //         <div className="forgot-password">Forgot Password? <span>Click here</span>
    //         </div>
    //     <div className="submit-container">
    //         <div className="submit">Sign Up</div>
    //         <div className="submit">Login</div>
    //     </div>
    // </div>
    // </div>
    )
}
export default LoginSignUp
