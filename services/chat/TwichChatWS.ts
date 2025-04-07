/* type Message = {
  username: string
  message: string
  color: string
  badges: string
} */

export class TwitchChatWebSocket {
  ws = ref<WebSocket | null>(null)
  messages = ref<string[]>([])

  constructor(twitchChannel: string) {
    this.connectToTwitchChat(twitchChannel)
  }

  connectToTwitchChat = (twitchChannel: string) => {
    this.ws.value = new WebSocket('wss://irc-ws.chat.twitch.tv:443')

    this.ws.value.onopen = () => {
      console.log('Conectado a Twitch Chat')

      this.ws.value?.send(`PASS oauth:xxel4tws7l5bzvj68gdb9a6l1gtv8b`)
      this.ws.value?.send('NICK favio138')

      this.ws.value?.send(
        'CAP REQ :twitch.tv/tags twitch.tv/commands twitch.tv/membership',
      )

      this.ws.value?.send(`JOIN #${twitchChannel}`)
    }

    this.ws.value.onmessage = (event) => {
      const message = event.data

      if (message.includes('PING :tmi.twitch.tv')) {
        this.ws.value?.send('PONG :tmi.twitch.tv')
      }

      const match = message.match(/:(\w+)!\w+@\w+\.tmi\.twitch\.tv PRIVMSG #[^ ]+ :(.*)/)
      if (match) {
        const username = match[1]
        const msg = match[2]
        this.messages.value.push(`${username}: ${msg}`)
      }
    }

    this.ws.value.onerror = (error) => {
      console.error('WebSocket error:', error)
    }

    this.ws.value.onclose = () => {
      console.log('Closed connection')
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
