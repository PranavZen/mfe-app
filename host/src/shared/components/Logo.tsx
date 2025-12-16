import React from "react";

const Logo: React.FC = () => {
  return (
    <div className="d-flex align-items-center">
      <div
        className="bg-primary bg-gradient rounded-3 p-2 me-2"
        style={{ width: "48px", height: "48px" }}
      >
        <svg
          className="text-white"
          width="32"
          height="32"
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
      </div>
      <span className="fs-3 fw-bold text-primary">MFE Shop</span>
    </div>
  );
};

export default Logo;
