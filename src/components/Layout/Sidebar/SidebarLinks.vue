<template>
  <template v-for="link in links" :key="link.to">
    <RouterLink
      v-if="link.to"
      :to="link.to"
      exact-active-class="text-primary bg-muted"
      class="nav-link"
    >
      <Icon :icon="link.icon" />
      <span class="text-nowrap" :class="isCollapsed ? 'hidden' : 'block'">{{ link.title }}</span>
    </RouterLink>

    <Button
      v-else
      :variant="null"
      size="default"
      class="nav-link"
      @click="emit('on-click', link.title)"
    >
      <Icon :icon="link.icon" />
      <span class="text-nowrap" :class="isCollapsed ? 'hidden' : 'block'">{{ link.title }}</span>
    </Button>
  </template>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

interface LinkProps {
  title: string
  to: string
  icon: string
}
defineProps<{ links: LinkProps[], isCollapsed: boolean }>()

const emit = defineEmits<{
  (event: 'on-click', type: string): void
}>()
</script>

<style scoped>
.nav-link {
  @apply flex items-center gap-3 px-4 py-2 mx-2 w-fit transition-colors rounded-lg hover:text-primary justify-center lg:justify-normal text-muted-foreground;
}
</style>
