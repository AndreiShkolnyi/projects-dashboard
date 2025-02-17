<template>
  <section class="error">
    <ErrorTemplate
      :message
      :details
      :customCode
      :statusCode
      :code
      :hint
      :isCustomError="errorStore.isCustomError"
    />
  </section>
</template>

<script setup lang="ts">
import { useErrorStore } from '@/stores/error'

const errorStore = useErrorStore()
const router = useRouter()

const error = ref(errorStore.activeError)

const message = ref('')
const customCode = ref(0)
const statusCode = ref(0)
const details = ref('')
const code = ref('')
const hint = ref('')

if (error.value && !('code' in error.value)) {
  message.value = error.value.message
  customCode.value = error.value.customCode ?? 0
}

if (error.value && 'code' in error.value) {
  message.value = error.value.message
  statusCode.value = error.value.statusCode ?? 0
  details.value = error.value.details
  code.value = error.value.code
  hint.value = error.value.hint
}

const ErrorTemplate = import.meta.env.DEV
  ? defineAsyncComponent(() => import('./AppErrorDevSection.vue'))
  : defineAsyncComponent(() => import('./AppErrorProdSection.vue'))

router.afterEach(() => {
  errorStore.clearError()
})
</script>

<style scoped>
.error {
  @apply mx-auto flex flex-col justify-center items-center flex-1 p-10 text-center -mt-20 min-h-[90vh];
}

:deep(.error__icon) {
  @apply text-7xl text-destructive;
}

:deep(.error__code) {
  @apply font-extrabold text-7xl text-secondary;
}

:deep(.error__msg) {
  @apply text-3xl font-extrabold text-primary;
}

:deep(.error-footer) {
  @apply flex flex-col items-center justify-center gap-5 mt-6 font-light;
}

:deep(.error-footer__text) {
  @apply text-lg text-muted-foreground;
}

:deep(p) {
  @apply my-2;
}
</style>
