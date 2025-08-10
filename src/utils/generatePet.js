import {fakerES_MX as faker} from '@faker-js/faker'

export const generatePet = () => {

    return {        
        id: faker.database.mongodbObjectId(),
        name: faker.person.firstName(),
        specie: faker.animal.cat(),
        adopted: false,
        owner: null,
        image: faker.internet.emoji()
    }
}