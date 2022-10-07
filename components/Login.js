import React, { useState } from "react";
import Style from "../styles/Login.module.css";
import { BsFacebook, BsGoogle, BsLink, BsTwitter } from "react-icons/bs";
import axios from "axios";
import { useCookies } from "react-cookie";
import ForgetPassword from "./ForgetPassword";

export default function Login() {
  const [user, setUser] = useState(null);
  const [cookie, setCookie, removeCookie] = useCookies(["user"]);
  const [etat, setEtat] = useState(false);

  function change() {
    !etat ? setEtat(true) : setEtat(false);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setUser((user) => ({
      ...user,
      [name]: value,
    }));
  }

  async function log(e) {
    e.preventDefault();
    console.log(e);
    const res = await axios.post("http://localhost:3001/login", user);
    console.log(res);
    if (res.data.token) {
      setCookie("user", [res.data.token, res.data.refresh_token], "/");
      window.location.replace("/");
    } else {
      alert("mot de passe ou email invalide");
    }
  }

  return (
    <>
      {!etat ? (
        <form onSubmit={log}>
          <div className={Style.loginForm}>
            <p className={Style.loginTitle}>Login</p>
            <p className={Style.loginDesc}>
              Please enter your login and password!
            </p>

            <input
              className={Style.input}
              type="email"
              placeholder="EMAIL"
              name="email"
              onChange={handleChange}
              autoComplete="off"
              required
            />
            <input
              className={Style.input}
              type="password"
              placeholder="PASSWORD"
              name="mot_de_passe"
              onChange={handleChange}
              required
            />

            <a className={Style.forgetPassword} href="#" onClick={change}>
              Mot de passe oublié?
            </a>
            <button type="submit" className={Style.buttonLogin}>
              Login
            </button>

            <div className={Style.icons}>
              <a>
                <BsFacebook />
              </a>
              <a>
                <BsGoogle />
              </a>
              <a>
                <BsTwitter />
              </a>
            </div>

            <div className={Style.inscription}>
              <p className={Style.loginDesc}>Pas encore inscrit ?</p>
              <a className={Style.SignUp} href="./register">
                S'inscrire
              </a>
            </div>
          </div>
        </form>
      ) : (
        <ForgetPassword change={change} />
      )}
    </>
  );
}
