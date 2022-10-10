import { async } from '@firebase/util';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db, auth } from "../../../../firebase";
import { redirect } from "react-router-dom";
const googleProvider = new GoogleAuthProvider();

const getUser = (user) => ({
    uid: user.uid,
    name: user.displayName,
    email: user.email,
    photoURL: user.photoURL
})

const saveNewUserInBD = async (user) => addDoc(collection(db, "users"), user);

const validateUserExisteInBD = async (userId) => {
    const q = query(collection(db, "users"), where("uid", "==", userId));
    const docs = await getDocs(q);
    return docs.docs.length === 0;
}

export const signInWithGoogle = async (setUser) => {
    try {
        const singInResponse = await signInWithPopup(auth, googleProvider);
        const user = getUser(singInResponse.user);
        setUser(user)
        setUserInSessionStorage(user);

        const userDontExistInBD = await validateUserExisteInBD(user.uid)
        if (userDontExistInBD) { 
            saveNewUserInBD(user);
        };

    } catch (err) {
        console.error(err);
    };
}

const setUserInSessionStorage = (user) => sessionStorage.setItem("user", JSON.stringify(user));

export const closeSesion = () => {
    signOut(auth).then(() => {
        sessionStorage.removeItem("user")

    }).catch((error) => {
        console.error(error);
    });
}
