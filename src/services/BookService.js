<<<<<<< HEAD
import axios from 'axios'

=======
>>>>>>> master
const BOOK_URL = 'http://localhost:3003/data/book';

function emptyBook() {
   return {goodReadsKey: '', rate: 3, imgSrc: '', reviews:[]}
}

function getBooks() {
   console.log('getBooks');
   return axios
           .get(BOOK_URL)
           .then(res => {
            res.data
            console.log('data', res.data);
           })
           .catch(e => {
               console.log('No Books', e);
               throw e;
           });
}

function saveBook(book) {
   if (book._id) return axios.put(_getBookUrl(book._id), book)
   else return axios.post(BOOK_URL, book);  
}

function deleteBook(bookId) {
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
   getBookById,
   getBookFromGoogle
}




