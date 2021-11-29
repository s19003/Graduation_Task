const needle = require('needle')
const key = 'AIzaSyDh7tJHG-beT2-gFNpJGIvnmVsitnQvSiY'

class Youtube {
  constructor() {
    this.activeLiveChatId = ''
    this.nextPageToken = ''
  }

  getChatId = async (youtubeId) => {
    try {
      let endpointUrl = 'https://www.googleapis.com/youtube/v3/videos'
      endpointUrl += `?key=${key}`
      endpointUrl += `&id=${youtubeId}`
      endpointUrl += '&part=liveStreamingDetails'

      const res = await needle('get', endpointUrl)
      const totalResults = res.body.pageInfo.totalResults

      if (totalResults) {
        const activeLiveChatId = res.body['items'][0].liveStreamingDetails.activeLiveChatId

        if (this.activeLiveChatId != activeLiveChatId) {
          this.activeLiveChatId = activeLiveChatId
          this.nextPageToken = ''
          const chatMessages = await this.getChatMessages(activeLiveChatId, this.nextPageToken)
          this.nextPageToken = chatMessages.nextPageToken
        } else {
          const chatMessages = await this.getChatMessages(activeLiveChatId, this.nextPageToken)
          this.nextPageToken = chatMessages.nextPageToken
          return chatMessages
        }
      }
      return 0
    } catch (e) {
      console.log(e)
    }
  }

  getChatMessages = async (activeLiveChatId, pageToken) => {
    let endpointUrl = 'https://www.googleapis.com/youtube/v3/liveChat/messages'
    endpointUrl += `?liveChatId=${activeLiveChatId}`
    endpointUrl += `&part=snippet`
    endpointUrl += `&key=${key}`

    if (pageToken) endpointUrl += `&pageToken=${pageToken}`

    const res = await needle('get', endpointUrl)

    if (res.body) {
      return res.body
    }
  }
}

module.exports = Youtube
