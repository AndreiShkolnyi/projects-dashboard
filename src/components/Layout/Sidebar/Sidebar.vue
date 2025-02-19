<template>
  <aside
    class="flex flex-col h-screen gap-2 border-r fixed bg-muted/40 transition-[width] duration-200"
    :class="{ 'w-52': isOpen, 'w-24': !isOpen }"
  >
    <div class="flex h-fit items-center border-b p-2 lg:p-4 shrink-0 gap-1 justify-between" :class="{ 'flex-col': !isOpen }">
      <Button variant="outline" size="icon" class="w-8 h-8" @click="emit('onToggle', !isOpen)">
        <Icon icon="lucide:menu"></Icon>
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="outline" size="icon" class="w-8 h-8">
            <Icon icon="lucide:plus"></Icon>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem @click="$emit('taskClicked')">
            Task
          </DropdownMenuItem>
          <DropdownMenuItem> Project </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>

    <nav class="flex flex-col gap-2 justify-between h-full relative">
      <div>
        <SidebarLinks :links="sidebarNavigateLinks" @on-click="executeAction" :isOpen />
      </div>

      <div class="border-y text-center bg-background py-3">
        <SidebarLinks :links="accountLinks" @on-click="executeAction" :isOpen />
      </div>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'
const props = defineProps<{ isOpen: boolean }>()
const router = useRouter()

const sidebarNavigateLinks = [
  { title: 'Dashboard', to: '/', icon: 'lucide:house' },
  { title: 'Projects', to: '/projects', icon: 'lucide:building-2' },
  { title: 'My Tasks', to: '/tasks', icon: 'lucide:badge-check' },
]

const accountLinks = computed(() => {
  return [
    {
      title: 'Profile',
      to: `/profile`,
      icon: 'lucide:user'
    },
    {
      title: 'Sign Out',
      icon: 'lucide:log-out'
    }
  ]
})

const executeAction = async (type: string) => {
  if (type === 'Sign Out') {
    const { logoutUser } = await import('@/utils/supabaseAuth')
    const isLoggedOut = await logoutUser()
    if (isLoggedOut) return router.push('/login')
  }
}

const emit = defineEmits(['taskClicked', 'onToggle'])

const windowWidth = useWindowSize().width
watch(
  () => windowWidth.value,
  (newWidth) => {
    const shouldOpen = newWidth > 1024
    if (shouldOpen !== props.isOpen) {
      emit('onToggle', shouldOpen)
    }
  }
)

</script>

<style scoped></style>
