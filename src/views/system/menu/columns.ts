import type { ColDef } from 'ag-grid-community'

interface MenuRow {
  id: number
  name: string
  path: string
  component: string
  type: string
  permission: string
  sort: number
  status: string
}

/** 菜单列表列配置（用于 ag-Grid） */
export const menuColumnDefs: ColDef<MenuRow>[] = [
  {
    headerName: '菜单名称',
    field: 'name',
    width: 200,
    pinned: 'left',
    sortable: true,
    resizable: true,
  },
  {
    headerName: '路由路径',
    field: 'path',
    width: 220,
    sortable: true,
    resizable: true,
  },
  {
    headerName: '组件路径',
    field: 'component',
    width: 260,
    resizable: true,
  },
  {
    headerName: '类型',
    field: 'type',
    width: 80,
  },
  {
    headerName: '权限标识',
    field: 'permission',
    width: 200,
    resizable: true,
  },
  {
    headerName: '排序',
    field: 'sort',
    width: 80,
    sortable: true,
  },
  {
    headerName: '状态',
    field: 'status',
    width: 80,
  },
]

/** 通用列默认配置 */
export const menuDefaultColDef: ColDef = {
  sortable: true,
  resizable: true,
  filter: true,
}

