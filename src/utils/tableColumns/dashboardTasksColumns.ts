import type { ColumnDef } from '@tanstack/vue-table'
import type { TasksWithProjects } from '../supabaseQueries'
import { RouterLink } from 'vue-router'
import AppInPlaceEditStatus from '@/components/AppInPlaceEdit/AppInPlaceEditStatus.vue'

export const resentTasksColumns: ColumnDef<TasksWithProjects[0]>[] = [
  {
    accessorKey: 'name',
    header: () => h('div', { class: 'text-left' }, 'Name'),
    cell: ({ row }) => {
      return h(
        RouterLink,
        {
          to: `/tasks/${row.original.id}`,
          class: 'text-left font-medium block w-full hover:text-blue-500',
        },
        () => row.getValue('name'),
      )
    },
  },
  {
    accessorKey: 'projects',
    header: () => h('div', { class: 'text-left text-nowrap' }, 'Project'),
    cell: ({ row }) => {
      return h(
        RouterLink,
        {
          to: `/projects/${row.original.projects?.slug}`,
          class: 'text-left font-medium hover:bg-muted block w-full hover:text-blue-500',
        },
        () => row.original.projects?.name,
      )
    },
  },
  {
    accessorKey: 'status',
    header: () => h('div', { class: 'text-left' }, 'Status'),
    cell: ({ row }) => {
      return h(
        'div',
        { class: 'text-left font-medium' },
        h(AppInPlaceEditStatus, {
          modelValue: row.original.status,
          readonly: true,
        }),
      )
    },
  },
]
