// import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import StoreProvider from './components/storeProvider/StoreProvider';
import store from './redux/store';
import './index.css';
import './test';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <StoreProvider>
        <App />
      </StoreProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
