import BookService from "../../services/BookService.js";
import _ from 'lodash'
import { UPDATE_USER } from "./UserModule.js";

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
        currentBook({currBook}) {
            return _.cloneDeep(currBook);
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
            state.currBook = book;
        },
        [SET_BOOK] (state, {book}) {
            state.currGoogleBook = BookService.createBookObj(book)
        }
    },

    actions: {
        [LOAD_BOOKS]({ commit, rootState }, { shelf }) {
            if (rootState.user.loggedinUser) shelf = rootState.user.loggedinUser.uBooks
            return BookService.getBooksShelf(shelf)
                .then(books => {
                    commit({ type: SET_BOOKS, books })

                })
                .catch(err => {
                    commit(SET_BOOKS, [])
                    this.$message.error(err)
                })
        },
        [ADD_BOOK] ({commit}, {bookToAdd}) {
            return BookService.saveBook(bookToAdd)
                .then(book => {
                    commit({
                        type: ADD_BOOK, 
                        book: book.data
                    })
                })
        },
        [GET_BOOK]({ commit }, { googleBookId }) {
            return BookService.getBookFromGoogle(googleBookId)
                .then(book => {
                    commit({
                        type: SET_BOOK,
                        book
                    })
                    .catch(err =>  this.$message.error(err))
                })

        },
<<<<<<< HEAD
        [UPDATE_BOOK_AND_USER](context, {updatedBook, updatedUser}) {
           return context
            .dispatch({
              type: UPDATE_BOOK,
              updatedBook
            })
            .then(() => {
                context.dispatch({
                type: UPDATE_USER,
                userId: updatedUser._id,
                updatedUser
              });
            });
        },
        [UPDATE_BOOK]({commit}, {updatedBook}) {
            return BookService.saveBook(updatedBook)
=======
        [UPDATE_BOOK]({commit}, {bookId, objToUpdateBook}) {
            return BookService.updateBook(bookId, objToUpdateBook)
>>>>>>> master
            .then(res => {
                commit({
                    type: ADD_BOOK, 
                    book: res.data
                })
            })
        },
    }
}


