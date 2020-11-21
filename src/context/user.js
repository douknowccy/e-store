// user context
import React, { useState, useContext, createContext, useEffect } from "react";

const userContext = createContext();
//get localstorage data
function getUserFromLocalStorage() {
  return localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : { username: null, token: null };
}

export function UserProvider({ children }) {
  //   const [user, setUser] = useState({ username: null, token: null });

  const [user, setUser] = useState(getUserFromLocalStorage());
  //get height value to scrollbutton
  const [height, setHeight] = useState(0);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setHeight(window.pageYOffset);
      // console.log(window.pageYOffset);
    });
    return () => window.removeEventListener("scroll", () => {});
  }, [height]);

  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "success",
  });
  const userLogin = (user) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const userLogout = () => {
    setUser({ username: null, token: null });
    localStorage.removeItem("user");
  };

  const showAlert = ({ msg, type = "success" }) => {
    setAlert({ show: true, msg, type });
  };
  const hideAlert = () => {
    setAlert({ ...alert, show: false });
  };
  return (
    <userContext.Provider
      value={{
        user,
        height,
        userLogin,
        userLogout,
        showAlert,
        hideAlert,
        alert,
      }}
    >
      {children}
    </userContext.Provider>
  );
}

export default function useGlobalUserContext() {
  return useContext(userContext);
}
