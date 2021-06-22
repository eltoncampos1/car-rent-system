const faker = require('faker');

const Car = require('../src/entities/car')
const CarCategory = require('../src/entities/carCategory')
const Customer = require('../src/entities/customer')

const  { join } = require('path')
const { writeFile } = require('fs/promises')

// normalizar a path 
const seederBaseFolder = join(__dirname, '../', 'database')
const ITEMS_AMOUNT = 2

// criar uma nova categoria de carros usando dados fakes
const carCategory = new CarCategory({
    id: faker.datatype.uuid(),
    name: faker.vehicle.type(),
    cardIds: [],
    price: faker.finance.amount(20, 100)
})

// criando carros e salvando no array
const cars = []
const customers = []
for (let index =0; index<= ITEMS_AMOUNT; index++) {
    const car = new Car({
        id: faker.datatype.uuid(),
        name: faker.vehicle.model(),
        available: true,
        gasAvailable: true,
        releaseYear: faker.date.past().getFullYear()
    })

    carCategory.cardIds.push(car.id)
    cars.push(car)

    // criando um customer
    const customer = new Customer({
        id: faker.datatype.uuid(),
        name: faker.name.findName(),
        age: faker.datatype.number({ min: 18, max: 50})
    })

    customers.push(customer)
}

// criando um a'nova versão' do writeFile que recebe o filename e os dados e retorna os dados como json
const write = (filename, data) => writeFile(join(seederBaseFolder, filename), JSON.stringify(data))

;(async() => {
    await write('cars.json', cars)
    await write('customers.json', customers)
    await write('carCategory.json', carCategory)

    console.log('cars', cars);
    console.log('cars', cars);
    console.log('customers', customers);
})()


