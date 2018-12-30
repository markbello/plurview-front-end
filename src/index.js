import React from 'react';
import ReactDOM from 'react-dom';
import { CookiesProvider } from 'react-cookie';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import './semantic/dist/semantic.min.css';
import App from './App';
import rootReducer from './reducers/rootReducer';
import { createStore, applyMiddleware, compose } from 'redux';
import registerServiceWorker from './registerServiceWorker';


const storeWithReduxDevtools = createStore(rootReducer, compose(applyMiddleware(reduxThunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()) )
const storeWithoutReduxDevtools = createStore(rootReducer, applyMiddleware(reduxThunk));

const STORE = process.env.REACT_APP_STAGE === 'dev'
? storeWithReduxDevtools
: storeWithoutReduxDevtools;

ReactDOM.render(
   <Provider store={STORE}>
     <BrowserRouter>
       <CookiesProvider>
         <App />
       </CookiesProvider>
     </BrowserRouter>
 </Provider>, document.getElementById('root')
);

registerServiceWorker();
