import axios from 'axios';
let REVIEW_URL = 'http://localhost:3003/review';
let REVIEW_COL_URL ='http://localhost:3003/data/review'
if (process.env.NODE_ENV !== 'development'){
    REVIEW_URL = ''
    REVIEW_COL_URL = '/data/review'
}

function updateBookAndUser(objToUpdateBook,objToUpdateUser,userId,bookId){
    //!!!!!// objToUpdateBook goes to REVIEW colletion as well//!!!!!!
    var prm1 = axios.put(`${REVIEW_URL}/${bookId}/book`, objToUpdateBook)
        .then(res =>res.data.value)
        .catch(err => console.log(err))

    var prm2 = axios.put(`${REVIEW_URL}/${userId}/user`,objToUpdateUser)
        .then(res =>res.data.value)
        .catch(err => console.log(err))

        return Promise.all([prm1,prm2])
                .then(fullRes => {
                    _saveReview(objToUpdateBook)
                    return fullRes})
                .catch(erroring =>console.log(erroring,'error'))
}

function _saveReview(reviewObj) {
    axios.post(REVIEW_COL_URL,reviewObj)
        .then(res =>console.log(res))
        .catch(err => console.log(err))
}

function getReviews() {
    const reviewAmount = 30
    return axios
        .get(REVIEW_COL_URL)
        .then(res =>{
            if (res.data.length >reviewAmount) return res.data.splice(0,reviewAmount)
            return res.data
        })
        .catch(e => {
            throw e;
        });
}


export default{
    updateBookAndUser,
    getReviews
}

console.log('test log for gittt');
