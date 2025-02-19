import {
  resentProjectsQuery,
  resentTasksQuery,
  type ResentProjects,
  type ResentTask,
} from '@/utils/supabaseQueries'

export const useDashboardStore = defineStore('dashboard-store', () => {
  const resentProjects = ref<ResentProjects | []>([])
  const resentTasks = ref<ResentTask | []>([])

  const loadResentProjects = useMemoize(async () => await resentProjectsQuery)
  const loadResentTasks = useMemoize(async () => await resentTasksQuery)

  interface ValidateCacheParams {
    ref: typeof resentProjects | typeof resentTasks
    query: typeof resentProjectsQuery | typeof resentTasksQuery
    key: string
    loaderFn: typeof loadResentProjects | typeof loadResentTasks
  }

  const validateCache = ({ ref, query, key, loaderFn }: ValidateCacheParams) => {
    if (ref.value) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      const finalQuery = typeof query === 'function' ? query(key) : query
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
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

  const getProjects = async () => {
    resentProjects.value = []

    const { data, error, status } = await loadResentProjects()

    if (error) useErrorStore().setError({ error, customCode: status })
    else resentProjects.value = data

    validateCache({
      ref: resentProjects,
      query: resentProjectsQuery,
      key: 'resent-projects',
      loaderFn: loadResentProjects,
    })
  }

  const getTasks = async () => {
    resentTasks.value = []

    const { data, error, status } = await loadResentTasks()

    if (error) useErrorStore().setError({ error, customCode: status })
    else resentTasks.value = data

    validateCache({
      ref: resentTasks,
      query: resentTasksQuery,
      key: 'resent-tasks',
      loaderFn: loadResentTasks,
    })
  }

  return {
    resentProjects,
    getProjects,
    resentTasks,
    getTasks,
  }
})
