<template>
  <div>
      <DataTable v-if="projects" :columns="columnsWithCollabs" :data="projects" />
  </div>
</template>

<script setup lang="ts">
import { useCollabs } from '@/composables/collabs';
import { useProjectsStore } from '@/stores/loaders/projects';
import type { BreadCrumb } from '@/types/BreadCrumb';
import { columns } from '@/utils/tableColumns/projectsColumns'


useHead({
  title: 'Projects Dashboard',
  meta: [
    { name: 'description', content: 'This is your personal projects dashboard' },
    { property: 'og:title', content: 'Projects Dashboard' }
  ]
})

definePage({
  meta: {
    showBreadcrumbs: true,
  }
})

const breadCrumbs: BreadCrumb[] = [
  { title: 'Home', to: '/' },
  { title: 'Projects', to: '/projects' },
]

useBreadcrumbStore().setBreadcrumbs(breadCrumbs)


usePageStore().pageData.title = 'Projects'

const projectsLoader = useProjectsStore()
const { projects } = storeToRefs(projectsLoader)
const { getProjects } = projectsLoader


await getProjects()

const { getGroupedCollabs, groupedCollabs } = useCollabs()
getGroupedCollabs(projects.value ?? [])

const columnsWithCollabs = columns(groupedCollabs)
</script>
