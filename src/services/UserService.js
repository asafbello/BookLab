
import axios from 'axios'


const URL = 'http://localhost:3003'

function signup(userDetails) {
    return axios.post(`${URL}/data/user`, userDetails)
        .then(_ => {
            console.log('userDetails', userDetails);
            return login(userDetails)
        })
        .catch(err => err)
}

function login(userCreds) {
    return axios.post(`${URL}/login`, userCreds)
        .then(({ data }) => {
            return data
        })
}

function logout() {
    return axios.get(`${URL}/logout`)
}

function deleteUser(userId) {
    logout()
    // console.log('assaf', userId);
    return axios.delete(`${URL}/data/user/${userId}`)
}

// function toggleLike(userId, carId) {
//    return axios.post(`${URL}/data/${userId}/liked/${carId}`)
//         // .then(({ data }) => data)
// }

export default {
    signup,
    login,
    logout,
    deleteUser
    // toggleLike,
} 