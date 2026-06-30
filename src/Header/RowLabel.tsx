'use client'
import { Header } from '@/payload-types'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const RowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<NonNullable<Header['navGroups']>[number]>()

  const label = data?.data?.groupLabel
    ? `Вкладка ${data.rowNumber !== undefined ? data.rowNumber + 1 : ''}: ${data?.data?.groupLabel}`
    : 'Новая вкладка меню'

  return <div>{label}</div>
}
