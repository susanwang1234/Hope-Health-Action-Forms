import { formatMonth } from './formatMonth';

// Haiti is GMT-5 (EASTERN TIME ET)
const currDate = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Cancun' }));
const currMonth = currDate.getMonth() + 1;
const currYear = currDate.getFullYear();
const currMonthLastDay = new Date(currDate.getFullYear(), currDate.getMonth() + 1, 0).getDate();
const formatYearMonth = `${currYear}-${formatMonth(currMonth)}`;

export { currDate, currMonth, currYear, currMonthLastDay, formatYearMonth };
