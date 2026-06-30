import React from 'react'
import { CopyButton } from '../Code/CopyButton' // Используем вашу готовую кнопку копирования
import type { PromptBlock as PromptBlockProps } from '@/payload-types'

type Props = PromptBlockProps & {
  className?: string
}

export const PromptBlock: React.FC<Props> = ({ promptText, negativePrompt, className }) => {
  if (!promptText) return null

  return (
    <div
      className={`relative bg-muted/40 p-5 border border-border rounded-xl my-6 group/prompt ${className || ''}`}
    >
      {/* Шапка карточки промта */}
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-border/60">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
            Промт для копирования
          </span>
        </div>
        {/* Кнопка копирования основного промта */}
        <CopyButton code={promptText} />
      </div>

      {/* Основной промт */}
      <div className="text-sm text-foreground leading-relaxed whitespace-pre-wrap font-mono bg-background/50 p-3 rounded-lg border border-border/40 select-all">
        {promptText}
      </div>

      {/* Вывод негативного промта, если он заполнен */}
      {negativePrompt && (
        <div className="mt-4 pt-3 border-t border-dashed border-border/60">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-destructive/80">
              Negative Prompt:
            </span>
            <CopyButton code={negativePrompt} />
          </div>
          <div className="text-xs text-muted-foreground font-mono bg-destructive/5 p-2 rounded border border-destructive/10 select-all">
            {negativePrompt}
          </div>
        </div>
      )}
    </div>
  )
}
