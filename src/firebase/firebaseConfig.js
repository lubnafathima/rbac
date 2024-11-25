import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAJ7s8hsNlYSnBjrW9C8_dO-DXujhVulzo",
  authDomain: "vrv-security-assignment.firebaseapp.com",
  projectId: "vrv-security-assignment",
  storageBucket: "vrv-security-assignment.firebasestorage.app",
  messagingSenderId: "1091950786640",
  appId: "1:1091950786640:web:870919e3d6b25547c4f955"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);