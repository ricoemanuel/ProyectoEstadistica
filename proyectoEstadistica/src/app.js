import express from 'express'
import config from './config.js'
import detalleRoutes from '../routes/detalle.routes.js'

const cors = require('cors');
const app=express();

app.set('port', config.port)

app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(cors({
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));

app.use(detalleRoutes)

export default app