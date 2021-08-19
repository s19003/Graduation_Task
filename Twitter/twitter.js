const needle = require('needle')

const token =
  'AAAAAAAAAAAAAAAAAAAAALLrPgEAAAAAB3OxZwMf%2F7CKsr1YHsr3RTslT0A%3DQ0SpG0yAaNmHL5tf7aHbHdb1fzS2ov2bo1Yevy6pr0NjJ2JzM8'

const endpointUrl = 'https://api.twitter.com/2/tweets/search/recent'

const getRequest = async tag => {
  if (tag == '' || tag == undefined) return

  const params = {
    query: `#${tag} -is:retweet`,
    'tweet.fields': 'author_id'
  }

  const res = await needle('get', endpointUrl, params, {
    headers: {
      'User-Agent': 'v2RecentSearchJS',
      authorization: `Bearer ${token}`
    }
  })

  if (res.body) {
    return res.body
  } else {
    throw new Error('Unsuccessful request')
  }
}

const getTweets = async tag => {
  try {
    const response = await getRequest(tag)
    if (response != undefined) {
      return response
    }
  } catch (e) {
    console.log(e)
  }
}

module.exports = {
  getTweets: getTweets
}
