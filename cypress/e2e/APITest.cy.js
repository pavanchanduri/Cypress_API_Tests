/**
 * @file APITest.cy.js
 * @description This file contains Cypress tests for various API operations including GET, POST, PUT, PATCH, and DELETE.
 * @see https://docs.cypress.io/api/table-of-contents   
 * @see https://docs.cypress.io/api/commands/request
 * @see https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests
 * @see https://docs.cypress.io/guides/core-concepts/writing-your-first-test
 */
describe('First API Test', ()=> {
    /**
     * This test performs a GET request to retrieve objects from the API.
     * It checks if the response status is 200 and logs the response body.
     */
    it('API Get Call', ()=> {
        cy.request({
            method: 'GET',
            url: 'https://api.restful-api.dev/objects'
        }).then((response)=> {
            expect(response.status).to.eq(200)
            cy.log(JSON.stringify(response.body));
            cy.log('First API Test completed successfully');
        });
    });
});

let id; // Variable to store the ID for later use
describe('Second API Test', ()=> {
    /**
     * This test performs a POST request to create a new object in the API.
     * It checks if the response status is 200 and logs the response body.
     * The ID of the created object is stored for use in subsequent tests.
     */
    it('API Post Call', ()=> {
        const body = {
            "name": "Apple MacBook Pro 16",
            "data": {
                "year": 2019,
                "price": 1849.99,
                "CPU model": "Intel Core i9",
                "Hard disk size": "1 TB"
            }
        }
        cy.request({
            method: 'POST',
            url: 'https://api.restful-api.dev/objects',
            headers: {
                'Content-Type': 'application/json'
            },
            body: body,
        }).then((response)=> {
            expect(response.status).to.eq(200)
            expect(response.body.name).to.eq('Apple MacBook Pro 16')
            cy.log(JSON.stringify(response.body));
            id = response.body.id; // Store the ID for later use
            cy.log('Created Object ID: ' + id);
        });
    });
});

describe('Third API Test', ()=> {
    /**
     * This test performs a PUT request to update an existing object in the API.
     * It checks if the response status is 200 and logs the response body.
     * The ID used in the URL is from the previous POST request.
     */
    it('API Put Call', ()=> {
        const body = {
            "name": "Apple MacBook Pro 16",
            "data": {
                "year": 2019,
                "price": 2049.99,
                "CPU model": "Intel Core i9",
                "Hard disk size": "1 TB",
                "color": "silver"
            }
        }
        cy.request({
            method: 'PUT',
            url: 'https://api.restful-api.dev/objects/' + id, // Use the ID from the previous test
            headers: {
                'Content-Type': 'application/json'
            },
            body: body,
        }).then((response)=> {
            expect(response.status).to.eq(200)
            expect(response.body.name).to.eq('Apple MacBook Pro 16')
            cy.log(JSON.stringify(response.body));
        });
    });
});

describe('Fourth API Test', ()=> {
    /**
     * This test performs a PATCH request to partially update an existing object in the API.
     * It checks if the response status is 200 and logs the response body.
     * The ID used in the URL is from the previous POST request.
     */
    it('API Patch Call', ()=> {
        var body = {
            "name": "Apple MacBook Pro 16 (Updated Name)"
        }
        cy.request({
            method: 'PATCH',
            url: 'https://api.restful-api.dev/objects/' + id, // Use the ID from the previous test
            headers: {
                'Content-Type': 'application/json'
            },
            body: body,
        }).then((response)=> {
            expect(response.status).to.eq(200)
            cy.log(JSON.stringify(response.body));
        });
    });
})

describe('Fifth API Test', ()=> {
    /**
     * This test performs a DELETE request to remove an object from the API.
     * It checks if the response status is 200 and logs a success message.
     * The ID used in the URL is from the previous POST request.
     */
    it('API Delete Call', ()=> {
        cy.request({
            method: 'DELETE',
            url: 'https://api.restful-api.dev/objects/' + id, // Use the ID from the previous test
            headers: {
                'Content-Type': 'application/json'
            },
        }).then((response)=> {
            expect(response.status).to.eq(200)
            cy.log('Object with ID ' + id + ' deleted successfully');
        });
    });
})