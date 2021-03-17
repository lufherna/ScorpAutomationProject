/// <reference types="cypress" />

// grabbing the test data before running the API test
describe("Tests the API Endpoint and confirms results", () => {
    before(function() {
        cy.fixture('dummyData').then(function(data){
            globalThis.data = data;
        })
    });

    it("Should show API Responses and confirm that the response is equal to the number expected", () => {
        // request to the api with appropriate authorization data to access the API data
        // in a real world scenario the dummyData.json file in fixtures can be git ignored and therefore
        // the sensitive data can NOT be seen by the public within Github or another version control system
        cy.request({
            method: data.testMethod,
            url: data.testAPIURL,
            headers: {
                Authorization: data.testAPIKEY
            },
            body: data.testBodyData,
        })
        // .then works similar to Promises in JS, it allows you to manipulate data yielded in the request command above
        .then((response) => {
            const resultsTotalCount = response.body.result.count
            // assertion to confirm the count response exists and number equals the number expected (64)
            expect(resultsTotalCount).to.be.equal(data.testExpectedResults)
        })
    })
})
