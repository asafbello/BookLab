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
        currGoogleBook: null
    },
    getters: {
        bookFromGoogle(context) {
            var { currGoogleBook } = context;
            return context.currGoogleBook
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
            state.books.push(book);
        },
        [SET_BOOK] (state, {book}) {
            console.log({book})
            state.currGoogleBook = BookService.setGoogleBook(book)
            //  {
            //     id: book.id,
            //     title: book.volumeInfo.title,
            //     pages: book.volumeInfo.pageCount,
            //     author: book.volumeInfo.authors[0],
            //     desc: book.volumeInfo.description,
            //     img: book.volumeInfo.imageLinks.medium
            // };
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
        [ADD_BOOK] ({commit}, {book}) {
            return BookService.saveBook(book)
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


