import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { QueryClient, QueryClientProvider, } from 'react-query';
import reportWebVitals from './reportWebVitals';
import App from './App'
import { AuthProvider } from './Components/store/auth';





const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>

  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
  </AuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();



