import { createContext, useState } from "react";
import axios from 'axios'
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [currentUser, setCurrentUser] = useState(null)

    const login = async (input) => {
        console.log("auth context login")
        let token;
        document.cookie.split(";").map(s => { token = s.startsWith("access") ? s.substring("access_token=".length) : "" });
        try {
            await axios
                .post("http://localhost:3200/user/login", input,

                    {
                        headers: {
                            'Authorization': token?`Bearer ${token}`:``
                        }
                    }
                )
                .then((res) => {
                    const token = res.data.token;
                    document.cookie = `access_token=${token};`
                    console.log("cookiiiie", document.cookie);
                    console.log("response", input);
                    setIsAuthenticated(true);

                    //   console.log("username:", res.data.user.username);
                    setCurrentUser(res.data.user)
                    console.log("access token", res.data.token);
                });
        } catch (err) {
            console.error("Login error:", err);
            throw err;
        }
    };


    const logout = async (req, res) => {
        let token;
        document.cookie.split(";").map(s => { token = s.startsWith("access") ? s.substring("access_token=".length) : "" });
        try {
            const res = await axios.post("http://localhost:3200/user/logout",
                {},
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            console.log(res);
            document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
            setIsAuthenticated(false);
            setCurrentUser(null);
            console.log("cookie after logout", document.cookie)
            alert("Logging out...");
            window.location.href = "/";
        } catch (err) {
            console.error("Logout error:", err);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                login,
                isAuthenticated,
                currentUser,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}