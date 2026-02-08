import express from 'express';
import * as foodController from '../controllers/foodController.js';

const router = express.Router();

router.get('/food', foodController.getAll);
router.get('/food/:id', foodController.getById);
router.post('/food', foodController.create);
router.put('/food:id', foodController.update);
router.delete('/food:id', foodController.remove);

export default router;
