// context/CartContext.tsx

import { createContext, useContext, useState, ReactNode } from "react"

interface CartContextType {
  cartItems: any[] // Adjust this type based on your cart item structure
  addToCart: (item: any) => void
  getCartItemCount: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<any[]>([])

  const addToCart = (item: any) => {
    setCartItems((prevItems) => [...prevItems, item])
  }

  const getCartItemCount = () => cartItems.length

  return (
    <CartContext.Provider value={{ cartItems, addToCart, getCartItemCount }}>
      {children}
    </CartContext.Provider>
  )
}
