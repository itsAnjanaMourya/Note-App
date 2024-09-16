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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
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
                    <div>
                        <h2 style={{ color: "white" }}>Login</h2>
                        <form onSubmit={handleSubmit} className="">
                            <label className="login-label">
                                Enter your email:
                                <input
                                    type="email"
                                    name="email"
                                    className="login-input"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </label>
                            <br />
                            <label className="login-label">
                                Enter your password:
                                <input
                                    type="password"
                                    name="password"
                                    className="login-input"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </label>
                            <br />
                            <button type="submit" className="login-btn">
                                Login
                            </button>
                            {/* <Link to="/forgotPassword">Forgot password?</Link> */}
                            <p>
                                Don't have an Account?<Link to="/register">Register here</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
