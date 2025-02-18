import type { BreadCrumb } from '@/types/BreadCrumb'

export const useBreadcrumbStore = defineStore('breadcrumbs-store', () => {
  const breadCrumbs = ref<BreadCrumb[]>([])
  const setBreadcrumbs = (items: BreadCrumb[]) => {
    breadCrumbs.value = items
  }

  return {
    breadCrumbs,
    setBreadcrumbs,
  }
})
