import ApiServicesClass from '../../services/apiServicesClass';
import { getIncomeData, getSpendingData, updateIncome, updateSpending, postIncome, postSpending } from './sliceDataLists';
import { incomeList, loaderOff, spendingList, requestIncome, requestSpending, requestPatchIncome, requestPatchSpending } from '../loader/sliceLoader';
import { incomeError, spendingError, postIncomeError, postSpendingError, patchIncomeError, patchSpendingError } from '../error/sliceError';

const api = new ApiServicesClass();

export const operationGetIncomeData = () => dispatch => {
  dispatch(incomeList());
  api
    .getIncome()
    .then(data => dispatch(getIncomeData(data)))
    .catch(error => dispatch(incomeError(error)))
    .finally(() => dispatch(loaderOff()));
};

export const operationGetSpendingData = () => dispatch => {
  dispatch(spendingList());
  api
    .getSpending()
    .then(data => dispatch(getSpendingData(data)))
    .catch(error => dispatch(spendingError(error)))
    .finally(() => dispatch(loaderOff()));
};
export const operationPostIncome = (category, data) => dispatch => {
  dispatch(requestIncome());
  api
    .post(category, data)
    .then(data => dispatch(postIncome(data)))
    .catch(error => dispatch(postIncomeError(error)))
    .finally(() => dispatch(loaderOff()));
};
export const operationPostSpending = (category, data) => dispatch => {
  dispatch(requestSpending());
  api
    .post(category, data)
    .then(data => dispatch(postSpending(data)))
    .catch(error => dispatch(postSpendingError(error)))
    .finally(() => dispatch(loaderOff()));
};
export const operationPatchIncome = (category, data, id) => dispatch => {
  dispatch(requestPatchIncome());
  api
    .patch(category, data, id)
    .then(data => dispatch(updateIncome(data)))
    .catch(error => dispatch(patchIncomeError(error)))
    .finally(() => dispatch(loaderOff()));
};
export const operationPatchSpending = (category, data, id) => dispatch => {
  dispatch(requestPatchSpending());
  api
    .patch(category, data, id)
    .then(data => {
      console.log('data in patchSpending', data);
      dispatch(updateSpending(data));
    })
    .catch(error => dispatch(patchSpendingError(error)))
    .finally(() => dispatch(loaderOff()));
};
