import React from 'react';
import ReactDOM from 'react-dom/client';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider } from 'react-router-dom';
import { createBrowserRouter } from "react-router-dom";


import ManageExpenses from './expenses/ManageExpenses';
import ManageCategories from "./categories/ManageCategories"
import NavigationMenu from './NavigationMenu';
import AuthForm from './auth-components/AuthForm';
const router = createBrowserRouter([
  {
    path: "/",
    element: <NavigationMenu />,
    children: [
      {
        path: "/",
        element: <ManageExpenses />
      },
      {
        path: "/expenses",
        element: <ManageExpenses />
      },
      {
        path: "/categories",
        element: <ManageCategories />
      }
    ]
  },
  {
    path: "/auth",
    element: <AuthForm />
  }
])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router}>
    <App />
  </RouterProvider>
    
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
