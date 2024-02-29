import React, {useContext} from "react";
import {Link} from "react-router-dom";
import {AuthContext} from "../App";

/**
 * @returns {JSX.Element}
 * @constructor
 */
const Header = () => {
    const { isAuth, setAuth } = useContext(AuthContext);

    return (
        <header className={"shadow"}>
            <div className="container flex ac sb wrap g-20">
                <Link className={"logo"} to={"/"}><p>Мои</p>Книги <span></span></Link>
                <div className="flex g-10 ac">
                    <Link className={"link"} to={"/best-books"}>
                        Топ книг
                    </Link>
                    <Link className={"link"} to={"/selected-books"}>
                        Избранные книги
                    </Link>
                </div>
                {isAuth ?
                    <div className="flex ac g-10">
                        <Link to={"/login"}>
                            <button className={"button"}>
                                Выход
                            </button>
                        </Link>
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