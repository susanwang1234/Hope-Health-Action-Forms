import { NextFunction, Request, Response } from 'express';
import logging from '../config/logging';
import { Knex } from '../db/mysql';

const NAMESPACE = 'Rehab Report';

const createRehabReport = async (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, 'Creating Rehab Report');

  try {
    const {
      currDate,
      bedsAvailable,
      bedDays,
      patientDays,
      hospitalised,
      discharged,
      selfDischarges,
      deathsBefore48,
      deathsAfter48,
      daysHospitalised,
      referrals,
      transfers,
      stays,
      admissions,
      outpatients
    } = req.body;
    const insertRehabReport = await Knex.insert({
      curr_date: currDate,
      beds_available: bedsAvailable,
      bed_days: bedDays,
      patient_days: patientDays,
      hospitalised: hospitalised,
      discharged: discharged,
      self_discharges: selfDischarges,
      deaths_before_48: deathsBefore48,
      deaths_after_48: deathsAfter48,
      days_hospitalised: daysHospitalised,
      referrals: referrals,
      transfers: transfers,
      stays: stays,
      admissions: admissions,
      outpatients: outpatients
    }).into('Rehab_Report');
    const retrieveRehabReport = await Knex.select('*').from('Rehab_Report').where('id', '=', insertRehabReport);
    logging.info(NAMESPACE, 'Created Rehab Report:', retrieveRehabReport);
    res.status(201).send(retrieveRehabReport);
  } catch (error: any) {
    logging.error(NAMESPACE, error.message, error);
    res.status(500).send(error.message);
  }
};

const deleteAllRehabReport = async (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, 'Deleting all Rehab Reports');

  try {
    await Knex('Rehab_Report').del();
    logging.info(NAMESPACE, 'Deleted all Rehab Reports');
    res.sendStatus(204);
  } catch (error: any) {
    logging.error(NAMESPACE, error.message, error);
    res.status(500).send(error);
  }
};

const deleteRehabReport = async (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, 'Deleting a Rehab Report');

  try {
    const { rehabReportId } = req.body;
    const deleteById = await Knex('Rehab_Report').del().where('id', '=', rehabReportId);
    logging.info(NAMESPACE, 'Deleted Rehab Report with id: ', deleteById);
    res.sendStatus(204);
  } catch (error: any) {
    logging.error(NAMESPACE, error.message, error);
    res.status(500).send(error);
  }
};

const getAllRehabReport = async (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, 'Getting all Rehab Reports');

  try {
    const rehabReport = await Knex.select('*').from('Rehab_Report');
    logging.info(NAMESPACE, 'Retrieved Rehab Reports:', rehabReport);
    res.status(200).send(rehabReport);
  } catch (error: any) {
    logging.error(NAMESPACE, error.message, error);
    res.status(500).send(error.message);
  }
};

export default { createRehabReport, deleteAllRehabReport, deleteRehabReport, getAllRehabReport };
