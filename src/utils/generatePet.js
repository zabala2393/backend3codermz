import {fakerDE as faker} from '@faker-js/faker'

export const generatePet = () => {
    return {
        id: faker.database.mongodbObjectId(),
        name: faker.person.firstName(),
        specie: faker.animal.type(),
        adopted: false,
        owner: null,
        image: faker.internet.emoji()
    }
}