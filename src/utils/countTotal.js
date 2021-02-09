import moment from 'moment';

export default class CountTotal {
  constructor() {
    this.currentDate = moment(Date.now()).format('YYYY-MM-DD');
  }

  getDayPeriod = (data, date = this.currentDate) => {
    return data.filter(item => item.date === date);
    // .reduce((acc, item) => acc + Number(item.total), 0);
  };

  getWeekPeriod = (data, date = this.currentDate) => {
    return data.filter(
      item =>
        moment(item.date).format('YYYY') === moment(date).format('YYYY') &&
        moment(item.date, 'YYYY-MM-DD').isoWeek() === moment(date, 'YYYY-MM-DD').isoWeek(),
    );
    // .reduce((acc, item) => acc + Number(item.total), 0);
  };

  getMonthPeriod = (data, date = this.currentDate) => {
    return data.filter(item => moment(item.date).format('YYYY-MM') === moment(date).format('YYYY-MM'));
    // .reduce((acc, item) => acc + Number(item.total), 0);
  };
  countTotal = data => {
    return data.reduce((acc, item) => acc + Number(item.total), 0);
  };
}
