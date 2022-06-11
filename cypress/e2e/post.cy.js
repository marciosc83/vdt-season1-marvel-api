

describe('POST /characters', function () {

    before(function () {
        cy.back2ThePast()
        cy.setToken()
    })

    it('Deve cadastrar personagem', function () {

        const character = {
            name: 'Wanda MAximoff',
            alias: 'Feiticeira Escarlate',
            team: ['Vingadores'],
            active: true
        }

        cy.postCharacter(character)
            .then(function (response) {
                expect(response.status).to.eql(201)
                expect(response.body.character_id).to.have.lengthOf(24)
                expect(response.body.character_id.length).to.eql(24)
            })
    })

    context('Quando um personagem já existe', function () {

        const character = {
            "name": "Charles",
            "alias": "Professor",
            "team": ["x-men"],
            "active": true
        }

        before(function () {
            cy.postCharacter(character).then(function (response) {
                expect(response.status).to.eql(201)
                expect(response.body.character_id).to.have.lengthOf(24)
            })
        })

        it('Não deve cadastrar duplicado', function () {
            cy.postCharacter(character).then(function (response) {
                expect(response.status).to.eql(400)
                expect(response.body.error).to.eql('Duplicate character')
            })
        })
    })

    context('Validação de campos obrigatórios não preenchidos', function () {
        const charactersList = [
            {
                //"name": "Charles",
                "alias": "Professor",
                "team": ["x-men"],
                "active": true
            }, {
                "name": "Charles",
                //"alias": "Professor",
                "team": ["x-men"],
                "active": true
            }, {
                "name": "Charles",
                "alias": "Professor",
                //"team": ["x-men"],
                "active": true
            }, {
                "name": "Charles",
                "alias": "Professor",
                "team": ["x-men"]
                //"active": true        
            }
        ]

        const validationMessages = ['"name" is required', '"alias" is required', '"team" is required', '"active" is required']

        it('Campos obrigatórios', function () {
            charactersList.forEach(function(item, index){
                cy.postCharacter(charactersList[index]).then(function (response) {
                    expect(response.status).to.eql(400)
                    expect(response.body.error).to.eql('Bad Request')
                    expect(response.body.validation.body.message).to.eql(validationMessages[index])
                })
            })
        })
    })
})
