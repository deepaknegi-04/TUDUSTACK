import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
const AuthContext = createContext();
import { API_BASE } from "../config";

export function AuthProvider({ children }) {
    const [auth, setAuth] = useState({ isAuth: null, user: null });

    async function verifyToken() {
        const token = localStorage.getItem("token");
        if (!token) {
            setAuth({ isAuth: false, user: null });
            return;
        }

        try {
            const response = await axios({
                method: "GET",
                url: `${API_BASE}/user/me`,
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            });

            console.log(response);

            if (response) {
                setAuth({ isAuth: response.data.valid, user: response.data.user })
            }
        } catch (error) {
            console.error("Verification failde:", error);
            localStorage.removeItem("token");
            setAuth({ isAuth: false, user: null });
        }
    }

    function login(token, user) {
        localStorage.setItem("token", token);
        setAuth({ isAuth: true, user });
    }

    useEffect(() => {
        verifyToken();
    }, []);

    return (
        <AuthContext.Provider value={{ ...auth, login }}>
            {children}
        </AuthContext.Provider >
    )
}

export function useAuth() {
    return useContext(AuthContext);
}