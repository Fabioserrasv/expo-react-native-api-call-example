import { StatusBar } from 'expo-status-bar';
import { useState, useEffect, useCallback } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Track from './components/Track';
import { webDataToSongWebModel } from './src/utils';

const apiUrl = "https://beta.animethemes.moe/api/animetheme"
const queryParamsUrl = "?include=animethemeentries.videos,anime.images,song.artists&fields[anime]=name,year&fields[animetheme]=type&fields[animethemeentry]=version&fields[video]=link,basename,id&fields[image]=facet,link&fields[song]=title&filter[has]=song&filter[song][title-like]=A%25&page[size]=100&page[number]=1&q=";

export default function App() {
  const [tracks, setTracks] = useState<SongWeb[]>([]);
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState<string>('mawaru penguindrum');

  const fetchData = useCallback(async (searchQuery: string) => {
    try {
      setLoading(true)
      const get = await fetch(apiUrl + queryParamsUrl + searchQuery);
      const response = await get.json()
      const tracksReponse: AnimeThemesResponse[] = response.animethemes
      const result = tracksReponse.map(webDataToSongWebModel)
      setTracks(result)
    } catch (error) {
      throw error;
    } finally {
      setLoading(false)

    }
  }, [])

  useEffect(() => {
    fetchData(query);
  }, [])

  let i = 0;

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.title}>Search anime or song</Text>
      <View style={styles.searchDiv}>
        <TextInput
          style={styles.input}
          onChangeText={newText => setQuery(newText)}
          value={query}
        />
        <TouchableOpacity style={styles.button} onPress={async () => { await fetchData(query) }}>
          <Text>Search</Text>
        </TouchableOpacity>
      </View>
      {
        loading ? (<Text>Loading...</Text>) : (
          <FlatList
            style={styles.tableItems}
            data={tracks}
            keyExtractor={() => { return String(i++) }}
            renderItem={({ item: track }) =>
              <Track
                track={track}
              />
            }
            contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}
          />
        )
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#232323',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
    paddingLeft: 50,
    paddingRight: 50
  },
  title: {
    color: '#fff'
  },
  input: {
    color: '#ffffff',
    padding: 5,
    width: '80%',
    borderWidth: 1,
    borderColor: "#fff",
  },
  button: {
    width: '20%',
    backgroundColor: '#00ff00',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchDiv: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 20
  },
  tableItems: {}
});
