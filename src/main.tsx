import React from 'react'
import ReactDOM from 'react-dom/client'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { MyApp } from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './components/state/store';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      {/* <CookiesProvider> */}
      <Provider store={store}>
        <BrowserRouter>
            <MyApp />
        </BrowserRouter>
      </Provider>
      {/* </CookiesProvider> */}
  </React.StrictMode>,
)