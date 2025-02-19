<template>
  <template v-for="link in links" :key="link.to">
    <RouterLink
      v-if="link.to"
      :to="link.to"
      exact-active-class="text-primary bg-muted"
      class="flex nav-link"
      :class="{ 'justify-normal': isOpen, 'justify-center': !isOpen }"
      @click="emit('on-toggle')"
    >
      <Icon :icon="link.icon" />
      <span
        class="text-nowrap"
        :class="{ block: isOpen, hidden: !isOpen }"
        >{{ link.title }}</span
      >
    </RouterLink>

    <Button
      v-else
      :variant="null"
      size="default"
      class="inline-flex nav-link"
      :class="{ 'justify-normal w-full': isOpen, 'justify-center': !isOpen }"
      @click="emit('on-click', link.title)"
    >
      <Icon :icon="link.icon" />
      <span
        class="text-nowrap"
        :class="{ block: isOpen, hidden: !isOpen }"
        >{{ link.title }}</span
      >
    </Button>
  </template>
</template>

<script setup lang="ts">
interface LinkProps {
  title: string
  to?: string
  icon: string
}

defineProps<{ links: LinkProps[], isOpen: boolean }>()

const emit = defineEmits<{
  (event: 'on-click', type: string): void,
  (event: 'on-toggle'): void
}>()

</script>

<style scoped>
.nav-link {
  @apply items-center gap-3 px-4 py-2 mx-2 transition-colors rounded-lg hover:text-primary text-muted-foreground;
  }
</style>
