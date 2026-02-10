import { ref } from 'vue'
import type { Ref } from 'vue'
import type { CoreFormProps } from '../types'

/**
 * 负责管理 CoreForm 的内部 props（除 model 外）
 * - 初始值来源于组件 props
 * - 通过 setProps 动态更新
 */
export function useFormProps(initialProps: CoreFormProps): {
  innerProps: Ref<CoreFormProps>
  setProps: (nextProps: Partial<CoreFormProps>) => void
} {
  const innerProps = ref<CoreFormProps>({ ...initialProps })

  function setProps(nextProps: Partial<CoreFormProps>) {
    if (!nextProps) return
    // 这里只更新除 schemas 以外的 props；schemas 仍由 useSchemas / updateSchema 负责
    const rest = { ...nextProps }
    delete (rest as Partial<CoreFormProps>).schemas
    innerProps.value = {
      ...innerProps.value,
      ...(rest as Partial<CoreFormProps>),
    }
  }

  return {
    innerProps,
    setProps,
  }
}

