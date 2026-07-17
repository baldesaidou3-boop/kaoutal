export type Role = 'buyer' | 'seller' | 'admin'

export interface Profile {
  id: string
  full_name: string | null
  phone: string | null
  avatar_url: string | null
  role: Role
  created_at: string
  updated_at: string
}

export interface Seller {
  id: string
  store_name: string
  store_slug: string
  description: string | null
  logo_url: string | null
  whatsapp: string | null
  city: string | null
  is_verified: boolean
  is_active: boolean
  commission_rate: number
  created_at: string
  updated_at: string
}

export interface Category {
  id: number
  name: string
  slug: string
  description: string | null
  icon: string | null
  image_url: string | null
  sort_order: number
}

export type ProductStatus = 'draft' | 'active' | 'paused' | 'archived'

export interface Product {
  id: string
  seller_id: string
  category_id: number
  name: string
  slug: string
  description: string | null
  price: number
  compare_price: number | null
  stock: number
  unit: string
  status: ProductStatus
  images: string[]
  tags: string[]
  created_at: string
  updated_at: string
  seller?: Seller
  category?: Category
}

export interface Cart {
  id: string
  buyer_id: string
  created_at: string
  updated_at: string
  items?: CartItem[]
}

export interface CartItem {
  id: string
  cart_id: string
  product_id: string
  quantity: number
  price_at_add: number
  product?: Product
}

export type OrderStatus = 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded'

export interface Order {
  id: string
  buyer_id: string
  status: OrderStatus
  total: number
  shipping_address: string | null
  phone: string | null
  payment_method: string | null
  payment_status: PaymentStatus
  created_at: string
  updated_at: string
  items?: OrderItem[]
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  seller_id: string
  quantity: number
  unit_price: number
  subtotal: number
  product?: Product
}
