<template>
  <TheHeader />
  <div class="p-8">
    <!-- 購物車按鈕 -->
    <div class="text-right">
      <button
        @click="$router.push('/cart')"
        class="bg-blue-600 text-white px-2 py-2 rounded hover:bg-blue-700"
      >
        🛒 購物車（{{ cart.length }}）
      </button>
    </div>

    <h3 class="text-5xl font-bold mb-6 text-center">Menu</h3>
    
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="(item, index) in menuItems"
        :key="index"
        class="border rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col items-center"
      >
        <img
          :src="`/images/${item.image}`"
          alt="item.name"
          class="w-[550px] h-[430px] object-contain rounded-md mb-2"
        />

        <!-- 按鈕 或 數量輸入欄位 -->
        <div v-if="selectedIndex === index" class="w-[330px] flex items-center justify-between">
          <label class="block text-gray-700 dark:text-white mb-1">請選擇數量：</label>
          <input
            type="number"
            min="1"
            v-model.number="quantities[index]"
            class="w-1/3 border rounded px-2 py-1 text-center"
          />
          <button
            @click="addToCartAndClose(index)"
            class="mt-1 bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
          >
            加入購物車
          </button>
        </div>
        <button
          v-else
          @click="selectItem(index)"
          class="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          選擇
        </button> 
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 9 張圖片檔名（放在 public/images/）
const menuItems = [
  { name: '菜飯', image: 'rice_with_side_dishes.jpg', price:75 },
  { name: '炸花枝排飯', image: 'fried_squid_rice.jpg', price:80 },
  { name: '招牌飯', image: 'sliced_pork_rice.jpg', price:95 },
  { name: '滷雞腿飯', image: 'stewed_chicken_leg_rice.jpg', price:105 },
  { name: '控肉飯', image: 'stewed_pork_belly_rice.jpg', price:105 },
  { name: '檸檬雞排飯', image: 'lemon-flavored_fried_chicken_rice.jpg', price:95 },
  { name: '炸蝦捲飯', image: 'shrimp_roll_rice.jpg', price:100 },
  { name: '炸排骨飯', image: 'fried_pork_chop_rice.jpg', price:105 },
  { name: '蒲燒鯛魚飯', image: 'kabayaki_tilapia_rice.jpg', price:110 },
  { name: '炸雞腿飯', image: 'fried_chicken_leg_rice.jpg', price:135 },
  { name: '炸鱈魚飯', image: 'fried_codfish_rice.jpg', price:110 },
  { name: '瓶裝酸梅湯', image: 'sour_plum_juice.jpg', price:80 }
]


const selectedIndex = ref<number | null>(null)
const quantities = ref(Array(menuItems.length).fill(1))

const { cart, addToCart } = useCart()

function selectItem(index: number) {
  selectedIndex.value = index
}

function addToCartAndClose(index: number) {
  const item = menuItems[index]
  const quantity = quantities.value[index]
  if (quantity > 0) {
    addToCart({ name: item.name, image: item.image, quantity, price: item.price })
  }
  selectedIndex.value = null
}
</script>
