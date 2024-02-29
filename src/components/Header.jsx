import React, {useContext} from "react";
import {Link, useNavigate} from "react-router-dom";
import {AuthContext} from "../App";
import {$fetch} from "../api";

/**
 * @returns {JSX.Element}
 * @constructor
 */
const Header = () => {
    const {isAuth, setAuth, setAdmin, isAdmin} = useContext(AuthContext);
    const navigate = useNavigate();

    const logout = async () => {
        const result = await $fetch("/logout");

        if (result) {
            localStorage.removeItem("token");
            setAuth(false);
            localStorage.removeItem("isAdmin");
            setAdmin(false);
            navigate("/login");
        }
    }

    return (
        <header className={"shadow"}>
            <div className="container flex ac sb wrap g-20">
                <Link className={"logo"} to={"/"}><p>Мои</p>Книги <span></span></Link>
                <div className="flex g-20 ac">
                    <Link className={"link"} to={"/best-books"}>
                        Топ книг
                    </Link>
                    <Link className={"link"} to={"/books"}>
                        Все книги
                    </Link>
                    {isAuth && <Link className={"link"} to={"/selected-books"}>
                        Избранные книги
                    </Link>}
                    {isAdmin && <Link className={"link"} to={"/admin"}>
                        Админ панель
                    </Link>}
                </div>
                {isAuth ?
                    <div className="flex ac g-10">
                        <button onClick={logout} className={"button"}>
                            Выход
                        </button>
                    </div>
                    :
                    <div className="flex ac g-10">
                        <Link to={"/login"}>
                            <button className={"button"}>
                                Вход
                            </button>
                        </Link>
                        <Link to={"/register"}>
                            <button className={"button"}>
                                Регистрация
                            </button>
                        </Link>
                    </div>
                }
            </div>
        </header>
    );
};

export default Header;