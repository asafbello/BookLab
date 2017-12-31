
import axios from 'axios'


const URL = 'http://localhost:3003'

function signup(userDetails) {
    return axios.post(`${URL}/data/user`, userDetails)
        .then(_ => {
            return login(userDetails)
        })
        .catch(err => err)
}

function login(userCreds) {
    return axios.post(`${URL}/login`, userCreds)
        .then((data) => {
            console.log(data, 'resolve')
            return data
        })
        .catch(err => {
            console.log({err})
        })
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
    }).then(res => res.data.url)
        .catch(err => {
            this.$message.error("Oops, Cant get your Avatar");
            console.log(err)
        })
}
export default {
    signup,
    login,
    logout,
    deleteUser,
    editUser,
    uploadImage
} 