import axios from 'axios'
const BOOK_URL = 'http://localhost:3003/data/book';
const GET_BOOK_URL = 'http://localhost:3003/book';

const GOOGLE_KEY = 'AIzaSyDhqDAWyXzaOz6gMB-zROK-vB20FxC6Yak'

function emptyBook() {
    return { goodReadsKey: '', rate: 3, imgSrc: '', reviews: [] }
}

// function getBooksShelf(shelf) {
//     var prmBooks = shelf.map(id => {
//         return axios.get(`https://www.googleapis.com/books/v1/volumes/${id}`)
//         // return axios.get(`https://www.googleapis.com/books/v1/volumes/${id}&key=${GOOGLE_KEY}`)
//             .then(res => {
//                 return res.data
//             });
//     });
//     return Promise.all(prmBooks)
//         .then(booksFromGoogle => {
//             var books = booksFromGoogle.map(book => { return createBookObj(book)})
//             return books
//         })
//         .catch(err => {
//             console.log(err,'err');
//             return ('cant find shelf')
//         })
// }

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
    if (book._id) {
        return axios.put(_getBookUrl(book._id), book)
    }
    else {
        var newBook = createBookObj(book)
        return axios.post(BOOK_URL, newBook)
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

function getBookByForeignId(foreignId) {
    return axios
        .get(`${GET_BOOK_URL}/${foreignId}`)
        .then(res => {
            return res.data
        })
        .catch(err => {
            console.log(err);
            return 'cant find book'
        })
}

function _getBookUrl(bookId) {
    return `${BOOK_URL}/${bookId}`;
}

// function getBookFromGoogle(googleId) {
//     return axios.get(`https://www.googleapis.com/books/v1/volumes/${googleId}`)
//         .then(res => {
//             return res.data;
//         })
//         .catch(err => {
//             console.log(err);
//             return 'cant find book'
//         })
// }

function createBookObj(googleBook) {
    return {
        forigenId: googleBook.id,
        title: googleBook.volumeInfo.title,
        pages: googleBook.volumeInfo.pageCount || 0,
        author: googleBook.volumeInfo.authors[0] || '',
        desc: googleBook.volumeInfo.description || '',
        img: googleBook.volumeInfo.imageLinks.thumbnail || '',
        reviews: [],
        bookReaders:[]
    }
}


export default {
    getBooks,
    saveBook,
    createBookObj,
    getBookByForeignId
}




