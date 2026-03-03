import type { CoreFormSchema } from '../types'

/**
 * 根据全局 colSpan 计算每个表单项的 span
 * - 使用 24 栅格系统
 */
export function calcBaseSpan(colSpan?: number): number {
  if (!colSpan || colSpan <= 0) return 24
  return Math.min(colSpan, 24)
}

export function normalizeSpan(span: number | undefined, baseSpan: number): number {
  if (!span || span <= 0) return baseSpan
  return Math.min(Math.max(Math.floor(span), 1), 24)
}

export interface SearchSchemaLayoutResult {
  visibleSchemas: CoreFormSchema[]
  showToggle: boolean
}

export function calcSearchActionsOffsetBySpan(
  schemas: CoreFormSchema[],
  baseSpan: number,
  actionSpan: number
): number {
  const normalizedActionSpan = Math.min(Math.max(actionSpan, 1), 24)
  let used = 0

  for (const schema of schemas) {
    const span = normalizeSpan(schema.colSpan, baseSpan)
    if (used + span > 24) {
      used = 0
    }
    used += span
  }

  if (used + normalizedActionSpan <= 24) {
    return Math.max(24 - used - normalizedActionSpan, 0)
  }

  return Math.max(24 - normalizedActionSpan, 0)
}

export function calcSearchVisibleSchemasBySpan(
  schemas: CoreFormSchema[],
  baseSpan: number,
  maxRows: number,
  expanded: boolean
): SearchSchemaLayoutResult {
  const normalizedMaxRows = Math.max(1, Math.floor(maxRows))
  const collapsedCount = calcCollapsedSchemaCountBySpan(
    schemas,
    baseSpan,
    normalizedMaxRows,
    baseSpan
  )
  const showToggle = collapsedCount < schemas.length
  if (!showToggle || expanded) {
    return {
      visibleSchemas: schemas,
      showToggle,
    }
  }

  return {
    visibleSchemas: schemas.slice(0, collapsedCount),
    showToggle,
  }
}

function calcCollapsedSchemaCountBySpan(
  schemas: CoreFormSchema[],
  baseSpan: number,
  maxRows: number,
  actionSpan: number
): number {
  const includedSpans: number[] = []

  for (const schema of schemas) {
    const currentSpan = normalizeSpan(schema.colSpan, baseSpan)
    const tentativeSpans = [...includedSpans, currentSpan]
    if (!canLayoutFitRows(tentativeSpans, actionSpan, maxRows)) {
      break
    }
    includedSpans.push(currentSpan)
  }

  return includedSpans.length
}

function canLayoutFitRows(fieldSpans: number[], actionSpan: number, maxRows: number): boolean {
  let row = 1
  let used = 0

  for (const rawSpan of fieldSpans) {
    const span = Math.min(Math.max(rawSpan, 1), 24)
    if (used + span > 24) {
      row += 1
      used = 0
    }
    if (row > maxRows) return false
    used += span
  }

  const normalizedActionSpan = Math.min(Math.max(actionSpan, 1), 24)
  if (used + normalizedActionSpan > 24) {
    row += 1
  }

  return row <= maxRows
}
