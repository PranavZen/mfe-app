import { RootState } from '../../types';


export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartTotal = (state: RootState) => state.cart.total;
export const selectCartItemCount = (state: RootState) => state.cart.itemCount;
export const selectCartItemById = (state: RootState, id: number) => 
  state.cart.items.find(item => item.id === id);
