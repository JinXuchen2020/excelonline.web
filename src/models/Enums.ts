export const USER_PROFILE = 'userProfile'
export const RESPONSIVE_THRESHOLD = 415

export const isOfType = <T>(item: any, itemKey : keyof T) : item is T => {
  return item[itemKey] !== undefined
}