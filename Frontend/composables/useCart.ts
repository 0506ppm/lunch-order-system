// composables/useCart.ts
export const useCart = () => {
  const cart = useState('cart', () =>
    [] as { name: string, image: string, quantity: number, price: number }[]
  )

  function addToCart(item: { name: string, image: string, quantity: number, price: number }) {
    const existing = cart.value.find(i => i.name === item.name)
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
