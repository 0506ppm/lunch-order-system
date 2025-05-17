<script setup lang="ts">
import ColorModeButton from './components/ColorModeButton.vue'
import { useUser } from '@clerk/vue'
</script>

<template>
  <header class="w-full flex justify-end items-center px-6 py-3 border-b shadow-sm bg-white dark:bg-gray-900 gap-4">
    <p> 歡迎來到 蘭亭池上便當 ! </p>
    <!-- 切換 Light/Dark 模式 -->
    <ColorModeButton />

    <!-- 登入按鈕 -->
    <SignedOut>
        <SignInButton mode="modal" afterSignInUrl="/" :appearance="{
          elements: {
            button: 'bg-green-500 hover:bg-green-600 text-white rounded px-3 py-2'
          }
        }">
          <UButton color="success" variant="solid" icon="i-lucide-user">登入</UButton>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
  </header>
</template>

