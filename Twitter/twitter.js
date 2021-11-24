const needle = require('needle')

class Twitter {
  constructor() {
    this.hashTag = ''
    this.newestId = ''
  }

  getTweets = async (hashTag) => {
    try {
      if (this.hashTag != hashTag) {
        this.newestId = ''
        const tweets = await this.getRequest(hashTag, this.newestId)
        const meta = tweets.meta

        if (meta.result_count) {
          this.newestId = meta.newest_id
        }

        this.hashTag = hashTag

        return 0
      } else {
        const tweets = await this.getRequest(hashTag, this.newestId)
        const meta = tweets.meta

        if (meta.result_count) {
          this.newestId = meta.newest_id
        } else {
          return 0
        }

        return tweets
      }
    } catch (e) {
      console.log(e)
    }
  }

  getRequest = async (hashTag, newestId) => {
    let params
    let res
    const endpointUrl = 'https://api.twitter.com/2/tweets/search/recent'
    const token =
      'AAAAAAAAAAAAAAAAAAAAALLrPgEAAAAAB3OxZwMf%2F7CKsr1YHsr3RTslT0A%3DQ0SpG0yAaNmHL5tf7aHbHdb1fzS2ov2bo1Yevy6pr0NjJ2JzM8'

    if (!newestId) {
      params = {
        query: `#${hashTag} -is:retweet`,
        'tweet.fields': 'author_id'
      }
    } else {
      params = {
        query: `#${hashTag} -is:retweet`,
        'tweet.fields': 'author_id',
        since_id: `${newestId}`
      }
    }

    res = await needle('get', endpointUrl, params, {
      headers: {
        'User-Agent': 'v2RecentSearchJS',
        authorization: `Bearer ${token}`
      }
    })

    if (res.body) {
      return res.body
    }
  }
}

module.exports = Twitter
