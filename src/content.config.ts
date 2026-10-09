import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    date: z.string(),
    summary: z.string(),
  }),
});

const living = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/living' }),
  schema: z.object({
    title: z.string(),
    category: z.enum(['asuminen', 'elaminen', 'korjaus', 'turvallisuus']),
    description: z.string(),
    order: z.coerce.number(),
  }),
});

const bulletins = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/bulletins' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    galleries: z
      .array(
        z.object({
          title: z.string(),
          images: z.array(z.string()),
        }),
      )
      .optional(),
  }),
});

export const collections = { news, living, bulletins, pages };
