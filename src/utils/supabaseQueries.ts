import { supabase } from '@/lib/supabaseClient'
import type { CreateNewTask } from '@/types/CreateNewTask'
import type { QueryData } from '@supabase/supabase-js'

export const taskWithProjectsQuery = supabase.from('tasks').select(`
  *,
  projects (
    id,
    name,
    slug
  )
  `)

  export const resentTasksQuery = supabase
    .from('tasks')
    .select(
      `
      id,
      status,
      name
    `,
    )
    .order('created_at', { ascending: false })
    .limit(5)

  export type ResentTask = QueryData<typeof resentTasksQuery>

  export type TasksWithProjects = QueryData<typeof taskWithProjectsQuery>

  export const projectsQuery = supabase.from('projects').select()

  export const resentProjectsQuery = supabase
    .from('projects')
    .select(
      `
      slug,
    status,
    name
    `,
    )
    .order('created_at', { ascending: false })
    .limit(5)

  export type ResentProjects = QueryData<typeof resentProjectsQuery>

  export type Projects = QueryData<typeof projectsQuery>

  export const updateProjectQuery = (updatedProject = {}, id: number) => {
    return supabase.from('projects').update(updatedProject).eq('id', id)
  }

  export const projectQuery = (slug: string) => {
    return supabase
      .from('projects')
      .select(
        `
    *,
    tasks (
      id,
      name,
      status,
      description,
      due_date
    )
    `,
      )
      .eq('slug', slug)
      .single()
  }

  export type Project = QueryData<ReturnType<typeof projectQuery>>

  export const taskQuery = (id: number) => {
    return supabase
      .from('tasks')
      .select(
        `
      *,
      projects (
          id,
          name,
          slug
      )
      `,
      )
      .eq('id', id)
      .single()
  }

  export type Task = QueryData<ReturnType<typeof taskQuery>>

  export const updateTaskQuery = (updatedTask = {}, id: number) => {
    return supabase.from('tasks').update(updatedTask).eq('id', id)
  }

  export const profileQuery = ({ column, value }: { column: string; value: string }) => {
    return supabase.from('profiles').select().eq(column, value).single()
  }

  export type Profile = QueryData<ReturnType<typeof profileQuery>>

  export const profilesQuery = supabase.from('profiles').select(`id, full_name`)

  export const groupedProfilesQuery = (userIds: string[]) =>
    supabase.from('profiles').select('username, avatar_url, id, full_name').in('id', userIds)
  export type Collabs = QueryData<ReturnType<typeof groupedProfilesQuery>>

  export const createNewTaskQuery = (newTask: CreateNewTask) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    return supabase.from('tasks').insert(newTask)
  }

export const deleteTaskQuery = (id: number) => {
  return supabase.from('tasks').delete().eq('id', id)
}
