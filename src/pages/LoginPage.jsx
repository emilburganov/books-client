import React, {useContext, useRef} from "react";
import {Link, useNavigate} from "react-router-dom";
import {$fetch} from "../api";
import {AuthContext} from "../App";

/**
 * @returns {Element}
 * @constructor
 */
const LoginPage = () => {
    const form = useRef();
    const navigate = useNavigate();
    const {setAuth, setAdmin} = useContext(AuthContext);

    const login = async (e) => {
        e.preventDefault();

        const result = await $fetch("/login", "POST", new FormData(form.current));

        if (result) {
            localStorage.setItem("token", result.data.token);
            setAuth(true);
            localStorage.setItem("isAdmin", result.data.is_admin);
            setAdmin(Boolean(result.data.is_admin));
            navigate("/");
        }
    }

    return (
        <div className={"container center"}>
            <form ref={form} onSubmit={login} className={"form card"}>
                <h3>Форма авторизации</h3>
                <div className="input-group">
                    <label>Логин:</label>
                    <input type="text" className="input" name={"login"}/>
                </div>
                <div className="input-group">
                    <label>Пароль:</label>
                    <input type="password" className="input" name={"password"}/>
                </div>
                <button className="button">Авторизоваться</button>
                <p>Ещё нет аккаунта? <Link to={"/register"}>Зарегистрироваться</Link></p>
            </form>
        </div>
    );
};

export default LoginPage;