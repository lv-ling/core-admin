const EMAIL_REG = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

export function isEmail(str: string): boolean {
  return EMAIL_REG.test(str.trim())
}

export function validateAge(value: unknown): string | undefined {
  if (value === null || value === undefined || value === '') {
    return '年龄不能为空'
  }
  const n = Number(value)
  if (Number.isNaN(n) || !Number.isInteger(n)) {
    return '年龄必须为整数'
  }
  if (n < 0 || n > 150) {
    return '年龄需在 0-150 之间'
  }
  return undefined
}

export function validateEmail(value: unknown): string | undefined {
  const s = typeof value === 'string' ? value : String(value ?? '')
  if (!s.trim()) {
    return '邮箱不能为空'
  }
  if (!isEmail(s)) {
    return '邮箱格式不正确'
  }
  return undefined
}
