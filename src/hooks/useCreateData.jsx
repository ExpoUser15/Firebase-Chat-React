import { firestore } from "../config/firebaseConfig";
import {
    collection,
    setDoc,
    doc,
    getDocs,
    query,
    where,
    Timestamp
} from "firebase/firestore";
import { useExistsDataHandler } from "./useExistsDataHandler";

export const useCreateData =  async (...values) => {
    const users = collection(firestore, values[0]);
    const { validateData } = await useExistsDataHandler(users, 'username', values[1]);
    if(validateData){
        return { status: 'exists' }
    }
    const usersDoc = await doc(users);
    await setDoc(usersDoc, { username: values[1].trim(), createdAt: Timestamp.fromDate(new Date())})
    return { status: "stored" };   
}
