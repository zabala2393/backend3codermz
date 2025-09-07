import { describe, it } from "mocha"
import { config } from "dotenv"
import supertest from "supertest"
import { expect, } from "chai"
import mongoose, { isValidObjectId } from "mongoose"
import { faker } from "@faker-js/faker"

const requester = supertest("http://localhost:8080")

config()
await mongoose.connect(process.env.URL_MONGO)


describe("Pruebas router pets", function () {
    this.timeout(5000)

    after(async () => {
        await mongoose.connection.collection("pets").deleteMany({ specie: "test" })
    })

    describe("Test router /api/pets", async () => {

        it("Metodo GET de /api/pets debe retornar todas las mascotas en la DB", async () => {
            let { status, body } = await requester.get("/api/pets")
            expect(status).to.be.eq(200)
            expect(body).to.be.an('object')
        })
        it("Metodo DELETE de /api/pets/:pid debe fallar al eliminar a la mascota de la DB introduciendo un ID incorrecto como parametro", async () => {
            let pid = faker.database.mongodbObjectId()
            const { status, body } = await requester.delete(`/api/pets/${pid}`)
            expect(body).to.be.an('object')
            expect(status).to.be.eq(404)

        })
        it("Si envío los datos correctos de una mascota al /api/pets metodo POST, da de alta la mascota en DB", async () => {
            let petMock = {
                name: "Rocky",
                specie: "test",
                birthDate: new Date(2025, 11, 18).toUTCString()
            }

            let { status, body } = await requester.post("/api/pets").send(petMock)

            expect(status).to.be.eq(200)
            expect(body.payload).to.has.property("_id")
            expect(isValidObjectId(body.payload._id)).to.be.true
        })

        it("Si envio propiedades correctas de mascota al /api/pets/:pid debe modificar correctamente las propiedades del objeto en DB", async()=>{
            let petMock = {
                name: "Rocky",
                specie: "test",
                birthDate: new Date(2025, 11, 18).toUTCString()
            }

            let crearMock = await requester.post("/api/pets").send(petMock)

            let updateMock = {
                name: "Bobby",
                adopted: true,
                image: faker.image.avatar()
            }   

            let {status, body} = await requester.put(`/api/pets/${crearMock.body.payload._id}`).send(updateMock)

            expect(status).to.be.eq(200)
            expect(body).to.has.property("_id")
            expect(isValidObjectId(body._id)).to.be.true
        })

        it("Si envío los datos incompletos de una mascota al /api/pets metodo POST, me retorna un error", async () => {
            let petMock = {
                specie: "test",
                birthDate: new Date(2025, 11, 18).toUTCString()
            }

            let { status } = await requester.post("/api/pets").send(petMock)
            expect(status).to.be.eq(400)
        })

        it("Si envío los datos correctos de una mascota al /api/pets/withimage (incluyendo una imagen valida) metodo POST, da de alta la mascota en DB", async () => {
            let petMock = {
                name: "Coderdog",
                specie: "test",
                birthDate: new Date(2025, 11, 18).toUTCString()
            }


            let { status, body } = await
                requester
                    .post("/api/pets/withimage")
                    .field("name", petMock.name)
                    .field("specie", petMock.specie)
                    .field("birthDate", petMock.birthDate)
                    .attach("image", "./test/coderDog.jpg")


            expect(status).to.be.eq(200)
            expect(body.payload).to.has.property("_id")
            expect(isValidObjectId(body.payload._id)).to.be.true
            expect(isValidObjectId(body.payload._id)).to.be.equal(true)
            expect(body.payload.image).to.be.ok
        })
    })
})