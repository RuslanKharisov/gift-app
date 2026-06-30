import type { Post, ArchiveBlock as ArchiveBlockProps } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import RichText from '@/components/RichText'

import { CollectionArchive } from '@/components/CollectionArchive'

export const ArchiveBlock: React.FC<
  ArchiveBlockProps & {
    id?: string
  }
> = async (props) => {
  const { id, categories, introContent, limit: limitFromProps, populateBy, selectedDocs } = props

  const limit = limitFromProps || 3

  let posts: Post[] = []

  if (populateBy === 'collection') {
    const payload = await getPayload({ config: configPromise })

    // 1. Собираем ID выбранных в админке категорий
    const flattenedCategories =
      categories?.map((category) => {
        if (typeof category === 'object') return category.id
        return category
      }) || []

    // Базовый фильтр: показывать только опубликованные посты
    const whereConditions: any[] = [
      {
        _status: { equals: 'published' },
      },
    ]

    // 2. Если категории выбраны, расширяем список за счет их "детей"
    if (flattenedCategories.length > 0) {
      const childCategories = await payload.find({
        collection: 'categories',
        where: {
          parent: { in: flattenedCategories },
        },
        limit: 100,
        pagination: false,
        // select: { id: true },
      })

      const allCategoryIdsToSearch = [
        ...flattenedCategories,
        ...childCategories.docs.map((child) => child.id),
      ]

      whereConditions.push({
        categories: {
          in: allCategoryIdsToSearch,
        },
      })
    }

    // 3. Делаем правильный запрос, объединяя все условия через AND
    const fetchedPosts = await payload.find({
      collection: 'posts',
      depth: 1,
      limit,
      where: {
        and: whereConditions,
      },
    })

    posts = fetchedPosts.docs
  } else {
    if (selectedDocs?.length) {
      const filteredSelectedPosts = selectedDocs.map((post) => {
        if (typeof post.value === 'object') return post.value
      }) as Post[]

      posts = filteredSelectedPosts
    }
  }

  return (
    <div className="my-16" id={`block-${id}`}>
      {introContent && (
        <div className="container mb-16">
          <RichText className="ms-0 max-w-3xl" data={introContent} enableGutter={false} />
        </div>
      )}
      <CollectionArchive posts={posts} />
    </div>
  )
}
