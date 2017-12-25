import UserService from "../../services/UserService.js";
// import { TOGGLE_LIKED_BY_USER } from "./CarModule.js";


export const SIGNUP = 'user/signup';
export const SIGNIN = 'user/signin';
export const SET_USER = 'user/setUser';
export const SIGNOUT = 'user/signout';
<<<<<<< HEAD
export const DELETE_USER = 'user/deleteUser';
// export const TOGGLE_LIKE = 'user/toggleLike';
=======
export const ADD_BOOK_SHELF = 'user/addBookShelf';

>>>>>>> master


var STORAGE_KEY = 'loggedinUser';

export default {
    state: {
        loggedinUser: getUserFromStorage()
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
        // [UPDATE_USER](state) {
        //     state.loggedinUser = null;
        // },
    },
    actions: {
        [SIGNUP]({ commit }, { signupDetails }) {
            UserService
                .signup(signupDetails)
                .then(res => {
                    commit({ type: SET_USER, user: res.user })
                    saveToLocalStorage(res.user)
                })
                .catch(err => {
                    console.log(err)
                    throw err;
                });
        },
        [DELETE_USER]({commit}, {userId}) {
            return UserService.deleteUser(userId)
                .then(_ => {
                        commit({type: SIGNOUT, userId})
                })
        },
        [SIGNIN]({ commit }, { signinDetails }) {
            UserService
                .login(signinDetails)
                .then(res => {
                    commit({ type: SET_USER, user: res.user });
                    saveToLocalStorage(res.user)
                })
                .catch(err => {
                    console.log(err)
                    throw err;
                });
        },
        [SIGNOUT]({ commit }) {
            UserService
                .logout()
                .then(_ => {
                    commit({ type: SIGNOUT })
                    saveToLocalStorage(null);
                })
        },
        // [UPDATE_USER]({ commit, state }, { googleId }) {
        //     UserService
        //         .addBookShelf(state.loggedinUser._id, googleId)
        //         .then(_ => {
        //             commit({type: UPDATE_USER, googleId})
        //             saveToLocalStorage(state.loggedinUser)
        //         })
        // }
    }
}



function getUserFromStorage() {
    var loggedinUser = JSON.parse(localStorage.getItem(STORAGE_KEY)) || null;
    console.log('GETTING FROM STORAGE', loggedinUser);
    return loggedinUser;
}

function saveToLocalStorage(user) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
}
