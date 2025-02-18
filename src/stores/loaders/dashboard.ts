import {
  resentProjectsQuery,
  resentTasksWithProjectsQuery,
  type ResentProjects,
  type ResentTasksWithProjects,
} from '@/utils/supabaseQueries'

export const useDashboardStore = defineStore('dashboard-store', () => {
  const resentProjects = ref<ResentProjects | []>([])
  const resentTasks = ref<ResentTasksWithProjects[] | []>([])

  const loadResentProjects = useMemoize(async () => await resentProjectsQuery)
  const loadResentTasks = useMemoize(async () => await resentTasksWithProjectsQuery)

  interface ValidateCacheParams {
    ref: typeof resentProjects | typeof resentTasks
    query: typeof resentProjectsQuery | typeof resentTasksWithProjectsQuery
    key: string
    loaderFn: typeof loadResentProjects | typeof loadResentTasks
  }

  const validateCache = ({ ref, query, key, loaderFn }: ValidateCacheParams) => {
    if (ref.value) {
      const finalQuery = typeof query === 'function' ? query(key) : query
      finalQuery.then(({ data, error }) => {
        if (JSON.stringify(ref.value) === JSON.stringify(data)) {
          return
        } else {
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
      query: resentTasksWithProjectsQuery,
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
