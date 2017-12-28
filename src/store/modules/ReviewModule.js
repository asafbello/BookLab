import ReviewService from '../../services/ReviewService.js'

import { UPDATE_USER } from './UserModule.js'
import { UPDATE_BOOK } from './BookModule.js'

export const UPDATE_BOOK_AND_USER = 'review/updateBookAndUser'
export default {
    state: {
        reviews: []
    },
    getters: {

    },
    mutations: {
    },

    actions: {
        [UPDATE_BOOK_AND_USER]({ rootState, store }, { objToUpdateBook, objToUpdateUser }) {
            var userId = rootState.user.loggedinUser._id
            var bookId = rootState.book.currBook._id
            ReviewService.updateBookAndUser(objToUpdateBook, objToUpdateUser, userId, bookId)
                .then(res => {
                    // this.commit({ type: UPDATE_USER, user: res[0] })
                    console.log(res,'reesss');
                    // this.commit({ type: UPDATE_BOOK, book: res[1] })
                    saveToLocalStorage(res[0])
                    return res
                })
                .catch(err => { throw err })


        },
    }
}


var STORAGE_KEY = 'loggedinUser';

function saveToLocalStorage(user) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
}






