import type { GlobalConfig } from 'payload'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navGroups',
      type: 'array',
      label: 'Группы Мега-Меню',
      fields: [
        {
          name: 'groupLabel',
          type: 'text',
          required: true,
          label: 'Название вкладки (например: Подарки, Поводы)',
        },
        {
          name: 'columns',
          type: 'array',
          label: 'Колонки внутри мега-меню',
          fields: [
            {
              name: 'columnTitle',
              type: 'text',
              label: 'Заголовок колонки',
            },
            {
              name: 'links',
              type: 'array',
              label: 'Ссылки',
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                  label: 'Текст ссылки (например: Женщине)',
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
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
