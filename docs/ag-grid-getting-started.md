# AG Grid Vue 快速开始 中文文档

## 1. 使用方法

AG Grid 是高性能 Vue 数据表格库，用于构建 Vue 表格，提供数百项功能。分为 Community（社区版）和 Enterprise（企业版）。

### 1.1 NPM 安装

```bash
npm install ag-grid-vue3
```

该包会同时安装 `ag-grid-community`。

### 1.2 注册模块

注册 `AllCommunityModule` 以使用所有社区版功能：

```ts
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'

// 注册所有社区功能
ModuleRegistry.registerModules([AllCommunityModule])
```

为减小打包体积，可仅注册需要的模块。详见 [Modules](https://www.ag-grid.com/vue-data-grid/modules/)。

### 1.3 引入 Vue 表格组件

```vue
<script>
import { AgGridVue } from 'ag-grid-vue3'

export default {
  name: 'App',
  components: { AgGridVue },
  setup() {},
}
</script>
```

### 1.4 定义行与列

```ts
setup() {
  // 行数据：要展示的数据
  const rowData = ref([
    { make: 'Tesla', model: 'Model Y', price: 64950, electric: true },
    { make: 'Ford', model: 'F-Series', price: 33850, electric: false },
    { make: 'Toyota', model: 'Corolla', price: 29600, electric: false },
  ])

  // 列定义：要展示的列
  const colDefs = ref([
    { field: 'make' },
    { field: 'model' },
    { field: 'price' },
    { field: 'electric' },
  ])

  return { rowData, colDefs }
}
```

### 1.5 使用表格组件

将 `rowData` 和 `columnDefs` 作为 `ag-grid-vue` 的属性传入。样式通过 class 和 style 控制：

```vue
<template>
  <ag-grid-vue
    :row-data="rowData"
    :column-defs="colDefs"
    style="height: 500px"
  />
</template>
```

### 1.6 引入样式

在 `main.ts` 中全局引入：

```ts
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
```

并在包裹表格的父元素上添加主题类 `ag-theme-quartz`。

## 2. 下一步

- [Key Features](https://www.ag-grid.com/vue-data-grid/key-features/)：常用功能概览
- [Tutorials](https://www.ag-grid.com/vue-data-grid/deep-dive/)：分步教程
- [Community vs. Enterprise](https://www.ag-grid.com/vue-data-grid/community-vs-enterprise/)：版本对比
