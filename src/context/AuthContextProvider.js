import React from "react";
import AuthContext from "./AuthContext";

export default function AuthContextProvider({ children }) {

    function storeToken(token) {
        sessionStorage.setItem("token", token);
    }

    function getToken() {
        return sessionStorage.getItem("token");
    }

    function clearToken() {
        sessionStorage.removeItem("token");
    }

    return (
        <AuthContext.Provider
            value={{
                storeToken,
                getToken,
                // clearToken,  for logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
