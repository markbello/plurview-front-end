import React from 'react';
import ReactDOM from 'react-dom';
import './semantic/dist/semantic.min.css';
import './App.css';
import App from './App';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk'
import rootReducer from './reducers/rootReducer';
import registerServiceWorker from './registerServiceWorker';

// const store = createStore(rootReducer, applyMiddleware(reduxThunk))
const store = createStore(rootReducer, compose(applyMiddleware(reduxThunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()) )

ReactDOM.render(
   <Provider store={store}>
     <App store={store}/>
   </Provider>, document.getElementById('root')
);
registerServiceWorker();
