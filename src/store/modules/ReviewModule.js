import ReviewService from '../../services/ReviewService.js'
import { UPDATE_USER, ADD_REVIEW_USER } from './UserModule.js'
import { UPDATE_BOOK, ADD_REVIEW_BOOK } from './BookModule.js'
import LocalService from '../../services/StorageService.js'

const STORAGE_KEY = 'loggedinUser';

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
            ReviewService
                .updateBookAndUser(reviewBook, reviewUser, userId, bookId)
                    .then(res => {
                        commit({ type: ADD_REVIEW_USER, reviewUser })
                        commit({ type: ADD_REVIEW_BOOK, reviewBook })
                        LocalService.save(STORAGE_KEY,rootState.user.loggedinUser)
                        return res
                    })
                    .catch(err => { throw err })
            }
    
    }
}










