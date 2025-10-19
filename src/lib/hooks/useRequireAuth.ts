import { useUserStore } from '@/stores/userStore'

export function useRequireAuth() {
  const { isAuthenticated } = useUserStore()
  return isAuthenticated
}
