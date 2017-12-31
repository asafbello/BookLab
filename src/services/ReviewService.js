import axios from 'axios';
const REVIEW_URL = 'http://localhost:3003/review';

function updateBookAndUser(objToUpdateBook,objToUpdateUser,userId,bookId){
    console.log(objToUpdateBook,objToUpdateUser,userId,bookId)
    var prm1 = axios.put(`${REVIEW_URL}/${bookId}/book`, objToUpdateBook)
        .then(res =>res.data.value)
        .catch(err => console.log(err))

    var prm2 = axios.put(`${REVIEW_URL}/${userId}/user`,objToUpdateUser)
        .then(res =>res.data.value)
        .catch(err => console.log(err))
        return Promise.all([prm1,prm2])
                .then(fullRes => fullRes)
                .catch(erroring =>console.log(erroring,'error'))
}

export default{
    updateBookAndUser
}
