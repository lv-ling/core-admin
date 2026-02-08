import type { IDept } from '@/views/system/dept/types'

/** 获取部门树列表（扁平：id + parentId，前端用 tree-config 转树） */
export async function getDeptList(): Promise<IDept[]> {
  return [...MOCK_DEPT_LIST]
}

/** 新增部门 */
export async function createDept(data: Omit<IDept, 'id'>): Promise<IDept> {
  const id = `dept_${Date.now()}`
  const now = new Date().toISOString().slice(0, 19).replace('T', ' ')
  const newItem: IDept = {
    ...data,
    id,
    createTime: now,
    updateTime: now,
  }
  MOCK_DEPT_LIST.push(newItem)
  return newItem
}

/** 更新部门 */
export async function updateDept(id: string, data: Partial<IDept>): Promise<IDept> {
  const item = MOCK_DEPT_LIST.find((d) => d.id === id)
  if (!item) throw new Error('部门不存在')
  const next = { ...item, ...data, updateTime: new Date().toISOString().slice(0, 19).replace('T', ' ') }
  Object.assign(item, next)
  return item
}

/** 删除部门 */
export async function deleteDept(id: string): Promise<void> {
  const idx = MOCK_DEPT_LIST.findIndex((d) => d.id === id)
  if (idx === -1) throw new Error('部门不存在')
  MOCK_DEPT_LIST.splice(idx, 1)
}

/** 模拟数据（扁平：parentId 为 null 表示根） */
const MOCK_DEPT_LIST: IDept[] = [
  {
    id: '1',
    parentId: null,
    name: '总公司',
    code: 'ROOT',
    sortOrder: 0,
    status: 'enabled',
    type: 'company',
    leader: '张总',
    phone: '010-88888888',
    email: 'root@company.com',
    description: '根部门',
    createTime: '2024-01-01 00:00:00',
    updateTime: '2024-01-01 00:00:00',
  },
  {
    id: '2',
    parentId: '1',
    name: '技术部',
    code: 'TECH',
    sortOrder: 0,
    status: 'enabled',
    type: 'dept',
    leader: '李工',
    phone: '010-88880001',
    email: 'tech@company.com',
    description: '研发与运维',
    createTime: '2024-01-01 00:00:00',
    updateTime: '2024-01-01 00:00:00',
  },
  {
    id: '3',
    parentId: '1',
    name: '产品部',
    code: 'PRODUCT',
    sortOrder: 1,
    status: 'enabled',
    type: 'dept',
    leader: '王经理',
    createTime: '2024-01-01 00:00:00',
    updateTime: '2024-01-01 00:00:00',
  },
  {
    id: '4',
    parentId: '1',
    name: '市场部',
    code: 'MARKET',
    sortOrder: 2,
    status: 'enabled',
    type: 'dept',
    leader: '赵经理',
    phone: '010-88880003',
    createTime: '2024-01-01 00:00:00',
    updateTime: '2024-01-01 00:00:00',
  },
  {
    id: '5',
    parentId: '2',
    name: '前端组',
    code: 'FE',
    sortOrder: 0,
    status: 'enabled',
    type: 'group',
    leader: '小陈',
    createTime: '2024-01-01 00:00:00',
    updateTime: '2024-01-01 00:00:00',
  },
  {
    id: '6',
    parentId: '2',
    name: '后端组',
    code: 'BE',
    sortOrder: 1,
    status: 'enabled',
    type: 'group',
    leader: '小刘',
    createTime: '2024-01-01 00:00:00',
    updateTime: '2024-01-01 00:00:00',
  },
]
