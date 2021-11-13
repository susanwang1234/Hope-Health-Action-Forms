import express from 'express';
import controller from '../controllers/imageController';

const router = express.Router();
const multer = require('multer');
const imageUpload = multer({
  storage: multer.diskStorage({
    destination: function (req: any, file: any, cb: any) {
      const path = 'assets/';
      cb(null, path);
    },
    filename: function (req: any, file: any, cb: any) {
      cb(null, new Date().valueOf() + '_' + file.originalname);
    }
  })
});

router.post('', imageUpload.single('image'), controller.addImage);

export = router;
