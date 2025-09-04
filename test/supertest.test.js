import {expect, assert} from 'chai'
import {describe, it} from "mocha"
import supertest from 'supertest'

import mongoose from 'mongoose'

const requester = supertest("http://localhost:8080")

let conection = await mongoose.connect(process.env.URL_MONGO)

describe('Prueba router pets', function(){
    this.timeout(10_000), 

    after(async ()=>{
        await mongoose.connection.collection("pets").deleteMany({specie:"test"})
    })

    
    describe("Pruebas simples /api/pets"), async() => {

        it("Envio de datos correctos POST /api/pets => dar de alta una nueva mascota", async()=>{

            let petMock={
                name: "rocky",
                specie:"test",
                birthdate: new Date(2025, 11, 18).toUTCString()
            }

            let {status, body} = await requester.post("/api/pets").send(petMock)
            console.log(resultado)

            //Aserciones

            expect(status).to.be.eq(200)
            expect(body.payload).to.has.property("_id")

        })

        it("Envio de datos incorrectos POST /api/pets => retornar un error", async()=>{

        })

    }

    describe("Pruebas complejas /api/pets"), () => {

    }

})