// composables/useCart.ts
import type { CartItem } from '~/types/cart'


export const useCart = () => {
  const cart = useState<CartItem[]>('cart', () => []) 

  function addToCart(item: CartItem) {
    const existing = cart.value.find((i) => i.id === item.id)
    if (existing) {
      existing.quantity += item.quantity
    } else {
      cart.value.push({ ...item })
    }
  }

  function clearCart() {
    cart.value = []
  }

  return { cart, addToCart, clearCart }
}
