import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const work = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/work' }),
  schema: z.object({
    title: z.string(),
    tagline: z.string(),                     // the clause after the em dash
    order: z.number(),                       // ordering on the homepage / index
    accent: z.string(),                      // hero band background, e.g. '#1b1b1b'
    navVariant: z.enum(['light', 'dark']),   // header + title contrast on the band
    tags: z.array(z.string()),               // keyed into tagColors in data/projects
    meta: z.array(z.object({                 // sidebar label/value pairs
      label: z.string(),
      value: z.string(),
    })),
    lead: z.string(),                        // intro paragraph beside the sidebar
    draft: z.boolean().default(false),
    template: z.enum(['default', 'gallery']).default('default'), // layout variant
    hero: z.string().optional(),             // gallery: banner image path under case-studies/
  }),
});

export const collections = { work };
