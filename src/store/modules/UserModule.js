import UserService from "../../services/UserService.js";
import LocalService from '../../services/StorageService.js'

export const SIGNUP = 'user/signup';
export const SIGNIN = 'user/signin';
export const SET_USER = 'user/setUser';
export const SET_PROFILE = 'user/setProfile';
export const SIGNOUT = 'user/signout';
export const DELETE_USER = 'user/deleteUser';
export const UPDATE_USER = 'user/editUser';
export const ADD_BOOK_SHELF = 'user/addBookShelf';
export const ADD_REVIEW_USER = 'user/addReviewUser'
export const GET_USER = 'user/getUser'
export const ADD_TO_WISH_LIST = 'user/addToWishList'
export const ADD_TO_READ_LIST = 'user/addToReadList'
export const UPDATE_USER_WISH_LIST = 'user/addToWishList'
export const SET_CURR_READING = 'user/currentlyReading'


const STORAGE_KEY = 'loggedinUser';

export default {
    state: {
        loggedinUser:  LocalService.load(STORAGE_KEY),
        currProfile: null
    },
    getters: {
        isUser(state) {
            return !!state.loggedinUser
        },
        loggedInUser(state) {
            return state.loggedInUser;
        }
        //     isAdmin(state) {
        //         return state.loggedinUser && state.loggedinUser.isAdmin
        //     }
    },
    mutations: {
        [SET_USER](state, { user }) {
            state.loggedinUser = user;
        },
        [SIGNOUT](state) {
            state.loggedinUser = null;
        },
        [UPDATE_USER](state, { user }) {
            state.loggedinUser = user;
        },
        [ADD_REVIEW_USER](state, { reviewUser }) {
            state.loggedinUser.reviews.push(reviewUser)
            state.loggedinUser.readList.push(reviewUser)
        },
        [SET_PROFILE](state, { profile }) {
            state.currProfile = profile;
        },
        // [UPDATE_USER_WISH_LIST](state, {book}) {
        //     state.loggedInUser.wishList.push(book)
        // }
    },
    actions: {
        [UPDATE_USER]({ commit, state }, { userId, updatedUser }) {
            return UserService.editUser(userId, updatedUser)
                .then(user => {
                    commit({ type: UPDATE_USER, user })
                    LocalService.save(STORAGE_KEY,this.state.loggedinUser)
                })
        },
        [SIGNUP]({ commit }, { signupDetails }) {
            return UserService
                .signup(signupDetails)
                .then(res => {
                    commit({ type: SET_USER, user: res })
                    LocalService.save(STORAGE_KEY,res)
                })
                .catch(err => {
                    throw err;
                });
        },
        [DELETE_USER]({ commit }, { userId }) {
            return UserService.deleteUser(userId)
                .then(_ => {
                    commit({ type: SIGNOUT, userId })
                    //ADD COMMIT TO REMOVE CURRENT BOOK
                })
        },
        [SIGNIN]({ commit }, { signinDetails }) {
            return UserService
                .login(signinDetails)
                .then(res => {
                    commit({ type: SET_USER, user: res.user });
                    LocalService.save(STORAGE_KEY,res.user)
                })
                .catch(err => {
                    throw 'error'
                })
        },
        [SIGNOUT]({ commit }) {
            UserService
                .logout()
                .then(_ => {
                    commit({ type: SIGNOUT })
                    LocalService.save(STORAGE_KEY,null)
                })
        },
        [GET_USER]({ commit }, id) {
            return UserService
                .getUserById(id)
                .then(profile => {
                    commit({
                        type: SET_PROFILE,
                        profile
                    })
                })
        }, 
        [ADD_TO_WISH_LIST] ({commit}, {id, book}) {
            UserService
                .addToWishList(id, book)
                .then(user => {
                // commit({ type: UPDATE_USER_WISH_LIST, user })
                // saveToLocalStorage(this.state.loggedinUser)
                })
        },
        [ADD_TO_READ_LIST] ({commit}, {id, book}) {
            UserService
                .addToReadList(id, book) 
                .then(user => {
                // commit({ type: UPDATE_USER_WISH_LIST, user })
                // saveToLocalStorage(this.state.loggedinUser)
                })
        },

        [SET_CURR_READING] ({commit}, {id, book}) {
            UserService
                .setCurrentlyReading(id, book) 
                .then(user => {
                    console.log('cuu reading');
                })
        },
        
    }
} 


