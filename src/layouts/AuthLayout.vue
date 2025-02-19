<script setup lang="ts">
import { useToggle } from '@vueuse/core'

const { pageData } = storeToRefs(usePageStore())
const route = useRoute()

const taskSheetOpen = ref(false)

const isOpen = ref(false)
const toggle = useToggle(isOpen)

const { breadCrumbs } = storeToRefs(useBreadcrumbStore())
const showBreadcrumbs = computed(() => breadCrumbs.value?.length && route.meta?.showBreadcrumbs)

</script>

<template>
  <div class="w-full">
    <Sidebar @taskClicked="taskSheetOpen = true" :isOpen="isOpen || false" @onToggle="toggle" />
    <AppNewTask v-model="taskSheetOpen" />
    <div class="flex flex-col transition-[margin] h-screen" :class="{ 'ml-52': isOpen, 'ml-24': !isOpen }">
      <Header />
      <main class="flex flex-col flex-1 gap-4 p-4 lg:gap-6 lg:p-6 h-full overflow-y-scroll">
        <BreadCrumbs v-if="showBreadcrumbs" :breadCrumbs="breadCrumbs" />
        <div class="flex items-center">
          <h1 class="text-lg font-semibold md:text-2xl">{{ pageData.title }}</h1>
        </div>
        <slot />
      </main>
    </div>
  </div>
</template>
