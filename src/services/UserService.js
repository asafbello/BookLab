
import axios from 'axios'
import { resolve } from 'url';


let URL = 'http://localhost:3003'
if (process.env.NODE_ENV !== 'development'){
    URL = ''
}
    
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
        return res.data
    })
    .catch(err =>{throw err})
    
}

function getUsers() {
    return axios
    .get((`${URL}/data/user`))
    .then(res => {
        if (res.data.length > 10) return res.data.splice(0,10)
        return res.data
    })
    .catch(err =>{throw err})
}

function addToWishList(userId, book) {
    return axios.put(`${URL}/wishList`, {userId, book} )
        .then(res => {
            console.log(res)
            return res.data
        })
    
} 

function addToReadList(userId, book) {
    return axios.put(`${URL}/readList`, {userId, book} )
        .then(res => {
            return res.data
        })
}

function removeFromWishList(userId, bookId) {
    return axios.put(`${URL}/removeFromWishList`, {userId, bookId})
        .then(res => {
            return res.data;
        }).catch(err => {
            throw err
        });
}

function removeFromReadList(userId, bookId) {
    return axios.put(`${URL}/removeFromReadList`, {userId, bookId} )
        .then(res => {
            console.log('res: ', res);
            return res.data;
        }).catch(err => {
            throw err
        });
}

function setCurrentlyReading(userId, book) {
    return axios.put(`${URL}/currentlyReading`, {userId, book} )
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
        console.log(res.data.url);
        return res.data.url
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
    addToWishList,
    addToReadList,
    setCurrentlyReading,
    getUsers,
    removeFromWishList,
    removeFromReadList
} 