import {
    getDocs,
    query,
    where,
} from "firebase/firestore";

export const useExistsDataHandler =  async function (...values) {
    let q;
    const cond = values.length > 3 ? true : false;
    if (!cond) {
        q = query(values[0], where(values[1], '==', values[2]));
        return await handleValidate(q, values[2]);
    } else {
        q = query(values[0], where(values[1], "array-contains-any", [values[2], values[3]]));
        return await handleValidate(q, values[2], values[3]);
    }

    async function handleValidate(...items) {
        const docSnap = await getDocs(items[0]);
        let arr = [];
        let chatId = null;
        docSnap.forEach(snapshot => {
            const data = snapshot.data();
            if (snapshot.exists()) {
                arr.push({ data, id: snapshot.id });
            }
        })

        const validateData = arr.some(item => {
            if (!cond) {
                if (item.data.username == items[1] || item == undefined) {
                    return true
                } else {
                    return false;
                }
            } else {
                const user = item.data.users;
                if (user.includes(items[1]) && user.includes(items[2]) || item == undefined) {
                    chatId = item.id;
                    return true;
                } else {
                    return false;
                }
            }
        });
        return { validateData, chatId };
    }
};