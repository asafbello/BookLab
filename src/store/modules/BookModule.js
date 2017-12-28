import BookService from "../../services/BookService.js";
import _ from 'lodash'
import { UPDATE_USER } from "./UserModule.js";
import APIService from "../../services/APIService";

export const LOAD_BOOKS = 'book/loadBooks';
export const LOAD_BOOK = 'book/loadBook';
export const DELETE_BOOK = 'book/deletebooks';
export const ADD_BOOK = 'books/addBook'
export const GET_BOOK = 'books/getBook'
export const UPDATE_BOOK = 'books/updateBook'



const SET_BOOKS = 'books/setBooks';
const SET_BOOK = 'books/setBook';

export default {
    state: {
        books: [],
        currBook: null
    },
    getters: {
        currBook: state => {
            return state.currBook;
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
        [ADD_BOOK](state, { book }) {
            state.currBook = book;
        },
        [SET_BOOK](state, { book }) {
            state.currGoogleBook = BookService.createBookObj(book)
        },
        [UPDATE_BOOK](state, {book}) {
            state.currBook = book;
        },
    },

    actions: {
        [LOAD_BOOKS]({ commit, rootState }, { shelf }) {
            // if (rootState.user.loggedinUser) shelf = rootState.user.loggedinUser.uBooks
            console.log(shelf,'---------------')
            return APIService.getBooksShelf(shelf)
                .then(books => {
                    commit({ type: SET_BOOKS, books })

                })
                .catch(err => {
                    commit(SET_BOOKS, [])
                    this.$message.error(err)
                })
        },
        [ADD_BOOK]({ commit }, { bookToAdd }) {
            return BookService.saveBook(bookToAdd)
                .then(book => {
                    commit({
                        type: ADD_BOOK,
                        book: book.data
                    })
                })
        },
        [GET_BOOK]({ commit }, { googleBookId }) {
            return APIServicevice.getBookFromGoogle(googleBookId)
                .then(book => {
                    commit({
                        type: SET_BOOK,
                        book
                    })
                        .catch(err => this.$message.error(err))
                })

        },
        [UPDATE_BOOK]({ commit }, obj) {
            var { bookId, updatedBook } = obj;
            console.log(userId, updatedBook);
            commit({ type: UPDATE_BOOK, updatedBook })
        },
    }
}


