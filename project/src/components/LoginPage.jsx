import React from 'react'
import './Pages.css'
import { FaUser , FaLock} from "react-icons/fa";
function LoginPage() {
  return (
    <div className="login-form">
        <from action="">
            <h1>Login</h1>
            <div className="input-box">
                <input type="text" placeholder="Username" required/>
                <FaUser className="icon"/>
            </div>
            <div className="input-box">
                <input type="password" placeholder='Password' required/>
                <FaLock className="icon"/>
            </div>
            <div className="remember">
                <label>
                    <input type="checkbox" />Remember me
                </label>
                <a href="#">Forgot password?</a>
            </div>
            <button type="submit">Login</button>
            <div className="register">
                <p>Don't have an account? <a href="#">Register</a></p>
            </div>
        </from>
    </div>
  )
}

export default LoginPage;