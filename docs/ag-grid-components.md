# AG Grid Vue 自定义组件 中文文档

## 1. 使用方法

AG Grid 支持多种自定义组件以定制表格行为，如单元格渲染、编辑、筛选等。

### 可自定义的组件类型

- **Cell Component**：单元格内容
- **Header Component**：列头
- **Edit Component**：单元格编辑
- **Filter Component**：列筛选器
- **Floating Filter**：浮动筛选
- **Loading Component**：加载单元格
- **Overlay Component**：加载 / 无数据 / 导出等覆盖层
- **Tooltip Component**：单元格提示
- 等

## 2. 组件注册方式

### 2.1 全局注册

```ts
import MyCustomCellEditor from './MyCustomCellEditor.vue'

app.component('MyCustomCellEditor', MyCustomCellEditor)
```

### 2.2 局部注册（components 选项）

```vue
<script>
import MyCustomCellEditor from './MyCustomCellEditor.vue'

export default {
  components: { MyCustomCellEditor },
  setup() {
    // ...
  },
}
</script>
```

### 2.3 局部注册（script setup + defineExpose）

```vue
<template>
  <ag-grid-vue :column-defs="columnDefs" ... />
</template>

<script setup>
import MyCustomCellEditor from './MyCustomCellEditor.vue'

const columnDefs = ref([
  { field: 'make', cellEditor: 'MyCustomCellEditor' },
])

defineExpose({ MyCustomCellEditor })
</script>
```

**注意**：Nuxt 的自动导入组件不能用于表格内部自定义组件，需手动注册。

## 3. 属性（Props）——传递额外参数

通过 `[prop-name]Params` 传递参数，如 `cellRendererParams`：

```ts
const columnDefs = [
  {
    field: 'price',
    cellRenderer: PriceCellRenderer,
    cellRendererParams: {
      currency: 'EUR',
    },
  },
]
```

## 4. 事件 / 回调——子组件与父组件通信

使用 `context` 传递父组件引用：

```vue
<!-- 父组件 -->
<ag-grid-vue :context="context" ... />

<script>
export default {
  data() {
    return { context: {} }
  },
  beforeMount() {
    this.context = { componentParent: this }
  },
  methods: {
    parentMethod() {
      // 父逻辑
    },
  },
}
</script>
```

```vue
<!-- 子组件 -->
<script>
export default {
  methods: {
    doSomething() {
      this.params.context.componentParent.parentMethod()
    },
  },
}
</script>
```

## 5. 组件配置位置汇总

| 组件类型 | 配置位置 | 属性 |
|----------|----------|------|
| Cell Component | 列定义 | cellRenderer, cellRendererParams, cellRendererSelector |
| Editor Component | 列定义 | cellEditor, cellEditorParams, cellEditorSelector |
| Filter | 列定义 | filter, filterParams |
| Floating Filter | 列定义 | floatingFilter, floatingFilterParams |
| Header Component | 列定义 | headerComponent, headerComponentParams |
| Tooltip Component | 列定义 | tooltipComponent, tooltipComponentParams |
| Group Row Cell | 表格选项 | groupRowRenderer, groupRowRendererParams |
| Detail Cell | 表格选项 | detailCellRenderer, detailCellRendererParams |
| Full Width Cell | 表格选项 | fullWidthCellRenderer, fullWidthCellRendererParams |
| Loading Cell | 表格选项 / 列定义 | loadingCellRenderer, loadingCellRendererParams |
| Overlay | 表格选项 | overlayComponent, overlayComponentParams, overlayComponentSelector |
| Active Overlay | 表格选项 | activeOverlay, activeOverlayParams |
| Drag and Drop Image | 表格选项 | dragAndDropImageComponent, dragAndDropImageComponentParams |
| Status Bar | 表格选项 → Status Bar | statusPanel, statusPanelParams |
| Tool Panel | 表格选项 → Side Bar | toolPanel, toolPanelParams |
| Menu Item | 表格选项 → Menu | menuItem, menuItemParams |

## 6. 内置组件（Grid Provided）

表格内置组件均以 `ag` 为前缀，例如：

| 类型 | 组件名 |
|------|--------|
| 列筛选 | agTextColumnFilter, agNumberColumnFilter, agDateColumnFilter, agSetColumnFilter (e) |
| 浮动筛选 | agTextColumnFloatingFilter, agNumberColumnFloatingFilter, agDateColumnFloatingFilter |
| 单元格 | agGroupCellRenderer, agCheckboxCellRenderer, agAnimateShowChangeCellRenderer |
| 编辑器 | agTextCellEditor, agSelectCellEditor, agNumberCellEditor, agDateCellEditor, agCheckboxCellEditor |
| 覆盖层 | agLoadingOverlay, agNoRowsOverlay, agNoMatchingRowsOverlay, agExportingOverlay |

(e) 表示 Enterprise 版本。

## 7. 覆盖默认组件

在 `gridOptions.components` 中按内置组件名注册即可覆盖：

```ts
const gridOptions = {
  components: {
    agDateInput: CustomDateComponent,
    agColumnHeader: CustomHeaderComponent,
    agNoRowsOverlay: CustomNoRowsOverlay,
  },
}
```

可覆盖的默认组件包括：

- agDragAndDropImage
- agDateInput
- agColumnHeader
- agColumnGroupHeader
- agLoadingCellRenderer
- agSkeletonCellRenderer
- agLoadingOverlay
- agNoRowsOverlay
- agNoMatchingRowsOverlay
- agExportingOverlay
- agCellEditor
- agDetailCellRenderer
- agMenuItem
- agTooltipComponent

## 8. 混合使用 JavaScript 与 Vue 组件

```ts
import JavascriptComponent from './JavascriptComponent.js'
import VueComponent from './VueComponent.vue'

const components = {
  javascriptComponent: JavascriptComponent,
}

const columnDefs = [
  { field: 'value', cellRenderer: JavascriptComponent },
  { field: 'value', cellRenderer: 'vueComponent' },
]
```

可直接传入 JS 组件引用，或用字符串引用注册的 Vue 组件。
