import moment from 'moment';
console.log(moment().subtract(2, 'weeks').calendar()); // / 01 / 31 / 2021;
// moment().subtract(6, 'days').calendar(); // Last Thursday at 4:43 PM
// moment().subtract(3, 'days').calendar(); // Last Sunday at 4:43 PM
// moment().subtract(1, 'days').calendar(); // Yesterday at 4:43 PM
// moment().calendar(); // Today at 4:43 PM
// moment().add(1, 'days').calendar(); // Tomorrow at 4:43 PM
// moment().add(3, 'days').calendar(); // Saturday at 4:43 PM
// moment().add(10, 'days').calendar();
