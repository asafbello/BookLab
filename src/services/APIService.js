const GOODREADS_KEY = 'FELO3TUoq67L0ebw62ErQ'
const GOOGLE_KEY = 'AIzaSyBZD7e18qKjBq3N_we3BoHEoYmMHlTAYtM'
let GOOGLE_URL = 'http://localhost:3003/googleBook';

if (process.env.NODE_ENV !== 'development'){
    GOOGLE_URL = '/googleBook'
}

import axios from 'axios'
import BookService from './BookService.js'


//REAL FUNCTION FROM GOOGLE
// function searchBook(query, type) {
//         return axios.get(`https://www.googleapis.com/books/v1/volumes?printType=books&q=${query}`)
//         .then(res => res.data.items)
//         .catch(err => console.log(err))
// }

function getSalesInfo(googleId) {
    const SALE_URL = 'https://www.googleapis.com/books/v1/volumes';

    return axios
    .get(`${SALE_URL}/${googleId}`)
        .then(res => {
            console.log(res.data.saleInfo.buyLink);
            return res.data.saleInfo.buyLink;
        })
        .catch(err => {
            console.error(err);
            err;
        });
}

function getBookFromGoogle(foreingId) {
    return axios
    .get(`${GOOGLE_URL}/${foreingId}`)
        .then(res => {
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

    function getVideo(value) {
        const UTUBE_APIKEY = 'AIzaSyDNttVkEbv8xDcN4LltfPgMAWIbWdcONZU';
        return axios
        .get(`https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=${UTUBE_APIKEY}&q=${value}`)
        .then(function (res) {
            console.log(res, value);
            return res.data.items[0].id.videoId;
        })
    }


export default {
    getBookFromGoogle,
    searchBook,
    getBooksShelf,
    getVideo,
    getSalesInfo
}