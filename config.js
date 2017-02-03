export const development = {
  contentful: {
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || 'CONTENTFUL_ACCESS_TOKEN_MISSING',
    space: process.env.CONTENTFUL_SPACE_ID || 'CONTENTFUL_SPACE_ID_MISSING'
  }
}

export const production = {
  contentful: {
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || 'CONTENTFUL_ACCESS_TOKEN_MISSING',
    space: process.env.CONTENTFUL_SPACE_ID || 'CONTENTFUL_SPACE_ID_MISSING'
  }
}
