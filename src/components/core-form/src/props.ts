import type { PropType } from 'vue'
import type { CoreFormSchema, CoreFormProps } from './types'

export const coreFormProps = {
  /** 表单项配置列表 */
  schemas: {
    type: Array as PropType<CoreFormSchema[]>,
    default: () => [],
  },
  /**
   * 每个表单项占用的栅格宽度（1-24）
   * - 24: 一行一个（默认）
   * - 12: 一行两个
   * - 8:  一行三个
   * 等价于 ElCol 的 span，schema.colSpan 可单独覆盖
   */
  colSpan: {
    type: Number as PropType<number>,
    default: 6,
  },
  /**
   * 行间距（左右 gutter，单位 px）
   * 等价于 ElRow 的 gutter，默认 16
   */
  gutter: {
    type: Number as PropType<number>,
    default: 16,
  },
  /** 标签宽度，默认 90px，等价于 ElForm 的 label-width */
  labelWidth: {
    type: [String, Number] as PropType<CoreFormProps['labelWidth']>,
    default: '90px',
  },
  /** 标签位置，默认 right，等价于 ElForm 的 label-position */
  labelPosition: {
    type: String as PropType<CoreFormProps['labelPosition']>,
    default: 'right',
  },
  /** 表单尺寸，默认 default，等价于 ElForm 的 size */
  size: {
    type: String as PropType<CoreFormProps['size']>,
    default: 'default',
  },
  /** 是否行内表单，默认 false，等价于 ElForm 的 inline */
  inline: {
    type: Boolean as PropType<CoreFormProps['inline']>,
    default: false,
  },
  /** 是否为搜索表单，自动在末尾追加查询 / 重置按钮 */
  isSearch: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
} as const
