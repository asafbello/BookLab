const GOODREADS_KEY = 'FELO3TUoq67L0ebw62ErQ'
const GOOGLE_KEY = 'AIzaSyBZD7e18qKjBq3N_we3BoHEoYmMHlTAYtM'
const BOOK_URL = 'http://localhost:3003/data/book';
import axios from 'axios'


// function searchBook(query, type) {
//         return axios.get(`https://www.googleapis.com/books/v1/volumes?printType=books&q=${query}`)
//         .then(res => res.data.items)
//         .catch(err => console.log(err))
// }

function searchBook(query, type) {
        return axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}`)
        .then(res => res.data.items)
        .catch(err => err)
}


export default {
    searchBook
}