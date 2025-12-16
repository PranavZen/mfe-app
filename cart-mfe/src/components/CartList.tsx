import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  updateQuantity,
  clearCart,
} from "../../../host/src/features/cart/cartSlice";
import {
  selectCartItems,
  selectCartTotal,
  selectCartItemCount,
} from "../../../host/src/features/cart/cartSelectors";
import {
  QuantityControls,
  EmptyState,
} from "../../../host/src/shared/components";
import { CartItem } from "../types";

const CartList: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: any) => selectCartItems(state));
  const total = useSelector((state: any) => selectCartTotal(state));
  const itemCount = useSelector((state: any) => selectCartItemCount(state));

  const handleRemoveItem = (id: number) => {
    // console.log('cadrt itm remobed:', id);
    dispatch(removeFromCart(id));
  };

  const handleUpdateQuantity = (
    id: number,
    currentQuantity: number,
    change: number
  ) => {
    const newQuantity = currentQuantity + change;

    if (newQuantity > 0) {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    } else {
      dispatch(removeFromCart(id));
    }
  };

  const handleClearCart = () => {
    // alert('Clearing entire cart');
    if (window.confirm("Are you sure you want to clear your cart?")) {
      dispatch(clearCart());
    }
  };

  const handleCheckout = () => {
    alert(
      `Proceeding to checkout with ${itemCount} items totaling ₹${total.toFixed(
        2
      )}`
    );
  };

  if (cartItems.length === 0) {
    return (
      <EmptyState
        icon="cart"
        title="Your cart is empty"
        description="Start shopping to add items to your cart"
        actionText="Browse Products"
        actionLink="/products"
      />
    );
  }

  return (
    <div className="min-vh-100 bg-light py-4">
      <div className="container-lg">
        <div className="mb-4">
          <h1 className="display-4 fw-bold mb-2">Shopping Cart</h1>
        </div>

        <div className="row g-4">
          <div className="col-lg-8">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <p className="text-muted mb-0">
                {itemCount} {itemCount === 1 ? "item" : "items"} in your cart
              </p>
              <button
                onClick={handleClearCart}
                className="btn btn-outline-danger d-flex align-items-center gap-2"
              >
                <svg
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
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Clear Cart
              </button>
            </div>

            <div className="d-flex flex-column gap-3">
              {cartItems.map((item: CartItem) => (
                <div key={item.id} className="card border-0 shadow-sm">
                  <div className="card-body p-3 p-sm-4">
                    <div className="row g-3">
                      <div className="col-12 col-sm-auto">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="rounded"
                          style={{
                            width: "100%",
                            maxWidth: "150px",
                            height: "150px",
                            objectFit: "cover",
                          }}
                        />
                      </div>

                      <div className="col">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <div className="flex-fill">
                            <h5 className="fw-semibold mb-2">{item.name}</h5>
                            <span className="badge bg-primary bg-opacity-10 text-primary">
                              {item.category}
                            </span>
                          </div>
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            className="btn btn-sm btn-outline-danger ms-2"
                            title="Remove item"
                          >
                            <svg
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
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>

                        <p
                          className="text-muted small mb-3"
                          style={{
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {item.description}
                        </p>

                        <div className="row g-3 align-items-center">
                          <div className="col-sm-auto">
                            <div className="d-flex align-items-baseline gap-2">
                              <span className="h4 text-primary mb-0">
                                ₹{item.price}
                              </span>
                              <span className="small text-muted">each</span>
                            </div>
                          </div>

                          <div className="col-sm-auto">
                            <div className="d-flex align-items-center gap-2">
                              <span className="small fw-medium text-nowrap">
                                Quantity:
                              </span>
                              <QuantityControls
                                quantity={item.quantity}
                                onIncrement={() =>
                                  handleUpdateQuantity(
                                    item.id,
                                    item.quantity,
                                    1
                                  )
                                }
                                onDecrement={() =>
                                  handleUpdateQuantity(
                                    item.id,
                                    item.quantity,
                                    -1
                                  )
                                }
                              />
                            </div>
                          </div>
                        </div>

                        <div className="mt-3 pt-3 border-top">
                          <div className="d-flex justify-content-between align-items-center">
                            <span className="small fw-medium text-muted">
                              Item Total:
                            </span>
                            <span className="h5 fw-bold mb-0">
                              ₹{(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-lg-4">
            <div
              className="card border-0 shadow-sm sticky-top"
              style={{ top: "80px" }}
            >
              <div className="card-body p-4">
                <h2 className="h4 fw-bold mb-4">Order Summary</h2>

                <div className="d-flex flex-column gap-3 mb-4">
                  <div className="d-flex justify-content-between">
                    <span className="text-muted">
                      Subtotal ({itemCount} items)
                    </span>
                    <span className="fw-medium">₹{total.toFixed(2)}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span className="text-muted">Shipping</span>
                    <span className="fw-medium text-success">FREE</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span className="text-muted">Tax (estimated)</span>
                    <span className="fw-medium">
                      ₹{(total * 0.1).toFixed(2)}
                    </span>
                  </div>
                  <div className="border-top pt-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="fw-bold">Total</span>
                      <span className="h4 text-primary mb-0">
                        ₹{(total * 1.1).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="btn btn-primary w-100 py-3 mb-2 fw-semibold"
                >
                  Proceed to Checkout
                </button>

                <a
                  href="/products"
                  className="btn btn-outline-secondary w-100 py-2"
                >
                  Continue Shopping
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartList;
