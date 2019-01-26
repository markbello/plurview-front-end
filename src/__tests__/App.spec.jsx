import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';
import { BrowserRouter } from 'react-router-dom';
import reduxThunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';
import App from '../App';

describe('Parent App Component', () => {
  const store = createStore(rootReducer, applyMiddleware(reduxThunk));
  const HocChain = () => (
    <Provider store={store}>
      <BrowserRouter>
        <CookiesProvider>
          <App store={store} />
        </CookiesProvider>
      </BrowserRouter>
    </Provider>
  );

  it('renders without crashing', () => {
    expect(<HocChain />).toBeTruthy();
  });
});
