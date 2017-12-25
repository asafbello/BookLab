const GOODREADS_KEY = 'FELO3TUoq67L0ebw62ErQ'
const GOOGLE_KEY = 'AIzaSyDiC5WY7xGnKy_GL6hezF3Tp8PHpbOxkGs'
const BOOK_URL = 'http://localhost:3003/data/book';
import axios from 'axios'
import { resolve } from 'path';

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
    var options = {
        // key: GOOGLE_KEY,
        field: type,
        offset: 0,
        limit: 10,
        type: 'books',
        order: 'relevance',
        lang: 'en'
    };
    return new Promise((resolve, reject) => {
    googleBooks.search(query,options, function(error, results,apiResponse) {
        if ( ! error ) {
            console.log(results,apiResponse);
            return resolve(results)
        } else {
            return reject(error)
        }
    })
})
}


export default {
    searchBook
}