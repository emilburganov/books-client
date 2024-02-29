import React, {useEffect, useState} from "react";
import {$fetch} from "../api";
import {useNavigate} from "react-router-dom";

/**
 * @returns {JSX.Element}
 * @constructor
 */
const HomePage = () => {
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();

    const getBooks = async () => {
        const result = await $fetch("/books");

        if (result) {
            setBooks(result.data);
        }
    }


    useEffect(() => {
        (async() => {
            await getBooks();
        })()
    }, [])

    if (!books) {
        return;
    }

    return (
        <div className={"flex col g-40"}>
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
                                <p>{book.rating}</p>
                            </div>
                        </div>
                        <div className="flex col g-10 mt-a">
                            <button className={"button"} onClick={() => navigate('/books/' + book.id)}>Перейти</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomePage;