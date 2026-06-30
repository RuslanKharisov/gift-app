'use client'

import React, { memo } from 'react'
import type { Header as HeaderType, Category } from '@/payload-types'
import { Logo } from '@/components/Logo/Logo'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { FolderInput } from 'lucide-react'

type MobileNavProps = {
  data: HeaderType
  onClose: () => void
}

export const MobileNav: React.FC<MobileNavProps> = memo(({ data, onClose }) => {
  const pathname = usePathname()
  const groups = data?.navGroups || []

  return (
    <div className="bg-background flex h-dvh w-full flex-col space-y-6 px-4 overflow-y-auto pb-12">
      <div className="text-left py-2">
        <Logo />
      </div>

      <div className="space-y-8">
        {groups.map((group) => (
          <div key={group.id} className="space-y-4">
            {/* Название родительской группы — крупнее и заметнее */}
            <div className="text-sm font-bold uppercase tracking-widest text-foreground border-b-2 border-primary pb-2">
              {group.groupLabel}
            </div>

            {/* Колонки и ссылки внутри группы */}
            <div className="space-y-5 pl-1">
              {group.columns?.map((col) => (
                <div key={col.id} className="space-y-2.5">
                  {/* Заголовок подраздела — уменьшен, приглушен, но выделен регистром для контраста */}
                  {col.columnTitle && (
                    <div className="flex items-center gap-1.5 border-b border-muted pb-1">
                      <FolderInput className="w-3.5 h-3.5 text-muted-foreground/80" />
                      <div className="text-[11px] font-extrabold uppercase tracking-wider text-muted-foreground/80">
                        {col.columnTitle}
                      </div>
                    </div>
                  )}

                  {/* Список ссылок с хорошим межстрочным интервалом */}
                  <div className="space-y-3 flex flex-col">
                    {col.links?.map((linkItem) => {
                      let finalUrl = '#'

                      if (
                        linkItem.type === 'category' &&
                        typeof linkItem.categoryRef === 'object'
                      ) {
                        const categoryObj = linkItem.categoryRef as Category
                        if (categoryObj.breadcrumbs && categoryObj.breadcrumbs.length > 0) {
                          finalUrl =
                            categoryObj.breadcrumbs[categoryObj.breadcrumbs.length - 1].url || '#'
                        }
                      } else if (linkItem.type === 'custom') {
                        finalUrl = linkItem.url || '#'
                      }

                      const isActive = pathname === finalUrl

                      return (
                        <div key={linkItem.id} onClick={onClose}>
                          {/* Текст ссылок стал базового размера (text-base) с увеличенной кликабельной зоной (py-1) */}
                          <Link
                            href={finalUrl}
                            className={`block w-full text-left py-1 text-base transition-colors ${
                              isActive
                                ? 'text-primary font-bold'
                                : 'text-foreground/90 hover:text-primary'
                            }`}
                          >
                            {linkItem.label}
                          </Link>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
})

MobileNav.displayName = 'MobileNav'
