
Cypress.Commands.add('setToken', function(){
    cy.request({
        method: 'POST',
        url: '/sessions',
        body: {
            email: 'marciosc@gmail.com',
            password: 'malibu100'
        }
    }).then(function(response){
        expect(response.status).to.eql(200)
        cy.log(response.body.token)
        Cypress.env('token', response.body.token)
    })
})

Cypress.Commands.add('back2ThePast',function(){
    cy.request({
        method: 'DELETE',
        url: '/back2thepast/629e0ad962354f001624edbd'
    }).then(function(response){
        expect(response.status).to.eql(200)
    })
})

//POST requisição que cadastra personagens
Cypress.Commands.add('postCharacter', function(payload){
    cy.request({
        method: 'POST',
        url: '/characters',
        body: payload,
        headers: {
            Authorization: Cypress.env('token')
        },
        failOnStatusCode: false
    }).then(function(response){
        return response
    })
})