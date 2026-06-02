import { LogoIcon } from '@/shared/icons/logo-icon'
import { cn } from '@/utilities/ui'

interface LogoProps {
  className?: string
}

export const Logo = ({ className }: LogoProps) => {
  return (
    <div className={cn('flex items-center gap-2 group', className)}>
      <div className="w-10 h-10 bg-linear-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center rotate-12 group-hover:rotate-0 transition-transform duration-300">
        <LogoIcon className="h-12 w-12" />
      </div>
      <span className="hidden md:block text-2xl font-bold bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
        GiftGenius
      </span>
    </div>
  )
}
