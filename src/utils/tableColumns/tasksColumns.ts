import type { ColumnDef } from "@tanstack/vue-table"
import type { TasksWithProjects } from "../supabaseQueries"
import { RouterLink } from "vue-router"
import type { GroupedCollabs } from '@/types/GroupedCollabs'
import Avatar from '@/components/ui/avatar/Avatar.vue'
import AvatarImage from '@/components/ui/avatar/AvatarImage.vue'
import AvatarFallback from '@/components/ui/avatar/AvatarFallback.vue'
import AppInPlaceEditStatus from '@/components/AppInPlaceEdit/AppInPlaceEditStatus.vue'

export const columns = (collabs: Ref<GroupedCollabs>): ColumnDef<TasksWithProjects[0]>[] => [
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
  {
    accessorKey: 'due_date',
    header: () => h('div', { class: 'text-left' }, 'DueDate'),
    cell: ({ row }) => {
      return h('div', { class: 'text-left font-medium' }, row.getValue('due_date'))
    },
  },
  {
    accessorKey: 'projects',
    header: () => h('div', { class: 'text-left text-nowrap' }, 'Projects'),
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
    accessorKey: 'description',
    header: () => h('div', { class: 'text-left' }, 'Description'),
    cell: ({ row }) => {
      return h('div', { class: 'text-left font-medium' }, row.getValue('description'))
    },
  },
  {
    accessorKey: 'collaborators',
    header: () => h('div', { class: 'text-left' }, 'Collaborators'),
    cell: ({ row }) => {
      return h(
        'div',
        { class: 'text-left font-medium h-20 flex items-center' },
        collabs.value[row.original.id]
          ? collabs.value[row.original.id].map((collab) => {
              return h(RouterLink, { to: `/users/${collab.username}` }, () => {
                return h(Avatar, { class: 'hover:scale-110 transition-transform' }, () =>
                  h(AvatarImage, { src: collab.avatar_url || '' }),
                )
              })
            })
          : row.original.collaborators.map(() => {
              return h(Avatar, { class: 'animate-pulse' }, () => h(AvatarFallback))
            }),
      )
    },
  },
]
