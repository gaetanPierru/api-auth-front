import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Profil from "../components/Profil";
import styles from "../styles/Home.module.css";
export default function Home() {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [user, setUser] = useState(null);

  function setHeaders(user) {
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${user}`);
    const options = {
      method: "GET",
      mode: "cors",
      headers,
    };

    return options;
  }

  async function profil() {
    if (cookies.user) {
      let continu;
      let options = setHeaders(cookies.user[0]);
      const res = await fetch("http://localhost:3001/profil", options);

      if (res.status == 401) {
        let options = setHeaders(cookies.user[1]);

        const res2 = await fetch("http://localhost:3001/token", options);
        if (res2.status == 400) {
          console.log("pas marche");
        } else {
          continu = await res2.json();
          setCookie("user", [continu.token, cookies.user[1]], "/");

          let options = setHeaders(cookies.user[0]);

          const res = await fetch("http://localhost:3001/profil", options);
          continu = await res.json();
        }
      } else {
        continu = await res.json();
      }

      if (continu.user) {
        setUser(continu.user[0]);
        console.log(user);
      } else {
        console.log("t'as vu mon profil ??? il a disparu");
      }
    }
  }

  useEffect(() => {
      profil()
  }, [])
  
  return (
    <>
      <div>
        {user != null ? (
          <div className={styles.back}>
            <Profil user={user} />
          </div>
        ) : (
          <div>
            <a href="./login">Login</a>
            <a href="./register">register</a>
          </div>
        )}
      </div>
    </>
  );
}
