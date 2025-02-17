import { supabase } from '@/lib/supabaseClient'
import type { LoginForm, RegisterForm } from '@/types/AuthForm'

export const loginUser = async (formData: LoginForm) => {
  const { error } = await supabase.auth.signInWithPassword(formData)
  return { error }
}

export const registerUser = async (formData: RegisterForm) => {
  const { data, error } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
  })

  if (error) console.log(error)
  if (data.user) {
    const { error } = await supabase.from('profiles').insert({
      id: data.user.id,
      username: formData.username,
      full_name: formData.firstName.concat(' ', formData.lastName),
    })

    if (error) return console.log('Profile error:', error)
  }

  return true
}

export const logoutUser = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) return console.log('Logout error:', error)
  return true
}
