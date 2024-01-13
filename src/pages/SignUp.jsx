import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from '../config/firebaseConfig';
import { useCreateData } from "../hooks/useCreateData";
import { useNotification } from "../hooks/useNotification";
import Button from "../components/elements/Button/Button";
import Form from "../components/Fragment/Form";
import Index from "../components/elements/Input/Index";
import logo from "../assets/heythere!.svg"

export default function SignIn() {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const HandleGoogleAuth = () => {
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider)
            .then(async result => {
                const user = result.user.displayName;
                const register = await useCreateData('users', user);
                if (register.status == "exists") {
                    useNotification(`Welcome ${user}`);
                } else {
                    useNotification('Sign In Successfull');
                }
                navigate(`/user/${user}`)
            })
            .catch(err => {
                useNotification('Failed continue with Google');
                console.log(err);
            })
    }

    const HandleManualSignIn = async (e) => {
        e.preventDefault();

        document.getElementById('userInput').value = "";
        const register = await useCreateData('users', username);
        if (register.status == "exists") {
            useNotification(`Welcome ${username}`);
        } else {
            useNotification('Sign In Successfull');
        }
        navigate(`/user/${username}`)
    }

    return (
        <div className="pt-12">
            <div className="text-white max-w-96 mx-auto">
                <div className="bg-black/50 flex justify-center items-center gap-4 p-3 w-fit mx-auto rounded-xl">
                    <img src={logo} alt="" className="w-16 h-16 sm:w-20 sm:h-20"/>
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 text-center">Hey There!</h1>
                </div>
                <h1 className="text-center leading-tight mt-1">Start your chat adventure with <span className="font-bold text-slate-100">Hey There!</span>, a place where you meet new people.</h1>
            </div>
            <div className="mt-8 max-w-96 bg-black/5 text-white mx-auto p-8 rounded-md flex flex-col">
                <Form text="Sign Up">
                    <Index event={HandleManualSignIn} func={(e) => setUsername(e.target.value)} id="userInput"/>
                </Form>
                <span className="my-5 text-center">OR</span>
                <Button classname={`text-black bg-white p-2 rounded-md hover:bg-slate-200`} eventFunction={HandleGoogleAuth}>Continue With Google</Button>
            </div>
        </div>
    )
}