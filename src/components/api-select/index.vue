<script setup lang="ts">
import { computed, onMounted, ref, useAttrs, watch } from 'vue'
import type { PropType } from 'vue'

interface ApiSelectParams {
  [key: string]: unknown
}

type ApiSelectApi = (params?: ApiSelectParams) => Promise<unknown> | unknown

interface ApiSelectOption {
  label: string
  value: unknown
  disabled: boolean
  key: string
}

defineOptions({
  name: 'ApiSelect',
  inheritAttrs: false,
})

const props = defineProps({
  modelValue: {
    type: [String, Number, Boolean, Array, Object] as PropType<unknown>,
    default: undefined,
  },
  api: {
    type: Function as PropType<ApiSelectApi>,
    required: true,
  },
  params: {
    type: Object as PropType<ApiSelectParams>,
    default: () => ({}),
  },
  listField: {
    type: String,
    default: '',
  },
  labelField: {
    type: String,
    default: 'label',
  },
  valueField: {
    type: String,
    default: 'value',
  },
  disabledField: {
    type: String,
    default: 'disabled',
  },
  immediate: {
    type: Boolean,
    default: true,
  },
  reloadOnParamsChange: {
    type: Boolean,
    default: true,
  },
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: unknown): void
  (e: 'loaded', options: ApiSelectOption[]): void
  (e: 'error', error: unknown): void
}>()

const attrs = useAttrs()
const options = ref<ApiSelectOption[]>([])
const loading = ref(false)

const mergedLoading = computed(() => {
  const attrLoading = attrs.loading
  if (typeof attrLoading === 'boolean') {
    return loading.value || attrLoading
  }
  if (typeof attrLoading === 'string') {
    return loading.value || attrLoading === '' || attrLoading === 'true'
  }
  return loading.value
})

function splitPath(path: string): string[] {
  return path
    .split('.')
    .map((segment) => segment.trim())
    .filter((segment) => segment.length > 0)
}

function getByPath(source: unknown, path: string): unknown {
  if (!path) return source
  const segments = splitPath(path)
  let current: unknown = source
  for (const segment of segments) {
    if (current === null || current === undefined) return undefined
    if (Array.isArray(current) && /^\d+$/.test(segment)) {
      current = current[Number(segment)]
      continue
    }
    if (typeof current !== 'object') return undefined
    current = (current as Record<string, unknown>)[segment]
  }
  return current
}

function normalizeList(response: unknown): unknown[] {
  const rawList = props.listField ? getByPath(response, props.listField) : response
  return Array.isArray(rawList) ? rawList : []
}

function toOption(item: unknown, index: number): ApiSelectOption {
  const value = getByPath(item, props.valueField)
  const normalizedValue = value === undefined ? item : value
  const label = getByPath(item, props.labelField)
  const normalizedLabel =
    label === undefined || label === null ? String(normalizedValue ?? '') : String(label)
  const disabled = getByPath(item, props.disabledField)

  return {
    label: normalizedLabel,
    value: normalizedValue,
    disabled: typeof disabled === 'boolean' ? disabled : false,
    key: createOptionKey(normalizedValue, index),
  }
}

function createOptionKey(value: unknown, index: number): string {
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
    return String(value)
  }
  return `option_${index}`
}

async function loadOptions() {
  loading.value = true
  try {
    const response = await props.api(props.params)
    const list = normalizeList(response)
    const nextOptions = list.map((item, index) => toOption(item, index))
    options.value = nextOptions
    emit('loaded', nextOptions)
  } catch (error) {
    options.value = []
    emit('error', error)
  } finally {
    loading.value = false
  }
}

function handleModelValueChange(value: unknown) {
  emit('update:modelValue', value)
}

watch(
  () => props.params,
  () => {
    if (!props.reloadOnParamsChange) return
    void loadOptions()
  },
  { deep: true }
)

watch(
  () => [props.api, props.listField, props.labelField, props.valueField, props.disabledField],
  () => {
    if (!props.immediate) return
    void loadOptions()
  }
)

onMounted(() => {
  if (!props.immediate) return
  void loadOptions()
})

defineExpose({
  loadOptions,
})
</script>

<template>
  <ElSelect
    v-bind="attrs"
    :model-value="props.modelValue"
    :loading="mergedLoading"
    @update:model-value="handleModelValueChange"
  >
    <ElOption
      v-for="option in options"
      :key="option.key"
      :label="option.label"
      :value="option.value"
      :disabled="option.disabled"
    />
  </ElSelect>
</template>
