import { collection, query, orderBy, doc, setDoc, onSnapshot, Timestamp, getDoc, updateDoc, where, getDocs } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { firestore } from '../config/firebaseConfig';
import { useURLValidators } from '../hooks/useURLValidators';
import { useNotification } from '../hooks/useNotification';
import useTime from '../hooks/useTime';
import Typing from '../components/Fragment/Typing';

function Chat() {
  const [messages, setMessages] = useState('');
  const [user, setUser] = useState('');
  const [typing, setTyping] = useState(false);
  const [displayMessages, setDisplayMessages] = useState([]);

  const chatBoxRef = useRef();

  const { username, chatId } = useParams();
  const navigate = useNavigate();

  const chats = collection(firestore, 'chats');

  window.onload = () => {
    TypingFunction(false);
  }

  const usersColl = collection(firestore, 'users');

  const HandleData = async () => {
    const { validate } = await useURLValidators(username, chatId);
    if (!validate) {
      useNotification('You\'re unauthorize. Please Sign In.');
      return navigate('/');
    }

    const docRef = await doc(chats, chatId);
    const g = await getDoc(docRef);
    g.data().users.forEach(item => {
      if (item != username) {
        setUser(item);
      }
    });
    const messagesColl = collection(docRef, 'chat');
    const q = query(messagesColl, orderBy('createdAt'))

    const unsubscribe = onSnapshot(q, snapshot => {
      const arr = [];
      snapshot.docs.forEach(doc => {
        const data = doc.data();
        arr.push(data);
      })
      setDisplayMessages(arr)
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    })
    return () => unsubscribe();
  }

  const HandleMessages = async (e) => {
    e.preventDefault();

    const docRef = await doc(chats, chatId);
    const messagesColl = collection(docRef, 'chat');
    const docRef2 = await doc(messagesColl);

    if (messages == "") {
      return;
    }

    const createdAt = Timestamp.fromDate(new Date());
    const msg = {
      text: messages,
      from: username,
      time: useTime(),
      createdAt
    }

    await setDoc(docRef2, msg);
    document.getElementById('msgInput').value = "";
  }

  const docRef = doc(chats, chatId);
  const eventColl = collection(docRef, 'event');
  const eventDoc = doc(eventColl, 'typing');

  const streams = () => {
    onSnapshot(eventColl, snapshot => {
      snapshot.docs.forEach(doc => {
        const data = doc.data();
        if (data.event.user !== username && data.event.typing) {
          setTyping(data.event.typing);
        } else {
          setTyping(false)
        }
      })
    })
  }

  const TypingFunction = async (bool) => {
    await setDoc(eventDoc, { event: { typing: bool, user: username } });
  }

  const HandleUserTyping = async (e) => {
    TypingFunction(true);
  }

  const HandleUserNotTyping = () => {
    TypingFunction(false);
    setTyping(false);
  }

  useEffect(() => {
    streams();
  }, [typing]);

  useEffect(() => {
    HandleData();
  }, []);

  return (
    <div>
      <div className="text-white max-w-96 mx-auto pt-5">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 text-center">Chat Box</h1>
      </div>
      <div className='mt-5 max-w-lg bg-slate-400/20 m-auto rounded-md p-5 text-slate-200'>
        <div className='w-full bg-black/50 p-2 px-4 rounded flex items-center justify-between'>
          <p className='text-sm'>{user ? user : "Uknown User"}</p>
        </div>
        <hr className='mt-3' />
        <ul className='flex flex-col h-96 mt-4 overflow-auto pe-2' ref={chatBoxRef}>
          {displayMessages.map((msg, index) => (
            <li key={index} className={msg.from !== username ? 'max-w-fit mt-1' : 'max-w-60 self-end mt-1'}>
              <div className={`p-2 bg-slate-900/10 rounded min-w-24 ${msg.from !== username ? '' : 'text-wrap text-end'}`}>
                <p className={msg.from !== username ? 'font-semibold' : 'text-end font-semibold'}>
                  {msg.from !== username ? msg.from : 'You'}
                </p>
                <p className={msg.from !== username ? 'text-wrap text-sm' : 'text-wrap text-sm text-end'}>
                  {msg.text}
                </p>
                <p className='text-[12px] text-gray-300 text-end'>{msg.time}</p>
              </div>
            </li>
          ))}
          {typing && <Typing />}
        </ul>
      </div>
      <form className='max-w-lg mt-2 gap-1 flex justify-between mx-auto'>
        <input type="text" id="msgInput" autoComplete="off" onFocus={HandleUserTyping} onBlur={HandleUserNotTyping} onChange={(e) => setMessages(e.target.value)} className='w-full p-2 text-sm rounded-md outline-none text-slate-700' placeholder='Ketuk untuk mengetik...' />
        <button className='w-14 rounded-md bg-gradient-to-r text-slate-200 border-[0.5px] p-1 hover:bg-gradient-to-l' onClick={HandleMessages}>Send</button>
      </form>
    </div>
  )
}

export default Chat