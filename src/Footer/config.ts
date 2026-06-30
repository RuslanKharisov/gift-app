import type { GlobalConfig } from 'payload'
import { revalidateFooter } from './hooks/revalidateFooter' // Убедитесь, что у вас есть хук для футера

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'columns',
      type: 'array',
      label: 'Колонки подвала (Footer)',
      labels: {
        singular: 'Колонка',
        plural: 'Колонки',
      },
      maxRows: 4,
      fields: [
        {
          name: 'columnTitle',
          type: 'text',
          required: true,
          label: 'Заголовок колонки (например: Кому дарить, Инфо)',
        },
        {
          name: 'links',
          type: 'array',
          label: 'Ссылки в этой колонке',
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
              label: 'Текст ссылки (например: Мужчине)',
            },
            {
              name: 'type',
              type: 'select',
              defaultValue: 'category',
              options: [
                { label: 'Ссылка на Категорию сайта', value: 'category' },
                { label: 'Ссылка на Страницу (Pages)', value: 'page' },
                { label: 'Ввести вручную (кастомная URL)', value: 'custom' },
              ],
            },
            {
              name: 'categoryRef',
              type: 'relationship',
              relationTo: 'categories',
              required: true,
              label: 'Выберите категорию из базы',
              admin: {
                condition: (_, siblingData) => siblingData?.type === 'category',
              },
            },
            {
              name: 'pageRef',
              type: 'relationship',
              relationTo: 'pages',
              required: true,
              label: 'Выберите статическую страницу',
              admin: {
                condition: (_, siblingData) => siblingData?.type === 'page',
              },
            },
            {
              name: 'url',
              type: 'text',
              required: true,
              label: 'Кастомный URL',
              admin: {
                condition: (_, siblingData) => siblingData?.type === 'custom',
              },
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
