import express from 'express';
import  {createWarehouse, readWarehouse, deleteWarehouse ,getAllWarehouse} from "../controllers/warehouseController.js";
import { updateWarehouse } from '../controllers/warehouseController.js';

const router = express.Router();

//Create Warehouse
router.post('/', createWarehouse);

//Read Warehouse
router.get('/readWarehouse/:id' ,readWarehouse);

//delete Warehouse 
router.delete('/delWarehouse/:id' , deleteWarehouse);

//real all
router.get('/' ,getAllWarehouse);

//update warehouse by warehouse id
router.patch('/update',updateWarehouse)


export default router;