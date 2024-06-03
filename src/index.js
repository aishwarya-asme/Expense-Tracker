import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Signup from './Component/Signup';
import Home from './Component/Home';
import {Provider} from "react-redux";
import appStore from './Store/appStore';
import AboutUs from './Component/About';
import Products from './Component/Products';

const root = ReactDOM.createRoot(document.getElementById('root'));

const appRouter=createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
      {path:"/",element:<Signup/>},
      {path:"home",element:<Home/>},
      {path:"/about",element:<AboutUs/>},
      {path:"products",element:<Products/>},
    ]
  }
]);

root.render(
  // 

  <Provider store={appStore}>
    <RouterProvider router={appRouter}>
     <App />
   </RouterProvider>

  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
