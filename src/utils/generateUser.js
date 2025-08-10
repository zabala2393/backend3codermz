import {fakerDE as faker} from '@faker-js/faker'
import { createHash } from 'crypto'

export const generateUser = () => {
    let numOfPets = 100
    let pets = []
    for (let i=0; i < numOfPets; i++) {
        pets.push(generatePet())
    }

    return {
        id: faker.database.mongodbObjectId(),
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        password: createHash("coder123"),
        role: "user" || "admin",
        pets
    }
}