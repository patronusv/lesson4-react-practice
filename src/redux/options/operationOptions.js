import ApiServicesClass from '../../services/apiServicesClass';
import {
  incomeOptsError,
  spendingOptsError,
  postSpendingOptsError,
  postIncomeOptsError,
  patchSpendingOptsError,
  patchIncomeOptsError,
} from '../error/sliceError';
import {
  requestIncomeOpts,
  requestSpendingOpts,
  requestPostSpendingOpts,
  requestPostIncomeOpts,
  requestPatchSpendingOpts,
  requestPatchIncomeOpts,
} from '../loader/sliceLoader';
import {
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
    (await category) === 'spending' ? dispatch(postSpendingOpt(response)) : dispatch(postIncomeOpt(response));
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
