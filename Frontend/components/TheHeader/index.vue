<script setup lang="ts">
import ColorModeButton from './components/ColorModeButton.vue'

function login() {
  console.log('Login clicked!')
}

function openGithub() {
  window.open('https://github.com/nccu-se-2025', '_blank')
}
</script>

<template>
  <header class="w-full flex justify-end items-center px-6 py-3 border-b shadow-sm bg-white dark:bg-gray-900 gap-4">
    <!-- 切換 Light/Dark 模式 -->
    <ColorModeButton />

    <!-- GitHub icon + hover 展開 -->
    <UButton class="group relative overflow-hidden transition-all duration-300 w-[40px] hover:w-[120px]"
    icon="i-lucide-github"
    >
        <span class="ml-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">GitHub</span>
    </UButton>


    <!-- 登入按鈕 -->
    <UButton
      icon="i-lucide-log-in"
      size="md"
      color="primary"
      variant="solid"
      @click="login"
    >
      登入
    </UButton>
  </header>
</template>
