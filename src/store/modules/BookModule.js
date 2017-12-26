import BookService from "../../services/BookService.js";

export const LOAD_BOOKS = 'book/loadBooks';
export const LOAD_BOOK = 'book/loadBook';
export const DELETE_BOOK = 'book/deletebooks';
export const ADD_BOOK = 'books/addBook'
export const GET_BOOK = 'books/getBook'
// export const ADD_RATE_TO_BOOK_ = 'books/addRateToBook'


const SET_BOOKS = 'books/setBooks';
const SET_BOOK = 'books/setBook';

export default {
    state: {
        books: [],
        currBook: null
    },
    getters: {
        currentBook({currBook}) {
            return JSON.parse(JSON.stringify(currBook));
     },
        booksToDisplay(context) {
            var { books } = context;
            return books
        }
    },
    mutations: {
        [SET_BOOKS](state, { books }) {
            state.books = books;
        },
        [ADD_BOOK](state, {book}) {
            console.log({book});
            state.currBook = book;
        },
        [SET_BOOK] (state, {book}) {
            console.log({book})
            state.currGoogleBook = BookService.createBookObj(book)
        }
    },

    actions: {
        [LOAD_BOOKS]({ commit, rootState }) {
            var shelf = rootState.user.loggedinUser.shelf;
            return BookService.getBooksShelf(shelf)
                .then(books => {
                    console.log('books',books);
                    commit({ type: SET_BOOKS, books })

                })
                .catch(err => {
                    commit(SET_BOOKS, [])
                    throw err;
                })
        },
        [ADD_BOOK] ({commit}, {bookToAdd}) {
            console.log({bookToAdd});
            return BookService.saveBook(bookToAdd)
                .then(book => {
                    console.log('----',book)
                    commit({
                        type: ADD_BOOK, 
                        book: book.data
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
        // [ADD_RATE_TO_BOOK]({commit}, {googleBookId}) {
        //     return BookService.addGeneralRate(googleBookId)
        //     .then(book => {
        //         commit({
        //             type: '',
        //             googleBookId
        //         })
        //     })
        // }
    }
}


