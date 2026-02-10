import { ElButton, ElCol, ElFormItem } from 'element-plus'
import type { VNodeChild } from 'vue'

interface RenderSearchActionsParams {
  span: number
  onSearch: () => void
  onReset: () => void
}

/**
 * 渲染搜索表单模式下的「查询 / 重置」按钮区域
 */
export function renderSearchActions({
  span,
  onSearch,
  onReset,
}: RenderSearchActionsParams): VNodeChild {
  return (
    <ElCol
      key="__core_form_search_actions"
      span={span}
    >
      <ElFormItem style={{ width: '100%' }}>
        <div class="w-full flex items-center justify-end">
          <ElButton
            class="ml-2"
            onClick={onReset}
          >
            重置
          </ElButton>
          <ElButton
            type="primary"
            onClick={onSearch}
          >
            查询
          </ElButton>
        </div>
      </ElFormItem>
    </ElCol>
  )
}
