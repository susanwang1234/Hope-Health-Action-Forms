import logging from '../config/logging';
import { Knex } from '../db/mysql';
// const path = require('path');

const NAMESPACE = 'Image Control';
const TABLE_NAME = 'Image';

// const inputtedReqFile = (req: any, imgFilepath: any) => {
//   const { imgFilename, imgMimetype, imgSize } = req.file;
//   return { imgFilename: imgFilename, imgFilepath: imgFilepath, imgMimetype: imgMimetype, imgSize: imgSize };
// };

const addImage = async (req: any, res: any, next: any) => {
  res.sendStatus(204);

  // const { filename, mimetype, size } = req.file;
  // const filepath = req.file.path;
  // logging.info(NAMESPACE, `CREATING A ${TABLE_NAME.toUpperCase()}`);
  // try {
  //   await Knex.insert(filename, filepath, mimetype, size)
  //     .into(TABLE_NAME)
  //     .then(() => res.json({ success: true }));
  // } catch (error: any) {
  //   logging.error(NAMESPACE, error.message, error);
  //   res.status(500).send(error.message);
  // }
};

export default { addImage };
