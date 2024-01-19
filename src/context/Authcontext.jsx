import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../services/fireBase';
import { doc, setDoc } from 'firebase/firestore';


const Authcontext = createContext()

export function Authcontextprovide({ children }) {

    const [user, setUser] = useState({})
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
            setUser(currentuser)
        })

        return () => {
            unsubscribe();
        }
    }, [])

    function sginUp(email, password) {
        createUserWithEmailAndPassword(auth, email, password)
        setDoc(doc(db, 'users', email), {
            favshows: [],
        })
    }

    function logIn(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    function logOut() {
        signOut(auth)
    }

    return <Authcontext.Provider value={{ user, sginUp, logIn, logOut }}>
        {children}
    </Authcontext.Provider>

}

export function userAuth() {
    return useContext(Authcontext)
}