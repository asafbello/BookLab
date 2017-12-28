import axios from 'axios'

const BOOK_URL = 'http://localhost:3003/data/book';
const GET_BOOK_URL = 'http://localhost:3003/book'

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
        .then(booksFromGoogle => {
            var books = booksFromGoogle.map(book => { return createBookObj(book)})
            return books
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
            console.log(res);
            return res.data
        })
        .catch(err => {
            console.log(err);
        })
}

function _getBookUrl(bookId) {
    return `${BOOK_URL}/${bookId}`;
}

function getBookFromGoogle(googleKey) {
    return axios.get(`https://www.googleapis.com/books/v1/volumes/${googleKey}`)
        .then(res => {
            return res.data;
        });
}

function createBookObj(googleBook) {
    return {
        forigenId: googleBook.id,
        title: googleBook.volumeInfo.title,
        pages: googleBook.volumeInfo.pageCount,
        author: googleBook.volumeInfo.authors[0],
        desc: googleBook.volumeInfo.description,
        img: googleBook.volumeInfo.imageLinks.medium,
        reviews: [],
        bookReaders:[]
    }
}


export default {
    getBooks,
    getBooksShelf,
    getBookFromGoogle,
    saveBook,
    createBookObj,
    getBookByForeignId
}




