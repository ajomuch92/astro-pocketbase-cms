import { z } from 'astro/zod'

// User Roles
export const UserRole = z.enum(['admin', 'writer', 'editor'])
export type UserRoleType = z.infer<typeof UserRole>

// User Schema
export const UserSchema = z.object({
  id: z.string().optional(),
  email: z.string().email('Invalid email'),
  username: z.string().min(3, 'Username must be at least 3 characters'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  role: UserRole,
  avatar: z.string().optional(),
  created: z.string().optional(),
  updated: z.string().optional(),
})

export type User = z.infer<typeof UserSchema>

// Category Schema
export const CategorySchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  slug: z.string().min(2, 'Slug must be at least 2 characters'),
  description: z.string().optional(),
  created: z.string().optional(),
  updated: z.string().optional(),
})

export type Category = z.infer<typeof CategorySchema>

// Tag Schema
export const TagSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  slug: z.string().min(2, 'Slug must be at least 2 characters'),
  color: z.string().optional(),
  created: z.string().optional(),
  updated: z.string().optional(),
})

export type Tag = z.infer<typeof TagSchema>

// Article Schema
export const ArticleSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(3, 'Title must be at least 3 characters'),
  slug: z.string().min(3, 'Slug must be at least 3 characters'),
  content: z.string().min(10, 'Content must be at least 10 characters'),
  excerpt: z.string().optional(),
  featured_image: z.string().optional(),
  status: z.enum(['draft', 'published', 'archived']).default('draft'),
  author: z.string(), // User ID
  category: z.string().optional(), // Category ID
  tags: z.array(z.string()).optional(), // Tag IDs
  published_at: z.string().optional(),
  created: z.string().optional(),
  updated: z.string().optional(),
})

export type Article = z.infer<typeof ArticleSchema>

// Page Schema
export const PageSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(3, 'Title must be at least 3 characters'),
  slug: z.string().min(3, 'Slug must be at least 3 characters'),
  content: z.string().min(10, 'Content must be at least 10 characters'),
  status: z.enum(['draft', 'published', 'archived']).default('draft'),
  author: z.string(), // User ID
  template: z.string().optional(),
  meta_title: z.string().optional(),
  meta_description: z.string().optional(),
  published_at: z.string().optional(),
  created: z.string().optional(),
  updated: z.string().optional(),
})

export type Page = z.infer<typeof PageSchema>

// Login Schema
export const LoginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export type LoginData = z.infer<typeof LoginSchema>