<template>
  <div>
    <DataTable v-if="tasks" :columns="columnsWithCollabs" :data="tasks" />
  </div>
</template>

<script setup lang="ts">
import { useTasksStore } from '@/stores/loaders/tasks'
import type { BreadCrumb } from '@/types/BreadCrumb'
import { columns } from '@/utils/tableColumns/tasksColumns'


useHead({
  title: 'Tasks Dashboard',
  meta: [
    { name: 'description', content: 'This is your personal tasks dashboard' },
    { property: 'og:title', content: 'Tasks Dashboard' }
  ]
})

usePageStore().pageData.title = 'Tasks'

const tasksLoader = useTasksStore()
const { tasks } = storeToRefs(tasksLoader)
const { getTasks } = tasksLoader

const breadCrumbs: BreadCrumb[] = [
  { title: 'Home', to: '/' },
  { title: 'Tasks', to: '/tasks' },

]

useBreadcrumbStore().setBreadcrumbs(breadCrumbs)

await getTasks()

const { getGroupedCollabs, groupedCollabs } = useCollabs()

getGroupedCollabs(tasks.value ?? [])
const columnsWithCollabs = columns(groupedCollabs)
</script>

<style scoped></style>
