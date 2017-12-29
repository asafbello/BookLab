import UserService from "../../services/UserService.js";
// import { TOGGLE_LIKED_BY_USER } from "./CarModule.js";


export const SIGNUP = 'user/signup';
export const SIGNIN = 'user/signin';
export const SET_USER = 'user/setUser';
export const SIGNOUT = 'user/signout';
export const DELETE_USER = 'user/deleteUser';
export const UPDATE_USER = 'user/editUser';
export const ADD_BOOK_SHELF = 'user/addBookShelf';

const STORAGE_KEY = 'loggedinUser';

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
        [SET_USER](state,  {user} ) {
            state.loggedinUser = user;
        },
        [SIGNOUT](state) {
            state.loggedinUser = null;
        },
        [UPDATE_USER](state, {user}) {
            state.loggedinUser = user;
        },
    },
    actions: {
        [UPDATE_USER]({commit}, {userId, updatedUser} )  {
            console.log('nooo action');
            return UserService.editUser(userId, updatedUser)
                .then(user => {
                        commit({type: UPDATE_USER, user})
                        saveToLocalStorage(user)
                })
        },
        [SIGNUP]({ commit }, { signupDetails }) {
            UserService
                .signup(signupDetails)
                .then(res => {
                    commit({ type: SET_USER, user: res.data.user })
                    saveToLocalStorage(res.data.user)
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
                    console.log(res)
                    commit({ type: SET_USER, user: res.data.user });
                    saveToLocalStorage(res.data.user)
                })
                .catch(err => {
                    console.log('errrorr')
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
