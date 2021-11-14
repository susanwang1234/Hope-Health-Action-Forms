import express from 'express';
import controller from '../controllers/imageController';

const router = express.Router();
const multer = require('multer');
const path = 'assets/';
const imageUpload = multer({
  storage: multer.diskStorage({
    destination: function (req: Request, file: any, cb: any) {
      cb(null, path);
    },
    filename: function (req: Request, file: any, cb: any) {
      cb(null, new Date().valueOf() + '_' + file.originalname);
    }
  })
});

router.post('', imageUpload.single('image'), controller.addImage);

export = router;
