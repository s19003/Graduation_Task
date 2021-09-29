// 接続に必要なモジュール
const needle = require('needle')

// APIに必要なトークン
const token =
  'AAAAAAAAAAAAAAAAAAAAALLrPgEAAAAAB3OxZwMf%2F7CKsr1YHsr3RTslT0A%3DQ0SpG0yAaNmHL5tf7aHbHdb1fzS2ov2bo1Yevy6pr0NjJ2JzM8'

// エンドポイントURL(接続先)
const endpointUrl = 'https://api.twitter.com/2/tweets/search/recent'

class Twitter {
  constructor () {
    this.tag = ''
    this.newest = ''
    console.log('Twitterクラス参照開始')
  }

  // タグ判定
  checkTag = tag => {
    if (tag == '') {
      console.log('タグ判定１')
      throw new Error('tagがありません')
    }

    if (this.tag == '') {
      this.tag = tag
      console.log('タグ判定２')
      return
    }

    if (this.tag == tag) {
      console.log('タグ判定３')
      return
    }

    if (this.tag != tag) {
      this.tag = tag
      this.newest = ''
      console.log('タグ判定４')
      return
    }
  }

  getRequest = async (tag, newest) => {
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

  getTweets = async tag => {
    try {
      this.checkTag(tag)

      const tweets = await this.getRequest(tag, this.newest)

      if (tweets.meta.result_count > 0) {
        this.newest = tweets.meta.newest_id
      }

      return tweets
    } catch (e) {
      console.log(e)
    }
  }

  // // 最初の10件を取得するメソッド
  // // newestを取得するために使用する
  // firstGetRequest = async tag => {
  //   const params = {
  //     query: `#${tag} -is:retweet`,
  //     'tweet.fields': 'author_id',
  //     since_id: `${newest}`
  //   }

  //   const res = await needle('get', endpointUrl, params, {
  //     headers: {
  //       'User-Agent': 'v2RecentSearchJS',
  //       authorization: `Bearer ${token}`
  //     }
  //   })

  //   if (res.body) {
  //     return res.body
  //   } else {
  //     throw new Error('リクエストに失敗しました。')
  //   }
  // }

  // // GetRequestメソッドを動かし、
  // // リスポンス(Tweets)を受け取るメソッド
  // getTweets = async tag => {
  //   // 初回(タグが空白の場合)
  //   if (tag == '' && this.tag == '' && this.newest == '') {
  //     console.log('初回のタグが空白!!')
  //     return
  //   }

  //   // 2回目以降(タグが空白の場合)
  //   if (
  //     (tag == '' && this.tag != '') ||
  //     (tag == '' && this.tag != '' && this.newest != '')
  //   ) {
  //     console.log('2回目以降のタグが空白!!')
  //     this.tag = ''
  //     this.newest = ''
  //     return
  //   }

  //   // 初回目の取得
  //   if (tag != '' && this.tag == '' && this.newest == '') {
  //     try {
  //       const tweets = await this.firstGetRequest(tag)
  //       this.tag = tag

  //       if (tweets.meta.result_count > 0) {
  //         this.newest = tweets.meta.newest_id
  //         console.log('newest_idが設定されました')
  //       }

  //       console.log('OK')
  //       return tweets
  //     } catch (e) {
  //       console.log('Tweetsの取得に失敗しました。')
  //       return e
  //     }
  //   }

  //   if (this.tag == tag) {
  //     console.log('タグが同じです。')
  //   } else {
  //     console.log('タグが違います。')
  //   }

  //   if (tag != this.tag) {
  //     try {
  //       const tweets = await this.firstGetRequest(tag)
  //       this.tag = tag
  //       this.newest = ''

  //       if (tweets.meta.result_count > 0) {
  //         this.newest = tweets.meta.newest_id
  //         console.log('newest_idが設定されました')
  //       }

  //       console.log('OK')
  //       return tweets
  //     } catch (e) {
  //       console.log('Tweetsの取得に失敗しました。')
  //       return e
  //     }
  //   }

  //   if (tag == this.tag && this.newest == '') {
  //     try {
  //       const tweets = await this.firstGetRequest(tag)
  //       this.tag = tag
  //       this.newest = ''

  //       if (tweets.meta.result_count > 0) {
  //         this.newest = tweets.meta.newest_id
  //         console.log('newest_idが設定されました')
  //       }

  //       console.log('OK')
  //       return tweets
  //     } catch (e) {
  //       console.log('Tweetsの取得に失敗しました。')
  //       return e
  //     }
  //   }

  //   if (tag == this.tag && this.newest != '') {
  //     try {
  //       const tweets = await this.firstGetRequest(tag)
  //       this.tag = tag
  //       this.newest = ''

  //       if (tweets.meta.result_count > 0) {
  //         this.newest = tweets.meta.newest_id
  //         console.log('newest_idが設定されました')
  //       }

  //       console.log('OK')
  //       return tweets
  //     } catch (e) {
  //       console.log('Tweetsの取得に失敗しました。')
  //       return e
  //     }
  //   }
  // }

  getString = () => {
    console.log(`this.tag=${this.tag}`)
    console.log(`this.newest=${this.newest}`)
  }
}

// エクスポート
module.exports = Twitter
