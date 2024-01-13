import { Outlet } from "react-router-dom"


export default function Layout() {
    return (
        <div className="h-screen sm:max-h-fit bg-gradient-to-r from-violet-500 to-fuchsia-500 px-2 pb-10">
            <div className="absolute bg-gradient-to-r from-green-500 to-teal-500 p-2 rounded-md z-50 left-[50%] translate-x-[-50%] transition-all duration-500 ease-in-out top-[-50px] text-center" id="notif">
                <p className="text-slate-700 leading-tight" id="capt"></p>
            </div>
            <Outlet />
        </div>
    )
}