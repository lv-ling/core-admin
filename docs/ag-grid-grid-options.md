# AG Grid Vue 表格选项 中文文档

## 1. 使用方法

实现 `GridOptions<TData>` 接口。除标记为 `Initial` 的选项外，表格会响应属性更新。详见 [Updating Grid Options](https://www.ag-grid.com/vue-data-grid/grid-interface/#updating-grid-options)。

**绑定**：Vue 中属性使用 kebab-case，如 `rowHeight` → `row-height`。

## 2. 属性 (Props)

### 2.1 配件（Accessories）

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| statusBar | { statusPanels: StatusPanelDef[] } | - | 状态栏组件配置 |
| sideBar | SideBarDef \| string \| string[] \| boolean \| null | - | 侧边栏组件 |
| getContextMenuItems | GetContextMenuItems | - | 自定义右键菜单项 |
| suppressContextMenu | boolean | false | 是否隐藏右键菜单 |
| preventDefaultOnContextMenu | boolean | false | 配合 suppressContextMenu 使用，阻止浏览器默认右键菜单 |
| allowContextMenuWithControlKey | boolean | false | 是否允许按住 Ctrl 时显示右键菜单 |
| getMainMenuItems | GetMainMenuItems | - | 自定义列头主菜单项 [Initial] |
| columnMenu | 'legacy' \| 'new' | 'new' | 列菜单样式 [Initial] |
| suppressMenuHide | boolean | true | 列菜单按钮是否始终显示 |
| popupParent | HTMLElement \| null | - | 弹窗父元素（右键菜单、列菜单等） |
| postProcessPopup | Function | - | 弹窗创建后的处理（如重新定位） |

### 2.2 剪贴板（Clipboard）

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| copyHeadersToClipboard | boolean | false | 复制时是否包含表头 |
| copyGroupHeadersToClipboard | boolean | false | 复制时是否包含分组表头 |
| clipboardDelimiter | string | '\t' | 复制时的分隔符 |
| suppressCutToClipboard | boolean | false | 是否禁止剪切 |
| suppressLastEmptyLineOnPaste | boolean | false | 是否忽略粘贴时 Excel 多出的空行 |
| suppressClipboardPaste | boolean | false | 是否禁止粘贴 |
| suppressClipboardApi | boolean | false | 是否禁用 Clipboard API 并立即降级 |
| processCellForClipboard | Function | - | 复制前处理单元格值 |
| processHeaderForClipboard | Function | - | 复制前处理表头 |
| processCellFromClipboard | Function | - | 粘贴前处理单元格值 |
| sendToClipboard | Function | - | 自定义复制到剪贴板的逻辑 |
| processDataFromClipboard | Function | - | 完全控制粘贴操作 |

### 2.3 列定义（Column Definitions）

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| columnDefs | (ColDef \| ColGroupDef)[] \| null | - | 列 / 列组定义数组 |
| defaultColDef | ColDef | - | 默认列定义 |
| defaultColGroupDef | Partial<ColGroupDef> | - | 默认列组定义 [Initial] |
| columnTypes | { [key: string]: ColTypeDef } | - | 自定义列类型映射 |
| dataTypeDefinitions | { [key: string]: DataTypeDefinition } | - | 单元格数据类型定义 |
| maintainColumnOrder | boolean | false | 更新列定义时是否保持列顺序 |
| enableStrictPivotColumnOrder | boolean | false | 筛选/数据/配置变化时是否重置透视列顺序 |
| suppressFieldDotNotation | boolean | false | 是否不将 field 中的点作为深引用 |

### 2.4 列头（Column Headers）

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| headerHeight | number | - | 列标签表头行高（px） |
| groupHeaderHeight | number | - | 列组表头行高 |
| floatingFiltersHeight | number | - | 浮动筛选行高 |
| pivotHeaderHeight | number | - | 透视模式下列表头行高 |
| pivotGroupHeaderHeight | number | - | 透视模式下分组表头行高 |
| hidePaddedHeaderRows | boolean | - | 是否隐藏仅含填充分组的表头行 |

### 2.5 列移动（Column Moving）

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| suppressMovableColumns | boolean | false | 是否禁止列拖拽移动 |
| suppressMoveWhenColumnDragging | boolean | false | 拖拽时是否仅高亮目标位置，松手再移动 |
| suppressColumnMoveAnimation | boolean | false | 是否关闭列移动动画 |
| suppressDragLeaveHidesColumns | boolean | false | 列拖出表格时是否不隐藏 |
| allowDragFromColumnsToolPanel | boolean | false | 是否允许从列面板拖拽排序列 |

### 2.6 列尺寸（Column Sizing）

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| colResizeDefault | 'shift' | - | 默认按 Shift 调整列宽 |
| autoSizeStrategy | AutoSizeStrategy | - | 加载时自动列宽策略 [Initial] |
| suppressAutoSize | boolean | false | 是否禁止双击列边自动调整 [Initial] |
| autoSizePadding | number | 20 | 自动列宽计算后的额外像素 |
| skipHeaderOnAutoSize | boolean | false | 自动列宽时是否忽略表头 [Initial] |
| animateColumnResizing | boolean | false | 列宽变化是否动画 |

### 2.7 组件（Components）

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| components | { [p: string]: any } | - | 自定义组件名到组件的映射 [Initial] |

### 2.8 编辑（Editing）

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| editType | EditStrategyType | - | 'fullRow' 启用整行编辑 |
| getFullRowEditValidationErrors | Function | - | 整行编辑校验 |
| invalidEditValueMode | EditValidationCommitType | - | 'block' 阻止提交无效编辑 |
| singleClickEdit | boolean | false | 是否单击即开始编辑 |
| suppressClickEdit | boolean | false | 是否禁止单击/双击开始编辑 |
| stopEditingWhenCellsLoseFocus | boolean | false | 表格失焦时是否停止编辑 [Initial] |
| suppressStartEditOnTab | boolean | - | Tab 切换单元格时是否不自动开始编辑 |
| enterNavigatesVertically | boolean | false | Enter 是否向下移动（Excel 风格） |
| enterNavigatesVerticallyAfterEdit | boolean | false | 编辑后 Enter 是否向下移动 |
| enableCellEditingOnBackspace | boolean | - | 按退格键是否开始编辑（Mac） |
| undoRedoCellEditing | boolean | - | 是否启用编辑撤销/重做 [Initial] |
| undoRedoCellEditingLimit | number | 10 | 撤销/重做栈大小 [Initial] |
| readOnlyEdit | boolean | false | 是否禁止表格在编辑/粘贴后自动更新数据，由应用接管 |

### 2.9 筛选（Filtering）

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| quickFilterText | string | - | 快速筛选文本 |
| cacheQuickFilter | boolean | false | 是否缓存快速筛选 [Initial] |
| includeHiddenColumnsInQuickFilter | boolean | false | 快速筛选是否包含隐藏列 |
| isExternalFilterPresent | Function | - | 外部筛选是否生效 |
| doesExternalFilterPass | Function | - | 外部筛选是否通过 |
| enableAdvancedFilter | boolean | false | 是否启用高级筛选 |
| suppressSetFilterByDefault | boolean | false | 是否默认不使用 Set Filter [Initial] |

### 2.10 分页（Pagination）

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| pagination | boolean | false | 是否启用分页 |
| paginationPageSize | number | 100 | 每页行数 |
| paginationPageSizeSelector | number[] \| boolean | true | 每页条数选择器 [Initial] |
| paginationAutoPageSize | boolean | false | 是否根据可见区域自动调整每页行数 |
| suppressPaginationPanel | boolean | false | 是否隐藏默认分页控件 |

### 2.11 行模型（Row Model）

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| rowModelType | RowModelType | 'clientSide' | 行模型类型 [Initial] |
| getRowId | GetRowIdFunc | - | 行唯一 ID 函数 [Initial] |

### 2.12 客户端行数据（RowModel: Client-Side）

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| rowData | TData[] \| null | - | 行数据 |
| resetRowDataOnUpdate | boolean | false | 新数据时是否完全重置行状态 |

### 2.13 选择（Selection）

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| rowSelection | RowSelectionOptions \| 'single' \| 'multiple' | - | 行选择配置 |
| cellSelection | boolean \| CellSelectionOptions | - | 单元格选择配置 |
| selectionColumnDef | SelectionColumnDef | - | 选择列（复选框列）定义 |
| suppressCellFocus | boolean | false | 是否禁止单元格获焦 |
| suppressHeaderFocus | boolean | false | 是否禁止表头获焦 |
| enableCellTextSelection | boolean | false | 是否启用单元格内文本选择 |

### 2.14 样式（Styling）

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| rowHeight | number | 25 | 默认行高（px） |
| getRowHeight | Function | - | 按行设置行高 |
| rowStyle | RowStyle | - | 行样式 |
| getRowStyle | Function | - | 按行设置样式 |
| rowClass | string \| string[] | - | 行 class |
| getRowClass | Function | - | 按行设置 class |
| rowClassRules | RowClassRules | - | 行 class 规则 |
| suppressRowHoverHighlight | boolean | false | 是否禁用行悬停高亮 |

### 2.15 主题（Theme）

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| theme | Theme \| 'legacy' | themeQuartz | 主题 |
| loadThemeGoogleFonts | boolean | - | 是否加载主题所需 Google 字体 |

### 2.16 覆盖层（Overlays）

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| loading | boolean | undefined | 是否显示加载覆盖层 |
| activeOverlay | any | - | 当前显示的覆盖层 |
| overlayComponent | any | - | 自定义覆盖层组件 [Initial] |
| suppressOverlays | OverlayType[] | - | 要禁用的覆盖层列表 |

### 2.17 杂项（Miscellaneous）

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| context | any | - | 传递给回调的上下文 [Initial] |
| domLayout | DomLayoutType | 'normal' | DOM 布局（如 autoHeight） |
| animateRows | boolean | true | 是否启用行动画 |
| rowBuffer | number | 10 | 视口外渲染的行缓冲数量 |
| debug | boolean | false | 是否开启调试日志 [Initial] |

### 2.18 全局选项（gridOptions）

所有上述属性也可通过单一 `gridOptions` 对象传入。若同时设置在 `gridOptions` 和组件上，以组件上的为准。`gridOptions` 仅在初始化时读取。

## 3. 回调参数说明

- **GetContextMenuItems**：`params` 包含 `api`、`column`、`defaultItems` 等
- **processCellForClipboard**：`params` 包含 `value`、`column`、`node` 等
- 各回调的完整参数见 [API 文档](https://www.ag-grid.com/vue-data-grid/grid-options/)

## 4. Initial 标记

标记为 `[Initial]` 的选项不支持动态更新，修改后需销毁并重建表格才能生效。
