'use client'

import React, { memo } from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'

type MobileNavProps = {
  data: HeaderType
  onClose: () => void
  pathname?: string
}

export const MobileNav: React.FC<MobileNavProps> = memo(({ data, onClose, pathname }) => {
  const navItems = data?.navItems || []

  return (
    <div className="bg-background flex h-dvh w-full flex-col space-y-5 px-4">
      <div className="text-left">
        <Logo />
      </div>

      <div className="space-y-2">
        {navItems.map(({ link }, i) => {
          return (
            <div key={i} onClick={onClose}>
              <CMSLink
                {...link}
                appearance="secondary"
                className={`${pathname === link.url ? 'text-primary' : ''} w-full`}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
})
