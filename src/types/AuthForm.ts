export type LoginForm = {
  email: string
  password: string
}

export type RegisterForm = LoginForm & {
  confirmPassword: string
  username: string
  firstName: string
  lastName: string
}
