import React from 'react';
import ReactDOM from 'react-dom';
import { CookiesProvider } from 'react-cookie';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import './semantic/dist/semantic.min.css';
import './App.css';
import App from './App';
import reduxThunk from 'redux-thunk'
import rootReducer from './reducers/rootReducer';
import registerServiceWorker from './registerServiceWorker';
// import { createStore, applyMiddleware, compose } from 'redux';

const store = createStore(rootReducer, applyMiddleware(reduxThunk))
// const store = createStore(rootReducer, compose(applyMiddleware(reduxThunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()) )

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


//The lines below implement redux dev tools
