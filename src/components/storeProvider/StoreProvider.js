import { createContext, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ApiServicesClass from '../../services/apiServicesClass';
import { addIncome, addSpending, getIncomeData, getSpendingData, updateIncome, updateSpending } from '../../redux/dataLists/sliceDataLists';
import { findIncome, findSpending } from '../../redux/dataLists/selectorsDataLists';
import { resetCard, resetItemId, setCategory } from '../../redux/activeCard/sliceActiveCard';
import {
  operationGetIncomeData,
  operationGetSpendingData,
  operationPatchIncome,
  operationPatchSpending,
  operationPostIncome,
  operationPostSpending,
} from '../../redux/dataLists/operationDataLists';
import { useRouteMatch } from 'react-router-dom';

const StoreContext = createContext();

export const useStore = () => {
  return useContext(StoreContext);
};

const StoreProvider = ({ children }) => {
  const dispatch = useDispatch();
  const incomeItem = useSelector(findIncome);
  const spendingItem = useSelector(findSpending);
  // const [spendData, setSpendData] = useState([]);
  // const [incomeData, setIncomeData] = useState([]);
  const [error, setError] = useState(null);

  const [period, setPeriod] = useState({});
  const api = new ApiServicesClass();
  const match = useRouteMatch();

  const onHandleSubmit = async ({ key, data, id = null }) => {
    if (!id) {
      if (key === 'spending') {
        dispatch(operationPostSpending(key, data));
      } else if (key === 'income') {
        dispatch(operationPostIncome(key, data));
      }
    } else {
      if (key === 'spending') {
        dispatch(operationPatchSpending(key, data, id));
        // setSpendData(prevState => [...prevState, responseData]);
      } else if (key === 'income') {
        dispatch(operationPatchIncome(key, data, id));
        // setIncomeData(prevState => [...prevState, responseData]);
      }
    }
    dispatch(resetItemId());
    dispatch(resetCard());
  };

  const getPeriod = ({ date, period }) => setPeriod({ date, period });

  const getCardData = ({ category }) => {
    if (category === 'spending') return spendingItem;
    if (category === 'income') return incomeItem;
  };

  useEffect(() => {
    dispatch(operationGetSpendingData());
    dispatch(operationGetIncomeData());
    // eslint-disable-next-line
  }, []);

  const data = { error, onHandleSubmit, period, getPeriod, getCardData };
  return <StoreContext.Provider value={data}>{children}</StoreContext.Provider>;
};

export default StoreProvider;
