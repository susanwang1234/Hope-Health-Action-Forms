import createMonthlyForms from 'utils/formSchedulerHelper';

const scheduler = require('node-schedule');

export const scheduleMonthlyForms = () => {
  /** Use this for production */
  // let rule = new scheduler.RecurrenceRule();
  // rule.tz = 'America/Cancun';
  // rule.month = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  // rule.hour = 0;
  // rule.minute = 0;
  // rule.second = 0;

  // scheduler.scheduleJob(rule, () => {
  //   createMonthlyForms();
  // });

  /** Use this for testing the scheduler */
  const demoTest = scheduler.scheduleJob('*/1 * * * *', () => {
    createMonthlyForms();
    demoTest.cancel();
  });
};
