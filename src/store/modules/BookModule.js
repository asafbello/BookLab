import BookService from "../../services/BookService.js";

export const LOAD_BOOKS = 'book/loadBooks';
export const DELETE_BOOK = 'book/deletebooks';
export const ADD_BOOK = 'book/addBook';



const SET_BOOKS = 'books/setBooks';


export default {
    state: {
        books: [],
    },
    getters: {
        booksToDisplay(context) {
            var { books } = context;
            return books
        }
    },
    mutations: {
        [SET_BOOKS](state, { books }) {
            state.books = books;
        },
        // [DELETE_BOOK](state, { bookId }) {
        //     state.books = state.books.filter(book => book._id !== bookId)
        // },
        [ADD_BOOK](state, { book }) {
            state.books.push(book)
        },
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
        // [DELETE_BOOK]({ commit }, { bookId }) {
        //     return BookService.deleteBook(bookId)
        //         .then(_ => {
        //             commit({ type:DELETE_BOOK, bookId })
        //         })
        // },

    }, [ADD_BOOK]({ commit }, { googleId }) {
        console.log(googleId);
        return BookService.addBook(googleId)
            .then(_ => {
                commit({ type: ADD_BOOK, book })
            })
    },
}
