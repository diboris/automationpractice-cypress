describe('Basic Auth', () => {
    it('A user can login', () => {
        cy.visit('https://admin:admin@the-internet.herokuapp.com/basic_auth')
        cy.get('p').contains('Congratulations! You must have the proper credentials.')
            .should('be.visible')
    })
})

describe('Broken Images', () => {
    it('Image is broken', () => {
        cy.visit(Cypress.env('herokuApp').BASE_URL + '/broken_images')
        cy.intercept('/asdf.jpg').as('asdfRequest')
        cy.intercept('/hjkl.jpg').as('hjkl')
        cy.reload()
        cy.wait('@asdfRequest').its('response.statusCode').should('eq', 404)
        cy.wait('@hjkl').its('response.statusCode').should('eq', 404)
    })
})

describe('File Upload', () => {
    it('Upload a file', () => {
        cy.visit(Cypress.env('herokuApp').BASE_URL + '/upload')
        cy.get('input[type="file"]').attachFile('images/beach.png')
        cy.get('#file-submit').click()
        cy.get('#uploaded-files').contains('beach.png')
    })
})

describe('Geolocation', () => {
    it('Geolocation can be found', () => {
        // Barcelona geolocation
        const latitude = 41.38879
        const longitude = 2.15899

        cy.visit(Cypress.env('herokuApp').BASE_URL + '/geolocation', {
            onBeforeLoad(win) {
                cy.stub(win.navigator.geolocation, 'getCurrentPosition').callsFake((cb) => {
                    return cb({coords: {latitude, longitude}})
                })
            }
        })
        cy.get('button').contains('Where am I?').click()
        cy.get('#lat-value').should('have.text', latitude)
        cy.get('#long-value').should('have.text', longitude)
    })
})

describe('Form Authentication', () => {
    it('A user can login', () => {
        cy.loginHerokuApp()
    })

    it('A user can logout', () => {
        cy.loginHerokuApp()
        cy.get('a').contains('Logout').click()
        cy.get('#flash').contains('You logged out of the secure area!')
            .should('be.visible')
    })

    it('A user can not login with invalid credential', () => {
        cy.invalidHerokuAppLogin()
    })
})
