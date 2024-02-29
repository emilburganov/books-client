import {createContext, useState} from "react";
import {HashRouter, Route, Routes} from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminPage from "./pages/AdminPage";
import BookPage from "./pages/BookPage";
import SelectedBooksPage from "./pages/SelectedBooksPage";
import BooksPage from "./pages/BooksPage";

export const AuthContext = createContext(null);

function App() {
    const [isAuth, setAuth] = useState(!!localStorage.getItem("token"));
    const [isAdmin, setAdmin] = useState(!!localStorage.getItem("isAdmin"));

    return (
        <AuthContext.Provider value={{ isAuth, setAuth, isAdmin, setAdmin }}>
            <HashRouter>
                <Header/>
                <div className="container h-max">
                    <Routes>
                        {isAuth ? <>
                                <Route path={"/books"} element={<BooksPage/>}/>
                                <Route path={"/selected-books"} element={<SelectedBooksPage/>}/>
                                <Route path={"/books/:id"} element={<BookPage/>}/>
                                {isAdmin && <Route path={"/admin"} element={<AdminPage/>}/>}
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
