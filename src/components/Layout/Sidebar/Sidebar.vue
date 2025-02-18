<template>
  <aside
    class="flex flex-col h-screen gap-2 border-r fixed !z-[9999] transition-[width]"
    :class="isCollapsed ? 'w-16': 'w-52'"
  >
    <div class="flex h-fit items-center border-b p-2 lg:p-4 shrink-0 gap-1 justify-between" :class="{ 'flex-col': isCollapsed }">
      <Button variant="outline" size="icon" class="w-8 h-8" @click="isCollapsed = !isCollapsed">
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
        <SidebarLinks :links="sidebarNavigateLinks" @on-click="executeAction" :isCollapsed />
      </div>

      <div class="border-y text-center bg-background py-3">
        <SidebarLinks :links="accountLinks" @on-click="executeAction" :isCollapsed />
      </div>
    </nav>
  </aside>
</template>

<script setup lang="ts">
const router = useRouter()
const isCollapsed = ref(false)

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
  if (type === 'Sign out') {
    const { logoutUser } = await import('@/utils/supabaseAuth')
    const isLoggedOut = await logoutUser()
    if (isLoggedOut) return router.push('/login')
  }
}

defineEmits(['taskClicked'])


</script>

<style scoped></style>
