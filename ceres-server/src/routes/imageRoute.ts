import express from 'express';
import controller from '../controllers/imageController';
import { imageUpload } from 'middlewares/multerValidation.mw';

const router = express.Router();

router.get('/:imageId', controller.getImageById);
router.post('', imageUpload.single('image'), controller.addImage);

export = router;
