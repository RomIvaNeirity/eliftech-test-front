export interface Shop {
  id: number;
  name: string;
  rating: number;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  shopId: number;
}

export interface OrderItem {
  id: number;
  productId: number;
  quantity: number;
  product?: Product;
}

export interface Order {
  id?: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  items: OrderItem[];
  totalPrice: number;
  createdAt: string;
}

export interface CartFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface CreateOrderDto {
  name: string;
  email: string;
  phone: string;
  address: string;
  totalPrice: number;
  items: { productId: number; quantity: number }[];
}
