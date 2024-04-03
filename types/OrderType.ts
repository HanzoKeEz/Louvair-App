import { ProductType } from './ProductType'

export interface OrderType {
  id: string
  user: string
  amount: number
  status: string
  createdDate: string
  paymentIntentId: string
  userId: string
  products: ProductType[]
}
