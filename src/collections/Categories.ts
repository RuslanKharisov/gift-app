import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { slugField } from 'payload'
import { slugify as translit } from 'transliteration'

export const Categories: CollectionConfig = {
  slug: 'categories',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    slugField({
      name: 'slug',
      fieldToUse: 'title',
      useAsSlug: 'slug',
      required: true,
      position: 'sidebar',
      slugify: ({ valueToSlugify }) => {
        if (typeof valueToSlugify !== 'string') return undefined

        return translit(valueToSlugify)
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^\w-]+/g, '')
      },
    }),
  ],
}
