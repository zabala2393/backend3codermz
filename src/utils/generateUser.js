import {fakerES_MX as faker} from '@faker-js/faker'
import  crypto  from 'crypto'

export const generateUser = () => {

    let first_name = faker.person.firstName()
    let last_name = faker.person.lastName()
    let password = "coder123"
    let hashedPassword = crypto.createHash("sha256",password).digest('hex')

    return {
        id: faker.database.mongodbObjectId(),
        first_name,
        last_name,
        email: faker.internet.email({firstName:first_name, lastName:last_name}),
        password: hashedPassword,
        role: "user" || "admin",
        pets: []
    }
}