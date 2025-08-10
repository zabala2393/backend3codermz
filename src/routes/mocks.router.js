import {Router} from "express"
import petsController from "../controllers/pets.controller.js"
import sessionsController from "../controllers/sessions.controller.js"

const router = Router()

router.get("/mockingpets", petsController.createPet)
router.post("/mockingusers", sessionsController.register)
router.post("/generateData")


export default router