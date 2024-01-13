import { Link } from "react-router-dom";

export default function(){
    return (
        <div>
            <div className="text-white max-w-96 m-auto pt-20">
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 text-center">404 Page Not Found!</h1>
                <h1 className="text-center leading-tight mt-1">Sorry, the page you're looking for couldn't be found.</h1>
                <div className="w-full flex justify-center items-center mt-5">
                    <Link to='/' className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-md p-2 hover:bg-gradient-to-l ease-in">Back to the home page?</Link>
                </div>
            </div>
        </div>
    )
}