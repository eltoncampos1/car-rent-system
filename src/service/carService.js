const BaseRepository= require('../repository/base/baseRepository')

class carService {
    constructor({ cars }) {
        this.carRepository = new BaseRepository( { file : cars })
    }

    test() {
        return this.carRepository.find()
    }
}

module.exports = carService