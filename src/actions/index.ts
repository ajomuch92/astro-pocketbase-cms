import { articles, categories, pages, tags } from './crud'

import { auth } from './auth'

export const server = {
  auth,
  categories,
  tags,
  articles,
  pages,
}