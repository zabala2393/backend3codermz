import { fakerES_MX as faker } from '@faker-js/faker'
export const generatePet = () => {
    return {
        name: faker.person.firstName(),
        specie: faker.animal.cat(),
        birthDate: faker.date.past({ years: 3 }),
        adopted: false,
        owner: null,
        image: faker.internet.emoji(),
        id: faker.database.mongodbObjectId()
    }
}