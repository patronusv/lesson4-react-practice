export const ActionTypes = {
  SET_INCOME_OPTS: 'SET_INCOME_OPTS',
  SET_SPENDING_OPTS: 'SET_SPENDING_OPTS',
};

export const setIncomeOpts = options => ({
  type: ActionTypes.SET_INCOME_OPTS,
  payload: options,
});
export const setSpendingOpts = options => ({
  type: ActionTypes.SET_SPENDING_OPTS,
  payload: options,
});
