# AG Grid Vue 表格事件 中文文档

## 1. 使用方法

事件绑定方式：`@事件名="处理方法"`，事件名使用 **kebab-case**。

```vue
<ag-grid-vue @cell-clicked="onCellClicked" @grid-ready="onGridReady" />
```

## 2. 事件列表

### 配件相关（Accessories）

| 事件名 | 回调参数类型 | 说明 |
|--------|--------------|------|
| toolPanelVisibleChanged | ToolPanelVisibleChangedEvent | 工具面板可见性变化 |
| toolPanelSizeChanged | ToolPanelSizeChangedEvent | 工具面板尺寸变化 |
| columnMenuVisibleChanged | ColumnMenuVisibleChangedEvent | 列菜单可见性变化 |
| contextMenuVisibleChanged | ContextMenuVisibleChangedEvent | 右键菜单可见性变化（打开/关闭） |

### 剪贴板（Clipboard）

| 事件名 | 回调参数类型 | 说明 |
|--------|--------------|------|
| cutStart | CutStartEvent | 剪切开始 |
| cutEnd | CutEndEvent | 剪切结束 |
| pasteStart | PasteStartEvent | 粘贴开始 |
| pasteEnd | PasteEndEvent | 粘贴结束 |

### 列（Columns）

| 事件名 | 回调参数类型 | 说明 |
|--------|--------------|------|
| columnVisible | ColumnVisibleEvent | 列显示/隐藏 |
| columnPinned | ColumnPinnedEvent | 列固定/取消固定 |
| columnResized | ColumnResizedEvent | 列宽调整 |
| columnMoved | ColumnMovedEvent | 列移动 |
| columnValueChanged | ColumnValueChangedEvent | 值列增删 |
| columnPivotModeChanged | ColumnPivotModeChangedEvent | 透视模式切换 |
| columnPivotChanged | ColumnPivotChangedEvent | 透视列增删或顺序变化 |
| columnGroupOpened | ColumnGroupOpenedEvent | 列组展开/收起 |
| newColumnsLoaded | NewColumnsLoadedEvent | 用户设置新列 |
| gridColumnsChanged | GridColumnsChangedEvent | 表格列列表变化 |
| displayedColumnsChanged | DisplayedColumnsChangedEvent | 展示列列表变化 |
| virtualColumnsChanged | VirtualColumnsChangedEvent | 渲染列变化（仅视口内列） |
| columnHeaderMouseOver | ColumnHeaderMouseOverEvent | 鼠标移入列头 |
| columnHeaderMouseLeave | ColumnHeaderMouseLeaveEvent | 鼠标移出列头 |
| columnHeaderClicked | ColumnHeaderClickedEvent | 列头点击 |
| columnHeaderContextMenu | ColumnHeaderContextMenuEvent | 列头右键菜单 |
| pivotMaxColumnsExceeded | PivotMaxColumnsExceededEvent | 透视列数超出限制 |
| columnsReset | ColumnsResetEvent | 列重置为默认状态 |

### 编辑（Editing）

| 事件名 | 回调参数类型 | 说明 |
|--------|--------------|------|
| cellValueChanged | CellValueChangedEvent | 单元格值变化（编辑/剪切/粘贴/清除/填充等） |
| cellEditRequest | CellEditRequestEvent | 编辑请求（仅 readOnlyEdit=true 时） |
| rowValueChanged | RowValueChangedEvent | 行内单元格值变化（整行编辑） |
| cellEditingStarted | CellEditingStartedEvent | 单元格编辑开始 |
| cellEditingStopped | CellEditingStoppedEvent | 单元格编辑结束 |
| rowEditingStarted | RowEditingStartedEvent | 行编辑开始（整行编辑） |
| rowEditingStopped | RowEditingStoppedEvent | 行编辑结束 |
| undoStarted | UndoStartedEvent | 撤销开始 |
| undoEnded | UndoEndedEvent | 撤销结束 |
| redoStarted | RedoStartedEvent | 重做开始 |
| redoEnded | RedoEndedEvent | 重做结束 |
| cellSelectionDeleteStart | CellSelectionDeleteStartEvent | 选区删除开始 |
| cellSelectionDeleteEnd | CellSelectionDeleteEndEvent | 选区删除结束 |

### 筛选（Filtering）

| 事件名 | 回调参数类型 | 说明 |
|--------|--------------|------|
| filterOpened | FilterOpenedEvent | 筛选器打开 |
| filterChanged | FilterChangedEvent | 筛选已修改并应用 |
| filterModified | FilterModifiedEvent | 筛选已修改未应用 |
| filterUiChanged | FilterUiChangedEvent | 筛选 UI 修改 |
| floatingFilterUiChanged | FloatingFilterUiChangedEvent | 浮动筛选 UI 修改 |
| advancedFilterBuilderVisibleChanged | AdvancedFilterBuilderVisibleChangedEvent | 高级筛选构建器可见性变化 |

### 查找（Find）

| 事件名 | 回调参数类型 | 说明 |
|--------|--------------|------|
| findChanged | FindChangedEvent | 查找条件或结果变化 |

### 图表（Integrated Charts）

| 事件名 | 回调参数类型 | 说明 |
|--------|--------------|------|
| chartCreated | ChartCreatedEvent | 图表创建 |
| chartRangeSelectionChanged | ChartRangeSelectionChangedEvent | 图表数据范围变化 |
| chartOptionsChanged | ChartOptionsChangedEvent | 图表选项变化 |
| chartDestroyed | ChartDestroyedEvent | 图表销毁 |

