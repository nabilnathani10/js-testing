const fetch = require('node-fetch');
const swapi = require('./script2');

//One way to test async code is to call done() after promise resolves
// it('calls swapi to get people', (done) => { //use done to be called after promise resolves
//     expect.assertions(1); //use this to assert that this test expects one assertion
//     swapi.getPeople(fetch).then(data => {
//         expect(data.count).toEqual(87);
//         done();
//     })
// });

// it('calls swapi to get people with a promise', () => {
//     expect.assertions(1);
//     swapi.getPeoplePromise(fetch).then(data => {
//         expect(data.count).toEqual(87);
//         done();
//     })
// });


//The second way is to always `return` the async function
it('calls swapi to get people', () => { //use done to be called after promise resolves
    expect.assertions(1); //use this to assert that this test expects one assertion
    //always use expect.assertions when testing async code
    return swapi.getPeople(fetch).then(data => {
        expect(data.count).toEqual(87);
    })
});

it('calls swapi to get people with a promise', () => {
    expect.assertions(2);
    return swapi.getPeoplePromise(fetch).then(data => {
        expect(data.count).toEqual(87);
        expect(data.results.length).toBeGreaterThan(5);
    })
});



it('getPeople returns counts and results', () => {
    //to avoid async calls, mock the fetch call to avoid calls to the API
    const mockFetch = jest.fn().mockReturnValue(Promise.resolve(
        {
            json: () => Promise.resolve({
                count: 87,
                results: [
                    0,1,2,3,4,5
                ]
            })
        }
    ));

    expect.assertions(3);
    return swapi.getPeoplePromise(mockFetch).then(data => {
        expect(mockFetch.mock.calls.length).toBe(1);
        expect(mockFetch).toBeCalledWith('https://swapi.co/api/people');
        expect(data.count).toEqual(87);

    })
})