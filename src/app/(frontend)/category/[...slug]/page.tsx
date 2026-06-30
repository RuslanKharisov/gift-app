import type { Metadata } from 'next'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import PageClient from './page.client'

export const dynamic = 'force-static'
export const revalidate = 600

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const categories = await payload.find({
    collection: 'categories',
    limit: 1000,
    pagination: false,
  })

  return categories.docs.map((doc) => {
    if (doc.breadcrumbs && doc.breadcrumbs.length > 0) {
      const breadcrumbUrl = doc.breadcrumbs[doc.breadcrumbs.length - 1].url || ''

      const cleanPath = breadcrumbUrl
        .replace('/category', '')
        .replace(/\/\/+/g, '/')
        .replace(/^\/|\/$/g, '')

      if (!cleanPath) {
        return { slug: [doc.slug] }
      }

      const urlParts = cleanPath.split('/')
      return { slug: urlParts }
    }

    return { slug: [doc.slug] }
  })
}

type Args = {
  params: Promise<{
    slug?: string[] // Теперь это массив строк
  }>
}

export default async function CategoryPage({ params: paramsPromise }: Args) {
  const { slug = [] } = await paramsPromise

  // Берем самый последний элемент массива — это слаг текущей активной категории
  const currentSlug = slug[slug.length - 1] || ''
  const decodedSlug = decodeURIComponent(currentSlug)

  // Воссоздаем полный текущий URL для редиректов
  const url = '/category/' + slug.map(encodeURIComponent).join('/')

  // 1. Получаем категорию
  const category = await queryCategoryBySlug({ slug: decodedSlug })
  if (!category) return <PayloadRedirects url={url} />

  // 2. Получаем посты (включая дочерние)
  const payload = await getPayload({ config: configPromise })
  const { isEnabled: draft } = await draftMode()

  const childCategories = await payload.find({
    collection: 'categories',
    where: {
      parent: { equals: category.id },
    },
    limit: 100,
    pagination: false,
  })

  const categoryIdsToSearch = [category.id, ...childCategories.docs.map((child) => child.id)]

  const posts = await payload.find({
    collection: 'posts',
    draft,
    overrideAccess: draft,
    depth: 1,
    limit: 12,
    where: {
      categories: { in: categoryIdsToSearch },
    },
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
    },
  })

  return (
    <div className="pt-24 pb-24">
      <PageClient />
      <PayloadRedirects disableNotFound url={url} />

      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1>Рубрика: {category.title}</h1>
          {/* <p className="text-muted-foreground">Все материалы из раздела GiftGenius</p> */}
        </div>
      </div>

      <div className="container mb-8">
        <PageRange
          collection="posts"
          currentPage={posts.page}
          limit={12}
          totalDocs={posts.totalDocs}
        />
      </div>

      <CollectionArchive posts={posts.docs} />

      <div className="container">
        {posts.totalPages > 1 && posts.page && (
          <Pagination page={posts.page} totalPages={posts.totalPages} />
        )}
      </div>
    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = [] } = await paramsPromise
  const currentSlug = slug[slug.length - 1] || ''
  const decodedSlug = decodeURIComponent(currentSlug)
  const category = await queryCategoryBySlug({ slug: decodedSlug })

  return {
    title: category ? `${category.title} | GiftGenius` : 'Категория',
    description: category ? `Смотреть все подарки и идеи в категории ${category.title}` : '',
  }
}

const queryCategoryBySlug = cache(async ({ slug }: { slug: string }) => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'categories',
    limit: 1,
    pagination: false,
    where: {
      slug: { equals: slug },
    },
  })

  return result.docs?.[0] || null
})
