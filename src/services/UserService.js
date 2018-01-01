
import axios from 'axios'


const URL = 'http://localhost:3003'

function signup(userDetails) {
    return axios.post(`${URL}/data/user`, userDetails)
        .then(res => {
            return res.data
        })
        .catch(err => { throw err })
}

function getUserById(id) { 
    return axios
    .get((`${URL}/data/user/${id.id}`))
    .then(res => {
        console.log({id})
        return res.data
    })
    
}

function addToWishList(userId, book) {
    return axios.put(`${URL}/wishList`, {userId, book} )
        .then(res => {
            return res.data
        })
    
}

function login(userCreds) {
    return axios.post(`${URL}/login`, userCreds)
        .then((res) => {
            return res.data
        })
        .catch(err => {throw err})
}

function logout() {
    return axios.get(`${URL}/logout`)
}

function deleteUser(userId) {
    return axios.delete(`${URL}/data/user/${userId}`)
}

function editUser(userId, updatedUser) {
    return axios.put(`${URL}/data/user/${userId}`, updatedUser).then(res => {
        return res.data;
    })

}

function uploadImage(file) {
    const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/diowvie2f/image/upload'
    const CLOUDINARY_PRESET = 'qvpbsmfe';
    console.log('userservice');
    // fileUpload.addEventListener('change', function (event) {
    var file = event.target.files[0]
    var formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', CLOUDINARY_PRESET)
    // })
    return axios({
        url: CLOUDINARY_URL,
        method: 'POST',
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        },
        data: formData
    }).then(res => {
        console.log(res);
        res.data.url
    })

}
export default {
    signup,
    login,
    logout,
    deleteUser,
    editUser,
    uploadImage,
    getUserById,
    addToWishList
} 