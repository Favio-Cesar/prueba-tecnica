import type { Stream } from '~/interfaces/StreamType'
import type { User } from '~/interfaces/UserType'
export type FollowerData = {
  total: number
}

export type Game = {
  id: string
  name: string
  box_art_url: string
  data: object[]

  tags: string[]
}
export class FetchTwitchApiService {
  baseUrl = 'https://api.twitch.tv/helix/'

  constructor(fetchUrl: string = 'https://api.twitch.tv/helix/') {
    if (fetchUrl) {
      this.baseUrl = fetchUrl
    }
  }

  async fetchTopStreams(numberOfStreams = 3): Promise<Stream[]> {
    const fetchUrl = `${this.baseUrl}streams?first=${numberOfStreams}`
    return await this.fetchData<Stream>(fetchUrl)
  }

  async fetchRandomStreams(numberOfStreams = 3): Promise<Stream[]> {
    const fetchUrl = `${this.baseUrl}streams?first=50`
    const result = await this.fetchData<Stream>(fetchUrl)

    if (Array.isArray(result)) {
      const shuffled = result.sort(() => Math.random() - 0.5)
      return shuffled.slice(0, numberOfStreams)
    }

    return []
  }

  async fetchTopCategories(numberOfStreams = 6): Promise<Game[]> {
    const fetchUrl = `${this.baseUrl}games/top?first=${numberOfStreams}`
    return await this.fetchData<Game>(fetchUrl)
  }

  async fetchUserInfo(user_id: string): Promise<User[]> {
    const fetchUrl = `${this.baseUrl}users?login=${user_id}`
    return await this.fetchData<User>(fetchUrl)
  }

  async fetchUserProfilePicture(user_name: string): Promise<string> {
    const fetchUrl = `${this.baseUrl}users?login=${user_name}`
    const data = await this.fetchData<User>(fetchUrl)
    return data[0]?.profile_image_url
  }

  async fetchFollowers(user_id: string): Promise<number> {
    const fetchUrl = `${this.baseUrl}channels/followers?broadcaster_id=${user_id}`
    const response = await this.fetchSingle<FollowerData>(fetchUrl)
    return response.total
  }

  async fetchStreamInfo(user_name: string): Promise<Stream> {
    const fetchUrl = `${this.baseUrl}streams?user_login=${user_name}`
    const response = await this.fetchSingle<{ data: Stream[] }>(fetchUrl)
    return response.data[0]
  }
  async fetchGameViewers(gameId: string): Promise<number> {
    const fetchUrl = `${this.baseUrl}streams?game_id=${gameId}&first=100`
    const streams = await this.fetchData<Stream>(fetchUrl)
    return streams.reduce((total, stream) => total + (stream.viewer_count || 0), 0)
  }

  private async fetchData<T>(url: string): Promise<T[]> {
    try {
      const response = await $fetch<{ data: T[] }>(url, {
        headers: {
          Authorization: `Bearer vjzv0er311ix3kl48wg9mck6ozpmpw`,
          'Client-Id': `ibmqkgxechauftj75c6bpnhsgjcuaq`,
        },
      })
      return response.data
    } catch (error) {
      console.error('Error fetching data:', error)
      throw error
    }
  }

  private async fetchSingle<T>(url: string): Promise<T> {
    try {
      return await $fetch<T>(url, {
        headers: {
          Authorization: `Bearer vjzv0er311ix3kl48wg9mck6ozpmpw`,
          'Client-Id': 'ibmqkgxechauftj75c6bpnhsgjcuaq',
        },
      })
    } catch (error) {
      console.error('Error fetching single item:', error)
      throw error
    }
  }
}
