import { LoginSchema } from '@/schemas'
import { defineAction } from 'astro:actions'
import { pb } from '@/lib/pocketbase'

export const auth = {
  login: defineAction({
    accept: 'form',
    input: LoginSchema,
    handler: async ({ email, password }, context) => {
      try {
        const authData = await pb.collection('users').authWithPassword(email, password)
        
        // Set auth cookie
        const authCookie = pb.authStore.exportToCookie()
        context.cookies.set('pb_auth', authCookie, {
          path: '/',
          httpOnly: true,
          secure: import.meta.env.PROD,
          sameSite: 'lax',
          maxAge: 60 * 60 * 24 * 7, // 7 days
        })
        
        return {
          success: true,
          user: authData.record,
        }
      } catch (error: any) {
        return {
          success: false,
          error: error.message || 'Login failed',
        }
      }
    },
  }),

  logout: defineAction({
    accept: 'form',
    handler: async (input, context) => {
      pb.authStore.clear()
      context.cookies.delete('pb_auth', { path: '/' })
      
      return { success: true }
    },
  }),
}