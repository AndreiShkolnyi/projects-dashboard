import { useMemoize } from '@vueuse/core'
import {
  taskQuery,
  taskWithProjectsQuery,
  updateTaskQuery,
  deleteTaskQuery,
  type Task,
  type TasksWithProjects,
} from '@/utils/supabaseQueries'
export const useTasksStore = defineStore('tasks-store', () => {
  const tasks = ref<TasksWithProjects | null>(null)
  const task = ref<Task | null>(null)
  const loadTasks = useMemoize(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async (id: string) => await taskWithProjectsQuery,
  )
  const loadTask = useMemoize(async (slug: number) => await taskQuery(slug))
  interface ValidateCacheParams {
    ref: typeof tasks | typeof task
    query: typeof taskWithProjectsQuery | typeof taskQuery
    key: string
    loaderFn: typeof loadTasks | typeof loadTask
  }
  const validateCache = ({ ref, query, key, loaderFn }: ValidateCacheParams) => {
    if (ref.value) {
      const finalQuery = typeof query === 'function' ? query(+key) : query
      finalQuery.then(({ data, error }) => {
        if (JSON.stringify(ref.value) === JSON.stringify(data)) {
          return
        } else {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          loaderFn.delete(key)
          if (!error && data) ref.value = data
        }
      })
    }
  }
  const getTasks = async () => {
    tasks.value = null
    const { data, error, status } = await loadTasks('tasks')
    if (error) useErrorStore().setError({ error, customCode: status })
    if (data) tasks.value = data
    validateCache({
      ref: tasks,
      query: taskWithProjectsQuery,
      key: 'tasks',
      loaderFn: loadTasks,
    })
  }
  const getTask = async (id: string) => {
    task.value = null
    const { data, error, status } = await loadTask(+id)
    if (error) useErrorStore().setError({ error, customCode: status })
    if (data) task.value = data
    validateCache({
      ref: task,
      query: taskQuery,
      key: id,
      loaderFn: loadTask,
    })
  }
  const updateTask = async () => {
    if (!task.value) return
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { projects, id, ...taskProperties } = task.value
    await updateTaskQuery(taskProperties, task.value.id)
  }

  const deleteTask = async () => {
    if (!task.value) return
    await deleteTaskQuery(task.value.id)
  }

  return {
    tasks,
    getTasks,
    getTask,
    task,
    updateTask,
    deleteTask,
  }
})
