import React, { useState } from "react";
import AuthContext from "./AuthContext";

export default function AuthContextProvider({ children }) {

  const [token, setToken] = useState(null);

  function storeToken(token) {
    setToken(token);
  }

  return (
    <AuthContext.Provider
      value={{
        storeToken,
        token,
        // clearToken,  for logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
