const BOOK_URL = 'http://localhost:8080/data/book';
var id = 1

var books = [
    {
        _id: id++,
        goodReadsKey: '',
        rate: 'Great',
        desc: 'Lorem ipsum bla bla bla bla bla bla bla bla bla',
        imgSrc: ''
    },
    {
        _id: id++,
        goodReadsKey: '',
        rate: 'Great',
        desc: 'Lorem ipsum bla bla bla bla bla bla bla bla bla',
        imgSrc: ''
    },
    {
        _id: id++,
        goodReadsKey: '',
        rate: 'Great',
        desc: 'Lorem ipsum bla bla bla bla bla bla bla bla bla',
        imgSrc: ''
    },
    {
        _id: id++,
        goodReadsKey: '',
        rate: 'Great',
        desc: 'Lorem ipsum bla bla bla bla bla bla bla bla bla',
        imgSrc: ''
    },
    {
        _id: id++,
        goodReadsKey: '',
        rate: 'Great',
        desc: 'Lorem ipsum bla bla bla bla bla bla bla bla bla',
        imgSrc: ''
    },
    {
        _id: id++,
        goodReadsKey: '',
        rate: 'Great',
        desc: 'Lorem ipsum bla bla bla bla bla bla bla bla bla',
        imgSrc: ''
    },
    {
        _id: id++,
        goodReadsKey: '',
        rate: 'Great',
        desc: 'Lorem ipsum bla bla bla bla bla bla bla bla bla',
        imgSrc: ''
    },
    {
        _id: id++,
        goodReadsKey: '',
        rate: 'Great',
        desc: 'Lorem ipsum bla bla bla bla bla bla bla bla bla',
        imgSrc: ''
    },
    {
        _id: id++,
        goodReadsKey: '',
        rate: 'Great',
        desc: 'Lorem ipsum bla bla bla bla bla bla bla bla bla',
        imgSrc: ''
    },
    {
        goodReadsKey: '',
        rate: 'Great',
        desc: 'Lorem ipsum bla bla bla bla bla bla bla bla bla',
        imgSrc: ''
    }
]

function getBooks() {
    return axios
        .get(BOOK_URL)
        .then(res => res.data)
        .catch(e => console.log('No books to retrieve', e))
}




