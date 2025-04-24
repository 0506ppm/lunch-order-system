<script setup lang="ts">
import ColorModeButton from './components/ColorModeButton.vue'
import { useUser } from '@clerk/vue'

const { user } = useUser()

// Watch for user changes
watch(user, (newUser) => {
 // TODO: Call GET /user/me @py-huang pls complete this api Call
 // TODO: if the res is 404, then use POST to create a new user
})

function openGithub() {
  window.open('https://github.com/nccu-se-2025', '_blank')
}
</script>

<template>
  <header class="w-full flex justify-end items-center px-6 py-3 border-b shadow-sm bg-white dark:bg-gray-900 gap-4">
    <p> Welcome ! {{user?.fullName ? (user.lastName ?? '') + (user.firstName ?? '') : "guest, please login !!"}} </p>
    <!-- 切換 Light/Dark 模式 -->
    <ColorModeButton />

    <!-- GitHub icon + hover 展開 -->
    <UButton class="group relative overflow-hidden transition-all duration-300 w-[40px] hover:w-[120px]"
    icon="i-lucide-github"
    >
        <span class="ml-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">GitHub</span>
    </UButton>


    <!-- 登入按鈕 -->
    <SignedOut>
        <SignInButton mode="modal" afterSignInUrl="/" :appearance="{
          elements: {
            button: 'bg-green-500 hover:bg-green-600 text-white rounded px-3 py-2'
          }
        }">
          <UButton color="secondary" variant="soft" icon="i-lucide-user">登入</UButton>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
  </header>
</template>
