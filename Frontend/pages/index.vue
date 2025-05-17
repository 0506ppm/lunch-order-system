<template>
  <TheHeader />
  <div class="flex items-center justify-center h-screen">
    <button
      @click="goToMenu"
      class="bg-green-600 text-white text-9xl px-25 py-20 rounded hover:bg-green-700"
    >
        開始點餐
    </button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function goToMenu() {
  router.push('/menu')
}
</script>