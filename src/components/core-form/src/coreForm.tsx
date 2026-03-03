import { defineComponent, ref, watch } from 'vue'
import { ElForm, ElRow } from 'element-plus'
import type { CoreFormSchema, CoreFormExpose, CoreFormProps } from './types'
import { coreFormProps } from './props'
import { useFormModel } from './hooks/useFormModel'
import { useSchemas } from './hooks/useSchemas'
import { useFormProps } from './hooks/useFormProps'
import {
  calcBaseSpan,
  calcSearchVisibleSchemasBySpan,
} from './utils/layout'
import { renderField } from './renderers/renderField'
import { renderFormItem } from './renderers/renderFormItem'
import { renderSearchActions } from './renderers/renderSearchActions'
import { cloneDefaultValue, isSchemaVisible } from './utils/schema.helpers'
import { getValueByPath, setValueByPath } from './utils/schema'

const CoreForm = defineComponent({
  name: 'CoreForm',
  props: coreFormProps,
  emits: ['register', 'search', 'reset'],
  setup(props, { emit, slots }) {
    // 内部表单值（不再直接依赖外部 model 引用）
    const { formModel, setInitialValues, getValues, setValues } = useFormModel()
    // 内部 schema 列表
    const { innerSchemas, updateSchema } = useSchemas(props.schemas ?? [])
    // 内部表单 props
    const { innerProps, setProps } = useFormProps(props as CoreFormProps)

    const formRef = ref<InstanceType<typeof ElForm> | null>(null)

    const api: CoreFormExpose = {
      async validate() {
        const ok = await formRef.value?.validate?.().catch(() => false)
        return !!ok
      },
      async validateField(field: string) {
        if (!formRef.value) return false
        try {
          // Element Plus validateField 返回 Promise<void>
          await formRef.value.validateField(field)
          return true
        } catch {
          return false
        }
      },
      updateSchema,
      resetFields(props) {
        // resetFields 支持可选的 props 参数
        formRef.value?.resetFields?.(props)
      },
      clearValidate(props) {
        formRef.value?.clearValidate?.(props)
      },
      scrollToField(prop) {
        formRef.value?.scrollToField?.(prop)
      },
      fields() {
        const anyForm = formRef.value
        const list = anyForm?.fields
        return (Array.isArray(list) ? list : []) as ReturnType<CoreFormExpose['fields']>
      },
      getField(prop) {
        const list = api.fields()
        return list.find((item) => item.prop === prop)
      },
      setInitialValues,
      getValues,
      setValues,
      setProps,
    }

    watch(
      () => props.schemas,
      (nextSchemas) => {
        updateSchema(nextSchemas ?? [])
      },
      { deep: true }
    )

    watch(
      () => props,
      (nextProps) => {
        setProps(nextProps as Partial<CoreFormProps>)
      },
      { deep: true }
    )

    function applyDefaultValues(schemas: CoreFormSchema[]) {
      for (const schema of schemas) {
        if (schema.defaultValue === undefined) continue
        const currentValue = getValueByPath(formModel.value, schema.prop)
        if (currentValue !== undefined) continue
        setValueByPath(formModel.value, schema.prop, cloneDefaultValue(schema.defaultValue))
      }
    }

    watch(
      () => innerSchemas.value,
      (schemas) => {
        applyDefaultValues(schemas)
      },
      { immediate: true, deep: true }
    )

    emit('register', api)

    const showAll = ref(false)

    return () => {
      const currentProps = innerProps.value
      const { colSpan, gutter, isSearch, maxRows, onSearch, onReset, ...restFormProps } = currentProps
      // 默认使用 24 栅格，每项占用的 span 由 colSpan 决定，例如：colSpan=8 → 一行 3 个
      const baseSpan = calcBaseSpan(colSpan)
      const rowLimit = isSearch ? (maxRows === false ? Infinity : maxRows ?? 2) : Infinity

      const handleSearch = () => {
        const snapshot = { ...formModel.value }
        onSearch?.(snapshot)
        emit('search', snapshot)
      }
      const handleReset = () => {
        onReset?.()
        formRef.value?.resetFields()
        applyDefaultValues(innerSchemas.value)
        emit('reset')
      }

      const allVisibleSchemas = innerSchemas.value.filter((schema) =>
        isSchemaVisible(schema, formModel.value)
      )

      const searchLayoutResult =
        isSearch && rowLimit !== Infinity
          ? calcSearchVisibleSchemasBySpan(allVisibleSchemas, baseSpan, rowLimit, showAll.value)
          : { visibleSchemas: allVisibleSchemas, showToggle: false }

      const visibleSchemas = searchLayoutResult.visibleSchemas

      return (
        <ElForm ref={formRef} model={formModel.value} {...restFormProps}>
          <ElRow gutter={gutter}>
            {visibleSchemas.map((schema: CoreFormSchema, index: number) => {
              const { content, fieldKey } = renderField({
                schema,
                index,
                slots,
                formModel: formModel.value,
              })
              const span = schema.colSpan && schema.colSpan > 0 ? schema.colSpan : baseSpan

              return renderFormItem({
                schema,
                index,
                fieldKey,
                span,
                content,
              })
            })}
            {isSearch &&
              renderSearchActions({
                span: baseSpan,
                onSearch: handleSearch,
                onReset: handleReset,
                showToggle: searchLayoutResult.showToggle,
                expanded: showAll.value,
                onToggle: () => {
                  showAll.value = !showAll.value
                },
              })}
          </ElRow>
        </ElForm>
      )
    }
  },
})

export default CoreForm
