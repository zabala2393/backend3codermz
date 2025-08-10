import {Router} from "express"
import { generateUser } from "../utils/generateUser.js"
import { generatePet } from "../utils/generatePet.js"

const router = Router()

router.get("/mockingusers", async(req,res)=>{
    let users = []
    for (let i = 0; i<100; i++){
        usuarios.push(generateUser())
    }
    res.send({status: "success", payload:users})
})

router.get("/mockingpets", generatePet())
router.post("/generateData")


export default router