export interface CategoryData {
  title: string
  slug: string
  children: CategoryData[]
}

export const CategoriesData: CategoryData[] = [
  // Подарки по человеку
  {
    title: 'Подарки по человеку',
    slug: 'podarki',
    children: [
      { title: 'Мужчине', slug: 'muzhchine', children: [] },
      { title: 'Женщине', slug: 'zhenshchine', children: [] },
      { title: 'Маме', slug: 'mame', children: [] },
      { title: 'Папе', slug: 'pape', children: [] },
      { title: 'Другу', slug: 'drugu', children: [] },
      { title: 'Подруге', slug: 'podruge', children: [] },
      { title: 'Коллеге', slug: 'kollege', children: [] },
      { title: 'Начальнику', slug: 'nachalniku', children: [] },
      { title: 'Подростку', slug: 'podrostku', children: [] },
      { title: 'Ребенку', slug: 'rebenku', children: [] },
    ],
  },

  // Подарки по поводу
  {
    title: 'Подарки по поводу',
    slug: 'povody',
    children: [
      { title: 'День рождения', slug: 'den-rozhdeniya', children: [] },
      { title: 'Новый год', slug: 'noviy-god', children: [] },
      { title: '23 февраля', slug: '23-fevralya', children: [] },
      { title: '8 марта', slug: '8-marta', children: [] },
      { title: 'Свадьба', slug: 'svadba', children: [] },
      { title: 'Юбилей', slug: 'yubiley', children: [] },
      { title: 'Новоселье', slug: 'novoselie', children: [] },
      { title: 'Без повода', slug: 'bez-povoda', children: [] },
    ],
  },

  // Подарки по интересам
  {
    title: 'Подарки по интересам',
    slug: 'interesy',
    children: [
      { title: 'Фитнес', slug: 'fitnes', children: [] },
      { title: 'Здоровье', slug: 'zdorove', children: [] },
      { title: 'Кулинария', slug: 'kulinariya', children: [] },
      { title: 'Технологии', slug: 'tehnologii', children: [] },
      { title: 'Дом и уют', slug: 'dom-i-uyut', children: [] },
      { title: 'Хобби', slug: 'hobbi', children: [] },
      { title: 'Путешествия', slug: 'puteshestviya', children: [] },
      { title: 'Авто', slug: 'avto', children: [] },
    ],
  },

  // Бюджет
  {
    title: 'Бюджет',
    slug: 'byudzhet',
    children: [
      { title: 'До 1000', slug: 'do-1000', children: [] },
      { title: 'До 3000', slug: 'do-3000', children: [] },
      { title: 'До 5000', slug: 'do-5000', children: [] },
      { title: 'До 10000', slug: 'do-10000', children: [] },
      { title: 'Премиум', slug: 'premium', children: [] },
    ],
  },

  // Формат подарка
  {
    title: 'Формат подарка',
    slug: 'format',
    children: [
      { title: 'Полезные', slug: 'poleznye', children: [] },
      { title: 'Оригинальные', slug: 'originalnye', children: [] },
      { title: 'Технологичные', slug: 'tech', children: [] },
      { title: 'Подарочные наборы', slug: 'podarochnye-nabory', children: [] },
      { title: 'Впечатления', slug: 'vpechatleniya', children: [] },
      { title: 'Персонализированные', slug: 'personalizirovannye', children: [] },
    ],
  },

  // Блог (редакционные рубрики)
  {
    title: 'Блог',
    slug: 'blog',
    children: [
      { title: 'Как выбрать подарок', slug: 'kak-vybrat-podarok', children: [] },
      { title: 'Как упаковать подарок', slug: 'kak-upakovat-podarok', children: [] },
      { title: 'Как придумать подарок', slug: 'kak-pridumat-podarok', children: [] },
      { title: 'Тренды подарков', slug: 'trendy-podarkov', children: [] },
      { title: 'Идеи по характеру', slug: 'idei-po-harakteru', children: [] },
      { title: 'ИИ для подарков', slug: 'ii-dlya-podarkov', children: [] },
    ],
  },
]
