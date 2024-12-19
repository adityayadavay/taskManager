import { createContext, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext(null);

export const Authenticator = (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userName, setUserName] = useState("");
    const [userType, setUserType] = useState("");
    const [userId, setUserId] = useState("");
    const token = localStorage.getItem("token");
    const login = (token) => {
        const decoded = token ? jwtDecode(token): null;
        setIsAuthenticated(true);
        setUserName(decoded.userName);
        setUserType(decoded.userType);
        setUserId(decoded.userId);
    };
    const logout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
    };
    if(!isAuthenticated && token) {
        login(token);
    }
    
    return (
        <AuthContext.Provider value={{ isAuthenticated,token,userId,userName,userType, login, logout }}>
            {props.children}
        </AuthContext.Provider>
    )
}

