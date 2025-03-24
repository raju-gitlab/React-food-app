import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
// import 'bootstrap/dist/css/bootstrap.css';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Restraunt from './components/body/Restraunts';
import Layout from './components/body/Layout';
import Home from './components/body/home';
import Carosoul from './components/body/Carosoul';
import FoodDetails from './components/body/FoodDetails';
import 'bootstrap/dist/css/bootstrap.min.css';
const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "resturants",
          element: <Restraunt />,
        },
        {
          path: "carosoul",
          element: <Carosoul />,
        },
        {
          path: "food/:foodName/:collectionId/:offset/:type/:tags",
          element: <FoodDetails />,
        },
      ],
    },
  ],
  { basename: "/React-food-app" }
);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router}/>
);

reportWebVitals();
