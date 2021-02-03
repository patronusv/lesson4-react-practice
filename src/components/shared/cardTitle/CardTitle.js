import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, withRouter } from 'react-router-dom';
import { resetItemId } from '../../../redux/activeCard/actionActiveCard';
import { getItemId } from '../../../redux/activeCard/selectorsActiveCard';
const CardTitle = ({ title, mustSubmit = true }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { state } = useLocation();
  const id = useSelector(getItemId);
  const goBackHome = () => {
    id ? history.push({ pathname: state.from, state: state.data }) : history.push('/');
    dispatch(resetItemId());
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
