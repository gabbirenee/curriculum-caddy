import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API,
    authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASEURL,
    projectId: "curriculum-caddy",
    appId: "1:12556441319:web:089df1396e61d19dfe7442",
    measurementId: "G-PK11HL30DP"
};

// Initialize firebase app.
const cc_app = initializeApp(firebaseConfig);

// Initialize firebase database and get the reference of firebase database object.
const base = getDatabase(cc_app);

export {cc_app};

export default base;