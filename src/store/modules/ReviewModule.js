import ReviewService from '../../services/ReviewService.js'

export const UPDATE_BOOK_AND_USER = 'review/updateBookAndUser'
export default {
    state: {
        reviews:[]
    },
    getters: {

    },
    mutations: {
    },

    actions: {
        [UPDATE_BOOK_AND_USER]({rootState, commit}, {objToUpdateBook, objToUpdateUser}) {
            var userId = rootState.user.loggedinUser._id
            var bookId = rootState.book.currBook._id
           ReviewService.updateBookAndUser(objToUpdateBook,objToUpdateUser,userId,bookId)
           .then(res =>{
               //go to commit
            return res
            })
           .catch(err => err)
         },
        }
}






