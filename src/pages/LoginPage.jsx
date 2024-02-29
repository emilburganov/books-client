import React from "react";
import {Link} from "react-router-dom";

const LoginPage = () => {
    return (
        <div className={"container center"}>
            <form className={"form card"}>
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