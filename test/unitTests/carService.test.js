const { describe, it, before } = require('mocha')
const {join} = require('path')
const { expect } = require('chai')

const Carservice = require('../../src/service/carService')

// normalizando o path para a carsDatabase com o join
const carsDatabase = join(__dirname, './../../database', "cars.json")

const mocks = {
    validCarCategory: require('./../mocks/valid-carCategory.json'),
    validCar: require('./../mocks/valid-car.json'),
    validCustomer: require('./../mocks/valid-customer.json')
}

describe('Carservice Suite Tests', () => {
    // iniciando carSerice como um obj vazio
    let carService = {}
    before(() => {
        // iniciando uma instancia do carService antes dos testes
        carService = new Carservice({
            cars: carsDatabase
        })
    })

    // teste para verificar se retorna uma posição ramdomica no array
    it('should retrieve a random position from an array', () => {
        const data= [0,1,2,3,4]
        const result = carService.getRamdomPositionFromArray(data)

        // espera que o retorno esteja entre o tamanho total do array e zero 
        expect(result).to.be.lte(data.length).and.be.gte(0)
    })

    // deve retornar o primeiro id dos carIds
    it('should choose the first id from carIds in carcategory', () => {
        const carCategory = mocks.validCarCategory
        const carIdIndex = 0

        const result = carService.chooseRandomCar(carCategory)
        const expected = carCategory.carIds[carIdIndex]

        // espera q o resultado seja o retorno de um carro random
        expect(result).to.be.equal(expected)
    })
    // it('given a carCategory it should return an available car', async () => {
    //     const car = mocks.validCar
    //     // criando assim ele n muda o elemento pai
    //     const carCategory = Object.create(mocks.validCarCategory)
    //     carCategory.ids = [car.id]

    //     // verificando se a função retorna o carro selecionado
    //     const result = await carService.getAvailableCar(carCategory)
    //     const expected = car

    //     // espera que o result seja igual ao expected
    //     expect(result).to.be.deep.equal(expected)
    // })
})