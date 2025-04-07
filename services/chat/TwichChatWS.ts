export class TwitchChatWebSocket {
  ws = ref<WebSocket | null>(null)
  messages = ref<{ username: string; message: string; color: string }[]>([])

  constructor(twitchChannel: string) {
    this.connectToTwitchChat(twitchChannel)
  }

  connectToTwitchChat = (twitchChannel: string) => {
    this.ws.value = new WebSocket('wss://irc-ws.chat.twitch.tv:443')

    this.ws.value.onmessage = (event) => {
      const message = event.data

      if (message.includes('PING :tmi.twitch.tv')) {
        this.ws.value?.send('PONG :tmi.twitch.tv')
        return
      }

      const tagMatch = message.match(/^@([^ ]+) +:/)
      const tagsString = tagMatch?.[1] || ''
      const tags: Record<string, string> = {}

      tagsString.split(';').forEach((tag: string) => {
        const [key, value] = tag.split('=')
        tags[key] = value || ''
      })

      const match = message.match(/:(\w+)!\w+@\w+\.tmi\.twitch\.tv PRIVMSG #[^ ]+ :(.*)/)
      if (match) {
        const username = match[1]
        const msg = match[2]
        const color = tags['color'] || '#FFFFFF'

        this.messages.value.push({ username, message: msg, color })
      }
    }

    this.ws.value.onopen = () => {
      if (this.ws.value?.readyState === WebSocket.OPEN) {
        this.ws.value?.send(`PASS oauth:xxel4tws7l5bzvj68gdb9a6l1gtv8b`)
        this.ws.value?.send('NICK favio138')
        this.ws.value?.send(
          'CAP REQ :twitch.tv/tags twitch.tv/commands twitch.tv/membership',
        )
        this.ws.value?.send(`JOIN #${twitchChannel}`)
      }
    }

    this.ws.value.onerror = (error) => {
      console.error('WebSocket error:', error)
    }
  }

  sendMessage = (twitchChannel: string, message: string) => {
    if (this.ws.value && this.ws.value.readyState === WebSocket.OPEN) {
      this.ws.value.send(`PRIVMSG #${twitchChannel.toLowerCase()} :${message}`)
    } else {
      console.error('WebSocket not connected!')
    }
  }
}
