# AG Grid Vue 表格概览 中文文档

## 1. 使用方法

本节提供表格配置与交互的核心说明。

## 2. 属性（Grid Options）

表格通过 `ag-grid-vue` 组件配置。属性包括简单类型、数组、复杂对象和回调函数。

**绑定方式**：使用 kebab-case（短横线）语法，而非 camelCase。例如 `pivotMode` 绑定为 `pivot-mode`。

```vue
<ag-grid-vue
  row-group-panel-show="always"
  :pivot-mode="true"
  :column-defs="columnDefs"
  :get-row-height="myGetRowHeightFunction"
  @cell-clicked="onCellClicked"
/>
```

### 2.1 更新表格选项

更新绑定的属性后，表格会自动响应。例如修改 `rowHeight` 会重绘所有行：

```vue
<ag-grid-vue :row-height="rowHeight" />
```

```ts
updateHeight() {
  this.rowHeight = 50
}
```

也可通过 API 更新：

```ts
api.setGridOption('rowHeight', 50)
```

### 2.2 初始选项（Initial）

部分选项**不支持**动态更新，仅在初次创建时读取。在 [Options Reference](https://www.ag-grid.com/vue-data-grid/grid-options/) 中标记为 `Initial`。若要生效，需销毁并重新创建表格。

### 2.3 全局选项

通过 `provideGlobalGridOptions` 共享配置，所有表格继承全局选项，本地选项优先：

```ts
import { provideGlobalGridOptions } from 'ag-grid-community'

provideGlobalGridOptions({ localeText: userLocaleText })
```

第二个参数 `deep` / `shallow` 控制对象合并行为：`shallow` 时本地对象完全覆盖全局；`deep` 时合并。默认为 `shallow`。

## 3. 事件（Grid Events）

用户与表格交互时触发事件。使用标准 Vue 写法绑定，**事件名需使用 kebab-case**：

```vue
<ag-grid-vue @cell-clicked="onCellClicked" />
```

TypeScript 可使用事件接口，格式为事件名 + `Event`，如 `cellClicked` → `CellClickedEvent`。所有事件支持泛型。

## 4. 回调参数说明

- **gridReady**：表格初始化完成时触发，可在此保存 `params.api` 引用
- 所有事件与回调的 `params` 中均包含 `api`，可直接使用

**注意**：若用 ref 存储 API，需使用 `shallowRef` 而非 `ref`。

## 5. Grid API

通过 `this.$refs.myGrid.api` 访问，仅表格初始化后有值：

```vue
<ag-grid-vue ref="myGrid" />
```

```ts
onClick() {
  this.$refs.myGrid.api.deselectAll()
}
```

或通过 `gridReady` 保存：

```vue
<ag-grid-vue @grid-ready="onGridReady" />
```

```ts
onGridReady = (params) => {
  this.api = params.api
}
```

## 6. Grid State 与 Lifecycle

- **Grid State**：筛选、排序、列顺序等状态可保存与恢复
- **Grid Lifecycle**：在初始化、首屏渲染、销毁等时机执行逻辑，详见 [Grid Lifecycle](https://www.ag-grid.com/vue-data-grid/grid-lifecycle/)
