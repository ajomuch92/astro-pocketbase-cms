import { ArticleSchema, CategorySchema, PageSchema, TagSchema } from '@/schemas'

import { defineAction } from 'astro:actions'
import { pb } from '@/lib/pocketbase'
import { z } from 'astro/zod'

export type CrudSchema = typeof ArticleSchema | typeof CategorySchema | typeof PageSchema | typeof TagSchema

// Generic CRUD action creator
function createCrudActions(collection: string, schema: CrudSchema) {
  return {
    create: defineAction({
      accept: 'json',
      input: schema,
      handler: async (data: z.infer<typeof schema>) => {
        try {
          const record = await pb.collection(collection).create(data)
          return { success: true, data: record }
        } catch (error: any) {
          return { success: false, error: error.message }
        }
      },
    }),

    update: defineAction({
      accept: 'json',
      input: z.object({
        id: z.string(),
        data: schema.optional(),
      }),
      handler: async ({ id, data }) => {
        try {
          const record = await pb.collection(collection).update(id, data)
          return { success: true, data: record }
        } catch (error: any) {
          return { success: false, error: error.message }
        }
      },
    }),

    delete: defineAction({
      accept: 'form',
      input: z.object({
        id: z.string(),
      }),
      handler: async ({ id }) => {
        try {
          await pb.collection(collection).delete(id)
          return { success: true }
        } catch (error: any) {
          return { success: false, error: error.message }
        }
      },
    }),
  }
}

export const categories = createCrudActions('categories', CategorySchema)
export const tags = createCrudActions('tags', TagSchema)
export const articles = createCrudActions('articles', ArticleSchema)
export const pages = createCrudActions('pages', PageSchema)