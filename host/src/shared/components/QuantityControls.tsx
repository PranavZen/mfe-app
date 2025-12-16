import React from "react";

interface QuantityControlsProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  maxQuantity?: number;
  disabled?: boolean;
}

const QuantityControls: React.FC<QuantityControlsProps> = ({
  quantity,
  onIncrement,
  onDecrement,
  maxQuantity,
  disabled = false,
}) => {
  const isMaxReached = maxQuantity !== undefined && quantity >= maxQuantity;

  return (
    <div className="d-flex align-items-center justify-content-center gap-2">
      <button
        onClick={onDecrement}
        className="btn btn-outline-primary"
        style={{ width: "40px", height: "40px" }}
        disabled={disabled}
      >
        −
      </button>
      <span
        className="fw-bold fs-5 mx-2"
        style={{ minWidth: "30px", textAlign: "center" }}
      >
        {quantity}
      </span>
      <button
        onClick={onIncrement}
        className="btn btn-outline-primary"
        style={{ width: "40px", height: "40px" }}
        disabled={disabled || isMaxReached}
      >
        +
      </button>
    </div>
  );
};

export default QuantityControls;
