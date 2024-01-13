import { query, where,collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { firestore } from '../config/firebaseConfig';

export const useURLValidators = async (...values) => {
    const usersDoc = collection(firestore, 'users');
    const chats = collection(firestore, 'chats');
    let arrUser = [];
    const q = query(usersDoc, where('username', '==', values[0]));
    const docSnap = await getDocs(q);
    docSnap.forEach(snapshot => {
        if(snapshot.exists()){
            arrUser.push(true);
        }
    }) 
    
    if(arrUser[0]){
        return { validate: true }
    } 

    if(values[1]){
        const q2 = await doc(chats, values[1]);
        const docSnap2 = await getDoc(q2);
        if(docSnap2.exists() && arrUser[0]){
            return { validate: true }
        }
    }

    return { validate: false };
}