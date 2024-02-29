import React, {useEffect, useRef, useState} from 'react';
import {$fetch} from "../api";

/**
 * @returns {Element}
 * @constructor
 */
const AdminPage = () => {
    const [genres, setGenres] = useState([])
    const [genre, setGenre] = useState({})
    const createGenreForm = useRef();
    const updateGenreForm = useRef();
    const updateGenreModal = useRef();

    const [authors, setAuthors] = useState([])
    const [author, setAuthor] = useState({})
    const createAuthorForm = useRef();
    const updateAuthorForm = useRef();
    const updateAuthorModal = useRef();

    const [books, setBooks] = useState([])
    const [book, setBook] = useState({})
    const createBookForm = useRef();
    const updateBookModal = useRef();
    const updateBookForm = useRef();

    const [users, setUsers] = useState([])
    const [user, setUser] = useState({})
    const createUserForm = useRef();
    const updateUserModal = useRef();
    const updateUserForm = useRef();

    useEffect(() => {
        (async() => {
            await getGenres();
            await getAuthors();
            await getBooks();
            await getUsers();
        })()
    }, [])

    /* Genres */
    const getGenres = async () => {
        const result = await $fetch("/genres");

        if (result) {
            setGenres(result.data);
        }
    }

    const createGenre = async (e) => {
        e.preventDefault();

        const result = await $fetch("/genres", "POST", new FormData(createGenreForm.current))

        if (result) {
            getGenres();
        }
    }

    const updateGenre = async (e) => {
        e.preventDefault();

        const result = await $fetch("/genres/" + genre.id, "PUT", new FormData(updateGenreForm.current))

        if (result) {
            getGenres();
            getBooks();
        }

        closeEditGenreModal();
    }

    const deleteGenre = async (id) => {

        const result = await $fetch("/genres/" + id, "DELETE")

        if (result) {
            getGenres();
            getBooks();
        }
    }

    const editGenre = (genre) => {
        setGenre(genre);
        updateGenreModal.current.classList.add("active");
    }

    const closeEditGenreModal = () => {
        updateGenreModal.current.classList.remove("active");
    }

    /* Authors */
    const getAuthors = async () => {
        const result = await $fetch("/authors");

        if (result) {
            setAuthors(result.data);
        }
    }

    const createAuthor = async (e) => {
        e.preventDefault();

        const result = await $fetch("/authors", "POST", new FormData(createAuthorForm.current))

        if (result) {
            getAuthors();
        }
    }

    const updateAuthor = async (e) => {
        e.preventDefault();

        const result = await $fetch("/authors/" + author.id, "PUT", new FormData(updateAuthorForm.current))

        if (result) {
            getAuthors();
            getBooks();
        }

        closeEditAuthorModal();
    }

    const deleteAuthor = async (id) => {

        const result = await $fetch("/authors/" + id, "DELETE")

        if (result) {
            getAuthors();
            getBooks();
        }
    }

    const editAuthor = (author) => {
        setAuthor(author);
        updateAuthorModal.current.classList.add("active");
    }

    const closeEditAuthorModal = () => {
        updateAuthorModal.current.classList.remove("active");
    }

    /* Books */
    const getBooks = async () => {
        const result = await $fetch("/books");

        if (result) {
            setBooks(result.data);
        }
    }

    const createBook = async (e) => {
        e.preventDefault();

        const result = await $fetch("/books", "POST", new FormData(createBookForm.current))

        if (result) {
            getBooks();
        }
    }

    const updateBook = async (e) => {
        e.preventDefault();

        const result = await $fetch("/books/" + book.id, "PUT", new FormData(updateBookForm.current))

        if (result) {
            getBooks();
        }

        closeEditBookModal();
    }

    const deleteBook = async (id) => {

        const result = await $fetch("/books/" + id, "DELETE")

        if (result) {
            getBooks();
        }
    }

    const editBook = (book) => {
        setBook(book);
        updateBookModal.current.classList.add("active");
    }

    const closeEditBookModal = () => {
        updateBookModal.current.classList.remove("active");
    }

    /* Users */
    const getUsers = async () => {
        const result = await $fetch("/users");

        if (result) {
            setUsers(result.data);
        }
    }

    const createUser = async (e) => {
        e.preventDefault();

        const result = await $fetch("/users", "POST", new FormData(createUserForm.current))

        if (result) {
            getUsers();
        }
    }

    const updateUser = async (e) => {
        e.preventDefault();

        const result = await $fetch("/users/" + user.id, "PUT", new FormData(updateUserForm.current))

        if (result) {
            getUsers();
        }

        closeEditUserModal();
    }

    const deleteUser = async (id) => {

        const result = await $fetch("/users/" + id, "DELETE")

        if (result) {
            getUsers();
        }
    }

    const editUser = (user) => {
        setUser(user);
        updateUserModal.current.classList.add("active");
    }

    const closeEditUserModal = () => {
        updateUserModal.current.classList.remove("active");
    }

    if (!books || !genres || !authors || !users) {
        return;
    }

    return (
        <div className={"flex col g-40"}>
            <div className="f2f5">
                <form ref={createGenreForm} onSubmit={createGenre} className="form card">
                    <h3>Форма создания жанров</h3>
                    <div className="input-group">
                        <label>Название:</label>
                        <input type="text" className="input" name={"title"}/>
                    </div>
                    <button className="button">Создать</button>
                </form>
                <div className={"card-grid"}>
                    {genres.map(genre =>
                        <div key={genre.id} className="card flex col g-20">
                            <div className="flex col g-10">
                                <div className="key-value">
                                    <span>Название:</span>
                                    <p>{genre.title}</p>
                                </div>
                            </div>
                            <div className="flex col g-10 mt-a">
                                <button onClick={() => editGenre(genre)} className={"button"}>Редактировать</button>
                                <button onClick={() => deleteGenre(genre.id)} className={"button danger"}>
                                    Удалить
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                <div onClick={closeEditGenreModal} ref={updateGenreModal} className="modal">
                    <form ref={updateGenreForm} onClick={(e) => e.stopPropagation()} onSubmit={updateGenre}
                          className="form card">
                        <h3>Форма редактирования жанров</h3>
                        <div className="input-group">
                            <label>Название:</label>
                            <input defaultValue={genre.title} type="text" className="input" name={"title"}/>
                        </div>
                        <button className="button">Обновить</button>
                    </form>
                </div>
            </div>
            <div className="f2f5">
                <form ref={createAuthorForm} onSubmit={createAuthor} className="form card">
                    <h3>Форма создания авторов</h3>
                    <div className="input-group">
                        <label>Имя:</label>
                        <input type="text" className="input" name={"name"}/>
                    </div>
                    <button className="button">Создать</button>
                </form>
                <div className={"card-grid"}>
                    {authors.map(author =>
                        <div key={author.id} className="card flex col g-20">
                            <div className="flex col g-10">
                                <div className="key-value">
                                    <span>Имя:</span>
                                    <p>{author.name}</p>
                                </div>
                            </div>
                            <div className="flex col g-10 mt-a">
                                <button onClick={() => editAuthor(author)} className={"button"}>Редактировать</button>
                                <button onClick={() => deleteAuthor(author.id)} className={"button danger"}>
                                    Удалить
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                <div onClick={closeEditAuthorModal} ref={updateAuthorModal} className="modal">
                    <form ref={updateAuthorForm} onClick={(e) => e.stopPropagation()} onSubmit={updateAuthor}
                          className="form card">
                        <h3>Форма редактирования авторов</h3>
                        <div className="input-group">
                            <label>Имя:</label>
                            <input defaultValue={author.name} type="text" className="input" name={"name"}/>
                        </div>
                        <button className="button">Обновить</button>
                    </form>
                </div>
            </div>
            <div className="f2f5">
                <form ref={createBookForm} onSubmit={createBook} className="form card">
                    <h3>Форма создания книг</h3>
                    <div className="input-group">
                        <label>Название:</label>
                        <input type="text" className="input" name={"title"}/>
                    </div>
                    <div className="input-group">
                        <label>Описание:</label>
                        <textarea className="input" name={"description"}></textarea>
                    </div>
                    <div className="input-group">
                        <label>Жанры:</label>
                        <select defaultValue={"Выберите жанры"} className="input" name={"genres[]"} multiple>
                            {genres.map(genre =>
                                <option key={genre.id} value={genre.id}>{genre.title}</option>
                            )}
                        </select>
                    </div>
                    <div className="input-group">
                        <label>Авторы:</label>
                        <select defaultValue={"Выберите авторов"} className="input" name={"authors[]"} multiple>
                            {authors.map(author =>
                                <option key={author.id} value={author.id}>{author.name}</option>
                            )}
                        </select>
                    </div>
                    <div className="flex ac g-20">
                        <input type="checkbox" className="checkbox"
                               name={"is_shown"}/>
                        <label>Показывать на главной</label>
                    </div>
                    <div className="input-group">
                        <label>Картинка:</label>
                        <input type="file" className="input" name={"image"}/>
                    </div>
                    <button className="button">Создать</button>
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
                            </div>
                            <div className="flex col g-10 mt-a">
                                <button onClick={() => editBook(book)} className={"button"}>Редактировать</button>
                                <button onClick={() => deleteBook(book.id)} className={"button danger"}>
                                    Удалить
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                <div onClick={closeEditBookModal} ref={updateBookModal} className="modal">
                    <form ref={updateBookForm} onClick={(e) => e.stopPropagation()} onSubmit={updateBook}
                          className="form card">
                        <h3>Форма редактирования книг</h3>
                        <div className="input-group">
                            <label>Название:</label>
                            <input defaultValue={book.title} type="text" className="input" name={"title"}/>
                        </div>
                        <div className="input-group">
                            <label>Описание:</label>
                            <textarea defaultValue={book.description} className="input" name={"description"}/>
                        </div>
                        <div className="input-group">
                            <label>Жанры:</label>
                            <select className="input" name={"genres[]"} multiple>
                                {genres.map(genre =>
                                    <option key={genre.id} value={genre.id}>{genre.title}</option>
                                )}
                            </select>
                        </div>
                        <div className="input-group">
                            <label>Авторы:</label>
                            <select className="input" name={"authors[]"} multiple>
                                {authors.map(author =>
                                    <option key={author.id} value={author.id}>{author.name}</option>
                                )}
                            </select>
                        </div>
                        <div className="flex ac g-20">
                            <input defaultValue={book.is_shown} type="checkbox" className="checkbox"
                                   name={"is_shown"}/>
                            <label>Показывать на главной</label>
                        </div>
                        <div className="input-group">
                            <label>Картинка:</label>
                            <input type="file" className="input" name={"image"}/>
                        </div>
                        <button className="button">Обновить</button>
                    </form>
                </div>
            </div>
            <div className="f2f5">
                <form ref={createUserForm} onSubmit={createUser} className="form card">
                    <h3>Форма создания пользователей</h3>
                    <div className="input-group">
                    <label>Логин:</label>
                        <input type="text" className="input" name={"login"}/>
                    </div>
                    <div className="input-group">
                        <label>Пароль:</label>
                        <input type="text" className="input" name={"password"}/>
                    </div>
                    <div className="flex ac g-20">
                        <input type="checkbox" className="checkbox" name={"is_admin"}/>
                        <label>Админ</label>
                    </div>
                    <button className="button">Создать</button>
                </form>
                <div className={"card-grid"}>
                    {users.map(user =>
                        <div key={user.id} className="card flex col g-20">
                            <div className="flex col g-10">
                                <div className="key-value">
                                    <span>Логин:</span>
                                    <p>{user.login}</p>
                                </div>
                                <div className="key-value">
                                    <span>Пароль:</span>
                                    <p>{user.password}</p>
                                </div>
                                <div className="key-value">
                                    <span>Админ:</span>
                                    <p>{JSON.stringify(Boolean(user.is_admin))}</p>
                                </div>
                            </div>
                            <div className="flex col g-10 mt-a">
                                <button onClick={() => editUser(user)} className={"button"}>Редактировать</button>
                                <button onClick={() => deleteUser(user.id)} className={"button danger"}>
                                    Удалить
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                <div onClick={closeEditUserModal} ref={updateUserModal} className="modal">
                    <form ref={updateUserForm} onClick={(e) => e.stopPropagation()} onSubmit={updateUser}
                          className="form card">
                        <h3>Форма редактирования пользователей</h3>
                        <div className="input-group">
                            <label>Логин:</label>
                            <input defaultValue={user.login} type="text" className="input" name={"login"}/>
                        </div>
                        <div className="input-group">
                            <label>Пароль:</label>
                            <input defaultValue={user.password} type="text" className="input" name={"password"}/>
                        </div>
                        <div className="flex ac g-20">
                            <input defaultChecked={user.is_admin} type="checkbox" className="checkbox"
                                   name={"is_admin"}/>
                            <label>Админ</label>
                        </div>
                        <button className="button">Обновить</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;