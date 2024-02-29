import React, {useContext, useEffect, useRef, useState} from "react";
import {$fetch} from "../api";
import {useParams} from "react-router-dom";
import {AuthContext} from "../App";

/**
 * @returns {JSX.Element}
 * @constructor
 */
const BookPage = () => {
    const [book, setBook] = useState(null)
    const {id} = useParams();
    const {isAuth} = useContext(AuthContext);
    const rateForm = useRef();

    const rateBook = async (e) => {
        e.preventDefault();

        const result = await $fetch("/books/" + id + "/rate", "PATCH", new FormData(rateForm.current));

        if (result) {
            getBook();
        }
    }

    const selectBook = async (id) => {
        const result = await $fetch("/books/" + id + "/select", "PATCH");

        if (result) {
            getBook();
        }
    }

    const unselectBook = async (id) => {
        const result = await $fetch("/books/" + id + "/unselect", "PATCH");

        if (result) {
            getBook();
        }
    }

    const getBook = async () => {
        const result = await $fetch("/books/" + id);

        if (result) {
            setBook(result.data);
        }
    }

    useEffect(() => {
        (async () => {
            await getBook();
        })()
    }, [])

    if (!book) {
        return;
    }

    return (
        <div className={"flex col g-40 center"}>
            <div className="card flex g-20">
                <img className={"h-300"} src={"http://books-server/public/images/" + book.image} alt="book"/>
                <div className="card flex col g-20">
                    <div className="flex col g-10">
                        <div className="key-value col as">
                            <span>Название:</span>
                            <p>{book.title}</p>
                        </div>
                        <div className="key-value col as">
                            <span>Описание:</span>
                            <p>{book.description}</p>
                        </div>
                        <div className="key-value col as">
                            <span>Жанры:</span>
                            <p>{book.genres.map(genre => genre.title).join(", ")}</p>
                        </div>
                        <div className="key-value col as">
                            <span>Авторы:</span>
                            <p>{book.authors.map(author => author.name).join(", ")}</p>
                        </div>
                        <div className="key-value col as">
                            <span>Средняя оценка:</span>
                            <p>{book.rating}</p>
                        </div>
                    </div>
                    <div className="flex col g-10 mt-a">
                        <form ref={rateForm} onSubmit={rateBook} className="flex ac g-10">
                            <input
                                defaultValue={5}
                                className={"input"}
                                type="number"
                                min={1}
                                max={5}
                                step={0.01}
                                name={"rating"}
                            />
                            <button className={"button w-100"}>Поставить оценку</button>
                        </form>
                        {isAuth &&
                            (
                                book.is_selected ?
                                    <button onClick={() => unselectBook(book.id)} className={"button danger"}>
                                        Удалить из избранных
                                    </button>
                                    :
                                    <button onClick={() => selectBook(book.id)} className={"button"}>
                                        Добавить в избранные
                                    </button>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookPage;