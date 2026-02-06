import { AuthUser } from '@/types/auth'

export function canManageUsers(currentUser: AuthUser) {
  return currentUser.role === 'admin'
}
