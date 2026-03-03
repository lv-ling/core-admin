import type { Component, VNodeChild } from 'vue'
import {
  ElAutocomplete,
  ElCheckbox,
  ElCheckboxGroup,
  ElColorPicker,
  ElDatePicker,
  ElInput,
  ElInputNumber,
  ElOption,
  ElProgress,
  ElRadio,
  ElRadioGroup,
  ElRate,
  ElSelect,
  ElSkeleton,
  ElSkeletonItem,
  ElSlider,
  ElSwitch,
  ElTimePicker,
  ElTimeSelect,
  ElUpload,
} from 'element-plus'

export interface CoreFormOption {
  label: string
  value: string | number | boolean
  disabled?: boolean
}

export interface CoreFormFieldAdapterContext {
  schemaProps: Record<string, unknown>
  options: CoreFormOption[]
}

export interface CoreFormFieldAdapter {
  component: Component
  mapProps?: (ctx: CoreFormFieldAdapterContext) => Record<string, unknown>
  renderChildren?: (ctx: CoreFormFieldAdapterContext) => VNodeChild
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function toOption(raw: unknown): CoreFormOption | null {
  if (!isRecord(raw)) return null
  const label = raw.label
  const value = raw.value
  if (typeof label !== 'string') return null
  if (typeof value !== 'string' && typeof value !== 'number' && typeof value !== 'boolean')
    return null
  const disabled = typeof raw.disabled === 'boolean' ? raw.disabled : undefined
  return { label, value, disabled }
}

function getSchemaOptions(schemaProps: Record<string, unknown>): CoreFormOption[] {
  const rawOptions = schemaProps.options
  if (!Array.isArray(rawOptions)) return []
  return rawOptions
    .map((item) => toOption(item))
    .filter((item): item is CoreFormOption => item !== null)
}

function omitOptionsProp(schemaProps: Record<string, unknown>): Record<string, unknown> {
  const rest = { ...schemaProps }
  delete rest.options
  return rest
}

function defaultMapProps(ctx: CoreFormFieldAdapterContext): Record<string, unknown> {
  return ctx.schemaProps
}

const builtinFieldRegistry = {
  input: {
    component: ElInput,
    mapProps: defaultMapProps,
  },
  'input-number': {
    component: ElInputNumber,
    mapProps: defaultMapProps,
  },
  select: {
    component: ElSelect,
    mapProps: (ctx: CoreFormFieldAdapterContext) => omitOptionsProp(ctx.schemaProps),
    renderChildren: (ctx: CoreFormFieldAdapterContext) =>
      ctx.options.map((option) => (
        <ElOption
          key={String(option.value)}
          label={option.label}
          value={option.value}
          disabled={option.disabled}
        />
      )),
  },
  switch: {
    component: ElSwitch,
    mapProps: defaultMapProps,
  },
  'checkbox-group': {
    component: ElCheckboxGroup,
    mapProps: (ctx: CoreFormFieldAdapterContext) => omitOptionsProp(ctx.schemaProps),
    renderChildren: (ctx: CoreFormFieldAdapterContext) =>
      ctx.options.map((option) => (
        <ElCheckbox
          key={String(option.value)}
          value={option.value}
          disabled={option.disabled}
        >
          {option.label}
        </ElCheckbox>
      )),
  },
  'radio-group': {
    component: ElRadioGroup,
    mapProps: (ctx: CoreFormFieldAdapterContext) => omitOptionsProp(ctx.schemaProps),
    renderChildren: (ctx: CoreFormFieldAdapterContext) =>
      ctx.options.map((option) => (
        <ElRadio
          key={String(option.value)}
          value={option.value}
          disabled={option.disabled}
        >
          {option.label}
        </ElRadio>
      )),
  },
  autocomplete: {
    component: ElAutocomplete,
    mapProps: defaultMapProps,
  },
  'color-picker': {
    component: ElColorPicker,
    mapProps: defaultMapProps,
  },
  'date-picker': {
    component: ElDatePicker,
    mapProps: defaultMapProps,
  },
  'time-picker': {
    component: ElTimePicker,
    mapProps: defaultMapProps,
  },
  'time-select': {
    component: ElTimeSelect,
    mapProps: defaultMapProps,
  },
  upload: {
    component: ElUpload,
    mapProps: defaultMapProps,
  },
  slider: {
    component: ElSlider,
    mapProps: defaultMapProps,
  },
  rate: {
    component: ElRate,
    mapProps: defaultMapProps,
  },
  progress: {
    component: ElProgress,
    mapProps: defaultMapProps,
  },
  skeleton: {
    component: ElSkeleton,
    mapProps: defaultMapProps,
  },
  'skeleton-item': {
    component: ElSkeletonItem,
    mapProps: defaultMapProps,
  },
} as const satisfies Record<string, CoreFormFieldAdapter>

export type BuiltinCoreFormFieldType = keyof typeof builtinFieldRegistry
export type CoreFormFieldType = BuiltinCoreFormFieldType | (string & {})

const customFieldRegistry = new Map<string, CoreFormFieldAdapter>()

export function registerCoreFormField(type: string, adapter: CoreFormFieldAdapter): void {
  customFieldRegistry.set(type, adapter)
}

export function unregisterCoreFormField(type: string): void {
  customFieldRegistry.delete(type)
}

export function resolveCoreFormField(type: string): CoreFormFieldAdapter | undefined {
  return customFieldRegistry.get(type) ?? builtinFieldRegistry[type as BuiltinCoreFormFieldType]
}

export const legacyComponentTypeMap = {
  ElInput: 'input',
  ElInputNumber: 'input-number',
  ElSelect: 'select',
  ElSwitch: 'switch',
  ElCheckboxGroup: 'checkbox-group',
  ElRadioGroup: 'radio-group',
  ElAutocomplete: 'autocomplete',
  ElColorPicker: 'color-picker',
  ElDatePicker: 'date-picker',
  ElTimePicker: 'time-picker',
  ElTimeSelect: 'time-select',
  ElUpload: 'upload',
  ElSlider: 'slider',
  ElRate: 'rate',
  ElProgress: 'progress',
  ElSkeleton: 'skeleton',
  ElSkeletonItem: 'skeleton-item',
} as const satisfies Record<string, BuiltinCoreFormFieldType>

export type LegacyCoreFormComponent = keyof typeof legacyComponentTypeMap

export function resolveCoreFormFieldBySchema(
  type?: CoreFormFieldType,
  component?: LegacyCoreFormComponent
): CoreFormFieldAdapter | undefined {
  if (typeof type === 'string' && type) {
    return resolveCoreFormField(type)
  }
  if (!component) return undefined
  const mappedType = legacyComponentTypeMap[component]
  return mappedType ? resolveCoreFormField(mappedType) : undefined
}

export function createFieldAdapterContext(
  schemaProps?: Record<string, unknown>
): CoreFormFieldAdapterContext {
  const safeProps = schemaProps ?? {}
  return {
    schemaProps: safeProps,
    options: getSchemaOptions(safeProps),
  }
}
