// src/context/AuthContext.js
import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getUserData();
    }, []);

    const getUserData = async () => {
        try {
            const response = await axios.get("http://localhost:3002/auth/user", {
                withCredentials: true,
            });
            setUser(response.data || null);
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const signup = async (userData) => {
        try {
            const response = await axios.post(
                "http://localhost:3002/auth/signup",
                userData,
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );
            setUser(response.data.user);
            return { success: true, message: response.data.message };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || "Signup failed!",
            };
        }
    };

    const login = async (credentials) => {
        try {
            const response = await axios.post(
                "http://localhost:3002/auth/login",
                credentials,
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );
            setUser(response.data.user);
            return { success: true, message: response.data.message };
        } catch (error) {
            return {
                success: false,
                message: "Invalid username or password!",
            };
        }
    };

    const logout = async () => {
        try {
            await axios.post("http://localhost:3002/auth/logout", {}, { withCredentials: true });
            setUser(null);
        } catch (error) {
            console.error("Logout failed!", error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, signup, login, logout, getUserData }}>
            {children}
        </AuthContext.Provider>
    );
};
