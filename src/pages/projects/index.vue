<template>
  <div>
      <DataTable v-if="projects.length" :columns="columnsWithCollabs" :data="projects" />
  </div>
</template>

<script setup lang="ts">
import { useCollabs } from '@/composables/collabs';
import { useProjectsStore } from '@/stores/loaders/projects';
import { columns } from '@/utils/tableColumns/projectsColumns'

usePageStore().pageData.title = 'Projects'

const projectsLoader = useProjectsStore()
const { projects } = storeToRefs(projectsLoader)
const { getProjects } = projectsLoader


await getProjects()

const { getGroupedCollabs, groupedCollabs } = useCollabs()
getGroupedCollabs(projects.value ?? [])

const columnsWithCollabs = columns(groupedCollabs)
</script>
