const fetch = require('node-fetch');

const getPeoplePromise = fetch => {
    return fetch('https://swapi.co/api/people')
        .then(response => response.json())
        .then(data => {
            return {
                count: data.count,
                results: data.results
            } 
        })
};


//made a promise "synchronous looking" using async await
// 1. Make function async - add async keyword
// 2. await result of any promises (normally returend with .then())
const getPeople = async (fetch) => {
    const getRequest = await fetch('https://swapi.co/api/people');
    const data = await getRequest.json();
    return {
        count: data.count,
        results: data.results
    } 
};

//getPeople(fetch);

// module.exports = {
//     getPeoplePromise: getPeoplePromise,
//     getPeople: getPeople
// }

//es6 shortcut is equivalent to the above
module.exports = {
    getPeoplePromise,
    getPeople
}