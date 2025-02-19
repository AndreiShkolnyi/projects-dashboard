<template>
  <div class="mx-auto mb-10 flex w-full flex-col items-center justify-center py-10 text-center">
    <EditableProfileForm :profile />
  </div>
</template>

<script setup lang="ts">
const { profile } = storeToRefs(useAuthStore())
usePageStore().pageData.title = 'Your profile'
</script>

<style scoped></style>
