import React, { useEffect, useState } from 'react'
import Style from '../styles/Register.module.css'
import styles from '../styles/Home.module.css'
import axios from 'axios'

export default function reset() {

    const [etat, setEtat] = useState(null)
    const [user, setUser] = useState({})
    const [newUser, NewsetUser] = useState(null)
    const [tokens, setToken] = useState(null)

    function handleChange(e) {
        const { name, value } = e.target;
        NewsetUser(newUser => ({
            ...newUser, [name]: value
        }))
    }

    function setHeaders(token) {
        const headers = new Headers();
        headers.append("Authorization", `Bearer ${token}`);
        const options = {
            method: "GET",
            mode: "cors",
            headers,
        };

        return options
    }

    async function verifToken() {
        const queryParams = new URLSearchParams(window.location.search);
        const token = queryParams.get('token');
        if (token) {
            setToken(token)
            console.log(token);
            let options = setHeaders(token);
            const res = await fetch("http://localhost:3001/profil", options);

            if (res.status == 200) {
                const val = await res.json()
                console.log(val.user[0])
                setUser(val.user[0])
                setEtat(true)
            } else {
                setEtat(false)
            }
        }
    }

    async function changePassword(e) {
        e.preventDefault();
        console.log(newUser)
        if (newUser.user_nom === user.user_nom && newUser.user_prenom === user.user_prenom) {

            if (newUser.mot_de_passe === newUser.c_mot_de_passe) {
                console.log("mot de passe match");
                const res = await axios.put(
                    "http://localhost:3001/users/" + user.user_id,
                    newUser
                );
                console.log(res.data);
                if (res.data){
                    window.location.replace("/login")
                }
            } else {
                console.log("mot de passe not match");
            }
        } else {
            console.log("aucun changement nom prenom ne correspondent pas ");
        }
    }




    useEffect(() => {
        verifToken();
    }, [])

    return (
        etat ? <div className={styles.back}>
            <form onSubmit={changePassword}>
                <div className={Style.registerForm}>
                    <p className={Style.registerTitle}>changement mot de passe </p>
                    <p className={Style.registerDesc}>Completez le formulaire pour verification</p>

                    <div className={Style.ligne}>
                        <input className={Style.input} type="text" placeholder="NOM" name="user_nom" onChange={handleChange} required />
                        <input className={Style.input} type="text" placeholder="PRENOM" name="user_prenom" onChange={handleChange} required />
                    </div>

                    <div className={Style.ligne}>

                        <input className={Style.input} type="password" placeholder=" new PASSWORD" name="mot_de_passe" onChange={handleChange} required />
                        <input className={Style.input} type="password" placeholder="CONFIRM new PASSWORD" name="c_mot_de_passe" onChange={handleChange} required />
                    </div>

                    <button className={Style.buttonRegister} type="submit" >changer mot de passe</button>

                </div>
            </form>
        </div> :
            ""
    )
}
