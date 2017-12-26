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
    console.log({book});
    if (book._id)
    {
        console.log('inside savebook');
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

function createBookObj(googleBook) {
    return {
        id: googleBook.id,
        title: googleBook.volumeInfo.title,
        pages: googleBook.volumeInfo.pageCount,
        author: googleBook.volumeInfo.authors[0],
        desc: googleBook.volumeInfo.description,
        img: googleBook.volumeInfo.imageLinks.medium,
        rate: null
    }
}


export default {
    getBooks,
    getBooksShelf,
    getBookFromGoogle,
    saveBook,
    createBookObj
}




