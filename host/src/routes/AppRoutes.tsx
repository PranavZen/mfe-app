import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";

const ProductsList = lazy(() => import("products/ProductsList"));
const CartList = lazy(() => import("cart/CartList"));

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/products"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <ProductsList />
          </Suspense>
        }
      />
      <Route
        path="/cart"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <CartList />
          </Suspense>
        }
      />
      <Route
        path="*"
        element={
          <div className="text-center py-5 min-vh-100 d-flex flex-column align-items-center justify-content-center">
            <h1>404 - Page Not Found</h1>
            <a href="/">Go Home</a>
          </div>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
