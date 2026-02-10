/**
 * 根据全局 colSpan 计算每个表单项的 span
 * - 使用 24 栅格系统
 */
export function calcBaseSpan(colSpan?: number): number {
  if (!colSpan || colSpan <= 0) return 24
  return Math.min(colSpan, 24)
}
