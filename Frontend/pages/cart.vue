<template>
  <TheHeader />
  <UNotifications />

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

  <!-- 等待訂單確認 -->
  <UModal v-if="submitting" v-model:open="submitting">
    <template #body>
      <div class="p-8 text-center text-2xl font-bold text-black dark:text-white mb-4">
        等待店家確認中...
      </div>
    </template>
    <template #footer>
      <div class="w-full flex justify-center items-center">
        <UButton loading size="xl" color="primary">訂單處理中</UButton>
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import { useUser } from '@clerk/vue'
import { onBeforeUnmount } from 'vue'

const { cart, clearCart } = useCart()
const { user } = useUser()
const apiBase = useRuntimeConfig().public.apiBase
const phone = ref('')
const toast = useToast()

const submitting = ref(false)
const orderStatusMessage = ref('')
const orderId = ref<string | null>(null)
let pollTimer: ReturnType<typeof setInterval> | null = null

interface OrderStatusResponse {
  success: boolean
  status: '已建立' | '已接受' | '已取消'
}

// 計算總金額
const total = computed(() =>
  cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
)

// 
function startPolling() {
  if (pollTimer) clearInterval(pollTimer)

  pollTimer = setInterval(async () => {
    if (!orderId.value) return

    try {
      const res: OrderStatusResponse = await $fetch(`${apiBase}/api/order/${orderId.value}/status`)
      if (res.status === '已接受') {
        orderStatusMessage.value = '✅ 訂單送出成功！'
        toast.add({ title: '✅ 訂單送出成功！', color: 'success' })
        clearInterval(pollTimer!)
        pollTimer = null
        clearCart()
        phone.value = ''
        submitting.value = false
      } else if (res.status === '已取消') {
        orderStatusMessage.value = '❌ 目前訂單爆單中，請稍後再試'
        toast.add({ title: '❌目前無法下單！，請稍後再試', color: 'error' })
        clearInterval(pollTimer!)
        pollTimer = null
        submitting.value = false
      }
    } catch (err) {
      console.error('❌ 查詢訂單狀態失敗:', err)
      toast.add({ title: '❌ 目前無法下單，請稍後再試', color: 'error' })
    }
  }, 3000)
}

// ✅ 當離開頁面時清除 polling
onBeforeUnmount(() => {
  if (pollTimer) {
    clearInterval(pollTimer)
    pollTimer = null
  }
})

// 結帳邏輯
async function checkout() {
  if (!user.value)  return alert('請先登入！')
  if (!phone.value.trim()) return alert('請輸入聯絡電話')

  submitting.value = true
  orderStatusMessage.value = '🕐 訂單建立中...'

  const payload = {
    name: user.value.fullName,
    phone: phone.value,
    orders: cart.value.map(i => ({
      item: i.name,
      quantity: i.quantity,
    }))
  }

  try{
    const res = await $fetch<{ order_id: string }>(`${apiBase}/api/order`, {
      method: 'POST',
      body: payload
    })
    orderId.value = res.order_id
    submitting.value = true
    orderStatusMessage.value = '⌛ 等待店家確認中...'
    startPolling()
  } catch (error) {
    // submitting.value = false
    console.error('❌ 訂單送出失敗:', error)
    toast.add({ title: '❌目前無法下單！，請稍後再試', color: 'error' })
    orderStatusMessage.value = '❌ 訂單送出失敗，請稍後再試'
  } 
}
</script>
