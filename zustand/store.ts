import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { AddCartType } from '@/types/AddCartType'

type CartActions = {
	toggleCart: () => void
	addProduct: (item: AddCartType) => void
	removeProduct: (item: AddCartType) => void
	setPaymentIntent: (value: string) => void
	setCheckout: (value: string) => void
	clearCart: () => void
}

type CartStateType = {
	isOpen: boolean
	cart: AddCartType[]
	paymentIntent: string
	onCheckout: string
} & CartActions

type SetState = (fn: (state: CartStateType) => CartStateType) => void
type GetState = () => CartStateType

const options = { name: 'cart-store' }

const setupFunction = (set: SetState, get: GetState): CartStateType => ({
	// INITIAL STATE
	cart: [],
	isOpen: false,
	paymentIntent: '',
	onCheckout: 'cart',
	// ACTIONS
	toggleCart: () => {
		set((state) => {
			return { ...state, isOpen: !state.isOpen }
		})
	},
	// Adding is simpler to map through the cart items and increment the quantity
	// if the item exists, or else we add the item at the end of the array.
	addProduct: (item) => {
		set((state) => {
			const itemExists = state.cart.find((cartItem) => cartItem.id === item.id)
			// If the item exists in the cart, we want to update the quantity.
			if (itemExists) {
				return {
					...state, // 👈🏻 spread existing state
					// If the item already exists in the cart, increment its quantity
					cart: state.cart.map((cartItem) =>
						cartItem.id === item.id
							? { ...cartItem, quantity: cartItem.quantity! + 1 }
							: // Otherwise return the item as is (no change)
							  cartItem
					),
				}
			}
			// If the item does not exist in the cart, add it with quantity 1
			return {
				...state, // 👈🏻 spread existing state
				cart: [...state.cart, { ...item, quantity: 1 }],
			}
		})
	},
	removeProduct: (item) => {
		set((state) => {
			const itemExists = state.cart.find((cartItem) => cartItem.id === item.id)
			// If the item exists in the cart and its quantity is greater than 1, we
			// want to decrement the quantity.
			if (itemExists && itemExists.quantity! > 1) {
				return {
					...state, // 👈🏻 spread existing state
					cart: state.cart.map(
						(cartItem) => (cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity! - 1 } : cartItem) // All other items are added and remain unchanged :)
					),
				}
			} else {
				// Otherwise, else if the item exists in the cart and its quantity is 1
				// or less, we want to remove the item from the cart.
				return {
					...state, // 👈🏻 spread existing state
					cart: state.cart.filter((cartItem) => cartItem.id !== item.id),
				}
			}
		})
	},
	setPaymentIntent: (value) => {
		set((state) => {
			return { ...state, paymentIntent: value }
		})
	},
	setCheckout: (value) => {
		set((state) => {
			return { ...state, onCheckout: value }
		})
	},
	clearCart: () => {
		set((state) => {
			return { ...state, cart: [] }
		})
	},
})

export const useCartStore = create(persist(setupFunction, options))

type ThemeActions = {
	toggleTheme: (mode: 'light' | 'dark') => void
}

type ThemeStateType = {
	mode: 'light' | 'dark'
} & ThemeActions

export const useThemeStore = create<ThemeStateType>()(
	persist(
		(set) => ({
			mode: 'light',
			toggleTheme: (theme) => set((state) => ({ mode: theme })),
		}),
		{
			name: 'theme-store',
		}
	)
)

// const useStore = create<ThemeStateType>()(
// 	persist(
// 		(set, get) => ({
// 			theme: 'dark',
// 			setTheme: () =>
// 				set((state) => ({
// 					...state,
// 					theme: get().theme === 'dark' ? 'light' : 'dark',
// 				})),
// 		}),
// 		{
// 			name: 'theme', // name of the item in the storage (must be unique)
// 		}
// 	)
// )

// export const useTheme = () => useStore((state) => state.theme)
// export const useSetTheme = () => useStore((state) => state.setTheme)
