const needle = require('needle')
const key = 'AIzaSyDh7tJHG-beT2-gFNpJGIvnmVsitnQvSiY'

class Youtube {
  constructor() {
    this.id = ''
    this.chatId = ''
  }

  getChatId = async (id = '') => {
    let chatId = ''
    let endpointUrl = 'https://www.googleapis.com/youtube/v3/videos'
    endpointUrl += `?key=${key}`
    endpointUrl += `&id=${id}`
    endpointUrl += '&part=liveStreamingDetails'

    const T = this.checkId(id)
    switch (T) {
      case -1:
        break
      case 0:
        const res = await needle('get', endpointUrl)
        try {
          const activeLiveChatId = res.body['items'][0]['liveStreamingDetails']['activeLiveChatId']
          if (activeLiveChatId !== undefined) {
            this.chatId = activeLiveChatId
          }
          break
        } catch {
          break
        }
      case 1:
        break
    }

    return chatId

    const res = await needle('get', endpointUrl)
    if (res.body) {
      return res.body
    } else {
      throw new Error('リクエストに失敗しました。')
    }
  }

  checkId = (id) => {
    if (id == '') {
      this.id = ''
      this.chatId = ''
      return -1
    }

    if (this.id == '') {
      this.id = id
      this.chatId = ''
      return 0
    }

    if (this.id == id) {
      return 1
    }

    if (this.id != id) {
      this.id = id
      this.chatId = ''
      return 0
    }
  }
}

module.exports = Youtube
