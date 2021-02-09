import ApiServicesClass from '../../services/apiServicesClass';
import {
  incomeOptsError,
  spendingOptsError,
  postSpendingOptsError,
  postIncomeOptsError,
  patchSpendingOptsError,
  patchIncomeOptsError,
  deleteSpendingOptsError,
  deleteIncomeOptsError,
} from '../error/sliceError';
import {
  requestIncomeOpts,
  requestSpendingOpts,
  requestPostSpendingOpts,
  requestPostIncomeOpts,
  requestPatchSpendingOpts,
  requestPatchIncomeOpts,
  requestDeleteSpendingOpts,
  requestDeleteIncomeOpts,
} from '../loader/sliceLoader';
import {
  deleteIncomeOpt,
  deleteSpendingOpt,
  getInitIncomeOpts,
  getInitSpendingOpts,
  onNullOptions,
  patchIncomeOpt,
  patchSpendingOpt,
  postIncomeOpt,
  postSpendingOpt,
} from './sliceOptions';

const api = new ApiServicesClass();
export const operationGetOptions = category => async dispatch => {
  category === 'spending' ? dispatch(requestSpendingOpts()) : dispatch(requestIncomeOpts());
  try {
    const data = category === 'spending' ? await api.getSpendingOpts() : await api.getIncomeOpts();
    if (!data?.length) {
      dispatch(onNullOptions(category));
    } else category === 'spending' ? dispatch(getInitSpendingOpts(data)) : dispatch(getInitIncomeOpts(data));
  } catch (error) {
    category === 'spending' ? dispatch(spendingOptsError(error)) : dispatch(incomeOptsError(error));
  }
};
export const operationPostOptions = (category, data) => async dispatch => {
  category === 'spending' ? dispatch(requestPostSpendingOpts()) : dispatch(requestPostIncomeOpts());
  try {
    const response = await api.postOpts(category, data);
    category === 'spending' ? await dispatch(postSpendingOpt(response)) : await dispatch(postIncomeOpt(response));
  } catch (error) {
    console.log('error', error);
    category === 'spending' ? dispatch(postSpendingOptsError(error.message)) : dispatch(postIncomeOptsError(error.message));
  }
};
export const operationPatchOptions = (category, data, id) => async dispatch => {
  category === 'spending' ? dispatch(requestPatchSpendingOpts()) : dispatch(requestPatchIncomeOpts());
  try {
    const response = await api.patchOpts(category, data, id);
    category === 'spending' ? dispatch(patchSpendingOpt(response)) : dispatch(patchIncomeOpt(response));
  } catch (error) {
    category === 'spending' ? dispatch(patchSpendingOptsError(error)) : dispatch(patchIncomeOptsError(error));
  }
};
export const operationDeleteOptions = (category, id) => async dispatch => {
  category === 'spending' ? dispatch(requestDeleteSpendingOpts()) : dispatch(requestDeleteIncomeOpts());
  try {
    const response = await api.deleteOpts(category, id);
    category === 'spending' ? dispatch(deleteSpendingOpt(response)) : dispatch(deleteIncomeOpt(response));
  } catch (error) {
    category === 'spending' ? dispatch(deleteSpendingOptsError(error)) : dispatch(deleteIncomeOptsError(error));
  }
};
