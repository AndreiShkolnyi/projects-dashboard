export const validateEmail = (email: string) => {
  const trimmedEmail = email.trim()
  if (!trimmedEmail) return []

  const errors = []

  const emailRegexp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
  const isValidEmail = emailRegexp.test(trimmedEmail)

  if (!isValidEmail) errors.push('Email is not valid')

  return errors
}

export const validatePassword = (password: string) => {
  if (!password) return []

  const errors = []

  const passwordRegexp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,/g
  const isValidPassword = passwordRegexp.test(password)
  if (password.length < 6) errors.push('Password must be at least 6 characters')
  if (!isValidPassword) errors.push('Password is not valid')
  return errors
}
