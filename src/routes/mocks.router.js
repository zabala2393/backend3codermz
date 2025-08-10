import { Router } from "express"
import { generateUser } from "../utils/generateUser.js"
import { generatePet } from "../utils/generatePet.js"
import sessionsController from "../controllers/sessions.controller.js"
import petsController from "../controllers/pets.controller.js"

const router = Router()

router.get("/mockingusers", async (req, res) => {
    let users = []
    for (let i = 0; i < 50; i++) {
        users.push(generateUser())
    }
    res.send({ status: "success", payload: users })
})

router.get("/mockingpets", async (req, res) => {
    let pets = []
    for (let i = 0; i < 50; i++) {
        pets.push(generatePet())
    }
    res.send({ status: "success", payload: pets })
})
router.post("/generateData", async (req, res, next) => {

    try {
        const nuevosUsuarios = []
        for (let i = 0; i < 50; i++) {
            nuevosUsuarios.push(generateUser())
        }

        const nuevasMascotas = []
        for (let i = 0; i < 50; i++) {
            nuevasMascotas.push(generatePet())
        }

        const promesaUsuarios = nuevosUsuarios
            .map(user => {
                const mockReq = { body: user };
                const mockRes = {
                    status: (code) => {
                        return { send: (data) => data }
                    },
                    send: (data) => data
                }
                return sessionsController.register(mockReq, mockRes)
            })

        const usuariosCreados = await Promise.all(promesaUsuarios)

        const promesaMascotas = nuevasMascotas
            .map(pet => {
                const mockReq = { body: pet };
                const mockRes = {
                    status: (code) => {
                        return { send: (data) => data }
                    },
                    send: (data) => data
                }
                return petsController.createPet(mockReq, mockRes)
            })

        const mascotasCreadas = await Promise.all(promesaMascotas)

        res.status(201).send({
            status: "success",
            payload: {
                usuarios: usuariosCreados,
                mascotas: mascotasCreadas
            }
        })

    } catch (error) {
        next(error)
    }
})

export default router