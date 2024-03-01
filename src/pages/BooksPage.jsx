import React, {useEffect, useRef, useState} from "react";
import {$fetch} from "../api";
import {useNavigate} from "react-router-dom";

/**
 * @returns {JSX.Element}
 * @constructor
 */
const BooksPage = () => {
    const filterForm = useRef();
    const [books, setBooks] = useState([]);
    const [genres, setGenres] = useState([])
    const [authors, setAuthors] = useState([])

    const navigate = useNavigate();

    const getBooks = async (e) => {
        let result;
        if (e) {
            e.preventDefault();
            result = await $fetch("/books", "GET", new FormData(filterForm.current));
        } else {
            result = await $fetch("/books");
        }


        if (result) {
            setBooks(result.data);
        }
    };

    const getAuthors = async () => {
        const result = await $fetch("/authors");

        if (result) {
            setAuthors(result.data);
        }
    }

    const getGenres = async () => {
        const result = await $fetch("/genres");

        if (result) {
            setGenres(result.data);
        }
    }

    useEffect(() => {
        (async () => {
            await getGenres();
            await getAuthors();
            await getBooks();
        })()
    }, [])

    if (!books || !genres || !authors) {
        return;
    }

    return (
        <div className={"flex col g-40"}>
            <div className="f2f5">
                <form ref={filterForm} onSubmit={getBooks} className="form card">
                    <h3>Форма фильтрации и сортировки</h3>
                    <div className="input-group">
                        <label>Сортировка по:</label>
                        <select className="input" name={"sorting"}>
                            <option value={"date_desk"}>Сначала новые</option>
                            <option value={"date_asc"}>Сначала старые</option>
                            <option value={"rating_desk"}>Сначала c высоким рейтингом</option>
                            <option value={"rating_asc"}>Сначала c низким рейтингом</option>
                        </select>
                    </div>
                    {/*<div className="input-group">*/}
                    {/*    <label>Оценка от:</label>*/}
                    {/*    <input type="text" className="input" name={"rate_from"}/>*/}
                    {/*</div>*/}
                    {/*<div className="input-group">*/}
                    {/*    <label>Оценка до:</label>*/}
                    {/*    <input type="text" className="input" name={"rate_to"}/>*/}
                    {/*</div>*/}
                    <div className="input-group">
                        <label>Жанры:</label>
                        <select className="input" name={"genres[]"} multiple>
                            {genres.map(genre =>
                                <option key={genre.id} value={genre.id} selected>{genre.title}</option>
                            )}
                        </select>
                    </div>
                    <div className="input-group">
                        <label>Авторы:</label>
                        <select className="input" name={"authors[]"} multiple>
                            {authors.map(author =>
                                <option key={author.id} value={author.id} selected>{author.name}</option>
                            )}
                        </select>
                    </div>
                    <button className="button">Найти</button>
                </form>
                <div className={"card-grid"}>
                    {books.map(book =>
                        <div key={book.id} className="card flex col g-20">
                            <img src={"http://books-server/public/images/" + book.image} alt="book"/>
                            <div className="flex col g-10">
                                <div className="key-value">
                                    <span>Название:</span>
                                    <p>{book.title}</p>
                                </div>
                                <div className="key-value">
                                    <span>Средняя оценка:</span>
                                    <p>{book.rating === 0 ? "Нет оценки" : book.rating}</p>
                                </div>
                            </div>
                            <div className="flex col g-10 mt-a">
                                <button className={"button"} onClick={() => navigate('/books/' + book.id)}>Перейти
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BooksPage;