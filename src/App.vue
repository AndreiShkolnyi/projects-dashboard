<script setup lang="ts">
import AuthLayout from './layouts/auth-layout.vue'

const errorStore = useErrorStore()
onMounted(() => {
  useAuthStore().watchAuthChanges()
})

onErrorCaptured((error) => {
  errorStore.setError({ error })
})
</script>

<template>
  <AuthLayout>
    <AppErrorPage v-if="errorStore.activeError" />
    <RouterView v-else v-slot="{ Component, route }">
      <Suspense v-if="Component">
        <Component :is="Component" :key="route.name"></Component>
        <template #fallback></template>
      </Suspense>
    </RouterView>
  </AuthLayout>
</template>
