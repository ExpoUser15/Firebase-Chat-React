import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageNotFound from './pages/PageNotFound';
import SignUp from "./pages/SignUp";
import Layout from "./layout/Layout";
import User from "./pages/User";
import Chat from "./pages/Chat";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<SignUp />} />
            <Route path="/user/:username" element={<User />} />
            <Route path="/user/:username/:chatId" element={<Chat />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
