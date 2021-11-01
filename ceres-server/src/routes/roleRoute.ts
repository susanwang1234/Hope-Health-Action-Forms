import express from 'express';
import controller from '../controllers/roleController';

const router = express.Router();

router.get('', controller.getRoles);

export = router;
