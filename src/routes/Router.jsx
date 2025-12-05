import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PetsAndSupplies from "../pages/PetsAndSupplies";
import AddListing from "../pages/AddListing";
import ListingDetails from "../pages/ListingDetails";
import MyListings from "../pages/MyListings";
import MyOrders from "../pages/MyOrders";
import PageNotFound from "../pages/PageNotFound";
import CategoryFilteredPage from "../pages/CategoryFilteredPage";

import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/pets-supplies", element: <PetsAndSupplies /> },
      {
  path: "/category-filtered-product/:categoryName",
  element: <CategoryFilteredPage />,
},

      // ⭐ CATEGORY FILTER ROUTE
      {
        path: "/category-filtered-product/:categoryName",
        element: <PetsAndSupplies />,
      },

      {
        path: "/add-listing",
        element: (
          <PrivateRoute>
            <AddListing />
          </PrivateRoute>
        ),
      },

      {
        path: "/listing/:id",
        element: (
          <PrivateRoute>
            <ListingDetails />
          </PrivateRoute>
        ),
      },

      {
        path: "/my-listings",
        element: (
          <PrivateRoute>
            <MyListings />
          </PrivateRoute>
        ),
      },

      {
        path: "/my-orders",
        element: (
          <PrivateRoute>
            <MyOrders />
          </PrivateRoute>
        ),
      },
    ],
  },

  { path: "*", element: <PageNotFound /> },
]);

export default router;
