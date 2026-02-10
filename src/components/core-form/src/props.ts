import type { PropType } from 'vue'
import type { CoreFormSchema, CoreFormProps } from './type'

export const coreFormProps = {
  /** 表单模型，必须为对象 */
  model: {
    type: Object as PropType<CoreFormProps['model']>,
    required: true,
  },
  /** 表单项配置列表 */
  schemas: {
    type: Array as PropType<CoreFormSchema[]>,
    required: true,
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
} as const
