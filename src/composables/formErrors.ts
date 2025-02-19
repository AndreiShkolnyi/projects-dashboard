import type { LoginForm } from '@/types/AuthForm'
import type { AuthError } from '@supabase/supabase-js'

type FormErrors<T> = {
  [K in keyof T]: string[]
}

export const useFormErrors = <T>() => {
  const serverError = ref('')
  const streamErrors = ref<FormErrors<T> | null>(null)

  const handleServerError = (error: AuthError) => {
    serverError.value =
      error.message === 'Invalid login credentials' ? 'Incorrect email or password' : error.message
  }

  const handleLoginForm = async (formData: LoginForm) => {
    streamErrors.value = {
      email: [],
      password: [],
    }

    const { validateEmail, validatePassword } = await import('@/utils/formValidations')

    const emailErrors = validateEmail(formData.email)
    if (emailErrors.length) streamErrors.value.email = emailErrors
    const passwordErrors = validatePassword(formData.password)
    if (passwordErrors.length) streamErrors.value.password = passwordErrors
  }

  return {
    serverError,
    handleServerError,
    streamErrors,
    handleLoginForm,
  }
}
