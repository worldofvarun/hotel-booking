import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from "react-router";
import {ToastContainer} from 'react-toastify';
import {QueryClientProvider, QueryClient} from '@tanstack/react-query';
import {AppContextProvider} from "./context/AppContext.jsx";
import "react-datepicker/dist/react-datepicker.css";
import { Provider } from 'react-redux'
import store from "./store/store.js";

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <QueryClientProvider client={queryClient}>
          <Provider store={store}>
              <AppContextProvider>
                  <BrowserRouter>
                      <ToastContainer/>
                      <App />
                  </BrowserRouter>
              </AppContextProvider>
          </Provider>
      </QueryClientProvider>
  </StrictMode>,
)
