// 接続に必要なモジュール
const needle = require('needle')

// APIに必要なトークン
const token =
  'AAAAAAAAAAAAAAAAAAAAALLrPgEAAAAAB3OxZwMf%2F7CKsr1YHsr3RTslT0A%3DQ0SpG0yAaNmHL5tf7aHbHdb1fzS2ov2bo1Yevy6pr0NjJ2JzM8'

// エンドポイントURL(接続先)
const endpointUrl = 'https://api.twitter.com/2/tweets/search/recent'

class Twitter {
  constructor() {
    this.tag = ''
    this.newest = ''
  }

  // タグ判定
  checkTag = (tag) => {
    if (tag == '') {
      this.tag = ''
      this.newest = ''
      console.log('タグがないので、取得できません')
      return -1
    }

    // 初回判定
    if (this.tag == '') {
      this.tag = tag
      console.log('新しいタグを取得しました')
      return 0
    }

    // 前回と同じタグの時
    if (this.tag == tag) {
      console.log('前回と同じタグで取得します')
      return 1
    }

    // 前回と異なるタグの時
    if (this.tag != tag) {
      this.tag = tag
      this.newest = ''
      console.log('前回と異なるタグを検知しました')
      return 0
    }
  }

  getRequest = async (tag, newest = '') => {
    if (newest == '') {
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
        throw new Error('リクエストに失敗しました。')
      }
    }

    if (newest != '') {
      const params = {
        query: `#${tag} -is:retweet`,
        'tweet.fields': 'author_id',
        since_id: `${newest}`
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
        throw new Error('リクエストに失敗しました。')
      }
    }
  }

  getTweets = async (tag = '') => {
    try {
      const T = this.checkTag(tag)
      let tweets = ''

      switch (T) {
        case -1:
          tweets = ''
          break
        case 0:
          const meta = await this.getRequest(tag)
          if (meta.meta.result_count > 0) {
            this.newest = tweets.meta.newest_id
          }
          break
        case 1:
          tweets = await this.getRequest(tag, this.newest_id)
          break
      }

      return tweets

      // const tweets = await this.getRequest(tag, this.newest)

      // if (tweets.meta.result_count > 0) {
      //   this.newest = tweets.meta.newest_id
      // }

      // return tweets
    } catch (e) {
      console.log(e)
    }
  }

  getString = () => {
    console.log(`this.tag=${this.tag}`)
    console.log(`this.newest=${this.newest}`)
  }
}

// エクスポート
module.exports = Twitter
