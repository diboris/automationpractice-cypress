import '@testing-library/cypress/add-commands'
import 'cypress-file-upload'

Cypress.Commands.add('loginHerokuApp', () => {
    cy.visit(Cypress.env('herokuApp').BASE_URL + '/login')
    cy.get('#username').type(Cypress.env('herokuApp').USERNAME)
    cy.get('#password').type(Cypress.env('herokuApp').PASSWORD)
    cy.get('button[type="submit"]').click()
    cy.get('#flash').contains('You logged into a secure area!')
        .should('be.visible')
})

Cypress.Commands.add('invalidHerokuAppLogin', () => {
    cy.visit(Cypress.env('herokuApp').BASE_URL + '/login')
    cy.get('#username').type(Cypress.env('herokuApp').USERNAME_INVALID)
    cy.get('#password').type(Cypress.env('herokuApp').PASSWORD_INVALID)
    cy.get('button[type="submit"]').click()
    cy.get('#flash').contains('Your username is invalid!')
        .should('be.visible')
})

Cypress.Commands.add('loginAutomationPractice', () => {
    cy.get('a').contains('Sign in').click()
    cy.get('#email').type(Cypress.env('automationPractice').EMAIL)
    cy.get('#passwd').type(Cypress.env('automationPractice').PASSWORD)
    cy.get('#SubmitLogin').click()
    cy.get('p').contains('Welcome to your account. Here you can manage all of your personal information and orders.')
        .should('be.visible')
})
