import type { ColumnDef } from '@tanstack/vue-table'
import type { ResentTask } from '../supabaseQueries'
import { RouterLink } from 'vue-router'
import AppInPlaceEditStatus from '@/components/AppInPlaceEdit/AppInPlaceEditStatus.vue'

export const resentTasksColumns: ColumnDef<ResentTask[0]>[] = [
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
