import BookService from "../../services/BookService.js";

export const LOAD_BOOKS = 'book/loadBooks';
export const DELETE_BOOK = 'book/deletebooks';



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
        // [DELETE_BOOK]({ commit }, { bookId }) {
        //     return BookService.deleteCar(bookId)
        //         .then(_ => {
        //             commit({ type:DELETE_BOOK, bookId })
        //         })
        // },

    }
}
