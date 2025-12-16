import React from "react";
import ProductsList from "./components/ProductsList";
import Navbar from "./components/Navbar";
import { Footer } from "../../host/src/shared/components";

const App: React.FC = () => {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <Navbar />
      <div className="flex-grow-1 bg-light">
        <ProductsList />
      </div>
      <Footer />
    </div>
  );
};

export default App;
