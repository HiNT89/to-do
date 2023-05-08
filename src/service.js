import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import moment from "moment";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  deleteField,
  setDoc,
} from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyC5LA_BoqLXNPX7zfXbThyu80iq5DAA3DU",
  authDomain: "test-login-33f95.firebaseapp.com",
  projectId: "test-login-33f95",
  storageBucket: "test-login-33f95.appspot.com",
  messagingSenderId: "314026169883",
  appId: "1:314026169883:web:32a4dae0d82021430e4abe",
  measurementId: "G-6GRZ363TRZ",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  login_hint: "user@example.com",
});
const auth = getAuth(app);
export const logoutSV = () => {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    });
};

export const loginSV = async (payload) => {
  let data;
  await signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
      data = user;
      //   console.log(result);
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
  return data;
};
export const getDataTaskSV = async (email) => {
  const querySnapshot = await getDocs(collection(db, email));
  const arrTask = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const id = doc.id;
    arrTask.push({ id, ...data });
  });
  return arrTask;
};
export const updateTaskSV = (payload) => {
  const { id, data, email } = payload;
  let status = true;
  let result = data;
  const cityRef = doc(db, email, id);
  setDoc(cityRef, data);
  return {
    status,
    result,
  };
};
export const addTaskSV = async (payload) => {
  const { data, email } = payload;
  const arrTask = [];
  try {
    const docRef = await addDoc(collection(db, email), data);
    const querySnapshot = await getDocs(collection(db, email));
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const id = doc.id;
      arrTask.push({ id, ...data });
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
  return arrTask;
};
export const deleteTaskSV = async (payload) => {
  const { email, id } = payload;
  //  delete doc
  await deleteDoc(doc(db, email, id));
};
