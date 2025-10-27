/// <reference types="vite/client" />\

interface UserRegister{
    firstname:string,
    lastname:string,
    username:string,
    email:string,
    password:string
}

interface UserLogin{
    email:string,
    password:string
}

interface RegisterResponse {
    message: string;
    user: userRegister;
}


interface User {
    _id: string;
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    role:String;
    password: string;
    createdAt: string;  // ISO date string
    updatedAt: string;  // ISO date string
}


interface UserState {
    success: boolean;
    user: User|undefined;
    loading: boolean;
}


interface StampForm {
  name: string;
  description: string;
  price: number;
  stock: number;
  images: File[];
  beginDate: string;
  categories: string;
}


interface Stamp {
  category: any;
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  active: boolean;
  images: Array<{
    publicUrl: string;
    publicId: string;
  }>;
  beginDate: string; 
  endDate: string;   
  createdAt?: string;
  updatedAt?: string;
  categories: string;
}

  
  type StampResponse = {
    success: boolean;
    stamps: Stamp[];
    message:String;
  };
  
  type SingleStampResponse = {
    stamps(stamps: any): unknown;
    success: boolean;
    stamp: Stamp;
  };
  
interface StampState {
  stamps: Stamp[];
  selectedStamp?: Stamp;
  loading: boolean;
  success: boolean;
  error?: string;
}

type UploadPhotoResponse = {
  success: boolean;
  wave: {
    _id: string;
    publicId: string;
    url: string;
    createdAt: string; // ISO date string
    __v: number;
  }[];
};


interface OrderItem {
  stamp: string;
  quantity: number;
  _id: string;
}



interface CartStampImage {
  publicId: string;
  publicUrl: string;
  _id: string;
}

interface CartStamp {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  categories:string;
  images: CartStampImage[];
}

interface CartItem {
  stamp: CartStamp;
  quantity: number;
  _id: string;
}

interface CartData {
  _id: string;
  user: string;
  items: CartItem[];
  totalPrice: number;
  selectedCountry: string;
}


interface CartState {
  success: boolean;
  cart: CartData | null;
  loading: boolean;
  ShippingType?:string;
  shippingRate?:number;
  selectedCountry?:string;
}

interface Carousel {
  _id: string;
  name: string;
  images: { publicUrl: string }[];
}


interface SubscriberResponse {
  success: boolean;
  subscribers: Subscriber[];
}

interface Subscriber {
  _id: string;
  user: User;
  subscribedEmail: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface OrderItemToDisplay {
  name: string;
  category: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  image: {
    publicId: string;
    publicUrl: string;
    _id: string;
  };
  _id: string;
}

interface OrderResponse {
  _id: string;
  userId: string;
  items: OrderItemToDisplay[];
  total: number;
  paymentStatus: string;
  status: string;
  stripeSessionId: string;
  paymentIntentId: string;
  dateOfSale: string;
  createdAt: string;
  updatedAt: string;
  shippingAddress: {
    line1: string;
    line2: string;
    city: string;
    state: string;
    country: string;
  };
  paymentDetails: {
    paymentMethod: string;
    paymentId: string;
    amount: number;
    amountSubtotal: number,
    shippingCost:number,
    currency: string;
  };
}



interface OrderItem50 {
  name: string;
  category: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  image: {
    publicUrl: string;
  };
  _id: string;
}

interface Order50 {
  _id: string;
  userId: string;
  items: OrderItem50[];
  total: number;
  paymentStatus: string;
  status: string;
  dateOfSale: string;
  paymentDetails: {
    paymentId: String,
    paymentMethod: string;
    amount: number;
    amountSubtotal: number;
    shippingCost:number;
    currency: string;
  };
  shippingAddress: {
    line1: string;
    line2: string;
    city: string;
    state: string;
    country: string;
  };
}

interface OrderTableProps {
  orders: Order50[];
}


type Month =
  | "Jan" | "Feb" | "Mar" | "Apr"
  | "May" | "Jun" | "Jul" | "Aug"
  | "Sep" | "Oct" | "Nov" | "Dec";

type BarChartDataItem = {
  month: Month;
  quantity: number;
  "Russia 1858-1918": number;
  "Russia 1919-1941": number;
  "Russia 1941-2000": number;
  "Russia Airmails": number;
  "Russia Semi-postal": number;
};

type LineChartDataItem = {
  month: Month;
  Purchasers: number;
};

interface StampSale {
  id: string;
  name: string;
  image: string;
  unitsSold: number;
}

 type OrderChartResponse = {
  success: boolean;
  data: {
    barchatData: BarChartDataItem[];
    lineChatData: LineChartDataItem[];
    topStampsThisMonth:StampSale[];
  };
};


interface Contact {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ContactData {
  success: boolean;
  allContacts: Contact[];
}