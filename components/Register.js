import React, { useState } from 'react'
import Style from '../styles/Register.module.css'
import { BsFacebook, BsGoogle, BsTwitter } from 'react-icons/bs'
import axios from 'axios'

export default function Register() {
    const [user, setUser] = useState(null);

    function handleChange(e) {
      const { name, value } = e.target;
      setUser(user => ({
        ...user, [name]: value
      }))
    }
    
    async function register(e) {
        e.preventDefault();
        if(user.mot_de_passe === user.c_mot_de_passe) {
            const res = await axios.post('http://localhost:3001/users/', user);
        }
        

        window.location.replace("/login")
    }

    return (
        <>
            <form onSubmit={register}>
                <div className={Style.registerForm}>
                    <p className={Style.registerTitle}>Inscription</p>
                    <p className={Style.registerDesc}>Completez le formulaire</p>

                    <select className={Style.input} name="user_genre" size="1" id="select" onChange={handleChange} required>
                        <option value="">choisir</option>
                        <option value="Monsieur">Monsieur</option>
                        <option value="Madame">Madame</option>
                        <option value="Autre">Autre</option>
                    </select>


                    <div className={Style.ligne}>
                        <input className={Style.input} type="text" placeholder="NOM" name="user_nom" onChange={handleChange} required/>
                        <input className={Style.input} type="text" placeholder="PRENOM" name="user_prenom" onChange={handleChange} required/>
                    </div>

                    <div className={Style.ligne}>
                    <input className={Style.input} type="email" placeholder="EMAIL" name="email" onChange={handleChange} required/>
                    <input className={Style.input} type="date" name="user_date_naissance" onChange={handleChange} required/>
                    </div>
                    <div className={Style.ligne}>
                    
                    <input className={Style.input} type="password" placeholder="PASSWORD" name="mot_de_passe" onChange={handleChange} required/>
                    <input className={Style.input} type="password" placeholder="CONFIRMATION PASSWORD" name="c_mot_de_passe" onChange={handleChange} required/>
                    </div>

                    <button className={Style.buttonRegister} type="submit" >S'inscrire</button>

                    <div className={Style.icons}>
                        <a><BsFacebook /></a>
                        <a><BsGoogle /></a>
                        <a><BsTwitter /></a>
                    </div>

                    <div className={Style.connection}>
                        <p className={Style.loginDesc}>Deja inscrit ?</p>
                        <a className={Style.login} href="./login">Se connecter</a>
                    </div>
                </div>
            </form>
        </>
    )
}
