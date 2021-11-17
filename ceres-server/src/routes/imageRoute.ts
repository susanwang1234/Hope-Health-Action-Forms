import express from 'express';
import controller from '../controllers/imageController';
import { imageUpload } from 'middlewares/multerValidation';

const router = express.Router();

router.get('/:imageId', controller.getImageById);
router.post('', imageUpload.single('image'), controller.addImage);

export = router;
