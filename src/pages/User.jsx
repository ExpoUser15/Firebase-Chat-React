import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { firestore } from '../config/firebaseConfig';
import { getDocs, setDoc, collection, query, where, getDoc, doc } from 'firebase/firestore';
import { useExistsDataHandler } from '../hooks/useExistsDataHandler';
import { useNotification } from '../hooks/useNotification';
import { useURLValidators } from '../hooks/useURLValidators';
import Input from '../components/elements/Input/Input';
import Button from '../components/elements/Button/Button';
import Process from '../components/Fragment/Process';
import UserList from '../components/Fragment/UserList';
import './userlist.css';

function Userlist() {
    const [users, setUsers] = useState([]);
    const [isEmpty, setIsEmpty] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    const { username } = useParams();
    const navigate = useNavigate();

    const usersDoc = collection(firestore, 'users');

    const ValidateParams = async () => {
        const { validate } = await useURLValidators(username);
        if (!validate) {
            useNotification('You\'re unauthorize. Please Sign In.');
            return navigate('/');
        }
    }

    const GetDataUsers = async () => {
        const docSnap = await getDocs(usersDoc);
        const arr = [];
        docSnap.forEach(snapshot => {
            const data = snapshot.data();
            if (snapshot.exists() && username != data.username) {
                arr.push({ data, id: snapshot.id });
            }
        })
        setUsers(arr);
        setIsEmpty(true);
    }

    const HandleSearchUser = async (e) => {
        e.preventDefault();

        const q = query(usersDoc, where('username', '==', searchValue));
        const docSnap = await getDocs(q);
        const arr = [];
        docSnap.forEach(snapshot => {
            const data = snapshot.data();
            if (snapshot.exists() && username != data.username) {
                arr.push({ data, id: snapshot.id });
            }
        })
        if (searchValue == '') {
            setIsEmpty(false);
        }
        setUsers(arr);
    }

    const HandleChoosedUser = async (e) => {
        const chats = collection(firestore, 'chats');
        const id = e.target.dataset.id
        const userDocs = await doc(usersDoc, id);
        const docSnap = await getDoc(userDocs);
        const usernameDoc = docSnap.data().username;
        const { validateData, chatId } = await useExistsDataHandler(chats, 'users', username, usernameDoc);
        if (validateData) {
            useNotification('Welcome to Chatbox!');
            return navigate(`/user/${username}/${chatId}`)
        }

        const chatDocs = await doc(chats);
        await setDoc(chatDocs, { users: [username, usernameDoc] });
        useNotification('Chatbox Created!');
        return navigate(`/user/${username}/${chatDocs.id}`)
    }

    useEffect(() => {
        GetDataUsers();
        ValidateParams();
    }, [isEmpty]);

    return (
        <div className='pt-16'>
            <div className="text-white max-w-96 mx-auto">
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 text-center">Users List</h1>
                <h1 className="text-center leading-tight mt-1">Select a user you want to text.</h1>
            </div>
            <div className='mt-12 max-w-96 bg-slate-400/20 mx-auto rounded-md p-2 text-slate-200'>
                {users.length != 0 ? (
                    <UserList data={users} event={HandleChoosedUser}/>
                ) : (
                    isEmpty ? (
                        <p className='p-2 border cursor-pointer'>No users found.</p>
                    ) : (
                        <Process />
                    )
                )}
            </div>
            <form className='max-w-96 mt-2 mx-auto gap-2 flex justify-between'>
                <Input classname="w-72 p-2 text-sm rounded-md outline-none text-slate-700" eventFunction={(e) => setSearchValue(e.target.value)} placeholder={'Search Users...'}/>
                <Button classname="w-24 rounded-md bg-gradient-to-r text-slate-200 border-[0.5px] p-1 hover:bg-gradient-to-l" eventFunction={HandleSearchUser}>Search</Button>
            </form>
        </div>
    )
}

export default Userlist