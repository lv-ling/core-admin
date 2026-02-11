import { ElButton, ElCol, ElFormItem, ElIcon } from 'element-plus'
import { ArrowDown, ArrowUp } from '@element-plus/icons-vue'
import type { VNodeChild } from 'vue'

interface RenderSearchActionsParams {
  span: number
  onSearch: () => void
  onReset: () => void
  /** 是否需要展示「更多」按钮 */
  showToggle: boolean
  /** 当前是否已经展开全部 */
  expanded: boolean
  /** 切换展开 / 收起 */
  onToggle: () => void
}

/**
 * 渲染搜索表单模式下的「查询 / 重置」按钮区域
 */
export function renderSearchActions({
  span,
  onSearch,
  onReset,
  showToggle,
  expanded,
  onToggle,
}: RenderSearchActionsParams): VNodeChild {
  return (
    <ElCol
      key="__core_form_search_actions"
      span={span}
    >
      <ElFormItem style={{ width: '100%' }}>
        <div class="w-full flex items-center justify-end gap-2">
          {showToggle && (
            <button
              type="button"
              class="cursor-pointer text-primary flex items-center border-none bg-transparent p-0"
              onClick={onToggle}
            >
              <ElIcon>
                {expanded ? <ArrowUp /> : <ArrowDown />}
              </ElIcon>
            </button>
          )}
          <ElButton onClick={onReset}>重置</ElButton>
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
