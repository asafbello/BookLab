const BOOK_URL = 'http://localhost:3003/data/book';
import axios from 'axios'

function emptyBook() {
    return {goodReadsKey: '', rate: 3, imgSrc: '', reviews:[]}
}

function getBooks() {
    return axios
            .get(BOOK_URL)
            .then(res => res.data)
            .catch(e => {
                console.log('No Books', e);
                throw e;
            });
}

function saveBook(book) {
    if (book._id) return axios.put(_getBookUrl(book._id), book)
    else return axios.post(BOOK_URL, book);  
}

function deleteBookK(bookId) {
    return axios.delete(_getBookUrl(bookId))
}


function getBookById(bookId) {
    return axios
    .get(_getBookUrl(bookId))
    .then(res => res.data)
}


function _getBookUrl(bookId) {
    return `${BOOK_URL}/${bookId}`;
}


export default {
    getBooks
}