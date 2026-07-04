import { Media, Post, User } from '@/payload-types'
import { getServerSideURL } from '@/utilities/getURL'

export const articleSchema = (props: Post) => {
  const image: Media = props.meta?.image as Media
  const authors: User[] = props.authors as User[]
  console.log('authors ==> ', authors)
  const siteURL = getServerSideURL()
  console.log('siteURL ==> ', siteURL)
  authors.map((author) => {
    console.log('author ==> ', author)
  })

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: props.title,
    author: authors.map((author) => ({
      type: 'Person',
      name: author.name ? author.name : '',
    })),
    datePublished: new Date(props.createdAt),
    dateModified: new Date(props.updatedAt),
    image: image?.url ? `${siteURL}/media/${image.filename}` : undefined,
  }
}

export const imageSchema = (props: Media) => {
  const siteURL = getServerSideURL()
  return {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    contentUrl: props.url ? `${siteURL}/media/${props.filename}` : undefined,
    creditText: props.creditText ? props.creditText : undefined,
  }
}
