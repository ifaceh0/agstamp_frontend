// src/types.ts

// --- SHARED TYPES ---

export interface Category {
  _id: string;
  name: string;
}

export interface Image {
  publicId: string;
  publicUrl: string;
}

// --- API DATA TYPE ---
// This is for the stamp data you receive from your database (used in AllStamp.tsx)

export interface Stamp {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  active: boolean;
  images: { publicId: string; publicUrl: string }[];
  categories?: Category[] | String; // A single object, just like in your API
  beginDate?: string;
  endDate?: string;
   // 👇 ADD '?' TO MAKE THESE OPTIONAL
  createdAt?: string; 
  updatedAt?: string;
}

// --- FORM STATE TYPE ---
// This is for the form state when creating a new stamp (used in AddStamp.tsx)

export interface StampForm {
  name: string;
  description: string;
  price: number;
  stock: number;
  images: File[];
  beginDate: string;
  categories: Category[]; // An array, because the form can handle multiple
}

// types/cartTypes.ts
export interface Rate {
  _id: string;
  type: string;
  price: number;
  currency: string;
}

export interface CartItem {
  id: string;
  name: string;
  quantity: number;
  rates: Rate[];
}

export interface CartState {
  items: CartItem[];
  ShippingType: string;
  selectedCountry: string;
}
