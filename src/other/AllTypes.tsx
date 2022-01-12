export interface productType {
  id: string;
  name: string;
  decription: string;
  price: string;
  image: string;
  inStock?: number;
  fastDelivery: boolean;
  ratings: number;
}

export interface filterType {
  byStock: boolean;
  byFastDelivery: boolean;
  byRating: number;
  searchQuery: string;
  sort?: string;
}

export interface cartType {
  id: string;
  name: string;
  decription: string;
  price: number;
  image: string;
  inStock: number;
  fastDelivery: boolean;
  ratings: number;
  quantity?: number;
  totalProductPrice?: number;
}

export interface cartItemsType {
  cartItems: cartType[];
  cartTotalQuantity?: number;
  cartTotalAmount?: number;
}

export interface signUpType {
  id: string;
  name: string;
  email: string;
  profilepic: string;
  phoneNumber: string;
  creationTime: string;
  lastSignInTime: string;
  password?: string;
}
