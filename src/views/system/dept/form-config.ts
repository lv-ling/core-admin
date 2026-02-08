/** VxeGrid 搜索表单配置（formConfig），配合 form 插件使用 ElInput/ElSelect */
export const DEPT_FORM_CONFIG = {
  titleColon: false,
  titleWidth: 90,
  items: [
    {
      span: 24,
      align: 'start' as const,
      collapseNode: false,
      children: [
        {
          field: 'name',
          title: '部门名称',
          span: 6,
          itemRender: {
            name: 'ElInput',
            props: { placeholder: '请输入部门名称', clearable: true },
          },
        },
        {
          field: 'code',
          title: '部门编码',
          span: 6,
          itemRender: {
            name: 'ElInput',
            props: { placeholder: '请输入部门编码', clearable: true },
          },
        },
        {
          field: 'leader',
          title: '负责人',
          span: 6,
          itemRender: {
            name: 'ElInput',
            props: { placeholder: '请输入负责人', clearable: true },
          },
        },
        {
          field: 'type',
          title: '类型',
          span: 6,
          itemRender: {
            name: 'ElSelect',
            props: {
              placeholder: '全部',
              clearable: true,
              options: [
                { label: '公司', value: 'company' },
                { label: '分公司', value: 'branch' },
                { label: '部门', value: 'dept' },
                { label: '小组', value: 'group' },
              ],
            },
          },
        },
        {
          field: 'status',
          title: '状态',
          span: 6,
          itemRender: {
            name: 'ElSelect',
            props: {
              placeholder: '全部',
              clearable: true,
              options: [
                { label: '启用', value: 'enabled' },
                { label: '禁用', value: 'disabled' },
              ],
            },
          },
        },
      ],
    },
  ],
}

/** VxeGrid 工具栏配置（enabled: true 确保工具栏渲染） */
export const DEPT_TOOLBAR_CONFIG = {
  buttons: [
    { code: 'add', name: '新增部门', icon: 'vxe-icon-add' },
    { code: 'validate', name: '校验全部' },
    { code: 'save', name: '保存' },
  ],
}
