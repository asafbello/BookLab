import axios from 'axios'

const BOOK_URL = 'http://localhost:3003/data/book';

function emptyBook() {
    return { goodReadsKey: '', rate: 3, imgSrc: '', reviews: [] }
}

function getBooksShelf(shelf) {
    var prmBooks = shelf.map(id => {
        return axios.get(`https://www.googleapis.com/books/v1/volumes/${id}`)
            .then(res => {
                return res.data
            });
    });
    return Promise.all(prmBooks)
        .then(values => {
            console.log('values', values);
            return values
        })
        .catch(err => console.log(err, 'cant find shelf'))
}
function getBooks() {
    return axios
        .get(BOOK_URL, shelf)
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
// function addBook(bookId) {
//     var book = getBookFromGoogle(bookId)
//   return axios
//             .put(book)

// }

function setBook(bookFromGoogle) {
    return {
        googleBookId: bookFromGoogle.id,
        title: bookFromGoogle.volumeInfo.title,
        pages: bookFromGoogle.volumeInfo.pageCount,
        author: bookFromGoogle.volumeInfo.authors[0],
        desc: bookFromGoogle.volumeInfo.description,
        img: bookFromGoogle.volumeInfo.imageLinks.medium
    }
}

function deleteBooK(bookId) {
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

function getBookFromGoogle(googleKey) {
    return axios.get(`https://www.googleapis.com/books/v1/volumes/${googleKey}`)
        .then(res => {
            console.log(res.data);
            return res.data;
        });
}


export default {
    getBooks,
    getBooksShelf,
    getBookFromGoogle
}




