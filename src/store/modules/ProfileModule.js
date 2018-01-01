import UserService from "../../services/UserService.js";
import LocalService from '../../services/StorageService.js'

export const LOAD_PROFILES = 'profile/loadProfiles';

const SET_PROFILES = 'profile/setProfiles'

export default {
    state: {
        currProfiles: null
    },
    getters:{
            profilesToDisplay: state => {
                return state.currProfiles;
            }
    },
    mutations: {
        [SET_PROFILES](state, { profiles }) {
            console.log('profiles', profiles);
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
