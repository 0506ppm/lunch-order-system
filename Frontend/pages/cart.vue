<template>
  <TheHeader />
  <div class="p-8">
    <div class="text-right">
      <button
        @click="$router.push('/menu')"
        class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        繼續點餐
      </button>
    </div>
    <h3 class="text-5xl font-bold mb-4">🛒 購物車</h3>

    <div v-if="cart.length === 0" class="text-gray-600">目前購物車是空的。</div>

    <div v-else class="space-y-4">
      <div
        v-for="(item, index) in cart"
        :key="index"
        class="flex items-center space-x-4 border-b pb-2"
      >
        <img :src="`/images/${item.image}`" :alt="item.name" class="w-24 h-24 object-contain" />
        <div class="flex-1">
          <p class="font-semibold">{{ item.name }}</p>
          <p>數量：{{ item.quantity }}</p>
          <p>單價：${{ item.price }}</p>
        </div>
      </div>

      <!-- 電話輸入 -->
      <div class="mt-6">
        <label class="block text-black dark:text-white mb-2 text-lg">請輸入聯絡電話：</label>
        <input
          type="tel"
          v-model="phone"
          class="w-full md:w-1/3 border rounded px-4 py-2  text-black dark:text-white"
          placeholder="例如：0912-345-678"
        />
      </div>

      <div class="text-right mt-6">
        <p class="text-xl font-bold">總金額：${{ total }}</p>
      </div>

      <div class="mt-4 flex justify-between">
        <div>
          <button
            @click="clearCart"
            class="bg-yellow-400 text-black px-3 py-2 rounded hover:bg-yellow-600"
          >
            清空購物車
          </button>
        </div>
        <button
          @click="checkout"
          class="text-3xl font-bold bg-red-600 text-white px-6 py-3 rounded hover:bg-red-700"
        >
          結帳
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUser } from '@clerk/vue'
const { cart, clearCart } = useCart()
const { user, isLoaded } = useUser()

const phone = ref('')

// 計算總金額
const total = computed(() =>
  cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
)

// 結帳邏輯
async function checkout() {
  if (!user.value) {
    alert('請先登入！')
    return
  }

  if (!phone.value.trim()) {
    alert('請輸入聯絡電話')
    return
  }

  const payload = {
    name: user.value.fullName,
    phone: phone.value,
    orders: cart.value.map((item) => ({
      item: item.name,
      quantity: item.quantity
    }))
  }

  try{
    const res = await $fetch('http://localhost:3000/api/order', {
      method: 'POST',
      body: payload
    })
    console.log('✅ API 回應:', res)
    alert('✅ 訂單送出成功')

    clearCart()
    phone.value = ''
  } catch (error) {
    console.error('❌ 訂單送出失敗:', error)
    alert('❌ 訂單送出失敗，請稍後再試')
  }
}
</script>
