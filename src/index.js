import React from 'react';
import ReactDOM from 'react-dom';
import { CookiesProvider } from 'react-cookie';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
// import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import './semantic/dist/semantic.min.css';
import App from './App';
import rootReducer from './reducers/rootReducer';
import { createStore, applyMiddleware, compose } from 'redux';
import registerServiceWorker from './registerServiceWorker';

// const store = createStore(rootReducer, applyMiddleware(reduxThunk));
//The lines below implement redux dev tools
const store = createStore(rootReducer, compose(applyMiddleware(reduxThunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()) )

ReactDOM.render(
   <Provider store={store}>
     <BrowserRouter>
       <CookiesProvider>
         <App store={store}/>
       </CookiesProvider>
     </BrowserRouter>
 </Provider>, document.getElementById('root')
);
registerServiceWorker();
