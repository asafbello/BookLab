const GOODREADS_KEY = 'FELO3TUoq67L0ebw62ErQ'
const GOOGLE_KEY = 'AIzaSyDiC5WY7xGnKy_GL6hezF3Tp8PHpbOxkGs'
const BOOK_URL = 'http://localhost:3003/data/book';
const GOOGLE_AUTH = '1004785258315-k04uc3m0oct08c9hevhconv1ptiafulc.apps.googleusercontent.com';
import axios from 'axios'
import { resolve } from 'path';
import { log } from 'util';

var GoogleAuth; // Google Auth object.
function initClient() {
  gapi.client.init({
      'apiKey': GOOGLE_KEY,
      'clientId': GOOGLE_AUTH,
      'scope': 'https://www.googleapis.com/auth/drive.metadata.readonly',
      'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest']
  }).then(function () {
      GoogleAuth = gapi.auth2.getAuthInstance();

      // Listen for sign-in state changes.
      GoogleAuth.isSignedIn.listen(updateSigninStatus);
  });
}

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

initClient();

export default {
    searchBook
}