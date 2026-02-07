/**
 * 拼接父子 path 为完整 path
 */
export function resolvePath(parentFullPath: string, childPath: string): string {
  const p = parentFullPath === '/' ? '' : parentFullPath.replace(/\/$/, '')
  const c = childPath.startsWith('/') ? childPath.slice(1) : childPath
  return c ? `${p}/${c}` : p || '/'
}
