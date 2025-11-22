import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GuestCartItem {
  stamp: {
    _id: string;
    name: string;
    price: number;
    stock: number;
    description?: string;
    images?: { publicId: string; publicUrl: string }[];
  };
  quantity: number;
}

interface GuestCartState {
  items: GuestCartItem[];
  totalPrice: number;
  selectedCountry: string;
  shippingRate: number;
  isGuestCart: boolean;
}

// Load from localStorage on init
const loadGuestCart = (): GuestCartState => {
  try {
    const saved = localStorage.getItem('guestCart');
    if (saved) {
      const parsed = JSON.parse(saved);
      return { ...parsed, isGuestCart: true };
    }
  } catch (e) {
    console.error('Error loading guest cart:', e);
  }
  return {
    items: [],
    totalPrice: 0,
    selectedCountry: 'US',
    shippingRate: 0,
    isGuestCart: true
  };
};

// Save to localStorage
const saveGuestCart = (state: GuestCartState) => {
  try {
    localStorage.setItem('guestCart', JSON.stringify(state));
  } catch (e) {
    console.error('Error saving guest cart:', e);
  }
};

const initialState: GuestCartState = loadGuestCart();

const guestCartSlice = createSlice({
  name: 'guestCart',
  initialState,
  reducers: {
    addToGuestCart: (state, action: PayloadAction<{ stamp: GuestCartItem['stamp']; quantity: number }>) => {
      const { stamp, quantity } = action.payload;
      const existingItem = state.items.find(item => item.stamp._id === stamp._id);
      
      if (existingItem) {
        const newQty = existingItem.quantity + quantity;
        if (newQty <= stamp.stock) {
          existingItem.quantity = newQty;
        }
      } else {
        if (quantity <= stamp.stock) {
          state.items.push({ stamp, quantity });
        }
      }
      
      state.totalPrice = state.items.reduce((sum, item) => sum + item.stamp.price * item.quantity, 0);
      saveGuestCart(state);
    },

    updateGuestCartQuantity: (state, action: PayloadAction<{ stampId: string; delta: number }>) => {
      const { stampId, delta } = action.payload;
      const item = state.items.find(i => i.stamp._id === stampId);
      
      if (item) {
        const newQty = item.quantity + delta;
        if (newQty <= 0) {
          state.items = state.items.filter(i => i.stamp._id !== stampId);
        } else if (newQty <= item.stamp.stock) {
          item.quantity = newQty;
        }
      }
      
      state.totalPrice = state.items.reduce((sum, item) => sum + item.stamp.price * item.quantity, 0);
      saveGuestCart(state);
    },

    removeFromGuestCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.stamp._id !== action.payload);
      state.totalPrice = state.items.reduce((sum, item) => sum + item.stamp.price * item.quantity, 0);
      saveGuestCart(state);
    },

    clearGuestCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
      localStorage.removeItem('guestCart');
    },

    setGuestSelectedCountry: (state, action: PayloadAction<string>) => {
      state.selectedCountry = action.payload;
      saveGuestCart(state);
    },

    setGuestShippingRate: (state, action: PayloadAction<number>) => {
      state.shippingRate = action.payload;
      saveGuestCart(state);
    },

    // Merge guest cart into user cart after login (optional)
    mergeGuestCartToUser: (state) => {
      const items = [...state.items];
      state.items = [];
      state.totalPrice = 0;
      localStorage.removeItem('guestCart');
      return { ...state, itemsToMerge: items };
    }
  }
});

export const {
  addToGuestCart,
  updateGuestCartQuantity,
  removeFromGuestCart,
  clearGuestCart,
  setGuestSelectedCountry,
  setGuestShippingRate,
  mergeGuestCartToUser
} = guestCartSlice.actions;

export default guestCartSlice.reducer;