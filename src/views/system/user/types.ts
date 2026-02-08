export interface IUser {
  id: string
  avatar: string
  username: string
  age: number | null
  email: string
  status: 'active' | 'inactive'
}
