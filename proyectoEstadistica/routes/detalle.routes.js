import { Router } from "express";
import { controlData,editData,deleteData,createData} from "../controller/detalle.controller.js";
const router=Router();
router.get('/datos',controlData)
router.post('/datos',createData)
router.put('/edit',editData)
router.delete('/borrar',deleteData)
export default router 