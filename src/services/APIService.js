const GOODREADS_KEY = 'FELO3TUoq67L0ebw62ErQ'
const GOOGLE_KEY = 'AIzaSyBZD7e18qKjBq3N_we3BoHEoYmMHlTAYtM'
const BOOK_URL = 'http://localhost:3003/data/book';
const GOOGLE_AUTH = '1004785258315-k04uc3m0oct08c9hevhconv1ptiafulc.apps.googleusercontent.com';
import axios from 'axios'


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
//         return axios.get(`https://www.googleapis.com/books/v1/volumes?printType=books&q=${query}`)
//         .then(res => res.data.items)
//         .catch(err => console.log(err))
// }

function searchBook(query, type) {
        return axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}`)
        .then(res => res.data.items)
        .catch(err => err)
}

initClient();

export default {
    searchBook
}