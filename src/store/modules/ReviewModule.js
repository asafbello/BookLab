import ReviewService from '../../services/ReviewService.js'
import { UPDATE_USER, ADD_REVIEW_USER } from './UserModule.js'
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
        [UPDATE_BOOK_AND_USER]({ commit, rootState, store }, {reviewUser ,reviewBook }) {
            var userId = rootState.user.loggedinUser._id
            var bookId = rootState.book.currBook._id
<<<<<<< HEAD
            ReviewService.updateBookAndUser(payload.objToUpdateBook, payload.objToUpdateUser, userId, bookId)
                .then(res => {
                    console.log("yeaaaaaaaa", rootState)
                    commit({ type: UPDATE_USER, user: res[1] })
                    // commit({ type: UPDATE_BOOK, book: res[0] })
                    saveToLocalStorage(res[1])
                    console.log(payload.objToUpdateUser, ' res updated')
                    return res
                })
                .catch(err => { throw err })
=======
            ReviewService
                .updateBookAndUser(reviewBook, reviewUser, userId, bookId)
                    .then(res => {
                        commit({ type: ADD_REVIEW_USER, reviewUser })
                        commit({ type: UPDATE_BOOK, book: res[0] })
                        saveToLocalStorage(rootState.user.loggedinUser)
                        return res
                    })
                    .catch(err => { throw err })
>>>>>>> master
            }
    
    }
}


var STORAGE_KEY = 'loggedinUser';

function saveToLocalStorage(user) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
}






