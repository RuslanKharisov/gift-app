import type { Payload, PayloadRequest } from 'payload'
import { CategoriesData, CategoryData } from './data/categories-data'

export const seedProductCategories = async ({
  payload,
  req,
}: {
  payload: Payload
  req: PayloadRequest
}): Promise<void> => {
  console.log('Запущен сид категорий...')

  /* Очистка существующих категорий */
  await payload.db.deleteMany({
    collection: 'categories',
    req,
    where: {},
  })

  /* Рекурсивная функция для создания категорий и их дочерних элементов */
  const createCategoriesRecursive = async (
    categories: CategoryData[],
    parentId: number | null = null,
  ) => {
    for (const category of categories) {
      const createdCategory = await payload.create({
        collection: 'categories',
        req, // Обязательно передаем req для контекста авторизации сида
        data: {
          title: category.title,
          slug: category.slug,
          parent: parentId,
        },
      })

      /* Рекурсивный вызов для дочерних категорий */
      if (category.children && category.children.length > 0) {
        await createCategoriesRecursive(category.children, createdCategory.id)
      }
    }
  }

  /* Создание категорий */
  console.log('Создание категорий ...')
  await createCategoriesRecursive(CategoriesData)

  console.log('Сид категорий успешно завершён!')
}
