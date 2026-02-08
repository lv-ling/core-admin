# AG Grid Vue 表格 API 中文文档

## 1. 使用方法

通过 `this.$refs.myGrid.api` 或 `gridReady` 事件中的 `params.api` 获取 API 实例。

```vue
<ag-grid-vue ref="gridRef" @grid-ready="onGridReady" />
```

```ts
const gridRef = ref()
let api: GridApi

function onGridReady(params: GridReadyEvent) {
  api = params.api
}
```

## 2. API 方法列表

### 2.1 配件（Accessories）

| 方法名 | 说明 |
|--------|------|
| showColumnChooser | 显示列选择器 |
| showColumnFilter | 显示指定列筛选器 |
| hideColumnFilter | 隐藏筛选器弹窗 |
| showColumnMenu | 显示列菜单 |
| showContextMenu | 显示右键菜单 |
| hidePopupMenu | 隐藏右键/列菜单 |
| hideColumnChooser | 隐藏列选择器 |
| getSideBar | 获取侧边栏配置 |
| setSideBarVisible | 显示/隐藏侧边栏 |
| isSideBarVisible | 侧边栏是否可见 |
| setSideBarPosition | 设置侧边栏位置 'left' \| 'right' |
| openToolPanel | 打开指定工具面板 |
| closeToolPanel | 关闭当前工具面板 |
| getOpenedToolPanel | 获取当前打开的工具面板 ID |
| isToolPanelShowing | 工具面板是否显示 |
| refreshToolPanel | 刷新工具面板 |
| getToolPanelInstance | 获取工具面板实例 |
| getStatusPanel | 获取状态栏面板实例 |

### 2.2 剪贴板（Clipboard）

| 方法名 | 说明 |
|--------|------|
| cutToClipboard | 剪切到剪贴板 |
| copyToClipboard | 复制到剪贴板 |
| copySelectedRangeToClipboard | 复制选中区域 |
| copySelectedRangeDown | 向下复制选中区域（类似 Ctrl+D） |
| copySelectedRowsToClipboard | 复制选中行 |
| pasteFromClipboard | 从剪贴板粘贴 |

### 2.3 列定义（Column Definitions）

| 方法名 | 说明 |
|--------|------|
| getColumnDefs | 获取当前列定义 |
| getColumn | 根据 colKey 获取列 |
| getColumns | 获取所有列 |
| getAllGridColumns | 获取所有表格列（含透视后的顺序） |

### 2.4 列显示（Column Display）

| 方法名 | 说明 |
|--------|------|
| setColumnsVisible | 设置列显示/隐藏 |
| getDisplayNameForColumn | 获取列显示名 |
| getDisplayedColAfter | 获取右侧相邻列 |
| getDisplayedColBefore | 获取左侧相邻列 |
| getAllDisplayedVirtualColumns | 获取所有已渲染列 |
| getAllDisplayedColumns | 获取所有当前显示的列 |
| getDisplayedCenterColumns | 获取中间区域显示的列 |
| getDisplayedLeftColumns | 获取左侧固定列 |
| getDisplayedRightColumns | 获取右侧固定列 |

### 2.5 列组（Column Groups）

| 方法名 | 说明 |
|--------|------|
| getColumnGroup | 根据名称获取列组 |
| getProvidedColumnGroup | 获取提供的列组 |
| setColumnGroupOpened | 展开/收起列组 |
| getDisplayNameForColumnGroup | 获取列组显示名 |
| getAllDisplayedColumnGroups | 获取所有显示的表头列组 |

### 2.6 列移动（Column Moving）

| 方法名 | 说明 |
|--------|------|
| moveColumns | 将列移动到指定索引 |
| moveColumnByIndex | 将指定索引的列移动到另一索引 |

### 2.7 列固定（Column Pinning）

| 方法名 | 说明 |
|--------|------|
| isPinning | 是否有列固定 |
| isPinningLeft | 是否有左侧固定列 |
| isPinningRight | 是否有右侧固定列 |
| setColumnsPinned | 设置列固定状态 |

### 2.8 列尺寸（Column Sizing）

| 方法名 | 说明 |
|--------|------|
| setColumnWidths | 设置列宽 |
| sizeColumnsToFit | 列宽自适应填满表格 |
| autoSizeColumns | 根据内容自动列宽 |
| autoSizeAllColumns | 自动调整所有列宽 |

### 2.9 列状态（Column State）

| 方法名 | 说明 |
|--------|------|
| getColumnState | 获取列状态 |
| applyColumnState | 应用列状态 |
| resetColumnState | 重置列状态 |
| getColumnGroupState | 获取列组状态 |
| setColumnGroupState | 设置列组状态 |
| resetColumnGroupState | 重置列组状态 |

### 2.10 编辑（Editing）

| 方法名 | 说明 |
|--------|------|
| startEditingCell | 开始编辑指定单元格 |
| stopEditing | 停止编辑（参数 true 取消） |
| isEditing | 是否正在编辑 |
| getEditingCells | 获取正在编辑的单元格 |
| getEditRowValues | 获取编辑中的行值 |
| getCellEditorInstances | 获取单元格编辑器实例 |
| validateEdit | 校验所有已打开的编辑器 |

### 2.11 事件（Events）

| 方法名 | 说明 |
|--------|------|
| addEventListener | 添加事件监听 |
| removeEventListener | 移除事件监听 |
| addGlobalListener | 添加全局监听（所有事件） |
| removeGlobalListener | 移除全局监听 |

### 2.12 导出（Export）

