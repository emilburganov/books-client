import {createContext, useState} from "react";
import {HashRouter, Route, Routes} from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

export const AuthContext = createContext(null);

function App() {
    const [isAuth, setAuth] = useState(!!localStorage.getItem("token"));

    return (
        <AuthContext.Provider value={{ isAuth, setAuth }}>
            <HashRouter>
                <Header/>
                <div className="container h-max">
                    <Routes>
                        {isAuth ? <>
                                <Route path={"/selected-books"} element={<HomePage/>}/>
                            </>
                            :
                            <>
                                <Route path={"/register"} element={<RegisterPage/>}/>
                                <Route path={"/login"} element={<LoginPage/>}/>
                            </>
                        }
                        <Route path={"*"} element={<HomePage/>}/>
                    </Routes>
                </div>
                <Footer/>
            </HashRouter>
        </AuthContext.Provider>
    );
}

export default App;
