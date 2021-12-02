export const formatMonth = (currMonth: number) => {
  return currMonth < 10 ? '0' + currMonth : '' + currMonth;
};
