'use client'
import { Footer } from '@/payload-types'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'
import React from 'react'

export const RowLabel: React.FC<RowLabelProps> = () => {
  // Получаем данные текущей строки из массива columns коллекции Footer
  const data = useRowLabel<NonNullable<Footer['columns']>[number]>()

  // Если заголовок колонки заполнен, выводим его. Иначе — стандартную заглушку.
  const label = data?.data?.columnTitle
    ? `Колонка ${data.rowNumber !== undefined ? data.rowNumber + 1 : ''}: ${data?.data?.columnTitle}`
    : 'Новая колонка подвала'

  return <div>{label}</div>
}
