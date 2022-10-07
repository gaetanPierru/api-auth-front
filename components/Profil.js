import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import Style from "../styles/profil.module.css";
export default function Profil({ user }) {
  const [etat, setEtat] = useState(false);
  const [newUser, setUser] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  function change() {
    !etat ? setEtat(true) : setEtat(false);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setUser((newUser) => ({
      ...newUser,
      [name]: value,
    }));
  }

  function logout() {
    removeCookie(["user"])
    window.location.replace('/')
  }

  async function updateProfil() {
    if (newUser !== null) {
      if (newUser.mot_de_passe === newUser.c_mot_de_passe) {
        console.log("mot de passe match");
        const ha = await axios.put(
          "http://localhost:3001/users/" + user.user_id,
          newUser
        );
        console.log(ha.data);
      } else {
        console.log("mot de passe not match");
      }
    } else {
      console.log("aucun changement");
    }
  }
  return (
    <>
      {" "}
      {etat ? (
        <form onSubmit={""}>
          <div className={Style.profilForm}>
            <img
              className={Style.profilImage}
              src={user.img == null ? "https://www.pokepedia.fr/images/4/44/Psykokwak-RFVF.png" : user.img}
              layout="fill"
              alt="test"
            />
            <p
              className={Style.profilTitle}
            >{`bienvenue ${user.user_nom} ${user.user_prenom}`}</p>
            <p className={Style.profilDesc}>Voici vos informations</p>

            <select
              className={Style.input}
              name="user_genre"
              size="1"
              id="select"
              onChange={handleChange}
              defaultValue={user.user_genre}
            >
              <option value="">choisir</option>
              <option value="Monsieur">Monsieur</option>
              <option value="Madame">Madame</option>
              <option value="Autre">Autre</option>
            </select>

            <div className={Style.ligne}>
              <input
                className={Style.input}
                type="text"
                placeholder="NOM"
                name="user_nom"
                onChange={handleChange}
                defaultValue={user.user_nom}
              />
              <input
                className={Style.input}
                type="text"
                placeholder="PRENOM"
                name="user_prenom"
                onChange={handleChange}
                defaultValue={user.user_prenom}
              />
            </div>

            <div className={Style.ligne}>
              <input
                className={Style.input}
                type="email"
                placeholder="EMAIL"
                name="email"
                onChange={handleChange}
                defaultValue={user.email}
              />
              <input
                className={Style.input}
                type="url"
                placeholder="url image"
                name="img"
                onChange={handleChange}
                defaultValue={user.img}
              />

              <p
                className={Style.profilDesc}
                type="date"
                name="user_date_naissance"
                onChange={handleChange}
              >
                date de naissance:{" "}
                {new Date(user.user_date_naissance).toLocaleDateString()}
              </p>
            </div>
            <div className={Style.ligne}>
              <input
                className={Style.input}
                type="password"
                placeholder="newPASSWORD"
                name="mot_de_passe"
                onChange={handleChange}
              />

              <input
                className={Style.input}
                type="password"
                placeholder="comfirmNewPassword"
                name="c_mot_de_passe"
                onChange={handleChange}
              />
            </div>
            <div className={Style.ligne}>
              <button
                className={Style.buttonUpdate}
                type="button"
                onClick={updateProfil}
              >
                mettre a jour
              </button>
              <button
                className={Style.buttonUpdate}
                type="button"
                onClick={change}
              >
                retour
              </button>
            </div>
          </div>
        </form>
      ) : (
        <form onSubmit={""}>
          <div className={Style.profilForm}>
            <img
              className={Style.profilImage}
              src={user.img == null ? "https://www.pokepedia.fr/images/4/44/Psykokwak-RFVF.png" : user.img}
              layout="fill"
              alt="test"
            />
            <p
              className={Style.profilTitle}
            >{`bienvenue ${user.user_nom} ${user.user_prenom}`}</p>
            <p className={Style.profilDesc}>Voici vos informations</p>

            <p className={Style.profilDesc} type="text">
              genre: {user.user_genre}
            </p>

            <div className={Style.ligne}>
              <p className={Style.profilDesc} type="text">
                nom: {user.user_nom}
              </p>
              <p className={Style.profilDesc} type="text">
                prenom: {user.user_prenom}
              </p>
            </div>

            <div className={Style.ligne}>
              <p className={Style.profilDesc} type="email" name="email">
                email :{user.email}
              </p>

              <p
                className={Style.profilDesc}
                type="date"
                name="user_date_naissance"
                onChange={handleChange}
              >
                date de naissance:{" "}
                {new Date(user.user_date_naissance).toLocaleDateString()}
              </p>
            </div>
            <div className={Style.ligne}>
              {/* <input className={Style.input} type="password" placeholder="newPASSWORD" name="mot_de_passe" onChange={handleChange}/> */}
            </div>

            <button
              className={Style.buttonUpdate}
              type="button"
              onClick={change}
            >
              modifier le profil
            </button>

            <a href="#" onClick={logout} >se deconnecter</a>
          </div>
        </form>
      )}
    </>
  );
}
