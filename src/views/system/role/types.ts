export interface IRole {
  id: string
  roleCode: string
  roleName: string
  description: string
  status: 'enabled' | 'disabled'
  sortOrder: number
}
