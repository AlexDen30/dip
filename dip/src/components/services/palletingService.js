import { firebaseDB } from "../../firebaseConfig";
import { collection, getDocs, getDoc, addDoc } from "firebase/firestore";

export const palletingCollection = collection(firebaseDB, "palletings")

export const addPalleting = async (newPalleting) => addDoc(palletingCollection, newPalleting)

export const getAllPalletings = async () => getDocs(palletingCollection)

export const getPalleting = async (id) => getDoc(palletingCollection, id)