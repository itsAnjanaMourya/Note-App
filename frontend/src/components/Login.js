import React from 'react'
import axios from 'axios'
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState({ email: "", password: "" })

    const handleSubmit = async (e) => {
        e.preventDefault();


        try {

            let errors = { email: "", password: "" };

            if (!email) {
                errors.email = "Email is required.";
            }
            if (!password) {
                errors.password = "Password is required.";
            }
            if (errors.email || errors.password) {
                setError(errors);
                return;
            }
            setError({ email: "", password: "" });

            await login({ email, password })
            navigate("/home");
            
        } catch (err) {
            console.log(err)
            navigate("/")
        }

        console.log("Login details", email)

    }
    return (
        <>
            <div className="outer">
                <div className="LoginWrapper" id="login" >
                    <div className='inner'>
                        <h2 style={{ color: "white" }}>Login</h2>
                        <form onSubmit={handleSubmit} className="">
                            <label className="login-label">
                                Enter your email: </label>
                            <input
                                type="email"
                                name="email"
                                className="login-input"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <div className="error">{error.email && <p >{error.email}</p>}</div>
                            <br />
                            <label className="login-label">Enter your password:</label>
                            <input
                                type="password"
                                name="password"
                                className="login-input"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <div className="error">{error.password && <p>{error.password}</p>}</div>
                            <br />
                            <button type="submit" className="login-btn">
                                Login
                            </button>
                            <p className='form-footer'>
                                Don't have an Account?<Link className='custom-link' to="/register">Register here</Link>
                            </p>
                            <p>or login using guest credentials<br/>
                           (email: guest@gmail.com<br/>
                            password: 123)</p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
