import SpotifyApi from './lib/spotifyApi'

export default async function playground () {

  await SpotifyApi.search({
    query: 'Good Day',
  })



}