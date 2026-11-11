export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, password } = body

  // Standard secure demo credentials for the dealership admin
  // Can also be overridden with process.env.ADMIN_PASSWORD
  const validEmail = 'admin@akm.jo'
  const validPass = process.env.ADMIN_PASSWORD || 'akm2026'

  if (email === validEmail && password === validPass) {
    const token = 'akm_admin_' + Buffer.from(`${email}:${Date.now()}`).toString('base64')
    
    setCookie(event, 'akm_admin_token', token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/'
    })

    return {
      success: true,
      token,
      user: {
        name: 'AKM Dealership Admin',
        email: 'admin@akm.jo',
        role: 'Fleet Manager & Sales Director'
      }
    }
  }

  throw createError({
    statusCode: 401,
    statusMessage: 'Invalid email or password'
  })
})

