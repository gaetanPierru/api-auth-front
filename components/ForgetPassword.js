import axios from "axios";
import React from "react";
import Style from "../styles/Login.module.css";
export default function ForgetPassword({ change }) {
async function sendMail(e){
    e.preventDefault()
    const email = {email: e.target[0].value}
    await axios.post("http://localhost:3001/users/forgetPassword", email)
}

  return (
    <>
      <form onSubmit={sendMail}>
        <div className={Style.loginForm}>
          <p className={Style.loginTitle}>Mot de passe oublié</p>
          <p className={Style.loginDesc}>Please enter your email</p>

          <input
            className={Style.input}
            type="email"
            placeholder="EMAIL"
            name="email"
            autoComplete="off"
            required
          />

          <button type="submit" className={Style.buttonLogin}>
            recuperer mon mot de passe
          </button>

          <button type="button" className={Style.buttonLogin} onClick={change}>
            retour
          </button>
        </div>
      </form>
    </>
  );
}
