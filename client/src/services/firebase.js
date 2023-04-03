import firebase from "firebase/compat/app";
import { getFirestore, collection, addDoc, where, query, getDocs } from "firebase/firestore"
import "firebase/compat/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCagFPcXoPRzWBsMw8dglfOPMMDdINVp4k",
    authDomain: "devopsproject-c4f6b.firebaseapp.com",
    projectId: "devopsproject-c4f6b",
    storageBucket: "devopsproject-c4f6b.appspot.com",
    messagingSenderId: "129199982811",
    appId: "1:129199982811:web:3f96a32b7ad711172ee4fe",
    measurementId: "G-B94GKFW1V3"
};

firebase.initializeApp(firebaseConfig);
const db = getFirestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const auth = firebase.auth();
export default firebase;

export const signInWithGoogle = async () => {
    try {
        const res = await auth.signInWithPopup(provider);
        const user = res.user;
        const userRef = collection(db, "users");
        const result = await getDocs(query(userRef, where("uid", "==", user.uid)));
        if (result.empty) {
            await addDoc(collection(db, "users"), {
                uid: user.uid,
                name: user.displayName,
                authProvider: "google",
                email: user.email,
            });
        }
    } catch (err) {
        alert(err.message);
    }
};

export const signInWithEmailAndPassword = async (email, password) => {
    try {
        await auth.signInWithEmailAndPassword(email, password);
    } catch (err) {
        alert(err.message);
    }
};

export const registerWithEmailAndPassword = async (name, email, password) => {
    try {
        const res = await auth.createUserWithEmailAndPassword(email, password);
        const user = res.user;
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch (err) {
        alert(err.message);
    }
};

export const sendPasswordResetEmail = async (email) => {
    try {
        await auth.sendPasswordResetEmail(email);
        alert("Password reset link sent!");
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

export const logout = () => {
    auth.signOut();
};

