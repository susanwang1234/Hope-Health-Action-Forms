import logging from '../config/logging';
import { Knex } from '../db/mysql';

const NAMESPACE = 'Image Control';
const TABLE_NAME = 'Image';

const inputtedReqFile = (req: any, filepath: any) => {
  const { filename, mimetype, size } = req.file;
  return { filename: filename, filepath: filepath, mimetype: mimetype, size: size };
};

const addImage = async (req: any, res: any, next: any) => {
  const filepath = req.file.path;
  logging.info(NAMESPACE, `CREATING A ${TABLE_NAME.toUpperCase()}`);
  try {
    const createdImage = await Knex.insert(inputtedReqFile(req, filepath)).into(TABLE_NAME);
    const retrievedCreatedImage = await Knex.select('*').from(TABLE_NAME).where('id', '=', createdImage);
    logging.info(NAMESPACE, `CREATED ${TABLE_NAME.toUpperCase()}`, retrievedCreatedImage);
    res.status(201).send(retrievedCreatedImage);
  } catch (error: any) {
    logging.error(NAMESPACE, error.message, error);
    res.status(500).send(error.message);
  }
};

export default { addImage };
