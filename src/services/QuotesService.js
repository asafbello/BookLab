'use strict' 

var quotes = [
    {
        q: `A reader lives a thousand lives before he dies, said Jojen.
         The man who never reads lives only one.`,
        author: 'George R.R. Martin, The Hobbit'
    },
    {
        q: `It is better to be hated for what you are than to
         be loved for what you are not.`,
        author: 'André Gide, The Pastoral Symphony'
    },
    {
        q: `Who, being loved, is poor?`,
        author: 'Oscar Wilde, The Importance of Being Ernst'
    },
    {
        q: `The goal isn’t to live forever, the goal is to create something that will.`,
        author: 'Chuck Palahniuk, Fight Club'
    },
    {
        q: `Travel far enough, you meet yourself.`,
        author: ' David Mitchell, Cloud Atlas'
    },
    {
        q: `I find television very educating. Every time somebody turns it on the set,
         I go into the other room and read a book.`,
        author: 'Groucho Marx'
    },
    {
        q: `′Classic′ - a book which people praise and don't read.`,
        author: 'Mark Twain'
    }
]

function getQuote(){
    var rand = quotes[Math.floor(Math.random() * quotes.length)];
    return rand;
}

export default {
    getQuote
}

