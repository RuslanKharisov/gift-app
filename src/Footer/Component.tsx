import React from 'react'
import type { Footer as FooterType, Category } from '@/payload-types'
import Link from 'next/link'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Logo } from '@/components/Logo/Logo'

export async function Footer() {
  const payload = await getPayload({ config: configPromise })
  const footerData = await payload.findGlobal({
    slug: 'footer',
    depth: 2,
  })

  const columns = footerData?.columns || []

  return (
    <footer className="bg-muted/30 border-t py-12 mt-auto">
      <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
        {columns.map((col) => (
          <div key={col.id} className="flex flex-col gap-3">
            {/* Заголовок колонки футера */}
            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">
              {col.columnTitle}
            </h3>

            {/* Список автоматических ссылок */}
            <ul className="flex flex-col gap-2">
              {col.links?.map((linkItem) => {
                let finalUrl = '#'

                if (linkItem.type === 'category' && typeof linkItem.categoryRef === 'object') {
                  const categoryObj = linkItem.categoryRef as Category
                  if (categoryObj.breadcrumbs && categoryObj.breadcrumbs.length > 0) {
                    finalUrl =
                      categoryObj.breadcrumbs[categoryObj.breadcrumbs.length - 1].url || '#'
                  }
                } else if (linkItem.type === 'custom') {
                  finalUrl = linkItem.url || '#'
                }

                return (
                  <li key={linkItem.id}>
                    <Link
                      href={finalUrl}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {linkItem.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  )
}