| 方法名 | 说明 |
|--------|------|
| exportDataAsCsv | 导出 CSV 并下载 |
| getDataAsCsv | 获取 CSV 字符串 |
| exportDataAsExcel | 导出 Excel 并下载 |
| getDataAsExcel | 获取 Excel Blob |

### 2.13 筛选（Filtering）

| 方法名 | 说明 |
|--------|------|
| getQuickFilter | 获取快速筛选文本 |
| resetQuickFilter | 重置快速筛选缓存 |
| isQuickFilterPresent | 是否设置了快速筛选 |
| isColumnFilterPresent | 是否有列筛选 |
| isAnyFilterPresent | 是否有任何筛选 |
| getColumnFilterInstance | 获取列筛选器实例 |
| getFilterModel | 获取所有筛选模型 |
| setFilterModel | 设置所有筛选模型 |
| getColumnFilterModel | 获取指定列筛选模型 |
| setColumnFilterModel | 设置指定列筛选模型 |
| onFilterChanged | 通知筛选已变化 |
| destroyFilter | 销毁筛选器 |

### 2.14 表格选项（Grid Options）

| 方法名 | 说明 |
|--------|------|
| getGridOption | 获取指定选项值 |
| setGridOption | 设置单个选项 |
| updateGridOptions | 批量更新选项 |

### 2.15 表格状态（Grid State）

| 方法名 | 说明 |
|--------|------|
| getState | 获取表格状态 |
| setState | 设置表格状态 |

### 2.16 键盘导航（Keyboard Navigation）

| 方法名 | 说明 |
|--------|------|
| getFocusedCell | 获取当前聚焦单元格 |
| setFocusedCell | 设置聚焦单元格 |
| clearFocusedCell | 清除聚焦 |
| tabToNextCell | Tab 到下一单元格 |
| tabToPreviousCell | Shift+Tab 到上一单元格 |
| setFocusedHeader | 设置表头聚焦 |

### 2.17 刷新（Refresh）

| 方法名 | 说明 |
|--------|------|
| refreshCells | 刷新单元格 |
| redrawRows | 重绘行 |
| refreshHeader | 重绘表头 |
| flashCells | 高亮闪烁指定单元格/行/列 |

### 2.18 行显示（Row Displayed）

| 方法名 | 说明 |
|--------|------|
| getDisplayedRowAtIndex | 获取指定索引的显示行 |
| getDisplayedRowCount | 获取显示行总数 |
| getFirstDisplayedRowIndex | 获取首个显示行索引 |
| getLastDisplayedRowIndex | 获取最后显示行索引 |

### 2.19 行节点（Row Nodes）

| 方法名 | 说明 |
|--------|------|
| getRowNode | 根据 ID 获取行节点 |
| forEachNode | 遍历所有节点 |
| forEachNodeAfterFilter | 遍历筛选后的节点 |
| forEachNodeAfterFilterAndSort | 按显示顺序遍历 |
| forEachLeafNode | 遍历叶子节点 |

### 2.20 客户端行模型（RowModel: Client-Side）

| 方法名 | 说明 |
|--------|------|
| applyTransaction | 应用事务（add/remove/update） |
| applyTransactionAsync | 异步应用事务 |
| flushAsyncTransactions | 执行挂起的异步事务 |
| refreshClientSideRowModel | 刷新客户端行模型 |
| isRowDataEmpty | 行数据是否为空 |

### 2.21 分页（Pagination）

| 方法名 | 说明 |
|--------|------|
| paginationIsLastPageFound | 是否已知道最后一页 |
| paginationGetPageSize | 每页行数 |
| paginationGetCurrentPage | 当前页索引（0-based） |
| paginationGetTotalPages | 总页数 |
| paginationGetRowCount | 可分页行总数 |
| paginationGoToPage | 跳转到指定页 |
| paginationGoToNextPage | 下一页 |
| paginationGoToPreviousPage | 上一页 |
| paginationGoToFirstPage | 第一页 |
| paginationGoToLastPage | 最后一页 |

### 2.22 滚动（Scrolling）

| 方法名 | 说明 |
|--------|------|
| ensureIndexVisible | 滚动到指定行索引可见 |
| ensureNodeVisible | 滚动到指定行节点可见 |
| ensureColumnVisible | 滚动到指定列可见 |
| getHorizontalPixelRange | 获取水平滚动像素范围 |
| getVerticalPixelRange | 获取垂直滚动像素范围 |

### 2.23 选择（Selection）

| 方法名 | 说明 |
|--------|------|
| selectAll | 全选 |
| deselectAll | 取消全选 |
| getSelectedNodes | 获取选中行节点 |
| getSelectedRows | 获取选中行数据 |
| setNodesSelected | 设置节点选中状态 |
| getCellRanges | 获取选中单元格范围 |
| addCellRange | 添加单元格范围 |
| clearCellSelection | 清除单元格选择 |

### 2.24 排序（Sorting）

| 方法名 | 说明 |
|--------|------|
| onSortChanged | 通知排序已变化 |

### 2.25 杂项（Miscellaneous）

| 方法名 | 说明 |
|--------|------|
| getCellValue | 获取单元格值 |
| destroy | 销毁表格 |
| isDestroyed | 是否已销毁 |
| getGridId | 获取表格 ID |

## 3. 回调参数说明

各方法参数与返回值以官方 TypeScript 类型为准，可在 IDE 中查看完整类型定义。

## 4. 返回值 / 返回类型说明

- `getColumn`：返回 `Column | undefined`
- `getColumns`：返回 `Column[]`
- `getFilterModel`：返回 `{ [colId: string]: any }`
- `getState`：返回 `GridState`
- `getSelectedRows`：返回 `TData[]`
