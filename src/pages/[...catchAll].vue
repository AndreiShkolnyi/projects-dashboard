<script setup lang="ts">
import { useErrorStore } from '@/stores/error'

useErrorStore().setError({ error: 'Page Not Found', customCode: 404 })
</script>

<template>
  <AppErrorPage />
</template>
