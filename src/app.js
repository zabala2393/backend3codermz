import "./helpers/env.helper.js"
import express from 'express';
import compress from 'express-compression'
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import zlib from "zlib"

import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import mocksRouter from './routes/mocks.router.js'
import argsHelper from "./helpers/args.helper.js";
import setupResponses from "./middlewares/setupResponses.js";

const app = express();
const PORT = process.env.PORT||8080;
const ready = async () => {
    console.log(`Server ready on port ${PORT}`)
    console.log("mode" + argsHelper.mode)
}

const connection = mongoose.connect(process.env.URL_MONGO)
if (connection) {
    console.log("Conectado correctamente a base de datos mongo")
}

app.use(compress({brotli:{enabled:true}}))
app.use(express.json());
app.use(cookieParser());

app.use('/api/users',usersRouter);
app.use('/api/pets',petsRouter);
app.use('/api/adoptions',adoptionsRouter);
app.use('/api/sessions',sessionsRouter);
app.use('/api/mocks', mocksRouter);


app.listen(PORT, ready, ()=>
    console.log(`Listening on ${PORT}, mode:${argsHelper.mode}`)
)
app.use(setupResponses)