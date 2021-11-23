const needle = require('needle')
const key = 'AIzaSyDh7tJHG-beT2-gFNpJGIvnmVsitnQvSiY'

class Youtube {
  constructor() {
    this.id = ''
    this.activeId = ''
    this.nextId = ''
  }

  getChatId = async (id = '') => {
    let chats
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
            const chatMessages = await this.getChatMessages(activeLiveChatId)
            this.nextId = chatMessages['nextPageToken']
          }
          break
        } catch {
          break
        }
      case 1:
        const response = await needle('get', endpointUrl)
        try {
          const activeLiveChatId =
            response.body['items'][0]['liveStreamingDetails']['activeLiveChatId']
          if (activeLiveChatId !== undefined) {
            chats = await this.getChatMessages(activeLiveChatId, this.nextId)
            this.nextId = chats['nextPageToken']
          }
          break
        } catch {
          break
        }
        break
    }

    return chats
  }

  getChatMessages = async (activeLiveChatId, nextId = '') => {
    let endpointUrl = 'https://www.googleapis.com/youtube/v3/liveChat/messages'
    endpointUrl += `?liveChatId=${activeLiveChatId}`
    endpointUrl += `&part=snippet`
    endpointUrl += `&key=${key}`

    if (nextId != '') endpointUrl += `&pageToken=${nextId}`

    const res = await needle('get', endpointUrl)

    if (res.body) {
      return res.body
    }
  }

  checkId = (id) => {
    if (id == '') {
      this.id = ''
      this.chatId = ''
      this.nextId = ''
      return -1
    }

    if (this.id == '') {
      this.id = id
      this.chatId = ''
      this.nextId = ''
      return 0
    }

    if (this.id == id) {
      return 1
    }

    if (this.id != id) {
      this.id = id
      this.chatId = ''
      this.nextId = ''
      return 0
    }
  }
}

module.exports = Youtube
