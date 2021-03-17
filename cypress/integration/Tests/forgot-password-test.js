/// <reference types="cypress" />
    
describe("Tests Forgot Password", () => {
    before(function() {
        cy.fixture('dummyData').then(function(data){
            globalThis.data = data;
        })
    });
    it("Confirms that a password reset takes place and shows correct email confirmation", () => {
        cy.visit(data.mainUrl)
        // shoots over to the forgot password screen
        cy.get('.forgot-password').click()

        // Using regex i grabbed the dynamic id of the input
        cy.get('[id^="input-"]')
        .click()
        .type(data.userEmail)

        // click on Send
        cy.get('.nlf-column > scorpion-button.full > .button')
        .click()

        // assertion to make sure Email Sent text is shown
        cy.get('h2')
        .should('have.text', 'Email Sent!')

        // go back to the sign in screen
        cy.get('.txt-button > .button')
        .click()
    })
});