<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useDashboardStore } from '@/stores/loaders/dashboard'
import { ArrowUpRight } from 'lucide-vue-next'

import { resentProjectsColumns } from '@/utils/tableColumns/dashboardProjectsColumns'
import { resentTasksColumns } from '@/utils/tableColumns/dashboardTasksColumns'

usePageStore().pageData.title = 'Dashboard'

const dashboardStore = useDashboardStore();
const {resentProjects, resentTasks } = storeToRefs(dashboardStore);
const {getProjects, getTasks } = dashboardStore

Promise.all([getProjects(), getTasks()])
</script>

<template>
  <div class="flex min-h-screen w-full flex-col">
    <main class="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div class="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <Card class="xl:col-span-2">
          <CardHeader class="flex flex-row items-center">
            <div class="grid gap-2">
              <CardTitle>Resent Projects</CardTitle>
              <CardDescription>
                Recent projects in your company.
              </CardDescription>
            </div>
            <Button as-child size="sm" class="ml-auto gap-1">
              <RouterLink to="/projects">
                View All
                <ArrowUpRight class="h-4 w-4" />
              </RouterLink>
            </Button>
          </CardHeader>
          <CardContent>
            <DataTable v-if="resentProjectsColumns" :columns="resentProjectsColumns" :data="resentProjects" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Resent Tasks</CardTitle>
          </CardHeader>
          <CardContent class="grid gap-8">
            <DataTable v-if="resentTasksColumns" :columns="resentTasksColumns" :data="resentTasks" />
          </CardContent>
        </Card>
      </div>
    </main>
  </div>
</template>
