
export const selectCartItemCount = (state: any) => {
  return state.cart?.itemCount || 0;
};

export const selectCartItems = (state: any) => {
  return state.cart?.items || [];
};

export const selectCartTotal = (state: any) => {
  return state.cart?.total || 0;
};
