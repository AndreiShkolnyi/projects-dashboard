<script setup lang="ts">

const errorStore = useErrorStore()
onMounted(() => {
  useAuthStore().watchAuthChanges()
})

onErrorCaptured((error) => {
  errorStore.setError({ error })
})

const { user } = storeToRefs(useAuthStore())
const AuthLayout = defineAsyncComponent(
  () => import('./layouts/auth-layout.vue')
)
const GuestLayout = defineAsyncComponent(
  () => import('./layouts/guset-layout.vue')
)
</script>

<template>
  <Component :is="user ? AuthLayout : GuestLayout">
    <AppErrorPage v-if="errorStore.activeError" />
    <RouterView v-else v-slot="{ Component, route }">
      <Suspense v-if="Component">
        <Component :is="Component" :key="route.name"></Component>
        <template #fallback></template>
      </Suspense>
    </RouterView>
  </Component>
</template>
