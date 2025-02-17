import type { ColumnDef } from "@tanstack/vue-table";
import type { Projects } from "../supabaseQueries";

export const columns: ColumnDef<Projects[0]>[] = [
  {
    accessorKey: 'id',
    header: () => h('div', { class: 'text-left text-nowrap' }, 'ID'),
  },
  {
    accessorKey: 'name',
    header: () => h('div', { class: 'text-left' }, 'Name'),
  },
  {
    accessorKey: 'status',
    header: () => h('div', { class: 'text-left' }, 'Status'),
  },
  {
    accessorKey: 'created_at',
    header: () => h('div', { class: 'text-left' }, 'Created at'),
  },
  {
    accessorKey: 'collaborators',
    header: () => h('div', { class: 'text-left' }, 'Collaborators'),
  },
]
