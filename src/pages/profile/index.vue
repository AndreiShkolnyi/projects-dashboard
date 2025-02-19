<template>
  <div class="mx-auto mb-10 flex w-full flex-col items-center justify-center py-10 text-center">
    <EditableProfileForm :profile :isEditable @toggle="toggle" />
  </div>
</template>

<script setup lang="ts">
import { useToggle } from '@vueuse/core'

const { profile } = storeToRefs(useAuthStore())
usePageStore().pageData.title = 'Your profile'

const isEditable = ref(false)
const toggle = useToggle(isEditable)
</script>

<style scoped></style>
