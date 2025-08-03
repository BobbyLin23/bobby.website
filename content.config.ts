import { defineCollection, defineContentConfig, z } from '@nuxt/content'

function createBaseSchema() {
  return z.object({
    title: z.string(),
    description: z.string(),
  })
}

function createButtonSchema() {
  return z.object({
    label: z.string(),
    icon: z.string().optional(),
    to: z.string().optional(),
    color: z.enum(['primary', 'neutral', 'success', 'warning', 'error', 'info']).optional(),
    size: z.enum(['xs', 'sm', 'md', 'lg', 'xl']).optional(),
    variant: z.enum(['solid', 'outline', 'subtle', 'soft', 'ghost', 'link']).optional(),
    target: z.enum(['_blank', '_self']).optional(),
  })
}

function createImageSchema() {
  return z.object({
    src: z.string().editor({ input: 'media' }),
    alt: z.string(),
  })
}

function createAuthorSchema() {
  return z.object({
    name: z.string(),
    description: z.string().optional(),
    username: z.string().optional(),
    twitter: z.string().optional(),
    to: z.string().optional(),
    avatar: createImageSchema().optional(),
  })
}

export default defineContentConfig({
  collections: {
    index: defineCollection({
      type: 'page',
      source: 'index.yml',
      schema: z.object({
        hero: z.object({
          links: z.array(createButtonSchema()),
          images: z.array(createImageSchema()),
        }),
        blog: createBaseSchema(),
      }),
    }),
    pages: defineCollection({
      type: 'page',
      source: [
        { include: 'projects.yml' },
        { include: 'blogs.yml' },
        { include: 'weekly.yml' },
      ],
      schema: z.object({
        links: z.array(createButtonSchema()),
      }),
    }),
    blogs: defineCollection({
      type: 'page',
      source: 'blogs/*.md',
      schema: z.object({
        minRead: z.number(),
        date: z.date(),
        image: z.string().nonempty().editor({ input: 'media' }),
        author: createAuthorSchema(),
      }),
    }),
    projects: defineCollection({
      type: 'data',
      source: 'projects/*.yml',
      schema: z.object({
        title: z.string().nonempty(),
        description: z.string().nonempty(),
        image: z.string().nonempty().editor({ input: 'media' }),
        url: z.string().nonempty(),
        tags: z.array(z.string()),
        date: z.date(),
      }),
    }),
    weekly: defineCollection({
      type: 'page',
      source: 'weekly/*.md',
      schema: z.object({
        week: z.string().nonempty(),
        summary: z.string().nonempty(),
        tags: z.array(z.string()),
        date: z.date(),
      }),
    }),
  },
})
