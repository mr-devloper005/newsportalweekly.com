export const siteIdentity = {
  code: process.env.NEXT_PUBLIC_SITE_CODE || 'nw4x7q2m8v',
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'News Portal Weekly',
  tagline: process.env.NEXT_PUBLIC_SITE_TAGLINE || 'Weekly reports, stories, and downloads',
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
    'A publication-focused platform for articles, weekly reporting, and downloadable PDF resources.',
  domain: process.env.NEXT_PUBLIC_SITE_DOMAIN || 'newsportalweekly.com',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://newsportalweekly.com',
  ogImage: process.env.NEXT_PUBLIC_SITE_OG_IMAGE || '/og-default.png',
  googleMapsEmbedApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_API_KEY || 'AIzaSyBco7dIECu3rJWjP3J0MImnR_uxlbeqAe0',

} as const

export const defaultAuthorProfile = {
  name: siteIdentity.name,
  avatar: '/placeholder.svg?height=80&width=80',
} as const

