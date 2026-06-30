import type { Category, Page } from '@/payload-types'

type LinkItemParam = {
  type?: 'category' | 'page' | 'custom' | null
  categoryRef?: string | number | Category | null
  pageRef?: string | number | Page | null
  url?: string | null
}

export function getMenuLink(linkItem: LinkItemParam): string {
  if (
    linkItem.type === 'category' &&
    typeof linkItem.categoryRef === 'object' &&
    linkItem.categoryRef !== null
  ) {
    const categoryObj = linkItem.categoryRef as Category
    if (categoryObj.breadcrumbs && categoryObj.breadcrumbs.length > 0) {
      return categoryObj.breadcrumbs[categoryObj.breadcrumbs.length - 1].url || '#'
    }
  }

  if (
    linkItem.type === 'page' &&
    typeof linkItem.pageRef === 'object' &&
    linkItem.pageRef !== null
  ) {
    const pageObj = linkItem.pageRef as Page

    if (pageObj.slug === 'home') return '/'

    return pageObj.slug ? `/${pageObj.slug}` : '#'
  }

  // 3. Логика для КАСТОМНЫХ ССЫЛОК
  if (linkItem.type === 'custom') {
    return linkItem.url || '#'
  }

  return '#'
}
