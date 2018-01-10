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
export const ADD_REVIEW_BOOK = 'books/addReviewBook'



const SET_BOOKS = 'books/setBooks';
const SET_BOOK = 'books/setBook';

export default {
    state: {
        books: [],
        currBook: null
    },
    getters: {
        currBook: context => {
            return context.currBook;
        },
        booksToDisplay(context) {
            var  {books}  = context
            return books
        },
        bookRate: context => {
            if(!context.currBook) return 0;
            if (context.currBook.reviews.length === 0) return 0;
            var avgRate = context.currBook.reviews.reduce((accu, review) => {
                return accu + review.review.rate;
            }, 0)/ context.currBook.reviews.length
            return +avgRate.toFixed(2);
        }
    },
    mutations: {
        [SET_BOOKS](state, { books }) {
            var booksByReviews = books.sort((a,b) =>{
                if (a.reviews.length < b.reviews.length)
                return 1
              if (a.reviews.length > b.reviews.length)
                return -1;
            })
            state.books = booksByReviews;
        },
        [ADD_BOOK](state, { book }) {
            state.currBook = book;
        },
        // [SET_BOOK](state, { book }) {
        //     state.currGoogleBook = BookService.createBookObj(book)
        // },
        [UPDATE_BOOK](state, {book}) {
            state.currBook = book;
        },
        [ADD_REVIEW_BOOK](state, {reviewBook}){
            state.currBook.reviews.push(reviewBook)
        }
    },

    actions: {
        [LOAD_BOOKS]({ commit, rootState }, { shelf }) {
            // if (rootState.user.loggedinUser) shelf = rootState.user.loggedinUser.uBooks
            return BookService.getBooks()
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
                commit({ type: SET_PROFILES, profiles })
        },
        [UPDATE_BOOK]({ commit }, obj) {
            var { bookId, updatedBook } = obj;
            commit({ type: UPDATE_BOOK, updatedBook })
        },
    }
}


