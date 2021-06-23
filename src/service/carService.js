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
        return null
    }
}

module.exports = carService