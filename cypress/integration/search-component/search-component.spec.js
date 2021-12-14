describe("Search Bar UI", () => {
    it("Should return true when title component is correct", () => {
        cy.visit('/')

        cy.get('[data-cy=ow]').invoke('text').then(($value) => {
            expect($value).to.eq("Open Weather")
        })
    })
    it('Should search some cities', () => {
        cy.visit('/')

        const city = ['Volta Redonda', 'Santa Rita do Sapucaí', 'Angra dos Reis', 'Rio de Janeiro']

        for(var i=0; i<city.length; i++)
        {
            cy.get('[data-cy=city-name]').type(city[i])
            cy.get('[data-cy=search]').click()

            cy.contains(city[i]).should('to.have.length', 1)
        }
    })
    it('Should search some cities with the name wrong', () => {
        cy.visit('/')

        const city = ['Voonda', 'Santucaí', 'Angris', 'Riiro']

        for(var i=0; i<city.length; i++)
        {
            cy.get('[data-cy=city-name]').type(city[i])
            cy.get('[data-cy=search]').click()

            cy.contains(city[i]).should('to.have.length', 1)
        }
    })
    it('Should press the button without any text', () => {
        cy.visit('/')

        const value = ''

        if(cy.get('[data-cy=city-name]').invoke('text').then($value => {
            expect($value).to.eq('')
        }))
        {
            cy.get('[data-cy=search').click()
        }
    })
    it('Returns true if city name already in recent cities', () => {
        cy.visit('/')

        const rj = 'Rio de Janeiro'

        cy.get('[data-cy=city-name]').type(rj)
        cy.get('[data-cy=search').click()

        cy.get('[data-cy=rs-city]').invoke('text').then($value => {
            expect($value).to.eq(rj)
        })
    })
    it('Returns true if icons are visible', () => {
        cy.visit('/')

        cy.get('[data-cy=icon]').should('be.visible')
    })
})