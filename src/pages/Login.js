import React, { useState } from "react";

//strapi function
import loginUser from "../strapi/loginUser";
import registerUser from "../strapi/registerUser";
//handle user

import { useHistory } from "react-router-dom";
import useGlobalUserContext from "../context/user";

export default function Login() {
  const history = useHistory();
  //setup user context
  const { userLogin, alert, showAlert } = useGlobalUserContext();

  //state values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("請設定新的使用者名稱");
  const [isMember, setIsMember] = useState(false);

  let isEmpty = !email || !password || !username || alert.show;
  //show register on sign in
  const toggleMember = () => {
    setIsMember((prevMember) => {
      let isMember = !prevMember;
      isMember ? setUsername("default") : setUsername("");
      return isMember;
    });
  };
  const handleSubmit = async (e) => {
    showAlert({ msg: "accessing user data. please wait" });
    e.preventDefault();
    let response;
    if (isMember) {
      response = await loginUser({ email, password });
    } else {
      response = await registerUser({ email, password, username });
    }
    if (response) {
      const {
        jwt: token,
        user: { username },
      } = response.data;
      const newUser = { token, username };
      userLogin(newUser);
      showAlert({ msg: `your are logged in : ${username}` });
      history.push("/products");
      //
    } else {
      showAlert({
        msg: "there was an error. please try again...",
        type: "danger",
      });
      // show alert
    }
  };
  return (
    <section className="form section">
      <h2 className="section-title">{isMember ? "登入" : "註冊"}</h2>
      <form className="login-form">
        {/* setEmail */}
        <div className="form-control">
          <label htmlFor="email">信箱</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {/* setEmail */}
        {/* setPassword */}
        <div className="form-control">
          <label htmlFor="password">密碼</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {/* setPassword */}
        {/* setUsername */}
        {!isMember && (
          <div className="form-control">
            <label htmlFor="username">使用者名稱</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        )}
        {/* setUsername */}
        {/* empty form text*/}
        {isEmpty && <p className="form-empty">請不要留空白</p>}
        {/* submit btn */}
        {!isEmpty && (
          <button
            tpye="submit"
            className="btn btn-block btn-primary"
            onClick={handleSubmit}
          >
            註冊
          </button>
        )}
        {/* register link */}
        <p className="register-link">
          {isMember ? "註冊" : "已經是會員"}
          <button type="button" onClick={toggleMember}>
            這裏
          </button>
        </p>
      </form>
    </section>
  );
}
