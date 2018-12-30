import React from 'react';
import ReactDOM from 'react-dom';
import { CookiesProvider } from 'react-cookie';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import './semantic/dist/semantic.min.css';
import App from './App';
import rootReducer from './reducers/rootReducer';
import { createStore, applyMiddleware, compose } from 'redux';
import registerServiceWorker from './registerServiceWorker';


const store = createStore(rootReducer, composeWithDevTools(), applyMiddleware(reduxThunk));

ReactDOM.render(
   <Provider store={store}>
     <BrowserRouter>
       <CookiesProvider>
         <App />
       </CookiesProvider>
     </BrowserRouter>
 </Provider>, document.getElementById('root')
);

registerServiceWorker();
