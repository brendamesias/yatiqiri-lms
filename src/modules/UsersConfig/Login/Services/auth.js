import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { addDoc, collection, getDocs, query, where, setDoc, doc } from "firebase/firestore";
import { db, auth } from "../../../../firebase";
const googleProvider = new GoogleAuthProvider();

//user que se obtiene de signInWithPopup de firebase
const userAuthParsedObject = (userOfAuth) => ({
    uid: userOfAuth.uid,
    name: userOfAuth.displayName,
    email: userOfAuth.email,
    photoURL: userOfAuth.photoURL,
    role: userOfAuth.uid === 'DILVopGGwpUn7Geda6WXZmmra123' ? "admin" : "student"
})

const saveNewUserInBD = async (user) => setDoc(doc(db, "users", user.uid), user);

const validateUserExisteInBD = async (userId) => {
    const q = query(collection(db, "users"), where("uid", "==", userId));
    const docs = await getDocs(q);
    return docs.docs.length === 0;
}

export const signInWithGoogle = async () => {
    try {
        const singInResponse = await signInWithPopup(auth, googleProvider);
        const userId = singInResponse.user.uid;
        const userDontExistInBD = await validateUserExisteInBD(userId)
        if (userDontExistInBD) { 
            saveNewUserInBD(singInResponse.user);
        }
        const user = userAuthParsedObject(singInResponse.user);
        setUserInSessionStorage(user);
        return user;
    } catch (err) {
        console.error(err);
    };
}

const setUserInSessionStorage = (user) => sessionStorage.setItem("user", JSON.stringify(user));

export const closeSesion = async() => {
    return signOut(auth).then(() => {
        sessionStorage.removeItem("user");
    }).catch((error) => {
        console.error(error);
    });
}
