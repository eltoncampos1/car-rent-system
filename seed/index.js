const faker = require('faker');

console.log({
    id: faker.datatype.uuid(),
    name: faker.name.firstName()
})