

describe('POST /characters', function(){

    before(function(){
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

    it('Deve cadastrar personagem', function(){
        
        const character = {
            name: 'Wanda MAximoff',
            alias: 'Feiticeira Escarlate',
            team: ['Vingadores'],
            active: true
        }

        cy.request({
            method: 'POST',
            url: '/characters',
            body: character,
            headers: {
                Authorization: Cypress.env('token')
            }
        }).then(function(response){
            expect(response.status).to.eql(201)
            cy.log(response.body.token)
        })
    })
})