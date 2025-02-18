import { RouterLink } from 'vue-router'
import type { ColumnDef } from '@tanstack/vue-table'
import type { Projects } from '../supabaseQueries'
import AppInPlaceEditStatus from '@/components/AppInPlaceEdit/AppInPlaceEditStatus.vue'

export const resentProjectsColumns: ColumnDef<Projects[0]>[] = [
  {
    accessorKey: 'name',
    header: () => h('div', { class: 'text-left' }, 'Name'),
    cell: ({ row }) => {
      return h(
        RouterLink,
        {
          to: `/projects/${row.original.slug}`,
          class: 'text-left font-medium block w-full hover:text-blue-500',
        },
        () => row.getValue('name'),
      )
    },
  },
  {
    accessorKey: 'status',
    header: () => h('div', { class: 'text-left' }, 'Status'),
    cell: ({ row }) => {
      return h(AppInPlaceEditStatus, {
        modelValue: row.original.status,
        readonly: true,
      })
    },
  },
]
