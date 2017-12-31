const GOODREADS_KEY = 'FELO3TUoq67L0ebw62ErQ'
const GOOGLE_KEY = 'AIzaSyBZD7e18qKjBq3N_we3BoHEoYmMHlTAYtM'
const GOOGLE_URL = 'http://localhost:3003/googleBook';

import axios from 'axios'
import BookService from './BookService.js'


//REAL FUNCTION FROM GOOGLE
// function searchBook(query, type) {
//         return axios.get(`https://www.googleapis.com/books/v1/volumes?printType=books&q=${query}`)
//         .then(res => res.data.items)
//         .catch(err => console.log(err))
// }

function getBookFromGoogle(foreingId) {
    return axios
    .get(`${GOOGLE_URL}/${foreingId}`)
        .then(res => {
<<<<<<< HEAD
            // console.log(res.data, 'assaf')    
=======
>>>>>>> master
            return res.data
        })
        .catch(err => err)
}

function searchBook(query, type) {
    var txt = {txt : query}
    return axios
    .post(`${GOOGLE_URL}`, txt)
        .then(res => res.data)
        .catch(err => err)
}

function getBooksShelf(shelf) {
<<<<<<< HEAD
        // console.log(shelf,'---------------')
=======
>>>>>>> master
        var prmBooks = shelf.map(id => {
            return getBookFromGoogle(id)
        });
        return Promise.all(prmBooks)
            .then(booksFromGoogle => {
                var books = booksFromGoogle.map(book => { return BookService.createBookObj(book)})
                return books
            })
            .catch(err => {
                // console.log(err,'err');
                return ('cant find shelf')
            })
    }


export default {
    getBookFromGoogle,
    searchBook,
    getBooksShelf
}