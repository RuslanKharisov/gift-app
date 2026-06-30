import type { Payload, PayloadRequest } from 'payload'
import { seedProductCategories } from './seed-categories'

export const seed = async ({
  payload,
  req: _req,
}: {
  payload: Payload
  req: PayloadRequest
}): Promise<void> => {
  payload.logger.info('Запущен скрипт seed базы данных...')

  await seedProductCategories({
    payload,
    req: _req,
  })

  payload.logger.info('✅ Seed завершён')
}
