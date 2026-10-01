import { json } from 'node:stream/consumers'

const { SHOPIFY_CLIENT_ID, SHOPIFY_CLIENT_SECRET } = process.env
const SPOTIFY_API_BASE_URL = 'https://api.spotify.com/v1'
const SPOTIFY_SCOPES = 'user-top-read'

class SpotifyApi {
  private accessToken: string | null = null
  private accessTokenGeneratedAt: number = Date.now()
  private accessTokenExpiresIn: number = 3600
  private accessTokenType: string = 'Bearer'

  constructor() {
    this.init()  
  }

  private async init() {
    this.accessToken = await this.checkAndGenerateAccessToken()
  }

  private async checkAndGenerateAccessToken() {
    const tokenExpirationTime = this.accessTokenGeneratedAt + this.accessTokenExpiresIn
    if (
      this.accessToken !== null &&
      tokenExpirationTime > Date.now()
    ) { return this.accessToken }

    try {
      if (!SHOPIFY_CLIENT_ID || !SHOPIFY_CLIENT_SECRET) {
        throw new Error('SHOPIFY_CLIENT_ID and SHOPIFY_CLIENT_SECRET are required')
      }
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'client_credentials',
          client_id: SHOPIFY_CLIENT_ID,
          client_secret: SHOPIFY_CLIENT_SECRET,
          scope: 'user-top-read',
        }),
      });
      const {
        access_token = null,
        expires_in = null,
        token_type = null,
      } = await response.json()

      if (!access_token || !expires_in || !token_type) {
        throw new Error('Failed to generate access token')
      }

      this.accessToken = access_token
      this.accessTokenType = token_type
      this.accessTokenGeneratedAt = Date.now()
      this.accessTokenExpiresIn = expires_in * 1000
      return this.accessToken
  
    } catch (error) {
      console.error(error)
      this.accessToken = null
      return null
    }
  }

  private async fetchWebApi({
    endpoint,
    method,
    params,
    body,
  }: {
    endpoint: string,
    method: string,
    params?: Record<string, string>,
    body?: any,
  }) {
    try {
      await this.checkAndGenerateAccessToken()
      if (!this.accessToken) {
        throw new Error('Access token not found')
      }
      
      const url = new URL(`${SPOTIFY_API_BASE_URL}/${endpoint}`)
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          url.searchParams.set(key, value)
        })
      }

      console.log(url.toString(), this.accessToken, this.accessTokenType)
      
      const response = await fetch(url.toString(), {
        method,
        headers: {
          'Authorization': `${this.accessTokenType} ${this.accessToken}`
        },
        ...(body && method !== 'GET' ? { body: JSON.stringify(body) } : {}),
      })
      if (!response.ok) {
        throw new Error(`Failed to fetch web API: ${response.statusText}`)
      }
      return response.json()
    } catch (error) {
      console.error(error)
      return null
    }
  }

  async search({ query }: { query: string }){
    const tracksResponse = await this.fetchWebApi({
      endpoint: 'search',
      method: 'GET',
      params: {
        q: query,
        type: 'track',
        limit: '10',
      },
      
    })

    const tracks = tracksResponse.tracks?.items ?? []
    console.log(JSON.stringify(tracks, null, 2))
  }
}

export default new SpotifyApi()