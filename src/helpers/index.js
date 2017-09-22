import differenceInMinutes from 'date-fns/difference_in_minutes'
import distanceInWords from 'date-fns/distance_in_words'

const TWITTER_BASE_URL = 'https://twitter.com/'
const FETCH_WINDOW = 5

export const twitterOAuthURL = token => `${TWITTER_BASE_URL}oauth/authenticate?oauth_token=${token}`
export const haveFetchedInWindow = (lastFetched, now) => {
  const fetchedAgo = differenceInMinutes(
    now,
    lastFetched
  )
  return fetchedAgo < FETCH_WINDOW
}
export const ago = createdAt => distanceInWords(createdAt, new Date())
