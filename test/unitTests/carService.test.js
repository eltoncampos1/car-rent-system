const { describe, it, before, beforeEach, afterEach } = require('mocha')
const {join} = require('path')
const { expect } = require('chai')
const sinon = require('sinon')

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
    let sandBox = {}
    before(() => {
        // iniciando uma instancia do carService antes dos testes
        carService = new Carservice({
            cars: carsDatabase
        })
    })

    // criar um sandbox para sempre q os testes rodarem limparem todas as instacias
    beforeEach(() => {
        sandBox = sinon.createSandbox()
    })

    // depois que rodar tudo, resetar o objeto
    afterEach(() => {
        sandBox.restore()
    })

    // teste para verificar se retorna uma posição ramdomica no array
    it('should retrieve a random position from an array', () => {
        const data= [0,1,2,3,4]
        const result = carService.getRamdomPositionFromArray(data)

        // espera que o retorno esteja entre o tamanho total do array e zero 
        expect(result).to.be.lte(data.length).and.be.gte(0)
    })

    // deve retornar o primeiro id dos carIds
    it('should choose the first id from carIds in carCategory', () => {
        const carCategory = mocks.validCarCategory
        const carIdIndex = 0

        // criar um stub do carService.getRamdomPositionFromArray para sempre retornar 0
        sandBox.stub(
            carService,
            carService.getRamdomPositionFromArray.name
        ).returns(carIdIndex)



        const result = carService.chooseRandomCar(carCategory)
        const expected = carCategory.carIds[carIdIndex]


        expect(carService.getRamdomPositionFromArray.calledOnce).to.be.ok
        // espera q o resultado seja o retorno de um carro random
        expect(result).to.be.equal(expected)
    })
    it('given a carCategory it should return an available car', async () => {
        const car = mocks.validCar
        // criando assim ele n muda o elemento pai
        const carCategory = Object.create(mocks.validCarCategory)
        carCategory.carIds = [car.id]

        // criar um sandobx para sempre retornar o mesmo carro
        sandBox.stub(
            carService.carRepository,
            carService.carRepository.find.name
        ).resolves(car)

        // fazer um spi para ver a função foi chamada como o esperado
        sandBox.spy(
            carService,
            carService.chooseRandomCar.name
        )

        // verificando se a função retorna o carro selecionado
        const result = await carService.getAvailableCar(carCategory)
        const expected = car

        // verificar se foi chamado só uma vez
        expect(carService.chooseRandomCar.calledOnce).to.be.ok
        // verificar se foi chamado com os params passados para ele
        expect(carService.carRepository.find.calledWithExactly(car.id)).to.be.ok
        // espera que o result seja igual ao expected
        expect(result).to.be.deep.equal(expected)
    })
})