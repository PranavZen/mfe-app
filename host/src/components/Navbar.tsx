import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCartItemCount } from "../features/cart/cartSelectors";
import { Logo } from "../shared/components";
import { RootState } from "../types";

const Navbar: React.FC = () => {
  const location = useLocation();
  console.log("location:", location.pathname);
  const cartItemCount = useSelector((state: RootState) =>
    selectCartItemCount(state)
  );
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  console.log("count:", cartItemCount);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="navbar navbar-expand-md navbar-light bg-white shadow-sm sticky-top z-3">
      <div className="container-lg">
        <Link to="/" className="navbar-brand">
          <Logo />
        </Link>

        <div className="d-md-none d-flex align-items-center gap-2">
          <Link to="/cart" className="btn btn-light position-relative">
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            {cartItemCount > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cartItemCount > 9 ? "9+" : cartItemCount}
              </span>
            )}
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>

        <div
          className={`collapse navbar-collapse ${mobileMenuOpen ? "show" : ""}`}
        >
          <ul className="navbar-nav ms-auto gap-2">
            <li className="nav-item">
              <Link
                to="/products"
                className={`nav-link rounded-3 px-3 ${
                  isActive("/products")
                    ? "bg-primary bg-opacity-10 text-primary fw-semibold"
                    : ""
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <svg
                  className="d-inline-block me-2"
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/cart"
                className={`nav-link rounded-3 px-3 position-relative ${
                  isActive("/cart")
                    ? "bg-primary bg-opacity-10 text-primary fw-semibold"
                    : ""
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <svg
                  className="d-inline-block me-2"
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                Cart
                {cartItemCount > 0 && (
                  <span className="badge bg-danger rounded-pill ms-2">
                    {cartItemCount > 99 ? "99+" : cartItemCount}
                  </span>
                )}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
