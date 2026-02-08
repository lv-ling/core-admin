import type { Ref } from 'vue'
import type { ColDef } from 'ag-grid-community'
import type { IUser, IUserRowErrors } from './types'
import { validateAge } from './utils'

/**
 * ColDef 列定义 - 所有属性与用法说明
 *
 * @see https://www.ag-grid.com/javascript-data-grid/column-definitions/
 *
 * --- 基础标识 ---
 * colId?: string                    - 列唯一 ID，缺省时用 field
 * field?: string                    - 行数据字段名，支持点路径如 'address.city'
 * type?: string | string[]          - 引用 columnTypes 中的类型模板
 * headerName?: string               - 表头显示名称
 *
 * --- 表头 (AbstractColDef) ---
 * headerValueGetter                 - 函数/表达式，获取表头显示值
 * headerTooltip?: string            - 表头 tooltip
 * headerTooltipValueGetter          - 函数返回表头 tooltip 文本
 * headerStyle / headerClass         - 表头样式、class
 * wrapHeaderText?: boolean          - 表头文字过长时换行
 * autoHeaderHeight?: boolean        - 表头高度自适应
 * suppressHeaderContextMenu         - 是否禁用表头右键菜单
 * headerComponent                   - 自定义表头组件
 * headerComponentParams             - 表头组件参数
 *
 * --- 列尺寸 ---
 * width?: number                    - 固定宽度(px)
 * minWidth?: number                 - 最小宽度
 * maxWidth?: number                 - 最大宽度
 * flex?: number                     - 弹性宽度比例，按 flex 分配剩余空间
 * resizable?: boolean               - 是否可拖拽调整列宽，默认 true
 * suppressSizeToFit                 - 是否在 size to fit 时固定宽度
 * suppressAutoSize                  - 是否在 size to contents 时排除
 *
 * --- 显示/隐藏 ---
 * hide?: boolean                    - 是否隐藏列
 * lockVisible?: boolean             - 是否禁止通过 UI 显示/隐藏
 *
 * --- 固定/锁定 ---
 * pinned?: 'left'|'right'|boolean   - 列固定在左侧或右侧
 * lockPosition?: 'left'|'right'     - 锁定列位置
 * suppressMovable?: boolean         - 是否禁止拖拽移动列
 *
 * --- 数据/值 ---
 * valueGetter                       - 函数/表达式，从行数据获取显示值
 * valueFormatter                    - 函数，格式化显示值，返回字符串
 * valueSetter                       - 函数，编辑时写回数据
 * valueParser                       - 函数，解析用户输入为数据值
 * refData?: Record<string,string>   - 键值映射，用于显示名称转换
 * keyCreator                        - 函数，返回值用于分组/Set 筛选的 key
 * equals                            - 自定义值相等比较，用于判断是否需刷新
 * cellDataType?: boolean|string     - 单元格数据类型，'text'|'number'|'boolean'|'date' 等
 *
 * --- 编辑 ---
 * editable?: boolean | (params)=>boolean - 是否可编辑
 * cellEditor                        - 单元格编辑器组件
 * cellEditorParams                  - 编辑器参数
 * cellEditorSelector                - 按行选择不同编辑器的回调
 * singleClickEdit?: boolean         - 单击即编辑，默认双击
 * cellEditorPopup?: boolean         - 编辑器是否以弹窗形式显示
 * cellEditorPopupPosition?: 'over'|'under' - 弹窗位置
 * useValueFormatterForExport        - 导出时是否使用 valueFormatter
 * useValueParserForImport           - 粘贴/导入时是否使用 valueParser
 *
 * --- 单元格渲染 ---
 * cellRenderer                      - 单元格渲染组件
 * cellRendererParams                - 渲染器参数
 * cellRendererSelector              - 按行选择不同渲染器的回调
 * loadingCellRenderer               - 加载中时使用的渲染器
 * cellStyle / cellClass / cellClassRules - 单元格样式、class、class 规则
 * wrapText?: boolean                - 单元格内文字换行
 * autoHeight?: boolean              - 行高按内容自适应
 * enableCellChangeFlash             - 值变化时闪烁高亮
 *
 * --- 排序 ---
 * sortable?: boolean                - 是否可排序，默认 true
 * sort / initialSort                - 默认排序方向
 * sortIndex / initialSortIndex      - 多列排序时的顺序
 * sortingOrder                      - 排序循环顺序，如 ['asc','desc',null]
 * comparator                        - 自定义排序比较函数
 * unSortIcon?: boolean              - 无排序时是否显示未排序图标
 *
 * --- 筛选 ---
 * filter?: boolean | string         - 是否启用筛选，或指定筛选器类型
 * filterParams                      - 筛选器参数
 * filterValueGetter                 - 筛选用的值获取函数
 * floatingFilter?: boolean          - 是否显示浮动筛选框
 * suppressFloatingFilterButton      - 是否隐藏浮动筛选中的打开筛选器按钮
 * dateComponent                     - 日期筛选的自定义日期选择组件
 *
 * --- 行拖拽 ---
 * rowDrag?: boolean | (params)=>boolean - 是否作为行拖拽手柄列
 * rowDragText                       - 拖拽时显示的文本回调
 *
 * --- Tooltip ---
 * tooltipField                      - 用于 tooltip 的字段
 * tooltipValueGetter                - 返回 tooltip 文本的回调
 * tooltipComponent / tooltipComponentParams - 自定义 tooltip 组件
 *
 * --- 单元格事件 ---
 * onCellValueChanged                - 单元格值变化后回调
 * onCellClicked / onCellDoubleClicked / onCellContextMenu - 点击、双击、右键
 *
 * --- 菜单 ---
 * mainMenuItems                     - 列菜单项
 * contextMenuItems                  - 右键菜单项
 * menuTabs                          - 菜单 Tab 顺序
 * suppressHeaderMenuButton          - 是否隐藏列头菜单按钮
 * suppressHeaderFilterButton        - 是否隐藏列头筛选按钮
 *
 * --- 行分组/透视/聚合 (Enterprise) ---
 * rowGroup / rowGroupIndex          - 是否用于行分组及分组顺序
 * pivot / pivotIndex                - 是否用于透视及透视顺序
 * aggFunc / defaultAggFunc          - 聚合函数
 * enableRowGroup / enableValue / enablePivot - GUI 中是否允许分组/值/透视
 *
 * --- 其他 ---
 * colSpan / rowSpan                 - 单元格跨列/跨行
 * spanRows                          - 相同值自动合并单元格
 * getQuickFilterText                - 快速筛选时使用的文本
 * getFindText                       - Find 功能搜索时使用的文本
 * suppressNavigable                 - 是否禁止键盘导航
 * suppressKeyboardEvent             - 抑制键盘事件
 * suppressPaste                     - 是否禁止粘贴
 * suppressFillHandle                - 是否隐藏填充手柄
 * context?: any                     - 自定义上下文数据
 *
 * --- 默认列配置（defaultColDef）---
 * 作用于所有列，单列 colDef 可覆盖
 */
