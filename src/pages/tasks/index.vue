<template>
  <div>
    <DataTable v-if="tasks" :data="tasks" :columns="columns">
      <template #cell-name="{ cell }">
        <RouterLink class="hover:text-blue-400" :to="`/tasks/${cell.row.original.id}`">{{
          cell.getValue()
        }}</RouterLink>
      </template>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import { useErrorStore } from '@/stores/error'
import { taskWithProjectsQuery, type TasksWithProjects } from '@/utils/supabaseQueries'
import { columns } from '@/utils/tableColumns/tasksColumns'

usePageStore().pageData.title = 'Tasks'

const tasks = ref<TasksWithProjects | null>(null)

const getTask = async () => {
  const { data, error, status } = await taskWithProjectsQuery

  if (error) useErrorStore().setError({ error, customCode: status })
  else tasks.value = data
}

await getTask()
</script>

<style scoped></style>
