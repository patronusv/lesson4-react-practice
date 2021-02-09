import moment from 'moment';
import ApiServicesClass from './countTotal';

const { getDayPeriod, getWeekPeriod, getMonthPeriod } = new ApiServicesClass();

export const categoryResult = (data, cat) => {
  const uniqueCategory = data.map(item => item[cat]).filter((el, index, array) => array.indexOf(el) === index);
  return uniqueCategory
    .map(category =>
      data
        .filter(el => el[cat] === category)
        .reduce((acc, obj) => {
          const total = Number(obj.total);
          return { category, total: acc.total ? acc.total + total : total };
        }, {}),
    )
    .filter(category => category.total > 0);
};
export const calculatePeriod = (date, select, cb) => {
  switch (select) {
    case 'day':
      cb(moment(date).format('DD MMMM YYYY'));
      break;
    case 'week':
      const dayOfWeek = moment(date).isoWeekday();
      const start = moment(date)
        .subtract(dayOfWeek - 1, 'days')
        .format('DD MMMM YYYY');
      const finish = moment(date)
        .add(7 - dayOfWeek, 'days')
        .format('DD MMMM YYYY');
      cb(`${start} - ${finish}`);
      break;
    case 'month':
      cb(moment(date).format('MMMM YYYY'));
      break;
    case 'year':
      cb(moment(date).format('YYYY'));
      break;

    default:
      break;
  }
};
export const searchCategoryName = (category, item, options) => {
  const optionsArr = Object.entries(options);
  return optionsArr.find(([key]) => key.includes(category))[1].options.find(el => el.value === item).title;
};

export const getDataByPeriodDate = (dataList, period, date) => {
  switch (period) {
    case 'day':
      return getDayPeriod(dataList, date);
    case 'week':
      return getWeekPeriod(dataList, date);
    case 'month':
      return getMonthPeriod(dataList, date);
    case 'year':
      console.log(dataList, date);
      return;
    default:
      return;
  }
};

export const getDataByCategory = (category, incomeData, spendData) => (category === 'outlay' ? spendData : category === 'income' ? incomeData : []);

export const getCategoryTitle = (value, options) => {
  return options.find(item => item.value === value)?.title;
};

export const getOptionId = (value, options) => {
  return options.find(item => item.value === value)?.id;
};
