import UserService from "../../services/UserService.js";
import LocalService from '../../services/StorageService.js'

export const LOAD_PROFILES = 'profile/loadProfiles';
export const LOAD_PROFILES_FROM_BOOK = 'profile/loadProfilesFromBook';
export const GET_PROFILE = 'profile/getUser'
export const SET_PROFILES = 'profile/setProfiles'
export const REMOVE_FROM_WISH_LIST = 'profile/removeFromWishList'
export const REMOVE_FROM_READ_LIST = 'profile/removeFromReadList'

const SET_PROFILE = 'profile/setProfile';

const STORAGE_KEY = 'loggedinUser';

export default {
    state: {
        currProfiles: null,
        currProfile: null
    },
    getters:{
            profilesToDisplay: state => {
                return state.currProfiles;
            },
    },
    mutations: {
        [SET_PROFILES](state, { profiles }) {
            state.currProfiles = profiles;
        },
        [SET_PROFILE](state, { profile }) {
            state.currProfile = profile;
        },
        [REMOVE_FROM_WISH_LIST](state, {bookId}) {
            var newList = state.currProfile.wishList.filter(book => book._id !== bookId )
            state.currProfile.wishList = newList
            LocalService.save(STORAGE_KEY, state.currProfile)
        },
        [REMOVE_FROM_READ_LIST](state, {bookId}) {
            var newList = state.currProfile.readList.filter(book => book._id !== bookId )
            state.currProfile.readList = newList
            LocalService.save(STORAGE_KEY, state.currProfile)
        }
    },
    actions: {
        [LOAD_PROFILES]({ commit, state }) {
            return UserService.getUsers()
                .then(profiles => {
                    commit({ type: SET_PROFILES, profiles })
                })
        },
        [GET_PROFILE]({ commit }, id) {
            return UserService
                .getUserById(id)
                .then(profile => {
                    commit({
                        type: SET_PROFILE,
                        profile
                    })
                
                })
                    .catch(err => {
                        throw err})
        }, 
        
        [REMOVE_FROM_WISH_LIST] ({commit}, {id,  bookId}) {
            UserService
                .removeFromWishList(id,  bookId) 
                .then(user => {
                    commit({ type: REMOVE_FROM_WISH_LIST, bookId })
                })
        },

        [REMOVE_FROM_READ_LIST] ({commit}, {id,  bookId}) {
            UserService
                .removeFromReadList(id,  bookId) 
                .then(user => {
                    commit({ type: REMOVE_FROM_READ_LIST,  bookId })
                })
        },
    }   
}
