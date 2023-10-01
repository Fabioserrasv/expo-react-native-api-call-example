export const webDataToSongWebModel = (data: AnimeThemesResponse): SongWeb => {
  const artist = data.song.artists !== null && data.song.artists.length > 0 ? data.song.artists[0].name : "";
  const coverImageUrl = data.anime.images !== null && data.anime.images.length > 0 ? data.anime.images[0].link : ""
  const videoId = data.animethemeentries !== null && data.animethemeentries.length > 0 && data.animethemeentries[0].videos ? data.animethemeentries[0].videos[0].id : ""
  const videoBasename = data.animethemeentries !== null && data.animethemeentries.length > 0 && data.animethemeentries[0].videos ? data.animethemeentries[0].videos[0].basename : ""
  const videoLink = data.animethemeentries !== null && data.animethemeentries.length > 0 && data.animethemeentries[0].videos ? data.animethemeentries[0].videos[0].link : ""

  return {
    title: data.song.title,
    artist: artist,
    anime: data.anime.name,
    coverImageUrl: coverImageUrl,
    year: data.anime.year,
    type: data.type,
    video: {
      id: videoId,
      basename: videoBasename,
      link: videoLink,
    }
  }
}