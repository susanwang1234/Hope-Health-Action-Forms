import express from 'express';
import controller from '../controllers/imageController';

const router = express.Router();
const multer = require('multer');
const imageUpload = multer({
  destination: '../../../ceres-assets'
});

router.post('', imageUpload.single('image'), controller.addImage);

export = router;
