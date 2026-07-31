import { Media, Post, User } from '@/payload-types'
import { getServerSideURL } from '@/utilities/getURL'

export const articleSchema = (props: Post) => {
  const image = props.meta?.image as Media
  // Защита: если авторов нет, делаем пустой массив, чтобы .map не падал
  const authors = (props.authors || []) as User[]

  console.log('authors ==> ', authors)
  const siteURL = getServerSideURL()
  console.log('siteURL ==> ', siteURL)

  // Безопасный перебор авторов
  authors.forEach((author) => {
    console.log('author ==> ', author)
  })

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: props.title,
    // Безопасный маппинг авторов
    author: authors.map((author) => ({
      '@type': 'Person', // Для Schema.org принято использовать '@type'
      name: author?.name || '',
    })),
    datePublished: props.createdAt ? new Date(props.createdAt) : new Date(),
    dateModified: props.updatedAt ? new Date(props.updatedAt) : new Date(),
    image: image?.url ? `${siteURL}/media/${image.filename}` : undefined,
  }
}

export const imageSchema = (props: Media | null | undefined) => {
  // Защита от null: если картинка не передана, сразу возвращаем undefined
  if (!props || !props.url) {
    return undefined
  }

  const siteURL = getServerSideURL()
  return {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    contentUrl: props.url ? `${siteURL}/media/${props.filename}` : undefined,
    creditText: props.creditText ? props.creditText : undefined,
  }
}