export const defaultColDef: ColDef<IUser> = {
  flex: 1, // 弹性宽度，列按比例填充
  sortable: true, // 允许列头排序
  filter: true, // 允许列筛选
}

/** 列定义，使用 AG Grid 内置 getValidationErrors 校验，rowErrorsRef 用于「校验/校验全部」后的单元格高亮和 tooltip */
export function getColDefs(rowErrorsRef: Ref<Map<string, IUserRowErrors>>): ColDef<IUser>[] {
  return [
    {
      field: 'username',
      headerName: '用户名',
      editable: true,
      rowDrag: true,
    },
    {
      field: 'avatar',
      headerName: '头像',
      width: 140,
      editable: true,
      cellRenderer: 'AvatarCellRenderer',
      cellEditor: 'AvatarCellEditor',
      cellEditorPopup: true,
    },
    {
      field: 'age',
      headerName: '年龄',
      width: 120,
      editable: true,
      cellEditor: 'agNumberCellEditor',
      cellEditorParams: {
        min: 0,
        max: 150,
        getValidationErrors: (params: { value: unknown }) => {
          const err = validateAge(params.value)
          return err ? [err] : null
        },
      },
      valueParser: (params) => {
        const v = params.newValue
        if (v === null || v === undefined || v === '') return null
        const n = Number(v)
        return Number.isNaN(n) ? null : Math.min(150, Math.max(0, Math.floor(n)))
      },
      cellClassRules: {
        'cell-has-error': (params) =>
          !!(params.data?.id && rowErrorsRef.value.get(params.data.id)?.age),
      },
      tooltipValueGetter: (params) =>
        params.data?.id ? rowErrorsRef.value.get(params.data.id)?.age ?? undefined : undefined,
    },
    {
      field: 'email',
      headerName: '邮箱',
      width: 200,
      editable: true,
      cellEditor: 'EmailCellEditor',
      cellClassRules: {
        'cell-has-error': (params) =>
          !!(params.data?.id && rowErrorsRef.value.get(params.data.id)?.email),
      },
      tooltipValueGetter: (params) =>
        params.data?.id ? rowErrorsRef.value.get(params.data.id)?.email ?? undefined : undefined,
    },
    {
      field: 'status',
      headerName: '状态',
      width: 100,
      editable: true,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: { values: ['active', 'inactive'] },
    },
    {
      headerName: '操作',
      width: 280,
      sortable: false,
      filter: false,
      editable: false,
      cellRenderer: 'RowActionsCellRenderer',
      pinned: 'right',
    },
  ]
}