### 键盘（Keyboard Navigation）

| 事件名 | 回调参数类型 | 说明 |
|--------|--------------|------|
| cellKeyDown | CellKeyDownEvent \| FullWidthCellKeyDownEvent | 单元格 keyDown 事件 |

### 杂项（Miscellaneous）

| 事件名 | 回调参数类型 | 说明 |
|--------|--------------|------|
| gridReady | GridReadyEvent | 表格初始化完成，多数 API 可用 |
| gridPreDestroyed | GridPreDestroyedEvent | 表格即将销毁，用于清理 |
| firstDataRendered | FirstDataRenderedEvent | 首次数据渲染完成 |
| gridSizeChanged | GridSizeChangedEvent | 表格尺寸变化 |
| modelUpdated | ModelUpdatedEvent | 展示行变化（排序/筛选/树展开等） |
| virtualRowRemoved | VirtualRowRemovedEvent | 行从 DOM 移除 |
| viewportChanged | ViewportChangedEvent | 渲染行变化 |
| bodyScroll | BodyScrollEvent | 表格主体滚动 |
| bodyScrollEnd | BodyScrollEndEvent | 表格主体滚动结束 |
| dragStarted | DragStartedEvent | 拖拽开始 |
| dragStopped | DragStoppedEvent | 拖拽结束 |
| stateUpdated | StateUpdatedEvent | 表格状态更新 |

### 分页（Pagination）

| 事件名 | 回调参数类型 | 说明 |
|--------|--------------|------|
| paginationChanged | PaginationChangedEvent | 分页状态变化（页码、每页条数、数据加载等） |

### 行拖拽（Row Drag and Drop）

| 事件名 | 回调参数类型 | 说明 |
|--------|--------------|------|
| rowDragEnter | RowDragEnterEvent | 拖拽进入表格 |
| rowDragMove | RowDragMoveEvent | 拖拽中移动 |
| rowDragLeave | RowDragLeaveEvent | 拖拽离开表格 |
| rowDragEnd | RowDragEndEvent | 拖拽在表格内结束 |
| rowDragCancel | RowDragCancelEvent | 拖拽取消 |

### 行分组（Row Grouping）

| 事件名 | 回调参数类型 | 说明 |
|--------|--------------|------|
| columnRowGroupChanged | ColumnRowGroupChangedEvent | 行分组列增删或重排 |
| rowGroupOpened | RowGroupOpenedEvent | 行组展开/收起 |
| expandOrCollapseAll | ExpandOrCollapseAllEvent | 调用 expandAll/collapseAll 时触发 |

### 行固定（Row Pinning）

| 事件名 | 回调参数类型 | 说明 |
|--------|--------------|------|
| pinnedRowDataChanged | PinnedRowDataChangedEvent | 固定行数据更新 |
| pinnedRowsChanged | PinnedRowsChangedEvent | 行固定/取消固定 |

### 客户端行模型（RowModel: Client-Side）

| 事件名 | 回调参数类型 | 说明 |
|--------|--------------|------|
| rowDataUpdated | RowDataUpdatedEvent | 行数据更新（新数据或事务） |
| asyncTransactionsFlushed | AsyncTransactionsFlushedEvent | 异步事务已应用 |

### 服务端行模型（RowModel: Server-Side）

| 事件名 | 回调参数类型 | 说明 |
|--------|--------------|------|
| storeRefreshed | StoreRefreshedEvent | 服务端 store 刷新完成 |

### 选择（Selection）

| 事件名 | 回调参数类型 | 说明 |
|--------|--------------|------|
| headerFocused | HeaderFocusedEvent | 表头获焦 |
| cellClicked | CellClickedEvent | 单元格点击 |
| cellDoubleClicked | CellDoubleClickedEvent | 单元格双击 |
| cellFocused | CellFocusedEvent | 单元格获焦 |
| cellMouseOver | CellMouseOverEvent | 鼠标移入单元格 |
| cellMouseOut | CellMouseOutEvent | 鼠标移出单元格 |
| cellMouseDown | CellMouseDownEvent | 单元格鼠标按下 |
| rowClicked | RowClickedEvent | 行点击 |
| rowDoubleClicked | RowDoubleClickedEvent | 行双击 |
| rowSelected | RowSelectedEvent | 行选中/取消选中 |
| selectionChanged | SelectionChangedEvent | 行选择变化 |
| cellContextMenu | CellContextMenuEvent | 单元格右键 |
| cellSelectionChanged | CellSelectionChangedEvent | 单元格选择变化 |
| fillStart | FillStartEvent | 填充开始 |
| fillEnd | FillEndEvent | 填充结束 |

### 排序（Sorting）

| 事件名 | 回调参数类型 | 说明 |
|--------|--------------|------|
| sortChanged | SortChangedEvent | 排序变化 |

### 提示（Tooltips）

| 事件名 | 回调参数类型 | 说明 |
|--------|--------------|------|
| tooltipShow | TooltipShowEvent | 提示显示 |
| tooltipHide | TooltipHideEvent | 提示隐藏 |

## 3. 回调参数说明

所有事件的 `params` 均包含：

- `api`：表格 API 实例
- `type`：事件类型
- 其他与具体事件相关的字段（如 cell、rowNode、column 等）

TypeScript 用户可参考对应 `XXXEvent` 接口获取完整类型定义。
