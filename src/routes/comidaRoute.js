import express from 'express';
import * as controller from '../controllers/comidasController.js';

const router = express.Router();

router.post('/comidas', controller.create);
router.get('/comidas', controller.getAll);
router.get('/comidas/:id', controller.getById);
router.put('/comidas/:id', controller.update);
router.delete('/comidas/:id', controller.remove);

export default router;
