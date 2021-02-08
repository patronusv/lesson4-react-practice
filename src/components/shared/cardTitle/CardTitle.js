import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, useRouteMatch, withRouter } from 'react-router-dom';
import { resetCard, resetItemId } from '../../../redux/activeCard/sliceActiveCard';
import { getItemId } from '../../../redux/activeCard/selectorsActiveCard';
const CardTitle = ({ title, mustSubmit = true }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const match = useRouteMatch();
  const { state } = useLocation();
  const id = useSelector(getItemId);
  const goBackHome = () => {
    if (match.url.split('/')[2] === 'category') {
      state?.from ? history.push(state.from) : history.push('/');
    } else {
      id ? history.push({ pathname: state.from, state: state.data }) : history.push('/');
      dispatch(resetItemId());
      dispatch(resetCard());
    }
  };
  return (
    <header style={{ border: '1px solid navy', display: 'flex' }}>
      <button type="button" onClick={goBackHome}>
        Go back
      </button>
      <h2>{title}</h2>
      {mustSubmit && <button type="submit">Ok</button>}
    </header>
  );
};

export default withRouter(CardTitle);
