import type { Block } from 'payload'

export const Prompt: Block = {
  slug: 'prompt',
  interfaceName: 'PromptBlock',
  fields: [
    {
      name: 'promptText',
      type: 'textarea',
      required: true,
      label: 'Текст промта (Положительный)',
    },
    {
      name: 'negativePrompt',
      type: 'textarea',
      label: 'Негативный промт (Если есть)',
      admin: {
        description: 'Параметры, которые нейросеть должна исключить',
      },
    },
  ],
  labels: {
    singular: 'AI Промт',
    plural: 'AI Промты',
  },
}
