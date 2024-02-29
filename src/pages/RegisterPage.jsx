import React, {useRef} from "react";
import {Link, useNavigate} from "react-router-dom";
import {$fetch} from "../api";

const RegisterPage = () => {
    const form = useRef();
    const navigate = useNavigate();

    const register = async (e) => {
        e.preventDefault();

        const result = await $fetch("/register", "POST", new FormData(form.current));

        if (result) {
            localStorage.setItem("token", result.data.token);
            navigate("/");
        }
    }

    return (
        <div className={"container center"}>
            <form onSubmit={register} ref={form} className={"form card"}>
                <h3>Форма регистрации</h3>
                <div className="input-group">
                    <label>Логин:</label>
                    <input type="text" className="input" name={"login"}/>
                </div>
                <div className="input-group">
                    <label>Пароль:</label>
                    <input type="text" className="input" name={"password"}/>
                </div>
                <div className="input-group">
                    <label>Повторение пароля:</label>
                    <input type="password" className="input" name={"password_confirmation"}/>
                </div>
                <button className="button">Зарегистрироваться</button>
                <p>Уже есть аккаунт? <Link to={"/login"}>Авторизоваться</Link></p>
            </form>
        </div>
    );
};

export default RegisterPage;