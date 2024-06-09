import { initializeApp } from "firebase/app";
import 'firebase/database'
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, where, doc, getDoc, setDoc, collection, query, getDocs, deleteDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBcrroQe-rxt7INIR4ccJ6xGlwPhiAJ_pQ",
    authDomain: "devlink-2fc24.firebaseapp.com",
    projectId: "devlink-2fc24",
    storageBucket: "devlink-2fc24.appspot.com",
    messagingSenderId: "14825206767",
    appId: "1:14825206767:web:d6ff54fb600d2fabfd3c1a"
};
  
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const db = getFirestore();
export const database = getDatabase(firebaseApp);
export const storage = getStorage(firebaseApp);

export const createUserDocFromAuth = async (userAuth, additionalInfo={}) => {
    if (!userAuth) return

    const userDocRef = doc(db, 'users', userAuth.uid)
    const userSnapshot = await getDoc(userDocRef)

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth
        const createdAt = new Date()

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInfo
            })
        }
        catch (error) {
            console.log("error in creating doc", error.message)
        }
    }
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) {
        alert("email or password is invalid")
        return
    }
    return await createUserWithEmailAndPassword(auth, email, password)
}

export const getUsers = async () => {
    const usersCollection = collection(db, 'users')
    const userSnapshot = await getDocs(usersCollection)
    const userList = userSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }))
    return userList
}

export const getDocByEmail = async (email) => {
    const usersCollection = collection(db, 'users');
    const q = query(usersCollection, where('email', '==', email));
    const querySnapshot = await getDocs(q);

    // Assuming there's only one user with that email
    if (!querySnapshot.empty) {
        return querySnapshot.docs[0].data();
    } else {
        return null;
    }
}

export const createNewJobDoc = async (formData) => {
    if (!formData) {
        console.error("No form data provided")
        return
    }

    const jobsCollectionRef = collection(db, 'jobs')
    const jobDocRef = doc(jobsCollectionRef)

    try {
        await setDoc(jobDocRef, formData)
        console.log("Job created successfully")
    } catch (error) {
        console.error("Error creating job:", error.message)
    }
}

export const getJobs = async () => {
    const jobsCollection = collection(db, 'jobs')
    const jobSnapshot = await getDocs(jobsCollection)
    const jobList = jobSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }))
    return jobList
}

export const createNewMutualLinkDoc = async (userA, userB) => {
    if (!userA || !userB) {
        console.error("at least one user ID is missing")
        return;
    }

    const linksCollectionRef = collection(db, 'links');

    try {
        // First link document
        const linkDocRefA = doc(linksCollectionRef);
        await setDoc(linkDocRefA, userA);

        // Second link document
        const linkDocRefB = doc(linksCollectionRef);
        await setDoc(linkDocRefB, userB);

        console.log("links created successfully");
    } catch (error) {
        console.error("Error creating links:", error.message);
    }
}

export const getLinks = async (userEmail) => {
    try {
        const linksCollection = collection(db, 'links');
        const q = query(linksCollection, where('user', '==', userEmail));
        const linkSnapshot = await getDocs(q);
        const linksData = linkSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        console.log(linksData)
        return linksData;
    } catch (error) {
        console.error("Error fetching links:", error);
        throw error; // Re-throwing the error to be handled by the caller function
    }
}

export const deleteLink = async (userEmail, linkEmail) => {
    try {
        const linksCollection = collection(db, 'links')
        const q = query(linksCollection, where('user', '==', userEmail), where('link', '==', linkEmail))
        const linkSnapshot = await getDocs(q)
        if (!linkSnapshot.empty) {
            const linkDocRef = doc(db, 'links', linkSnapshot.docs[0].id)
            await deleteDoc(linkDocRef)
            console.log('link deleted successfully')
        }
        } catch (error) {
            console.error('Error deleting link:', error)
            throw error
        }
}