<script setup lang="ts">
const { pageData } = storeToRefs(usePageStore())

const taskSheetOpen = ref(false)

const isOpen = ref(false)
const toggle = useToggle(isOpen)

const toggleMenu = (value: boolean) => {
  toggle(value)
}
</script>

<template>
 <Sidebar @taskClicked="taskSheetOpen = true" :isOpen="isOpen || false" @onToggle="toggleMenu" />
 <AppNewTask v-model="taskSheetOpen" />
 <div
    class="flex flex-col transition-[margin]"
    :class="{ 'ml-52': isOpen, 'ml-24': !isOpen }"
  >
    <Header />
    <main class="flex flex-col flex-1 gap-4 p-4 lg:gap-6 lg:p-6">
      <div class="flex items-center">
        <h1 class="text-lg font-semibold md:text-2xl">{{ pageData.title }}</h1>
      </div>
      <slot />
    </main>
  </div>
</template>
