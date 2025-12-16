import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  updateQuantity,
  removeFromCart,
} from "../../../host/src/features/cart/cartSlice";
import { selectCartItems } from "../selectors/cartSelectors";
import {
  QuantityControls,
  StarRating,
  EmptyState,
} from "../../../host/src/shared/components";
import { products } from "../data/products";
import { Product } from "../types";

const ProductsList: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [addedToCart, setAddedToCart] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<string>("featured");

  const categories = [
    "All",
    ...Array.from(new Set(products.map((p) => p.category))),
  ];

  let filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  switch (sortBy) {
    case "price-low":
      filteredProducts = [...filteredProducts].sort(
        (a, b) => a.price - b.price
      );
      break;
    case "price-high":
      filteredProducts = [...filteredProducts].sort(
        (a, b) => b.price - a.price
      );
      break;
    case "rating":
      filteredProducts = [...filteredProducts].sort(
        (a, b) => b.rating - a.rating
      );
      break;
    case "name":
      filteredProducts = [...filteredProducts].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      break;
  }

  const handleAddToCart = (product: Product) => {
    // console.log('product.id:', product.id);
    dispatch(addToCart(product));
    setAddedToCart(product.id);
    setTimeout(() => setAddedToCart(null), 2000);
  };

  const handleIncrement = (product: Product) => {
    const cartItem = cartItems.find((item: any) => item.id === product.id);
    if (cartItem) {
      // console.log('increemnt:', product.id);
      dispatch(
        updateQuantity({ id: product.id, quantity: cartItem.quantity + 1 })
      );
    }
  };

  const handleDecrement = (product: Product) => {
    const cartItem = cartItems.find((item: any) => item.id === product.id);
    if (cartItem) {
      if (cartItem.quantity > 1) {
        // console.log('Decrement');
        dispatch(
          updateQuantity({ id: product.id, quantity: cartItem.quantity - 1 })
        );
      } else {
        // console.log('Removing item:', product.id);
        dispatch(removeFromCart(product.id));
      }
    }
  };

  const getCartQuantity = (productId: number): number => {
    const cartItem = cartItems.find((item: any) => item.id === productId);
    // console.log('Getting cart quantity for product:', productId, cartItem?.quantity || 0);
    return cartItem ? cartItem.quantity : 0;
  };

  return (
    <div className="min-vh-100 bg-light">
      <div className="container-lg">
        <div className="row">
          <div className="col-lg-3 col-xl-3 bg-white border-end p-0 z-0">
            <div className="sticky-top" style={{ top: "56px" }}>
              <div className="p-3">
                <h1 className="h4 fw-bold text-primary mb-4">
                  Discover MFE Products
                </h1>

                <div className="position-relative mb-4">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="form-control form-control-sm ps-4"
                  />
                  <svg
                    className="position-absolute top-50 start-0 translate-middle-y ms-2 text-secondary"
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="btn btn-link btn-sm position-absolute top-50 end-0 translate-middle-y text-secondary p-0 pe-2"
                    >
                      <svg
                        width="16"
                        height="16"
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
                  )}
                </div>

                <div className="mb-4">
                  <h6 className="fw-semibold mb-3 text-uppercase small text-muted">
                    <svg
                      className="me-2"
                      width="14"
                      height="14"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                      />
                    </svg>
                    Categories
                  </h6>
                  <div className="d-flex flex-column gap-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`btn btn-sm text-start position-relative d-flex align-items-center justify-content-between px-3 py-2 rounded-3 ${
                          selectedCategory === category
                            ? "btn-primary shadow-sm"
                            : "btn-light text-dark border-0 hover-bg-light"
                        }`}
                        style={{
                          transition: "all 0.2s ease",
                          fontWeight:
                            selectedCategory === category ? "600" : "500",
                        }}
                      >
                        <span>{category}</span>
                        {selectedCategory === category && (
                          <svg
                            width="16"
                            height="16"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                          >
                            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <h6 className="fw-semibold mb-3 text-uppercase small">
                    Sort By
                  </h6>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="form-select form-select-sm"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="name">Name: A to Z</option>
                  </select>
                </div>

                {(selectedCategory !== "All" || searchTerm) && (
                  <div className="mb-3">
                    <h6 className="fw-semibold mb-3 text-uppercase small">
                      Active Filters
                    </h6>
                    <div className="d-flex flex-column gap-2">
                      {selectedCategory !== "All" && (
                        <span className="badge bg-primary d-flex align-items-center justify-content-between">
                          {selectedCategory}
                          <button
                            onClick={() => setSelectedCategory("All")}
                            className="btn-close btn-close-white ms-2"
                            style={{ fontSize: "0.5rem" }}
                            aria-label="Close"
                          ></button>
                        </span>
                      )}
                      {searchTerm && (
                        <span className="badge bg-secondary d-flex align-items-center justify-content-between">
                          <span className="text-truncate">{searchTerm}</span>
                          <button
                            onClick={() => setSearchTerm("")}
                            className="btn-close btn-close-white ms-2"
                            style={{ fontSize: "0.5rem" }}
                            aria-label="Close"
                          ></button>
                        </span>
                      )}
                      <button
                        onClick={() => {
                          setSelectedCategory("All");
                          setSearchTerm("");
                        }}
                        className="btn btn-link btn-sm text-danger p-0 text-start"
                      >
                        Clear all
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="col-lg-9 col-xl-9 p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <span className="text-secondary">
                  <strong className="text-primary">
                    {filteredProducts.length}
                  </strong>{" "}
                  products found
                </span>
              </div>
            </div>

            <div>
              {filteredProducts.length === 0 ? (
                <div className="text-center py-5">
                  <svg
                    className="text-secondary mb-3"
                    width="64"
                    height="64"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h3 className="h4 text-secondary mb-2">No products found</h3>
                  <p className="text-muted">
                    Try adjusting your filters or search term
                  </p>
                </div>
              ) : (
                <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-3 g-4">
                  {filteredProducts.map((product) => (
                    <div key={product.id} className="col">
                      <div className="card h-100 border-0 shadow-sm">
                        <div className="position-relative overflow-hidden">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="card-img-top"
                            style={{
                              height: "250px",
                              objectFit: "cover",
                            }}
                          />
                          {product.stock < 10 && product.stock > 0 && (
                            <span className="position-absolute top-0 end-0 m-2 badge bg-warning text-dark">
                              Only {product.stock} left!
                            </span>
                          )}
                          {product.stock === 0 && (
                            <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-75 d-flex align-items-center justify-content-center">
                              <span className="badge bg-danger fs-6">
                                OUT OF STOCK
                              </span>
                            </div>
                          )}
                          {product.discount && product.discount > 0 && (
                            <span className="position-absolute top-0 start-0 m-2 badge bg-danger">
                              {product.discount}% OFF
                            </span>
                          )}
                        </div>

                        <div className="card-body d-flex flex-column">
                          <h5
                            className="card-title fw-bold text-truncate"
                            style={{ maxWidth: "100%" }}
                          >
                            {product.name}
                          </h5>
                          <p
                            className="card-text text-muted small mb-2"
                            style={{
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                            }}
                          >
                            {product.description}
                          </p>
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <StarRating rating={product.rating} />
                            <span className="badge bg-light text-dark">
                              {product.category}
                            </span>
                          </div>
                          <div className="mt-auto">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                              <div>
                                {product.discount && product.discount > 0 ? (
                                  <>
                                    <div className="h4 text-primary mb-0">
                                      ₹
                                      {(
                                        product.price *
                                        (1 - product.discount / 100)
                                      ).toFixed(2)}
                                    </div>
                                    <small className="text-decoration-line-through text-muted">
                                      ₹{product.price.toFixed(2)}
                                    </small>
                                  </>
                                ) : (
                                  <div className="h4 text-primary mb-0">
                                    ₹{product.price.toFixed(2)}
                                  </div>
                                )}
                              </div>
                              {product.stock > 0 && product.stock < 50 && (
                                <small className="badge bg-warning text-dark">
                                  {product.stock} in stock
                                </small>
                              )}
                            </div>
                            {getCartQuantity(product.id) > 0 ? (
                              <QuantityControls
                                quantity={getCartQuantity(product.id)}
                                onIncrement={() => handleIncrement(product)}
                                onDecrement={() => handleDecrement(product)}
                                maxQuantity={product.stock}
                              />
                            ) : (
                              <button
                                onClick={() => handleAddToCart(product)}
                                disabled={
                                  product.stock === 0 ||
                                  addedToCart === product.id
                                }
                                className={`btn w-100 ${
                                  product.stock === 0
                                    ? "btn-secondary"
                                    : addedToCart === product.id
                                    ? "btn-success"
                                    : "btn-primary"
                                }`}
                              >
                                {product.stock === 0
                                  ? "Out of Stock"
                                  : addedToCart === product.id
                                  ? "✓ Added to Cart!"
                                  : "Add to Cart"}
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsList;
