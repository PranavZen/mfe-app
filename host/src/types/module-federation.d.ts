

declare module 'products/ProductsList' {
  const ProductsList: React.ComponentType;
  export default ProductsList;
}

declare module 'cart/CartList' {
  const CartList: React.ComponentType;
  export default CartList;
}

declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

declare module '*.png' {
  const value: string;
  export default value;
}

declare module '*.jpg' {
  const value: string;
  export default value;
}

declare module '*.svg' {
  const value: string;
  export default value;
}
