import UserService from "../../services/UserService.js";
// import { TOGGLE_LIKED_BY_USER } from "./CarModule.js";


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

const STORAGE_KEY = 'loggedinUser';

export default {
    state: {
        loggedinUser: getUserFromStorage(),
        currProfile: null
    },
    getters: {
        isUser(state) {
            return !!state.loggedinUser
        },
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
        },
        [SET_PROFILE](state, { profile }) {
            state.currProfile = profile;
        }
    },
    actions: {
        [UPDATE_USER]({ commit, state }, { userId, updatedUser }) {
            return UserService.editUser(userId, updatedUser)
                .then(user => {
                    commit({ type: UPDATE_USER, user })
                    saveToLocalStorage(this.state.loggedinUser)
                })
        },
        [SIGNUP]({ commit }, { signupDetails }) {
            return UserService
                .signup(signupDetails)
                .then(res => {
                    console.log('ressss', res);
                    commit({ type: SET_USER, user: res })
                    saveToLocalStorage(res)
                })
                .catch(err => {
                    console.log(err)
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
                    console.log('secseus', res)
                    commit({ type: SET_USER, user: res.user });
                    saveToLocalStorage(res.user)
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
                    saveToLocalStorage(null);
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
        }
    }
}


function getUserFromStorage() {
    var loggedinUser = JSON.parse(localStorage.getItem(STORAGE_KEY)) || null;
    return loggedinUser;
    return
}



function saveToLocalStorage(user) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
}
