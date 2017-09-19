const TWITTER_BASE_URL = 'https://twitter.com/'

export const twitterOAuthURL = token => `${TWITTER_BASE_URL}oauth/authenticate?oauth_token=${token}`
