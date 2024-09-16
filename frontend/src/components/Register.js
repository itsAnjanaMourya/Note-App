import React from 'react'
import axios from "axios";
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
const Register = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        await axios.post('http://localhost:3200/user/registration',{name, email, password})
        .then(response=>{
            if(response.status){
                navigate("/");
            }
            console.log(response)
            
        }).catch(err=>{
                    console.log(err)
                })

        console.log("Register details", email)

        
    }
  return (
    <>
    <div className="outer">
        <div className="LoginWrapper">
            <div>
                <h2 style={{color:"white"}}>Register</h2>
                <form onSubmit={handleSubmit} className="text-center">
                    <label>Enter your name:
                        <input
                            type="text"
                            name="name"
                            className="login-input"
                            value={name || ""}
                            onChange={(e)=>setName(e.target.value)}
                        />
                    </label>

                    <label>Enter your email:
                        <input
                            type="email"
                            name="email"
                            className="login-input"
                            value={email || ""}
                            onChange={(e)=>setEmail(e.target.value)}

                        />
                    </label>
                    <br />
                    <label>Enter your password:
                        <input
                            type="password"
                            name="password"
                            className="login-input"
                            value={password || ""}
                            onChange={(e)=>setPassword(e.target.value)}
                        />
                    </label>
                    <br />
                    <button type="submit" className="">Register</button>
                    <p>Have an Account?<Link to="/">Login here</Link></p>
                </form>
            </div>
        </div>
        </div>
    </>
  )
}

export default Register
