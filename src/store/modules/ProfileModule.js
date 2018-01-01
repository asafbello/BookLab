import UserService from "../../services/UserService.js";
import LocalService from '../../services/StorageService.js'

export const LOAD_PROFILES = 'profile/loadProfiles';
export const LOAD_PROFILES_FROM_BOOK = 'profile/loadProfilesFromBook';

export const SET_PROFILES = 'profile/setProfiles'

export default {
    state: {
        currProfiles: null
    },
    getters:{
            profilesToDisplay: state => {
                return state.currProfiles;
            },
    },
    mutations: {
        [SET_PROFILES](state, { profiles }) {
            console.log('profiles in moudle', profiles);
            state.currProfiles = profiles;
        },
    },
    actions: {
        [LOAD_PROFILES]({ commit, state }) {
            return UserService.getUsers()
                .then(profiles => {
                    commit({ type: SET_PROFILES, profiles })
                })
        },
    }   
}
