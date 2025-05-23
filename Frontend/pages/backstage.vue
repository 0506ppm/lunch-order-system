<!-- pages/backstage.vue -->
<template>
  <TheHeader />


  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">店家後台訂單總覽</h1>

    <p v-if="loading">載入中...</p>
    <div v-else>
      <div v-if="orders.length === 0" class="text-gray-500">目前沒有訂單</div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- 訂單卡片 -->
        <div
          v-for="order in orders"
          :key="order.order_id"
          class="border rounded-lg p-4 mb-6 shadow-sm bg-transparent"
        >
          <div class="flex justify-between items-center mb-2">
            <div>
              <p><strong>訂單編號：</strong>{{ order.order_id }}</p>
              <p><strong>顧客姓名：</strong>{{ order.customer_name }}</p>
              <p><strong>電話：</strong>{{ order.phone }}</p>
              <p><strong>訂單時間：</strong>{{ formatDate(order.order_time) }}</p>
              <p><strong>狀態：</strong>{{ order.status }}</p>
            </div>
            <div class="text-right text-xl font-bold">
              <UButton class="bg-yellow-600 hover:bg-yellow-700 text-white">
                總價：NT$ {{ order.total_price }}
              </UButton>
            </div>
          </div>

          <!-- 明細 -->
          <table class="w-full border mt-4 text-xl">
            <thead class="bg-transparent">
              <tr>
                <th class="border p-2">品項</th>
                <th class="border p-2">數量</th>
                <th class="border p-2">單價</th>
                <th class="border p-2">小計</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, idx) in order.items" :key="idx">
                <td class="border p-2 text-center">{{ item.dish_name }}</td>
                <td class="border p-2 text-center">{{ item.quantity }}</td>
                <td class="border p-2 text-center">{{ item.unit_price }}</td>
                <td class="border p-2 text-center">{{ item.subtotal }}</td>
              </tr>
            </tbody>
          </table>

          <!-- 動作按鈕 -->
          <div class="flex justify-end mt-4 gap-3">
            <button
              class="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded text-xl"
              @click="openCancelDialog(order.order_id)"
            >
              取消訂單
            </button>

            <button
              class="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded text-xl"
              @click="completeOrder(order.order_id)"
            >
              完成訂單
            </button>
          </div>
        </div>
      </div>
    </div>  
  </div>

  <!-- 取消訂單對話框 -->
  <UModal v-if="showCancelDialog" v-model:open="showCancelDialog">
    <template #body>
      <p class="text-2xl text-center text-black dark:text-white">確定要取消這筆訂單嗎？</p>
    </template>
    <template #footer>
      <div class="flex justify-between items-end w-full px-6 pb-4">
        <UButton 
          @click="showCancelDialog = false" 
          color="info" 
          variant="solid"
          class="text-2xl text-black dark:text-white"
        >
          返回
        </UButton>
        <UButton 
          @click="confirmCancel" 
          color="error" 
          variant="solid"
          class="text-2xl text-black dark:text-white"
        >
          確認取消
        </UButton>
      </div>
    </template>
  </UModal>

  <!-- 新訂單通知對話框 -->
  <UModal v-if="showNewOrderModal" v-model:open="showNewOrderModal">
    <template #header>                       
      <h3 class="text-xl font-bold">新訂單通知</h3>
    </template>
    <template #body>
      <div class="p-6 text-center">
        <p class="text-black dark:text-white text-xl mb-4">是否接受顧客 {{ newOrder?.customer_name }} 的訂單？</p>
      </div>
    </template> 
    <template #footer>   
      <div class="flex justify-between items-end w-full px-6 pb-4">
        <UButton color="success" @click="acceptOrder(newOrder?.order_id)">
          接受訂單
        </UButton>
        <UButton color="error" @click="openCancelDialog(newOrder?.order_id)">
          拒絕訂單
        </UButton>
      </div>
    </template>
  </UModal>
</template>



<script setup>
import { ref, onMounted } from 'vue'

const orders = ref([])
const allOrders = ref([])
const loading = ref(true)
const toast = useToast()
const config = useRuntimeConfig()
const apiBase = config.public.apiBase

const formatDate = (datetime) => {
  const dt = new Date(datetime)
  return dt.toLocaleString('zh-TW')
}

const showCancelDialog = ref(false)
const cancelTargetId = ref(null)
const newOrder = ref(null)
const showNewOrderModal = ref(false)

// ✅ 取消訂單：顯示對話框
const openCancelDialog = (orderId) => {
  console.log('openCancelDialog:', orderId)
  cancelTargetId.value = orderId
  showCancelDialog.value = true
}

// ✅ 再次確認取消訂單：打 API
const confirmCancel = async () => {
  console.log('confirmCancel:', cancelTargetId.value)
  if (!cancelTargetId.value) return
  try {
    await $fetch(`${apiBase}/api/order/${cancelTargetId.value}/cancel`, { method: 'PATCH' })
    orders.value = orders.value.filter(o => o.order_id !== cancelTargetId.value)
    toast.add({ title: '訂單已取消', color: 'error' })
  } catch (error) {
    toast.add({ title: '取消失敗', description: error.message, color: 'warning' })
  } finally {
    showCancelDialog.value = false
    cancelTargetId.value = null
    showNewOrderModal.value = false
  }
}

// ✅ 完成訂單：只移除畫面（不打 API）
const completeOrder = async (orderId) => {
  try {
    await $fetch(`${apiBase}/api/order/${orderId}/complete`, { method: 'PATCH' })
    orders.value = orders.value.filter(o => o.order_id !== orderId)
    toast.add({ title: '訂單已完成', color: 'blue' })
  } catch (error) {
    toast.add({ title: '完成失敗', description: error.message, color: 'blue' })
  }
}

// ✅ 接受訂單（未來你如果要顯示「尚未接受的」也可以接這）
const acceptOrder = async (orderId) => {
  try {
    await $fetch(`${apiBase}/api/order/${orderId}/accept`, { method: 'PATCH' })
    orders.value = orders.value.filter(o => o.order_id !== orderId)
    toast.add({ title: '訂單已接受', color: "success" })
  } catch (e) {
    toast.add({ title: '接受失敗', description: error.message, color: "error" })
  }
}


// ✅ 取得訂單資料：這邊是用來載入頁面時的資料
const fetchOrders = async () => {
  try {
    const data = await $fetch(`${apiBase}/api/order`)  
    allOrders.value = data
    // 過濾掉已完成和已取消的訂單
    orders.value = data.filter(o => o.status !== '已完成' && o.status !== '已取消')

    // 找出第一筆尚未接受的訂單
    const pendingOrder = allOrders.value.find(o => o.status === '已建立')
    if (pendingOrder) {
      newOrder.value = pendingOrder
      showNewOrderModal.value = true
    } else {
      showNewOrderModal.value = false
    }
  } catch (e) {
    console.error('❌ 取單失敗', e)
  } finally {
    loading.value = false
  }
}

// **mounted 後每 3 秒輪詢（可再做 clearInterval）
onMounted(() => {
  fetchOrders()
  setInterval(fetchOrders, 3000)
})
</script>
