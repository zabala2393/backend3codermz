import {Router} from "express"
import { generateUser } from "../utils/generateUser.js"
import { generatePet } from "../utils/generatePet.js"

const router = Router()

router.get("/mockingusers", async(req,res)=>{
    let users = []
    for (let i = 0; i<50; i++){
        users.push(generateUser())
    }
    res.send({status: "success", payload:users})
})

router.get("/mockingpets", async(req,res)=>{
    let pets = []
    for (let i = 0; i<50; i++) {
        pets.push(generatePet())
    }
    res.send({status: "success", payload:pets})
})
router.post("/generateData")


export default router