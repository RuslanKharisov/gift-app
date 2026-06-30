'use client'

import React, { memo, useState, useEffect, useRef } from 'react'
import type { Header as HeaderType, Category } from '@/payload-types'
import Link from 'next/link'
import { SearchIcon, ChevronDown } from 'lucide-react'
import { usePathname } from 'next/navigation'

type HeaderNavProps = {
  data: HeaderType
}

export const HeaderNav: React.FC<HeaderNavProps> = memo(({ data }) => {
  const pathname = usePathname()
  const groups = data?.navGroups || []

  // Храним ID открытой в данный момент группы меню
  const [activeGroupId, setActiveGroupId] = useState<string | null>(null)
  const navRef = useRef<HTMLDivElement>(null)

  // Закрываем меню при смене страницы (выборе рубрики)
  useEffect(() => {
    setActiveGroupId(null)
  }, [pathname])

  // Закрываем меню, если пользователь кликнул в любую другую область экрана
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveGroupId(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Обработчик клика по кнопке главного раздела
  const handleGroupClick = (groupId: string, hasColumns: boolean) => {
    // Защита: если ID пустой (например, сбой в данных бэка), ничего не делаем
    if (!groupId || !hasColumns) return

    setActiveGroupId((prev) => (prev === groupId ? null : groupId))
  }

  return (
    <nav ref={navRef} className="hidden lg:flex gap-6 items-center h-full relative">
      {groups.map((group) => {
        const hasColumns = group.columns && group.columns.length > 0
        const isCurrentOpen = activeGroupId === group.id

        return (
          <div key={group.id} className="h-full flex items-center">
            {/* Кнопка теперь слушает onClick вместо ховера */}
            <button
              onClick={() => handleGroupClick(group.id ?? '', !!hasColumns)}
              className={`text-sm font-medium transition-colors h-full flex items-center gap-1 border-b-2 py-4 ${
                isCurrentOpen
                  ? 'border-primary text-foreground'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {group.groupLabel}
              {hasColumns && (
                <ChevronDown
                  className={`w-3.5 h-3.5 opacity-50 transition-transform duration-200 ${
                    isCurrentOpen ? 'rotate-180' : ''
                  }`}
                />
              )}
            </button>

            {hasColumns && isCurrentOpen && (
              /* 
    Изменения в классах:
    - Меняем absolute на fixed, чтобы плашка жестко привязалась к экрану.
    - Задаем left-0 right-0 w-full, чтобы она растянулась строго от края до края.
    - Убираем max-w-svw, так как w-full fixed теперь контролирует ширину.
  */
              <div className="fixed top-16 left-0 right-0 w-full bg-popover text-popover-foreground border-b border-muted shadow-xl animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                {/* Внутренний контейнер выравнивает контент по сетке вашего сайта */}
                <div className="container mx-auto p-6 grid grid-cols-3 gap-6">
                  {group.columns?.map((col) => (
                    <div key={col.id} className="flex flex-col gap-2">
                      {col.columnTitle && (
                        <h4 className="text-xs font-bold uppercase tracking-wider text-primary mb-1">
                          {col.columnTitle}
                        </h4>
                      )}
                      <ul className="flex flex-col gap-2">
                        {col.links?.map((linkItem) => {
                          let finalUrl = '#'

                          if (
                            linkItem.type === 'category' &&
                            typeof linkItem.categoryRef === 'object'
                          ) {
                            const categoryObj = linkItem.categoryRef as Category

                            if (categoryObj.breadcrumbs && categoryObj.breadcrumbs.length > 0) {
                              finalUrl =
                                categoryObj.breadcrumbs[categoryObj.breadcrumbs.length - 1].url ||
                                '#'
                            }
                          } else if (linkItem.type === 'custom') {
                            finalUrl = linkItem.url || '#'
                          }

                          const isActive = pathname === finalUrl

                          return (
                            <li key={linkItem.id} className="text-sm">
                              <Link
                                href={finalUrl}
                                className={
                                  isActive
                                    ? 'text-primary font-bold transition-colors'
                                    : 'text-muted-foreground hover:text-foreground transition-colors'
                                }
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
              </div>
            )}
          </div>
        )
      })}

      <Link href="/search" className="pl-2">
        <span className="sr-only">Search</span>
        <SearchIcon className="w-5 text-primary hover:opacity-80 transition-opacity" />
      </Link>
    </nav>
  )
})

HeaderNav.displayName = 'HeaderNav'
