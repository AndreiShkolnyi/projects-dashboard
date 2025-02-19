import type { TasksWithProjects } from '@/utils/supabaseQueries'

export interface CreateNewTask extends TasksWithProjects {
  name: string
  description: string
  profile_id: number
}
