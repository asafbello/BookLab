const GOODREADS_KEY = 'FELO3TUoq67L0ebw62ErQ'
const GOOGLE_KEY = 'AIzaSyDiC5WY7xGnKy_GL6hezF3Tp8PHpbOxkGs'
const BOOK_URL = 'http://localhost:3003/data/book';
import axios from 'axios'
import { resolve } from 'path';
import { log } from 'util';

// function searchBook(query, type) {
//     console.log(query, type);
//     return axios
//             .get(`https://www.goodreads.com/search/index.xml?key=${GOODREADS_KEY}=${query}`)
//             .then(res => res.data)
//             .catch(e => {
//                 console.log('No search', e);
//                 // throw e;
//             });
// }
function searchBook(query, type) {
        return axios.get(`https://www.googleapis.com/books/v1/volumes?printType=books&q=${query}`)
        .then(res => res.data.items)
        .catch(err => console.log(err))
}


export default {
    searchBook
}