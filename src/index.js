import React from 'react';
import ReactDOM from 'react-dom';
import './semantic/dist/semantic.min.css';
import './App.css';
import App from './App';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk'
import rootReducer from './reducers/rootReducer';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from 'react-router-dom';

const store = createStore(rootReducer, applyMiddleware(reduxThunk))

ReactDOM.render(
   <Provider store={store}>
     <BrowserRouter>
       <App store={store}/>
     </BrowserRouter>
 </Provider>, document.getElementById('root')
);
registerServiceWorker();


//The lines below implement redux dev tools

// import { createStore, applyMiddleware, compose } from 'redux';
// const store = createStore(rootReducer, compose(applyMiddleware(reduxThunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()) )
