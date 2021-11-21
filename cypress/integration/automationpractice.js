describe('Purchase flow', () => {
    beforeEach(() => {
        cy.visit(Cypress.env('automationPractice').BASE_URL)
    })

    it('A user can make a purchase when logged in', () => {
        cy.loginAutomationPractice()

        cy.get('#header_logo').click()

        cy.get('#homefeatured .product-container').first().within(() => {
            cy.get('.product-image-container').trigger('mouseover')
            cy.get('a.ajax_add_to_cart_button').click()
        })
        cy.get('a[title="Proceed to checkout"]').click()
        cy.get('#cart_summary .cart_item').should('have.length', 1)
        cy.get('#center_column a[title="Proceed to checkout"]').click()
        cy.get('#center_column button[type="submit"]').click()
        cy.get('#cgv').check()
        cy.get('#center_column button[type="submit"]').click()
        cy.get('a[title="Pay by check."]').click()
        cy.get('#center_column button[type="submit"]').click()

        cy.get('.alert').contains('Your order on My Store is complete.')
            .should('be.visible')
    })

    it('A user can search by a product', () => {
        cy.get('#search_query_top').type('summer dress white').type('{enter}')
        cy.get('.heading-counter').should('contain.text', '1 result has been found.')
        cy.get('.product_list .product-container').should('have.length', 1)
    })

    it('A user can compare products', () => {
        cy.get('#search_query_top').type('yellow summer dress').type('{enter}')

        cy.intercept('/index.php?controller=products-comparison**').as('comparison')

        cy.get('#center_column a').contains('Printed Chiffon Dress').trigger('mouseover')
        cy.get('.compare a[data-id-product="7"]').click()
        cy.wait('@comparison')
        cy.get('#center_column a').contains('Printed Summer Dress').trigger('mouseover')
        cy.get('.compare a[data-id-product="5"]').click()
        cy.wait('@comparison')

        cy.get('.top-pagination-content button[type="submit"]').click()
        cy.get('.product-image-block').should('have.length', 2)
    })

    it('A user can contact customer service', () => {
        cy.get('a[title="Contact Us"]').click()
        cy.get('#id_contact').select('Customer service')
        cy.get('#email').type(Cypress.env('automationPractice').EMAIL)

        cy.get('#id_order').type('Order_001')

        const filepath = 'file/sample.pdf'
        cy.get('#fileUpload').attachFile(filepath)

        cy.get('#message').type('Hello customer support')
        cy.get('#submitMessage').click()
        cy.get('.alert').contains('Your message has been successfully sent to our team.')
            .should('be.visible')
    })

    it('A user can a product to wishlist', () => {
        cy.loginAutomationPractice()

        cy.get('#search_query_top').type('yellow summer dress').type('{enter}')
        cy.get('#center_column a').contains('Printed Chiffon Dress').trigger('mouseover')
        cy.intercept('/modules/blockwishlist/cart**').as('wishlist')
        cy.get('.wishlist [rel="7"]').click()
        cy.wait('@wishlist')
        cy.get('p.fancybox-error').contains('Added to your wishlist.')
            .should('be.visible')

        cy.get('a[title="Close"]').click()
        cy.get('a[title="View my customer account"]').click()

        cy.get('a[title="My wishlists"]').click()
        cy.get('#block-history a').contains('View').click()

        cy.get('.product_infos .product-name').should('contain.text', 'Printed Chiffon Dress')
    })
})


