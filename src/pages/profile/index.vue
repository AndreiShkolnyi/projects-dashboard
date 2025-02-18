<template>
  <div class="mx-auto mb-10 flex w-full flex-col items-center justify-center py-10 text-center">
    <EditableProfileForm :profile :isEditable @toggle="toggle" />
  </div>
</template>

<script setup lang="ts">

const { profile } = storeToRefs(useAuthStore())

const isEditable = ref(false)
const toggle = useToggle(isEditable)
</script>

<style scoped></style>
