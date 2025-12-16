import React, { useEffect, useRef, useState } from "react";
import "./LoginSignup.css";
import email_icon from "../assets/email.png";
import password_icon from "../assets/password.png";
import user_icom from "../assets/person.png";

const LoginSignup = () => {
  const [action, Setaction] = useState("Sign Up");
  const [details, Setdetails] = useState({ name: "", email: "", pass: "" });
  const nameref = useRef();
  const email_ref = useRef();
  const pass_ref = useRef();

  const submit = () => {
    Setdetails({
      ...details,
      name: nameref.current.value,
      email: email_ref.current.value,
      pass: pass_ref.current.value,
    });
  };

  useEffect(() => {
    console.log(details);
  }, [details]);

  return (
    <>
      <div className="container">
        <div className="header">
          <div className="text">{action}</div>
          <div className="underline"></div>
        </div>
        <div className="inputs">
          <div className={action === "Login" ? "none" : "input"}>
            <img src={user_icom} alt="" />
            <input type="text" placeholder="Name" ref={nameref} />
          </div>
          <div className="input">
            <img src={email_icon} alt="" />
            <input type="email" placeholder="Email" ref={email_ref} />
          </div>
          <div className="input">
            <img src={password_icon} alt="" />
            <input type="password" placeholder="Password" ref={pass_ref} />
          </div>
          <div className={action === "Sign Up" ? "none" : "forgot-password"}>
            Lost Password? <span>Click here</span>
          </div>
          <div className="submit-container">
            <div
              className={action === "Sign Up" ? "submit" : "submit gray"}
              onClick={() => {
                Setaction("Sign Up");
                submit(nameref, email_ref, pass_ref);
              }}
            >
              Sign Up
            </div>
            <div
              className={action === "Login" ? "submit" : "submit gray"}
              onClick={() => {
                Setaction("Login");
              }}
            >
              Login
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginSignup;
