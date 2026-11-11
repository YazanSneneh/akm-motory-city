export const useAdminAuth = () => {
  const token = useCookie<string | null>('akm_admin_token', {
    default: () => null,
    watch: true
  })

  const adminUser = useState('akm_admin_user', () => ({
    name: 'AKM Dealership Admin',
    email: 'admin@akm.jo',
    role: 'Fleet Manager'
  }))

  const isAuthenticated = computed(() => !!token.value)

  const login = async (email: string, pass: string) => {
    const res = await $fetch<any>('/api/admin/auth', {
      method: 'POST',
      body: { email, password: pass }
    })

    if (res.success && res.token) {
      token.value = res.token
      adminUser.value = res.user
      return true
    }
    return false
  }

  const logout = () => {
    token.value = null
    const router = useRouter()
    router.push('/admin/login')
  }

  return {
    token,
    adminUser,
    isAuthenticated,
    login,
    logout
  }
}

