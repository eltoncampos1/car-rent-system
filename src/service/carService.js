const BaseRepository= require('../repository/base/baseRepository')

class carService {
    constructor({ cars }) {
        this.carRepository = new BaseRepository( { file : cars })
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
}

module.exports = carService