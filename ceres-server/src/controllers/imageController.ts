import logging from '../config/logging';
import { Request, Response, NextFunction } from 'express';
import { Knex } from '../db/mysql';
import { imageNegativeOrNanInputError, imageDNEError, imageMimetypeError } from 'shared/errorMessages';
import { isInvalidInput } from './controllerTools/isInvalidInput';

const NAMESPACE = 'Image Control';
const TABLE_NAME = 'Image';

const inputtedReqFile = (req: any, filepath: any, mimetype: any) => {
  const { filename, size } = req.file;
  return { filename: filename, filepath: filepath, mimetype: mimetype, size: size };
};

const getImageById = async (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, `GETTING AN ${TABLE_NAME.toUpperCase()} BY ID`);
  const imageId: number = +req.params.id;
  if (isInvalidInput(imageId)) {
    res.status(400).send(imageNegativeOrNanInputError);
    return;
  }

  try {
    const retrievedImagePath = await Knex.select('filepath').from(TABLE_NAME).where('id', '=', imageId);
    logging.info(NAMESPACE, `RETRIEVED ${TABLE_NAME.toUpperCase()} ${imageId}`, retrievedImagePath);
    if (!retrievedImagePath.length) {
      res.status(404).send(imageDNEError);
      return;
    }
    res.status(200).sendFile(`/home/node/app/${retrievedImagePath[0].filepath}`);
  } catch (error: any) {
    logging.error(NAMESPACE, error.message, error);
    res.status(500).send(error);
  }
};

const addImage = async (req: any, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, `CREATING AN ${TABLE_NAME.toUpperCase()}`);
  try {
    const filepath = req.file.path;
    const mimetype = req.file.mimetype;
    const createdImage = await Knex.insert(inputtedReqFile(req, filepath, mimetype)).into(TABLE_NAME);
    const retrievedCreatedImage = await Knex.select('*').from(TABLE_NAME).where('id', '=', createdImage);
    logging.info(NAMESPACE, `CREATED ${TABLE_NAME.toUpperCase()}`, retrievedCreatedImage);
    res.status(201).send(retrievedCreatedImage);
  } catch (error: any) {
    res.status(400).send(imageMimetypeError);
  }
};

export default { getImageById, addImage };
