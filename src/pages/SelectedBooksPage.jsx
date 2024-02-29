import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {$fetch} from "../api";

const SelectedBooksPage = () => {
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();

    const getSelectedBooks = async () => {
        const result = await $fetch("/books/selected");

        if (result) {
            setBooks(result.data);
        }
    }

    const unselectBook = async (id) => {
        const result = await $fetch("/books/" + id + "/unselect", "PATCH");

        if (result) {
            getSelectedBooks();
        }
    }
    const unselectAllBooks = async () => {
        const result = await $fetch("/books/unselect/all", "PATCH");

        if (result) {
            getSelectedBooks();
        }
    }

    useEffect(() => {
        (async () => {
            await getSelectedBooks();
        })()
    }, [])

    if (!books) {
        return;
    }

    return (
        <div className={"flex col g-40"}>
            {books.length > 0 && <button onClick={unselectAllBooks} className={"button danger w-fit"}>
                Удалить все избранные
            </button>}
            <div className={"card-grid"}>
                {books.map(book =>
                    <div key={book.id} className="card flex col g-20">
                        <img src={"http://books-server/public/images/" + book.image} alt="book"/>
                        <div className="flex col g-10">
                            <div className="key-value">
                                <span>Название:</span>
                                <p>{book.title}</p>
                            </div>
                            <div className="key-value col as">
                                <span>Жанры:</span>
                                <p>{book.genres.map(genre => genre.title).join(", ")}</p>
                            </div>
                            <div className="key-value col as">
                                <span>Авторы:</span>
                                <p>{book.authors.map(author => author.name).join(", ")}</p>
                            </div>
                        </div>
                        <div className="flex col g-10 mt-a">
                            <div className="flex col g-10 mt-a">
                                <button className={"button"} onClick={() => navigate('/books/' + book.id)}>
                                    Перейти
                                </button>
                            </div>
                            <button onClick={() => unselectBook(book.id)} className={"button danger"}>
                                Удалить из избранных
                            </button>
                        </div>
                    </div>
                )}
            </div>

        </div>
    );
};

export default SelectedBooksPage;