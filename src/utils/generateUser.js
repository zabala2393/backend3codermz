import {fakerES_MX as faker} from '@faker-js/faker'
export const generateUser = () => {
    let first_name = faker.person.firstName()
    let last_name = faker.person.lastName()
    let password = "coder123"
    return {
        id: faker.database.mongodbObjectId(),
        first_name,
        last_name,
        email: faker.internet.email({firstName:first_name, lastName:last_name}),
        password: password,
        role: faker.helpers.arrayElement(['USER', 'ADMIN']),
        pets: []
    }
}