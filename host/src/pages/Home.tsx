import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCartItemCount } from "../features/cart/cartSelectors";
import { RootState } from "../types";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const cartItemCount = useSelector((state: RootState) =>
    selectCartItemCount(state)
  );

  return (
    <div className="min-vh-100 bg-light">
      <section className="bg-primary bg-gradient text-white position-relative overflow-hidden">
        <div className="container-lg py-5">
          <div
            className="row align-items-center"
            style={{ minHeight: "400px" }}
          >
            <div className="col-lg-8 col-xl-7">
              <h1 className="display-2 fw-bold mb-4">Welcome to MFE Shop</h1>
              <p className="fs-4 mb-4 opacity-75">
                Experience seamless shopping with our modern microfrontend
                architecture. Browse products, add to cart, and enjoy a fluid
                shopping experience.
              </p>
              <div className="d-flex flex-column flex-sm-row gap-3">
                <button
                  onClick={() => navigate("/products")}
                  className="btn btn-light btn-lg px-4 shadow"
                >
                  Browse Products
                </button>
                {cartItemCount > 0 && (
                  <button
                    onClick={() => navigate("/cart")}
                    className="btn btn-outline-light btn-lg px-4"
                  >
                    View Cart ({cartItemCount})
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container-lg py-4">
          <h2 className="display-4 fw-bold text-center mb-5">
            Why Choose MFE Shop?
          </h2>
          <div className="row g-4">
            <div className="col-md-6 col-lg-4">
              <div className="card h-100 border-0 shadow-sm hover-scale">
                <div className="card-body text-center p-4">
                  <div
                    className="bg-primary bg-gradient rounded-circle d-inline-flex align-items-center justify-content-center mb-4"
                    style={{ width: "80px", height: "80px" }}
                  >
                    <svg
                      className="text-white"
                      width="40"
                      height="40"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <h3 className="h4 fw-semibold mb-3">Lightning Fast</h3>
                  <p className="text-muted mb-0">
                    Built with modern technologies for optimal performance and
                    speed.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-4">
              <div className="card h-100 border-0 shadow-sm hover-scale">
                <div className="card-body text-center p-4">
                  <div
                    className="bg-success bg-gradient rounded-circle d-inline-flex align-items-center justify-content-center mb-4"
                    style={{ width: "80px", height: "80px" }}
                  >
                    <svg
                      className="text-white"
                      width="40"
                      height="40"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <h3 className="h4 fw-semibold mb-3">Secure & Reliable</h3>
                  <p className="text-muted mb-0">
                    Your data is safe with our enterprise-grade security
                    measures.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-12 col-lg-4">
              <div className="card h-100 border-0 shadow-sm hover-scale">
                <div className="card-body text-center p-4">
                  <div
                    className="bg-danger bg-gradient rounded-circle d-inline-flex align-items-center justify-content-center mb-4"
                    style={{ width: "80px", height: "80px" }}
                  >
                    <svg
                      className="text-white"
                      width="40"
                      height="40"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <h3 className="h4 fw-semibold mb-3">Mobile Friendly</h3>
                  <p className="text-muted mb-0">
                    Fully responsive design that works perfectly on all devices.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary bg-gradient text-white py-5">
        <div className="container-lg py-4 text-center">
          <h2 className="display-4 fw-bold mb-4">Ready to Start Shopping?</h2>
          <p className="fs-5 mb-4 opacity-75">
            Explore our curated collection of products
          </p>
          <button
            onClick={() => navigate("/products")}
            className="btn btn-light btn-lg px-5 shadow"
          >
            Start Shopping Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
