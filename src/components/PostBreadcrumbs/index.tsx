import React from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb' // путь к компоненту shadcn
import type { Category, Post } from '@/payload-types'

interface PostBreadcrumbsProps {
  post: Post
}

export const PostBreadcrumbs: React.FC<PostBreadcrumbsProps> = ({ post }) => {
  // Берём первую привязанную к посту категорию в качестве основной для SEO-пути
  const mainCategory = post.categories?.[0] as Category | undefined

  // Если у поста нет категорий, выводим базовый путь: Главная -> Блог -> Название
  const categoryBreadcrumbs = mainCategory?.breadcrumbs || []

  return (
    <Breadcrumb className="mb-6">
      <BreadcrumbList>
        {/* 1. Всегда выводим ссылку на Главную */}
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Главная</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />

        {/* 2. Динамически выводим всю цепочку родительских категорий */}
        {categoryBreadcrumbs.map((crumb) => {
          if (!crumb.url || !crumb.label) return null

          return (
            <React.Fragment key={crumb.id}>
              <BreadcrumbItem>
                <BreadcrumbLink href={crumb.url}>{crumb.label}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </React.Fragment>
          )
        })}

        {/* 3. Последним элементом выводим заголовок самой статьи (некликабельный) */}
        <BreadcrumbItem>
          <BreadcrumbPage className="max-w-50 truncate sm:max-w-none">{post.title}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
