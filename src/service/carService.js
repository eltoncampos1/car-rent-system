const BaseRepository= require('../repository/base/baseRepository')
const Tax = require('.././entities/tax')
class carService {
    constructor({ cars }) {
        this.carRepository = new BaseRepository( { file : cars })
        this.taxesBasedOnAge = Tax.taxesBasedOnAge
        this.currencyFormat = new Intl.NumberFormat('pt-br', {
            style: "currency",
            currency: 'BRL'
        })
    }

    // função para pegar um item ramdom no array
    getRamdomPositionFromArray(list) {
        const listLength = list.length
        
        return Math.floor(
            Math.random() * (listLength)
        )
    }

    chooseRandomCar(carCategory) {
        const randomCarIndex = this.getRamdomPositionFromArray(carCategory.carIds)
        const carId = carCategory.carIds[randomCarIndex]

        return carId
    }

    async getAvailableCar(carCategory) {
        // retorna um id random
        const carId = this.chooseRandomCar(carCategory)

        // vai no repositorio e procura um carro com o id acima
        const car = await this.carRepository.find(carId)

        return car;
    }

    calculateFinalPrice(customer, carCategory, numberOfDays ) {
        // pegando a idade do customer
        const { age } = customer
        const { price } = carCategory 
        const { then: tax } = this.taxesBasedOnAge
            .find(tax => age >= tax.from && age <= tax.to)
        
        const finalPrice = ((tax * price) * ( numberOfDays ))
        const formattedPrice = this.currencyFormat.format(finalPrice)

        return formattedPrice
    }
}

module.exports = carService