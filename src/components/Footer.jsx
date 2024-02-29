import React, {useContext} from "react";
import {Link} from "react-router-dom";
import {AuthContext} from "../App";

/**
 * @returns {JSX.Element}
 * @constructor
 */
const Footer = () => {
    const {isAuth, isAdmin} = useContext(AuthContext);

    return (
        <footer className={"shadow"}>
            <div className="container flex sb wrap g-20 col">
                <div className="flex g-20 sb">
                    <Link className={"logo"} to={"/"}><p>Мои</p>Книги <span></span></Link>
                    <div className="flex g-20 ac">
                        <Link className={"link"} to={"/best-books"}>
                            Топ книг
                        </Link>
                        {isAuth && <Link className={"link"} to={"/selected-books"}>
                            Избранные книги
                        </Link>}
                        {isAdmin && <Link className={"link"} to={"/admin"}>
                            Админ панель
                        </Link>}
                    </div>
                    <div className="flex g-10 col">
                        <p>Телефон: +79146781511</p>
                        <p>Почта: book@superbook.premium</p>
                    </div>
                </div>
                <p>© Copyright 2024</p>
            </div>
        </footer>
    );
};

export default Footer;