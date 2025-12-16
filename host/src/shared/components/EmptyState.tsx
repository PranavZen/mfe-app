import React from "react";

interface EmptyStateProps {
  icon?: "cart" | "search" | "box";
  title: string;
  description: string;
  actionText?: string;
  actionLink?: string;
  onActionClick?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon = "box",
  title,
  description,
  actionText,
  actionLink,
  onActionClick,
}) => {
  const getIcon = () => {
    switch (icon) {
      case "cart":
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        );
      case "search":
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        );
      case "box":
      default:
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
          />
        );
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light px-3">
      <div className="text-center" style={{ maxWidth: "400px" }}>
        <div
          className="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-4"
          style={{ width: "100px", height: "100px" }}
        >
          <svg
            className="text-primary"
            width="50"
            height="50"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {getIcon()}
          </svg>
        </div>
        <h2 className="display-5 fw-bold mb-3">{title}</h2>
        <p className="fs-5 text-muted mb-4">{description}</p>
        {actionText && (
          <>
            {actionLink ? (
              <a
                href={actionLink}
                className="btn btn-primary btn-lg px-4 d-inline-flex align-items-center"
              >
                <svg
                  className="me-2"
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
                    d="M7 16l-4-4m0 0l4-4m-4 4h18"
                  />
                </svg>
                {actionText}
              </a>
            ) : (
              <button
                onClick={onActionClick}
                className="btn btn-primary btn-lg px-4 d-inline-flex align-items-center"
              >
                {actionText}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default EmptyState;
