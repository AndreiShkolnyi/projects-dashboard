<template>
  <div>
    <DataTable v-if="projects" :data="projects" :columns="columns">
      <template #cell-name="{ cell }">
        <RouterLink class="hover:text-blue-400" :to="`/projects/${cell.row.original.slug}`">{{
          cell.getValue()
        }}</RouterLink>
      </template>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import { useErrorStore } from '@/stores/error'
import { projectsQuery, type Projects } from '@/utils/supabaseQueries'
import { columns } from '@/utils/tableColumns/projectsColumns'

usePageStore().pageData.title = 'Projects'

const projects = ref<Projects | null>(null)

const getProjects = async () => {
  const { data, error, status } = await projectsQuery

  if (error) useErrorStore().setError({ error, customCode: status })
  else projects.value = data
}

await getProjects()
</script>
