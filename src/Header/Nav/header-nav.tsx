'use client'

import React, { memo } from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { SearchIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'

type HeaderNavProps = {
  data: HeaderType
}

export const HeaderNav: React.FC<HeaderNavProps> = memo(({ data }) => {
  const pathname = usePathname()
  const navItems = data?.navItems || []

  return (
    <nav className="hidden lg:flex gap-3 items-center">
      {navItems.map(({ link }, i) => {
        return (
          <CMSLink
            key={i}
            {...link}
            className={pathname === link.url ? 'text-primary font-bold' : ''}
          />
        )
      })}
      <Link href="/search">
        <span className="sr-only">Search</span>
        <SearchIcon className="w-5 text-primary" />
      </Link>
    </nav>
  )
})
