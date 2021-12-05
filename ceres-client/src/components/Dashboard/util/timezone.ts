// Haiti is GMT-5 (EASTERN TIME ET)
const months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const currDate = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Cancun' }));
const currMonth = currDate.getMonth();
const currYear = currDate.getFullYear();
const currMonthLastDay = new Date(currDate.getFullYear(), currDate.getMonth() + 1, 0).getDate();
const currMonthLastDate = new Date(currYear, currMonth, currMonthLastDay, 23, 59, 59);

export { months, currDate, currMonth, currYear, currMonthLastDay, currMonthLastDate };
