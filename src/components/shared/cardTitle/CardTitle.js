import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, useRouteMatch, withRouter } from 'react-router-dom';
import { resetCard, resetItemId } from '../../../redux/activeCard/sliceActiveCard';
import { getItemId } from '../../../redux/activeCard/selectorsActiveCard';
import Title from '../title/Title';
import Button from '../button/Button';
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
    <header className="navbar navbar-light bg-info mb-1">
      <Button title="Go back" onClick={goBackHome} className="btn-warning" />
      <Title title={title} />
      {mustSubmit && <Button title="Ok" type="submit" className="btn-success" />}
    </header>
  );
};

export default withRouter(CardTitle);
