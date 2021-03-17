/// <reference types="cypress" />


describe("Tests Sign In Form", () => {
    // using the function below that runs before any of the tests
    // it grabs the test data from an exterior file
    before(function() {
        cy.fixture('dummyData').then(function(data){
            globalThis.data = data;
        })
    });
    // ==================================== FIRST TEST
    it("Should be able to submit a failed submission via sign in form and confirm error message comes up", () => {
        // cypress code
        // initially takes you to the test website
        cy.visit(data.mainUrl)

        // grabs email input
        // had to use the actual name for the input since it is changed dynamically every time you access the site
        cy.get("input[name='username']")
        .type(data.userEmail)

        // grabbing the password input field
        cy.get("input[name='password']")
        .type(data.pw)

        // sign in button click
        cy.get('.button')
        .click()

        // added assertion to check if the failed test validator comes up
        cy.get('.con')
        .should('have.text', 'Oops!Invalid Username or Password.')
    });

    // ===================================== SECOND TEST 
    it("Confirms required text appears if both input fields are blank", () => {
        cy.visit(data.mainUrl)

        // clicks on the Submit button
        cy.get('.button')
        .click()

        // assert that both required texts are being shown
        cy.get('[data-cy=email-required]')
        .should('have.text', ' Required ')
        cy.get('[data-cy=password-required]')
        .should('have.text', ' Required ')
    });
})