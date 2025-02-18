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

useHead({
  title: 'Мой заголовок',
  meta: [
    { name: 'description', content: 'This is your personal projects dashboard ' },
    { property: 'og:title', content: 'Projects Dashboard' }
  ]
})
</script>

<template>
  <Transition name="fade" mode="out-in">
    <Component :is="user ? AuthLayout : GuestLayout" :key="user?.id">
      <AppErrorPage v-if="errorStore.activeError" />
      <RouterView v-else v-slot="{ Component, route }">
        <Transition name="fade" mode="out-in">
          <div class="w-full" :key="route.path">
            <Suspense v-if="Component">
          <Component :is="Component" :key="route.name"></Component>
          <template #fallback>
                <div
                  class="absolute top-1/2 transform -translate-y-1/2 left-1/2 -translate-x-1/2 flex justify-center items-center w-full h-screen bg-background bg-opacity-90 z-50"
                >
                  <Icon
                    icon="lucide:loader-circle"
                    class="text-6xl animate-spin"
                  />
                </div>
              </template>
        </Suspense>
          </div>
        </Transition>
      </RouterView>
    </Component>
  </Transition>
</template>
