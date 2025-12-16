import React from "react";
import { useSelector } from "react-redux";
import { selectCartItemCount } from "../selectors/cartSelectors";
import { Logo } from "../../../host/src/shared/components";

const Navbar: React.FC = () => {
  const cartItemCount = useSelector((state: any) => selectCartItemCount(state));

  return (
    <nav className="navbar navbar-light bg-white shadow-sm sticky-top">
      <div className="container-lg">
        <a href="/" className="navbar-brand">
          <Logo />
        </a>

        <div className="d-flex align-items-center gap-2">
          <a href="/products" className="btn btn-light">
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
          </a>
          <a href="/cart" className="btn btn-light position-relative">
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
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
