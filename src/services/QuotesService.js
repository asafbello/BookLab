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
        q: `A reader lives a thousand lives before he dies, said Jojen.
         The man who never reads lives only one.`,
        author: 'George R.R. Martin'
    },
    {
        q: `Most people are nice when you finally see them.`,
        author: 'Harper Lee, To Kill A Mockingbird'
    },
    {
        q: `It’s no use going back to yesterday,
         because I was a different person then.`,
        author: ' Lewis Carroll, Alice’s Adventures in Wonderland'
    },
    {
        q: `It is our choices that show what we truly are,
         far more than our abilities`,
        author: ' J.K. Rowling, Harry Potter and the Chamber of Secrets'
    },
    {
        q: `The more that you read, the more things you will know. 
        The more that you learn, the more places you'll go.`,
        author: ' Dr. Seuss, I Can Read With My Eyes Shut!'
    },
    {
        q: `I dream. Sometimes I think that’s the only right thing to do.`,
        author: 'Haruki Murakami, Sputnik Sweetheart'
    },
    {
        q: `Not all those who wander are lost.`,
        author: 'George R.R. Martin'
    },
    {
        q: `A reader lives a thousand lives before he dies, said Jojen.
         The man who never reads lives only one.`,
        author: 'J.R.R. Tolkien, The Fellowship of the Ring'
    },
    {
        q: `If you don’t imagine, nothing ever happens at all.`,
        author: 'John Green, Paper Towns'
    },
    {
        q: `Everything is possible. The impossible just takes longer.`,
        author: ' Dan Brown, Digital Fortress'
    },
    {
        q: `Above all, don’t lie to yourself`,
        author: 'Fyodor Dostoyevsky, The Brothers Karamazov'
    },
    {
        q: `A reader lives a thousand lives before he dies, said Jojen.
         The man who never reads lives only one.`,
        author: 'George R.R. Martin'
    },
    {
        q: `A reader lives a thousand lives before he dies, said Jojen.
         The man who never reads lives only one.`,
        author: 'George R.R. Martin'
    },
    {
        q: `A reader lives a thousand lives before he dies, said Jojen.
         The man who never reads lives only one.`,
        author: 'George R.R. Martin'
    },
    {
        q: `A reader lives a thousand lives before he dies, said Jojen.
         The man who never reads lives only one.`,
        author: 'George R.R. Martin'
    },
    {
        q: `A reader lives a thousand lives before he dies, said Jojen.
         The man who never reads lives only one.`,
        author: 'George R.R. Martin'
    },
    {
        q: `A reader lives a thousand lives before he dies, said Jojen.
         The man who never reads lives only one.`,
        author: 'George R.R. Martin'
    },
    {
        q: `A reader lives a thousand lives before he dies, said Jojen.
         The man who never reads lives only one.`,
        author: 'George R.R. Martin'
    },
    {
        q: `A reader lives a thousand lives before he dies, said Jojen.
         The man who never reads lives only one.`,
        author: 'George R.R. Martin'
    },
    {
        q: `A reader lives a thousand lives before he dies, said Jojen.
         The man who never reads lives only one.`,
        author: 'George R.R. Martin'
    },
    {
        q: `A reader lives a thousand lives before he dies, said Jojen.
         The man who never reads lives only one.`,
        author: 'George R.R. Martin'
    },
    {
        q: `A reader lives a thousand lives before he dies, said Jojen.
         The man who never reads lives only one.`,
        author: 'George R.R. Martin'
    },
    {
        q: `A reader lives a thousand lives before he dies, said Jojen.
         The man who never reads lives only one.`,
        author: 'George R.R. Martin'
    },
    {
        q: `A reader lives a thousand lives before he dies, said Jojen.
         The man who never reads lives only one.`,
        author: 'George R.R. Martin'
    },
    {
        q: `A reader lives a thousand lives before he dies, said Jojen.
         The man who never reads lives only one.`,
        author: 'George R.R. Martin'
    },
    {
        q: `A reader lives a thousand lives before he dies, said Jojen.
         The man who never reads lives only one.`,
        author: 'George R.R. Martin'
    },
    {
        q: `A reader lives a thousand lives before he dies, said Jojen.
         The man who never reads lives only one.`,
        author: 'George R.R. Martin'
    },
    {
        q: `A reader lives a thousand lives before he dies, said Jojen.
         The man who never reads lives only one.`,
        author: 'George R.R. Martin'
    },
    {
        q: `A reader lives a thousand lives before he dies, said Jojen.
         The man who never reads lives only one.`,
        author: 'George R.R. Martin'
    },
    {
        q: `A reader lives a thousand lives before he dies, said Jojen.
         The man who never reads lives only one.`,
        author: 'George R.R. Martin'
    },
    {
        q: `A reader lives a thousand lives before he dies, said Jojen.
         The man who never reads lives only one.`,
        author: 'George R.R. Martin'
    },
    {
        q: `A reader lives a thousand lives before he dies, said Jojen.
         The man who never reads lives only one.`,
        author: 'George R.R. Martin'
    },
    {
        q: `A reader lives a thousand lives before he dies, said Jojen.
         The man who never reads lives only one.`,
        author: 'George R.R. Martin'
    },
    {
        q: `A reader lives a thousand lives before he dies, said Jojen.
         The man who never reads lives only one.`,
        author: 'George R.R. Martin'
    },
    {
        q: `A reader lives a thousand lives before he dies, said Jojen.
         The man who never reads lives only one.`,
        author: 'George R.R. Martin'
    },
    {
        q: `A reader lives a thousand lives before he dies, said Jojen.
         The man who never reads lives only one.`,
        author: 'George R.R. Martin'
    },
    {
        q: `A reader lives a thousand lives before he dies, said Jojen.
         The man who never reads lives only one.`,
        author: 'George R.R. Martin'
    },
    {
        q: `A reader lives a thousand lives before he dies, said Jojen.
         The man who never reads lives only one.`,
        author: 'George R.R. Martin'
    },
    {
        q: `A reader lives a thousand lives before he dies, said Jojen.
         The man who never reads lives only one.`,
        author: 'George R.R. Martin'
    },
    {
        q: `A reader lives a thousand lives before he dies, said Jojen.
         The man who never reads lives only one.`,
        author: 'George R.R. Martin'
    },
    {
        q: `A reader lives a thousand lives before he dies, said Jojen.
         The man who never reads lives only one.`,
        author: 'George R.R. Martin'
    },
    {
        q: `A reader lives a thousand lives before he dies, said Jojen.
         The man who never reads lives only one.`,
        author: 'George R.R. Martin'
    },
    {
        q: `A reader lives a thousand lives before he dies, said Jojen.
         The man who never reads lives only one.`,
        author: 'George R.R. Martin'
    },
    {
        q: `A reader lives a thousand lives before he dies, said Jojen.
         The man who never reads lives only one.`,
        author: 'George R.R. Martin'
    },
    {
        q: `A reader lives a thousand lives before he dies, said Jojen.
         The man who never reads lives only one.`,
        author: 'George R.R. Martin'
    },
    {
        q: `A reader lives a thousand lives before he dies, said Jojen.
         The man who never reads lives only one.`,
        author: 'George R.R. Martin'
    },
    {
        q: `A reader lives a thousand lives before he dies, said Jojen.
         The man who never reads lives only one.`,
        author: 'George R.R. Martin'
    },
    {
        q: `A reader lives a thousand lives before he dies, said Jojen.
         The man who never reads lives only one.`,
        author: 'George R.R. Martin'
    },
    {
        q: `A reader lives a thousand lives before he dies, said Jojen.
         The man who never reads lives only one.`,
        author: 'George R.R. Martin'
    },
    {
        q: `A reader lives a thousand lives before he dies, said Jojen.
         The man who never reads lives only one.`,
        author: 'George R.R. Martin'
    },
    {
        q: `A reader lives a thousand lives before he dies, said Jojen.
         The man who never reads lives only one.`,
        author: 'George R.R. Martin'
    },
    {
        q: `A reader lives a thousand lives before he dies, said Jojen.
         The man who never reads lives only one.`,
        author: 'George R.R. Martin'
    },
    {
        q: `A reader lives a thousand lives before he dies, said Jojen.
         The man who never reads lives only one.`,
        author: 'George R.R. Martin'
    },
    {
        q: `A reader lives a thousand lives before he dies, said Jojen.
         The man who never reads lives only one.`,
        author: 'George R.R. Martin'
    },
    {
        q: `A reader lives a thousand lives before he dies, said Jojen.
         The man who never reads lives only one.`,
        author: 'George R.R. Martin'
    },
    {
        q: `A reader lives a thousand lives before he dies, said Jojen.
         The man who never reads lives only one.`,
        author: 'George R.R. Martin'
    },
    {
        q: `A reader lives a thousand lives before he dies, said Jojen.
         The man who never reads lives only one.`,
        author: 'George R.R. Martin'
    },
    {
        q: `A reader lives a thousand lives before he dies, said Jojen.
         The man who never reads lives only one.`,
        author: 'George R.R. Martin'
    },
    {
        q: `A reader lives a thousand lives before he dies, said Jojen.
         The man who never reads lives only one.`,
        author: 'George R.R. Martin'
    },
    {
        q: `A reader lives a thousand lives before he dies, said Jojen.
         The man who never reads lives only one.`,
        author: 'George R.R. Martin'
    },
    {
        q: `A reader lives a thousand lives before he dies, said Jojen.
         The man who never reads lives only one.`,
        author: 'George R.R. Martin'
    },
    {
        q: `A reader lives a thousand lives before he dies, said Jojen.
         The man who never reads lives only one.`,
        author: 'George R.R. Martin'
    },
    {
        q: `A reader lives a thousand lives before he dies, said Jojen.
         The man who never reads lives only one.`,
        author: 'George R.R. Martin'
    },
    {
        q: `A reader lives a thousand lives before he dies, said Jojen.
         The man who never reads lives only one.`,
        author: 'George R.R. Martin'
    },
    {
        q: `A reader lives a thousand lives before he dies, said Jojen.
         The man who never reads lives only one.`,
        author: 'George R.R. Martin'
    },
    {
        q: `A reader lives a thousand lives before he dies, said Jojen.
         The man who never reads lives only one.`,
        author: 'George R.R. Martin'
    },
    {
        q: `A reader lives a thousand lives before he dies, said Jojen.
         The man who never reads lives only one.`,
        author: 'George R.R. Martin'
    },
    {
        q: `A reader lives a thousand lives before he dies, said Jojen.
         The man who never reads lives only one.`,
        author: 'George R.R. Martin'
    },
    {
        q: `A reader lives a thousand lives before he dies, said Jojen.
         The man who never reads lives only one.`,
        author: 'George R.R. Martin'
    },
    {
        q: `A reader lives a thousand lives before he dies, said Jojen.
         The man who never reads lives only one.`,
        author: 'George R.R. Martin'
    },
    {
        q: `A reader lives a thousand lives before he dies, said Jojen.
         The man who never reads lives only one.`,
        author: 'George R.R. Martin'
    },
    {
        q: `A reader lives a thousand lives before he dies, said Jojen.
         The man who never reads lives only one.`,
        author: 'George R.R. Martin'
    },
    {
        q: `A reader lives a thousand lives before he dies, said Jojen.
         The man who never reads lives only one.`,
        author: 'George R.R. Martin'
    },
    {
        q: `A reader lives a thousand lives before he dies, said Jojen.
         The man who never reads lives only one.`,
        author: 'George R.R. Martin'
    },
    {
        q: `A reader lives a thousand lives before he dies, said Jojen.
         The man who never reads lives only one.`,
        author: 'George R.R. Martin'
    },
    {
        q: `A reader lives a thousand lives before he dies, said Jojen.
         The man who never reads lives only one.`,
        author: 'George R.R. Martin'
    },
    {
        q: `A reader lives a thousand lives before he dies, said Jojen.
         The man who never reads lives only one.`,
        author: 'George R.R. Martin'
    },
    {
        q: `A reader lives a thousand lives before he dies, said Jojen.
         The man who never reads lives only one.`,
        author: 'George R.R. Martin'
    },
    {
        q: `A reader lives a thousand lives before he dies, said Jojen.
         The man who never reads lives only one.`,
        author: 'George R.R. Martin'
    },
    {
        q: `A reader lives a thousand lives before he dies, said Jojen.
         The man who never reads lives only one.`,
        author: 'George R.R. Martin'
    },
    {
        q: `A reader lives a thousand lives before he dies, said Jojen.
         The man who never reads lives only one.`,
        author: 'George R.R. Martin'
    },
    {
        q: `A reader lives a thousand lives before he dies, said Jojen.
         The man who never reads lives only one.`,
        author: 'George R.R. Martin'
    },
    {
        q: `A reader lives a thousand lives before he dies, said Jojen.
         The man who never reads lives only one.`,
        author: 'George R.R. Martin'
    },
    {
        q: `A reader lives a thousand lives before he dies, said Jojen.
         The man who never reads lives only one.`,
        author: 'George R.R. Martin'
    },
    {
        q: `A reader lives a thousand lives before he dies, said Jojen.
         The man who never reads lives only one.`,
        author: 'George R.R. Martin'
    },
    {
        q: `A reader lives a thousand lives before he dies, said Jojen.
         The man who never reads lives only one.`,
        author: 'George R.R. Martin'
    },
    {
        q: `A reader lives a thousand lives before he dies, said Jojen.
         The man who never reads lives only one.`,
        author: 'George R.R. Martin'
    },
]

function getQuotes(){
    var rand = Math.random;
    return quotes.slice(rand, 1);
}

export default {
    getQuotes
}

