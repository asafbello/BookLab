import BookService from "../../services/BookService.js";

export const LOAD_BOOKS = 'book/loadBooks';
export const LOAD_BOOK = 'book/loadBook';
export const DELETE_BOOK = 'book/deletebooks';
export const ADD_BOOK = 'books/addBook'
export const GET_BOOK = 'books/getBook'
export const ADD_BOOK_TO_USER = 'books/addBookToUser'


const SET_BOOKS = 'books/setBooks';
const SET_BOOK = 'books/setBook';

export default {
    state: {
        books: [],
        currGoogleBook: null
    },
    getters: {
        bookFromGoogle(context) {
            var { currGoogleBook } = context;
            return context.currGoogleBook
     },
    },
    mutations: {
        [SET_BOOKS](state, { books }) {
            state.books = books;
        },
        [ADD_BOOK](state, {book}) {
            console.log({book});
            state.books.push(book);
        },
        [SET_BOOK] (state, {book}) {
            console.log({book})
            state.currGoogleBook = {
                title: book.volumeInfo.title,
                pages: book.volumeInfo.pageCount,
                author: book.volumeInfo.authors[0],
                desc: book.volumeInfo.description,
                img: book.volumeInfo.imageLinks.medium
            };
        }
    },

    actions: {
        [LOAD_BOOKS]({ commit, rootState }) {
            return BookService.getBooks()
                .then(books => {
                    commit({ type: SET_BOOKS, books })

                })
                .catch(err => {
                    commit(SET_BOOKS, [])
                    throw err;
                })
        },
        [ADD_BOOK] ({commit}, {googleBookId}) {
            return BookService.getBookById(googleBookId)
                .then(book => {
                    commit({
                        type: ADD_BOOK, 
                        book
                    })
                } )
        },
        [GET_BOOK] ({commit}, {googleBookId}) {
            return BookService.getBookFromGoogle(googleBookId)
            .then(book => {
                commit({
                    type: SET_BOOK, 
                    book
                })
            })

        },
        [ADD_BOOK_TO_USER]({commit}, {googleBookId}) {
            return 
        }
    }
}


